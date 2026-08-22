import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { posts } from "@/data/posts";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Observation Log",
  description: "从学术迁移、技术拆解与产品决策三个方向观测 AI 世界。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Observation Log｜PES Explorer",
    description: "从学术迁移、技术拆解与产品决策三个方向观测 AI 世界。",
    images: [siteConfig.ogImage],
  },
  twitter: {
    title: "Observation Log｜PES Explorer",
    description: "从学术迁移、技术拆解与产品决策三个方向观测 AI 世界。",
    images: [siteConfig.ogImage],
  },
};

export default function BlogPage() {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <SiteHeader />
      <main className="blog-index" id="main">
        <header className="blog-hero" data-reveal="up">
          <p className="section-index">OBSERVATION LOG / INDEX</p>
          <h1>用科学视角，观测 AI 世界。</h1>
          <p>
            记录从量子化学、机器学习到 AI 产品设计的思考迁移。文章初稿用于验证博客体验，正式发布前仍需作者复核。
          </p>
        </header>

        <section className="blog-index-list" aria-label="文章列表">
          {posts.map((post) => (
            <article className="blog-index-card" key={post.slug} data-reveal="up">
              <div className="post-visual" aria-hidden="true">
                <i className="post-orbit orbit-a" />
                <i className="post-orbit orbit-b" />
                <b>DFT → AI</b>
              </div>
              <div className="post-code">
                <span>{post.code}</span>
                <span>{post.publishedAt}</span>
              </div>
              <div className="post-content">
                <div className="post-tags">
                  {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.description}</p>
              </div>
              <div className="post-link">
                <span>{post.status === "draft" ? "CONTENT DRAFT" : "PUBLISHED"}</span>
                <Link href={`/blog/${post.slug}`}>阅读观测日志 <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </section>
        <aside className="blog-discussion" data-reveal="up">
          <p>CONTINUE THE DISCUSSION</p>
          <h2>观测不止发生在这里。</h2>
          <span>欢迎在 GitHub Issues、人人都是产品经理、小红书和微信公众号平台与我讨论。</span>
          <div>
            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub Issues ↗</a>
            <a href="https://www.woshipm.com/" target="_blank" rel="noreferrer">人人都是产品经理 ↗</a>
            <a href="https://www.xiaohongshu.com/" target="_blank" rel="noreferrer">小红书 ↗</a>
          </div>
          <small>以上主页均为功能占位，正式发布前替换。</small>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
