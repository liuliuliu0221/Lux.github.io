"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pes:client-error", {
      detail: { digest: error.digest ?? "unavailable" },
    }));
  }, [error]);

  return (
    <main className="status-page" id="main">
      <p className="section-index">SYSTEM STATE / RECOVERABLE</p>
      <h1>探索路径暂时偏离。</h1>
      <p>核心内容仍然安全。你可以重新计算当前路径，或返回首页继续浏览。</p>
      <div className="status-actions">
        <button className="primary-button" type="button" onClick={reset}>重新计算</button>
        <Link href="/">返回首页</Link>
      </div>
    </main>
  );
}
