import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/paths";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const siteConfig = {
  name: "Lux Portfolio",
  title: "Lux｜AI Product Manager · Indie Developer",
  description: "刘芯羽（Lux）的个人作品集：从量子化学研究走向 AI 产品，在复杂系统中寻找更清晰、更低摩擦的路径。",
  url: siteUrl,
  ogImage: new URL(withBasePath("/og.png"), siteUrl).toString(),
  isProduction,
  profile: {
    name: profile.name,
    jobTitle: profile.role,
    description: profile.description,
  },
};
