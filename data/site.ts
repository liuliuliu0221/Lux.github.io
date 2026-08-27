import { profile } from "@/data/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const siteConfig = {
  name: "PES Explorer",
  title: "PES Explorer｜AI 产品经理候选人",
  description: "在技术逻辑与产品思维之间，寻找 Human-AI Interaction 的全局最优解。",
  url: siteUrl,
  ogImage: new URL("/og.png", siteUrl).toString(),
  isProduction,
  profile: {
    name: profile.name,
    jobTitle: profile.role,
    description: profile.description,
  },
};
