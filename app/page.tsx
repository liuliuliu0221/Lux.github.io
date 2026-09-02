import type { Metadata } from "next";
import { CinematicPortfolio } from "@/components/CinematicPortfolio";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: { absolute: "Lux｜AI Product Manager · Indie Developer" },
  description:
    "刘芯羽（Lux）的个人作品集：从量子化学研究走向 AI 产品，在复杂系统中寻找更清晰、更低摩擦的路径。",
};

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <SiteHeader home />
      <CinematicPortfolio />
    </>
  );
}
