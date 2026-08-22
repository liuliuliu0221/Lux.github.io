"use client";

import { useEffect, useRef, useState } from "react";
import type { PesSceneController } from "@/components/PesScene";

type NetworkInformation = {
  saveData?: boolean;
};

const pes3dEnabled = process.env.NEXT_PUBLIC_ENABLE_PES_3D !== "false";

function shouldKeepPoster() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

  if (prefersReducedMotion || connection?.saveData) return true;

  try {
    const testCanvas = document.createElement("canvas");
    const context = testCanvas.getContext("webgl2") ?? testCanvas.getContext("webgl");
    if (!context) return true;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return false;
  } catch {
    return true;
  }
}

export function HeroPesExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<PesSceneController | null>(null);
  const startedRef = useRef(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!pes3dEnabled || shouldKeepPoster()) return;

    const stage = stageRef.current;
    const host = canvasHostRef.current;
    if (!stage || !host) return;

    let disposed = false;
    let inViewport = false;
    const deferUntilIntent = window.matchMedia("(max-width: 760px)").matches;

    const removeIntentListeners = () => {
      window.removeEventListener("pointerdown", onIntent);
      window.removeEventListener("keydown", onIntent);
      window.removeEventListener("scroll", onIntent);
    };

    const onIntent = () => {
      if (inViewport) void start();
    };

    const syncActivity = () => {
      controllerRef.current?.setActive(inViewport && document.visibilityState === "visible");
    };

    const start = async () => {
      if (startedRef.current || disposed) return;
      startedRef.current = true;
      removeIntentListeners();

      try {
        const { startPesScene } = await import("@/components/PesScene");
        if (disposed) return;

        controllerRef.current = startPesScene(host, {
          onFirstFrame: () => {
            if (!disposed) setIsLive(true);
          },
          onFailure: () => {
            if (!disposed) setIsLive(false);
          },
        });
        syncActivity();
      } catch {
        startedRef.current = false;
        setIsLive(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && !deferUntilIntent) void start();
        syncActivity();
      },
      { rootMargin: "160px 0px", threshold: 0.05 },
    );

    const onVisibilityChange = () => syncActivity();
    const onPointerMove = (event: PointerEvent) => {
      if (deferUntilIntent) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      controllerRef.current?.setPointer(x, y);
    };
    const resetPointer = () => controllerRef.current?.setPointer(0, 0);
    observer.observe(stage);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    if (deferUntilIntent) {
      window.addEventListener("pointerdown", onIntent, { passive: true });
      window.addEventListener("keydown", onIntent);
      window.addEventListener("scroll", onIntent, { passive: true });
    }

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      removeIntentListeners();
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div
      className={`pes-preview${isLive ? " is-live" : ""}`}
      ref={stageRef}
      aria-hidden="true"
    >
      <div className="pes-poster">
        <div className="pes-grid" />
        <div className="pes-orbit orbit-one" />
        <div className="pes-orbit orbit-two" />
        <div className="pes-orbit orbit-three" />
        <div className="energy-label energy-high">E HIGH</div>
        <div className="energy-label energy-low">GLOBAL MIN</div>
      </div>
      <div className="pes-canvas-host" ref={canvasHostRef} />
      <div className="pes-mode-label">
        <i /> {isLive ? "LIVE PES / POINTER PROBE" : "STATIC PES / READY"}
      </div>
    </div>
  );
}
