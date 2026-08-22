import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string) => new URL(path, siteConfig.url).toString();

  return [
    { url: page("/"), changeFrequency: "monthly", priority: 1 },
    { url: page("/blog"), changeFrequency: "monthly", priority: 0.7 },
    ...posts.filter((post) => post.status === "published").map((post) => ({
      url: page(`/blog/${post.slug}`),
      lastModified: post.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
