"use client";

import { useEffect, useRef } from "react";

export function ExperienceEnhancements() {
  const pointerLayerRef = useRef<HTMLDivElement>(null);
  const pointerTrailRef = useRef<HTMLCanvasElement>(null);
  const pointerProbeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let animationFrame = 0;

    const updateScrollState = () => {
      animationFrame = 0;
      const scrollRange = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.toggleAttribute("data-scrolled", window.scrollY > 24);

      const coordinate = document.querySelector<HTMLElement>(".scroll-coordinate");
      if (coordinate) {
        coordinate.textContent = `ENERGY COORDINATE · ${(1 - progress).toFixed(2)}`;
      }
    };

    const requestScrollUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollState);
    };

    root.classList.add("reveal-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    const observeRevealTree = (node: Element) => {
      if (node.matches("[data-reveal]")) {
        revealObserver.observe(node);
      }

      node.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
        revealObserver.observe(target);
      });
    };

    observeRevealTree(document.body);

    const revealMutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeRevealTree(node);
        });
      });
    });
    revealMutationObserver.observe(document.body, { childList: true, subtree: true });

    updateScrollState();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      revealMutationObserver.disconnect();
      revealObserver.disconnect();
      root.classList.remove("reveal-ready");
      root.removeAttribute("data-scrolled");
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compactViewport = window.matchMedia("(max-width: 760px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const layer = pointerLayerRef.current;
    const canvas = pointerTrailRef.current;
    const probe = pointerProbeRef.current;
    const context = canvas?.getContext("2d");

    if (!finePointer.matches || compactViewport.matches || reducedMotion.matches || !layer || !canvas || !probe || !context) {
      return;
    }

    type TrailPoint = { x: number; y: number; createdAt: number };
    let points: TrailPoint[] = [];
    let frame = 0;
    let active = false;
    let width = 1;
    let height = 1;
    const lifetime = 620;

    root.classList.add("has-pointer-probe");

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      points = points.filter((point) => now - point.createdAt < lifetime);

      if (points.length > 1) {
        context.save();
        context.globalCompositeOperation = "lighter";
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = "rgba(255, 255, 255, 0.9)";

        for (let index = 1; index < points.length; index += 1) {
          const point = points[index];
          const previous = points[index - 1];
          const remaining = 1 - (now - point.createdAt) / lifetime;
          const alpha = Math.max(remaining, 0) * ((index + 1) / points.length);
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(point.x, point.y);
          context.lineWidth = 0.8 + alpha * 2.8;
          context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.72})`;
          context.shadowBlur = 7 + alpha * 18;
          context.stroke();
        }

        context.restore();
      }

      layer.dataset.trailPoints = String(points.length);
      if (points.length > 1) frame = window.requestAnimationFrame(draw);
    };

    const scheduleDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const hideProbe = () => {
      active = false;
      points = [];
      layer.classList.remove("is-active");
      layer.dataset.pointerProbe = "inactive";
      scheduleDraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const now = performance.now();
      const previous = points.at(-1);

      if (!active) points = [];
      active = true;
      layer.classList.add("is-active");
      layer.dataset.pointerProbe = "active";
      layer.dataset.pointerPosition = `${Math.round(x)},${Math.round(y)}`;
      probe.style.left = `${x}px`;
      probe.style.top = `${y}px`;

      if (previous) {
        const distance = Math.hypot(x - previous.x, y - previous.y);
        const steps = Math.min(Math.max(Math.ceil(distance / 10), 1), 8);
        for (let step = 1; step <= steps; step += 1) {
          const progress = step / steps;
          points.push({
            x: previous.x + (x - previous.x) * progress,
            y: previous.y + (y - previous.y) * progress,
            createdAt: now,
          });
        }
      } else {
        points.push({ x, y, createdAt: now });
      }

      if (points.length > 72) points = points.slice(-72);
      scheduleDraw();
    };

    const onWindowOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hideProbe();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mouseout", onWindowOut);
    window.addEventListener("blur", hideProbe);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseout", onWindowOut);
      window.removeEventListener("blur", hideProbe);
      root.classList.remove("has-pointer-probe");
      delete layer.dataset.pointerProbe;
      delete layer.dataset.pointerPosition;
      delete layer.dataset.trailPoints;
    };
  }, []);

  return (
    <>
      <div className="scroll-energy-axis" aria-hidden="true">
        <span>E HIGH</span>
        <i><b /></i>
        <span>GLOBAL MIN</span>
      </div>
      <div className="pointer-probe-layer" data-scope="global" ref={pointerLayerRef} aria-hidden="true">
        <canvas className="pointer-probe-trail" ref={pointerTrailRef} />
        <span className="pointer-probe" ref={pointerProbeRef} />
      </div>
    </>
  );
}
