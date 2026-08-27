"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";

type ElasticIdentityBadgeProps = {
  backMessage: string;
  children: ReactNode;
  label: string;
};

type MotionState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pointerId: number | null;
  originX: number;
  originY: number;
  previousX: number;
  previousY: number;
  previousTime: number;
  gestureStartX: number;
  gestureStartY: number;
  moved: boolean;
  pullTriggered: boolean;
};

const initialMotion = (): MotionState => ({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  pointerId: null,
  originX: 0,
  originY: 0,
  previousX: 0,
  previousY: 0,
  previousTime: 0,
  gestureStartX: 0,
  gestureStartY: 0,
  moved: false,
  pullTriggered: false,
});

export function ElasticIdentityBadge({ backMessage, children, label }: ElasticIdentityBadgeProps) {
  const [flipped, setFlipped] = useState(false);
  const rigRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const motionRef = useRef<MotionState>(initialMotion());

  const paint = (x: number, y: number, dragging = false) => {
    const rig = rigRef.current;
    if (!rig) return;

    const baseLength = 114;
    const verticalDistance = Math.max(18, baseLength + y);
    const length = Math.hypot(x, verticalDistance);
    const angle = -Math.atan2(x, verticalDistance) * (180 / Math.PI);
    const rotation = Math.max(-4, Math.min(4, x * 0.018));
    const tiltX = Math.max(-2.2, Math.min(2.2, -y * 0.012));
    const tiltY = Math.max(-2.8, Math.min(2.8, x * 0.012));

    rig.style.setProperty("--badge-x", `${x}px`);
    rig.style.setProperty("--badge-y", `${y}px`);
    rig.style.setProperty("--badge-rotate", `${rotation}deg`);
    rig.style.setProperty("--badge-tilt-x", `${tiltX}deg`);
    rig.style.setProperty("--badge-tilt-y", `${tiltY}deg`);
    rig.style.setProperty("--lanyard-length", `${length}px`);
    rig.style.setProperty("--lanyard-angle", `${angle}deg`);
    rig.dataset.dragging = dragging ? "true" : "false";
  };

  const stopAnimation = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const springHome = (flipAfterReturn = false) => {
    stopAnimation();

    if (reducedMotionRef.current) {
      const motion = motionRef.current;
      motion.x = 0;
      motion.y = 0;
      motion.vx = 0;
      motion.vy = 0;
      paint(0, 0);
      if (flipAfterReturn) setFlipped((current) => !current);
      return;
    }

    let previousFrame = performance.now();
    const tick = (now: number) => {
      const motion = motionRef.current;
      const delta = Math.min(2, Math.max(0.4, (now - previousFrame) / 16.667));
      previousFrame = now;

      motion.vx += -motion.x * 0.072 * delta;
      motion.vy += -motion.y * 0.072 * delta;
      const damping = Math.pow(0.78, delta);
      motion.vx *= damping;
      motion.vy *= damping;
      motion.x += motion.vx * delta;
      motion.y += motion.vy * delta;
      paint(motion.x, motion.y);

      const settled =
        Math.abs(motion.x) < 0.12 &&
        Math.abs(motion.y) < 0.12 &&
        Math.abs(motion.vx) < 0.12 &&
        Math.abs(motion.vy) < 0.12;

      if (settled) {
        motion.x = 0;
        motion.y = 0;
        motion.vx = 0;
        motion.vy = 0;
        paint(0, 0);
        frameRef.current = null;
        if (flipAfterReturn) setFlipped((current) => !current);
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = query.matches;
    };
    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => {
      query.removeEventListener("change", updatePreference);
      stopAnimation();
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, textarea, select, [data-no-drag]")) return;

    stopAnimation();
    const motion = motionRef.current;
    motion.pointerId = event.pointerId;
    motion.originX = event.clientX - motion.x;
    motion.originY = event.clientY - motion.y;
    motion.previousX = motion.x;
    motion.previousY = motion.y;
    motion.previousTime = event.timeStamp;
    motion.gestureStartX = motion.x;
    motion.gestureStartY = motion.y;
    motion.moved = false;
    motion.pullTriggered = false;
    motion.vx = 0;
    motion.vy = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    paint(motion.x, motion.y, true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const motion = motionRef.current;
    if (motion.pointerId !== event.pointerId) return;

    const maxX = Math.min(280, window.innerWidth * 0.24);
    const maxY = Math.min(200, window.innerHeight * 0.22);
    const nextX = Math.max(-maxX, Math.min(maxX, event.clientX - motion.originX));
    const nextY = Math.max(-52, Math.min(maxY, event.clientY - motion.originY));
    const elapsed = Math.max(8, event.timeStamp - motion.previousTime);
    const velocityScale = 16.667 / elapsed;

    if (Math.hypot(nextX - motion.gestureStartX, nextY - motion.gestureStartY) > 4) {
      motion.moved = true;
    }
    if (nextY >= 88 && !motion.pullTriggered) {
      motion.pullTriggered = true;
    }

    motion.vx = (nextX - motion.previousX) * velocityScale;
    motion.vy = (nextY - motion.previousY) * velocityScale;
    motion.x = nextX;
    motion.y = nextY;
    motion.previousX = nextX;
    motion.previousY = nextY;
    motion.previousTime = event.timeStamp;
    paint(nextX, nextY, true);
  };

  const releasePointer = (event: ReactPointerEvent<HTMLElement>) => {
    const motion = motionRef.current;
    if (motion.pointerId !== event.pointerId) return;
    const flipAfterReturn = motion.pullTriggered;
    motion.pointerId = null;
    motion.pullTriggered = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    springHome(flipAfterReturn);
  };

  const handleBackClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFlipped(false);
  };

  return (
    <div
      className="elastic-badge-rig"
      ref={rigRef}
      data-reveal="up"
      style={{ "--lanyard-texture": `url(${withBasePath("/lanyard-texture.png")})` } as CSSProperties}
    >
      <span className="elastic-lanyard" aria-hidden="true" />
      <span className="elastic-pull-cue" aria-hidden="true">
        <span>PULL DOWN</span>
        <i />
      </span>
      <article
        className="identity-badge"
        ref={badgeRef}
        aria-label={flipped ? `${label}背面，点击或再次下拉返回正面` : label}
        data-flipped={flipped ? "true" : "false"}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
      >
        <span className="identity-badge-clip" aria-hidden="true" />
        <div className="identity-badge-flipper">
          <div className="identity-badge-face identity-badge-front" aria-hidden={flipped} inert={flipped ? true : undefined}>
            {children}
          </div>
          <div className="identity-badge-face identity-badge-back" aria-hidden={!flipped} inert={!flipped ? true : undefined}>
            <button type="button" onClick={handleBackClick} aria-label="返回工牌正面">
              {backMessage}
            </button>
          </div>
        </div>
      </article>
      <p className="elastic-badge-hint">PULL DOWN TO FLIP · RELEASE TO RETURN</p>
    </div>
  );
}
