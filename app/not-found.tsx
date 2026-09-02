import Link from "next/link";
import { withBasePath } from "@/lib/paths";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="status-page" id="main">
        <p className="micro-label">404 / LOST FRAME</p>
        <h1>这一幕不在<br />当前故事里。</h1>
        <p>页面可能已经移动。回到首页，继续浏览 Lux 的作品与思考。</p>
        <div className="status-actions">
          <Link className="status-primary" href={withBasePath("/")}>返回首页</Link>
          <Link href={`${withBasePath("/")}#blog`}>查看 Journal ↗</Link>
        </div>
      </main>
    </>
  );
}
