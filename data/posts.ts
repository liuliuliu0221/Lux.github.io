import type { ComponentType } from "react";
import DftToTransformer from "@/content/posts/dft-to-transformer.mdx";

export type PostMetadata = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  code: string;
  status: "draft" | "published";
};

export type Post = PostMetadata & {
  Component: ComponentType;
};

export const posts: Post[] = [
  {
    slug: "dft-to-transformer",
    title: "从 DFT 到 Transformer：归纳偏置的迁移思考",
    description: "从计算化学中的近似选择出发，理解模型为何需要恰到好处的结构假设。",
    publishedAt: "2026-08-21",
    tags: ["学术视角", "技术拆解"],
    code: "LOG.001",
    status: "draft",
    Component: DftToTransformer,
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
