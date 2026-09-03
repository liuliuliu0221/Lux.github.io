import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string) => new URL(withBasePath(path), siteConfig.url).toString();

  return [
    { url: page("/"), changeFrequency: "monthly", priority: 1 },
  ];
}
