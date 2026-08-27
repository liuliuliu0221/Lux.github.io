import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string) => new URL(path, siteConfig.url).toString();

  return [
    { url: page("/"), changeFrequency: "monthly", priority: 1 },
  ];
}
