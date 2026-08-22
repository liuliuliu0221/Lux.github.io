import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPostBySlug, posts } from "@/data/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      images: [],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [],
    },
    robots: post.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { Component } = post;

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <SiteHeader />
      <main className="article-page" id="main">
        <header className="article-header">
          <Link href="/blog" className="article-back">← 返回 Observation Log</Link>
          <p>{post.code} / {post.publishedAt}</p>
          <div className="post-tags">
            {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </header>
        <article className="article-prose">
          <Component />
        </article>
        <aside className="article-next">
          <p>CONTINUE EXPLORING</p>
          <h2>从思考回到实际决策。</h2>
          <Link href="/#projects">查看项目案例 <span aria-hidden="true">→</span></Link>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
