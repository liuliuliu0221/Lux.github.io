"use client";

import { useEffect } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("lux:client-error", {
      detail: { digest: error.digest ?? "unavailable" },
    }));
  }, [error]);

  return (
    <main className="status-page" id="main">
      <p className="micro-label">SYSTEM / RECOVERABLE</p>
      <h1>这一幕暂时<br />无法加载。</h1>
      <p>你可以重新尝试，或返回首页继续浏览。</p>
      <div className="status-actions">
        <button className="status-primary" type="button" onClick={reset}>重新尝试</button>
        <Link href={withBasePath("/")}>返回首页</Link>
      </div>
    </main>
  );
}
