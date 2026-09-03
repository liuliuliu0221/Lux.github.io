import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/paths";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteConfig.isProduction
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: new URL(withBasePath("/sitemap.xml"), siteConfig.url).toString(),
  };
}
