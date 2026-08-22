import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="status-page" id="main">
        <p className="section-index">404 / COORDINATE NOT FOUND</p>
        <h1>这组坐标不在当前势能面上。</h1>
        <p>页面可能已移动，或仍在等待补充。返回全局视图继续探索。</p>
        <div className="status-actions">
          <Link className="primary-button" href="/">返回首页</Link>
          <Link href="/blog">查看观测日志</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
