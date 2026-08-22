import * as THREE from "three";

export type PesSceneController = {
  setActive: (active: boolean) => void;
  setPointer: (x: number, y: number) => void;
  dispose: () => void;
};

type PesSceneOptions = {
  onFirstFrame: () => void;
  onFailure: () => void;
};

function potentialEnergy(x: number, y: number) {
  const scaledX = x * 0.55;
  const scaledY = y * 0.55;
  const radiusSquared = scaledX * scaledX + scaledY * scaledY;
  const doubleWell = radiusSquared * radiusSquared - (scaledX * scaledX - scaledY * scaledY);
  const confinedDoubleWell = Math.tanh(doubleWell * 0.24) * 0.38;
  const gaussianFeature = (
    centerX: number,
    centerY: number,
    spreadX: number,
    spreadY: number,
    amplitude: number,
  ) => amplitude * Math.exp(
    -(
      ((x - centerX) * (x - centerX)) / (2 * spreadX * spreadX)
      + ((y - centerY) * (y - centerY)) / (2 * spreadY * spreadY)
    ),
  );

  // An asymmetric, multi-basin landscape: two deep minima are separated by
  // a tall saddle ridge, while smaller rear peaks keep the surface rugged.
  const centralRidge = gaussianFeature(0.1, 0.35, 0.82, 1.6, 2.75);
  const rearLeftPeak = gaussianFeature(-2.65, 1.55, 0.9, 0.82, 1.55);
  const rearRightPeak = gaussianFeature(2.45, 1.45, 0.85, 0.95, 1.85);
  const sideShoulder = gaussianFeature(3.35, -0.15, 0.72, 1.2, 0.9);
  const reactantBasin = gaussianFeature(-2.45, -1.0, 1.05, 0.82, -1.75);
  const productBasin = gaussianFeature(1.85, -1.35, 1.2, 0.9, -2.35);
  const secondaryBasin = gaussianFeature(-0.35, 2.15, 0.72, 0.58, -0.72);
  const corrugation = 0.2 * Math.sin(x * 1.18 + y * 0.34)
    * Math.cos(y * 0.92 - x * 0.17);
  const edgeLift = 0.012 * (x * x + y * y);
  const energy = confinedDoubleWell
    + centralRidge
    + rearLeftPeak
    + rearRightPeak
    + sideShoulder
    + reactantBasin
    + productBasin
    + secondaryBasin
    + corrugation
    + edgeLift
    - 0.18;

  return THREE.MathUtils.clamp(energy, -2.35, 3.65);
}

function surfaceHeight(x: number, y: number) {
  return potentialEnergy(x, y) * 0.9 - 0.28;
}

export function startPesScene(host: HTMLElement, options: PesSceneOptions): PesSceneController {
  const isCompact = window.matchMedia("(max-width: 760px)").matches;
  const segmentCount = isCompact ? 40 : 72;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0f19, 0.075);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(6.7, 4.15, 7.35);
  camera.lookAt(0, -0.06, 0);

  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isCompact, powerPreference: "low-power" });
  } catch (error) {
    options.onFailure();
    throw error;
  }

  renderer.setClearColor(0x0b0f19, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCompact ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = "pes-canvas";
  host.append(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(9.6, 7.2, segmentCount, segmentCount);
  const positions = geometry.attributes.position;
  const colors: number[] = [];
  const cold = new THREE.Color(0x003b57);
  const cyan = new THREE.Color(0x00d4ff);
  const highEnergy = new THREE.Color(0x8aeaff);

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const energy = potentialEnergy(x, y);
    positions.setZ(index, surfaceHeight(x, y));

    const normalized = THREE.MathUtils.clamp((energy + 2.35) / 6, 0, 1);
    const color = normalized > 0.78
      ? cyan.clone().lerp(highEnergy, (normalized - 0.78) / 0.22)
      : cold.clone().lerp(cyan, normalized / 0.78);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  geometry.rotateX(-Math.PI / 2);

  const surfaceMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.18,
    roughness: 0.58,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
  });
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x38ddff,
    wireframe: true,
    transparent: true,
    opacity: isCompact ? 0.19 : 0.3,
  });

  const surface = new THREE.Mesh(geometry, surfaceMaterial);
  const wireframe = new THREE.Mesh(geometry, wireMaterial);
  wireframe.scale.setScalar(1.003);

  const group = new THREE.Group();
  group.add(surface, wireframe);
  group.rotation.z = -0.07;
  scene.add(group);
  scene.add(new THREE.HemisphereLight(0x75eaff, 0x080b12, 1.45));
  host.dataset.surfaceModel = "multi-basin-saddle";

  const resize = () => {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  let animationFrame = 0;
  let active = false;
  let disposed = false;
  let firstFrameRendered = false;
  let elapsed = 0;
  let lastFrameTime = performance.now();
  let pointerX = 0;
  let pointerY = 0;
  let smoothPointerX = 0;
  let smoothPointerY = 0;

  const render = () => {
    if (!active || disposed) return;

    const currentFrameTime = performance.now();
    const deltaTime = Math.min((currentFrameTime - lastFrameTime) / 1000, 0.1);
    elapsed += deltaTime;
    lastFrameTime = currentFrameTime;

    smoothPointerX = THREE.MathUtils.lerp(smoothPointerX, pointerX, 0.035);
    smoothPointerY = THREE.MathUtils.lerp(smoothPointerY, pointerY, 0.035);
    camera.position.set(6.7 + smoothPointerX * 0.52, 4.15 - smoothPointerY * 0.28, 7.35 - smoothPointerX * 0.16);
    camera.lookAt(smoothPointerX * 0.12, -0.06 - smoothPointerY * 0.08, 0);
    group.rotation.y = Math.sin(elapsed * 0.12) * 0.075;
    group.position.y = Math.sin(elapsed * 0.32) * 0.035;
    renderer.render(scene, camera);

    if (!firstFrameRendered) {
      firstFrameRendered = true;
      options.onFirstFrame();
    }

    animationFrame = window.requestAnimationFrame(render);
  };

  const onContextLost = (event: Event) => {
    event.preventDefault();
    active = false;
    window.cancelAnimationFrame(animationFrame);
    options.onFailure();
  };
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);

  const setActive = (nextActive: boolean) => {
    if (disposed || active === nextActive) return;
    active = nextActive;
    window.cancelAnimationFrame(animationFrame);

    if (active) {
      lastFrameTime = performance.now();
      animationFrame = window.requestAnimationFrame(render);
    }
  };

  setActive(true);

  return {
    setActive,
    setPointer: (x, y) => {
      pointerX = THREE.MathUtils.clamp(x, -1, 1);
      pointerY = THREE.MathUtils.clamp(y, -1, 1);
    },
    dispose: () => {
      disposed = true;
      active = false;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      surfaceMaterial.dispose();
      wireMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.surfaceModel;
    },
  };
}
