export type ContactLink = {
  id: "resume" | "email" | "github" | "scholar" | "linkedin" | "xiaohongshu" | "wechat";
  label: string;
  shortLabel: string;
  href: string;
  event: "resume_download" | "contact_click";
  external?: boolean;
  download?: string;
  placeholder: boolean;
};

export const profile = {
  name: "姓名待补充",
  displayName: "PROFILE / PENDING",
  role: "AI Product Manager Candidate",
  location: "所在城市待补充",
  email: "replace-me@example.com",
  description: "量子化学研究背景与 AI 产品能力的跨领域候选人；个人资料待发布前统一替换。",
  contentNotice: "当前姓名、邮箱、外部主页和简历均为功能占位资料，正式发布前统一替换。",
  contacts: [
    {
      id: "resume",
      label: "下载占位简历",
      shortLabel: "RESUME",
      href: "/resume-placeholder.pdf",
      event: "resume_download",
      download: "PES-Explorer-占位简历.pdf",
      placeholder: true,
    },
    {
      id: "email",
      label: "示例邮箱",
      shortLabel: "EMAIL",
      href: "mailto:replace-me@example.com?subject=PES%20Explorer%20Contact",
      event: "contact_click",
      placeholder: true,
    },
    {
      id: "github",
      label: "GitHub 入口",
      shortLabel: "GITHUB",
      href: "https://github.com/",
      event: "contact_click",
      external: true,
      placeholder: true,
    },
    {
      id: "scholar",
      label: "Scholar 入口",
      shortLabel: "SCHOLAR",
      href: "https://scholar.google.com/",
      event: "contact_click",
      external: true,
      placeholder: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn 入口",
      shortLabel: "LINKEDIN",
      href: "https://www.linkedin.com/",
      event: "contact_click",
      external: true,
      placeholder: true,
    },
    {
      id: "xiaohongshu",
      label: "小红书入口",
      shortLabel: "REDNOTE",
      href: "https://www.xiaohongshu.com/",
      event: "contact_click",
      external: true,
      placeholder: true,
    },
    {
      id: "wechat",
      label: "微信入口",
      shortLabel: "WECHAT",
      href: "https://weixin.qq.com/",
      event: "contact_click",
      external: true,
      placeholder: true,
    },
  ] satisfies ContactLink[],
};
