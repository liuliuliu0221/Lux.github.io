export type ContactLink = {
  id: "resume" | "email" | "github" | "linkedin" | "xiaohongshu" | "wechat";
  label: string;
  shortLabel: string;
  href: string;
  event: "resume_download" | "contact_click";
  external?: boolean;
  download?: string;
  placeholder: boolean;
};

export const profile = {
  name: "刘芯羽",
  englishName: "Lux",
  displayName: "AI PM * Indie Developer",
  role: "AI Product Manager",
  location: "",
  education: "大连理工大学（985）硕士",
  email: "13478454399@163.com",
  description: "量子化学研究背景与 AI 产品能力的跨领域候选人。",
  contentNotice: "当前简历仍为功能占位文件，正式发布前替换。",
  publicAccountName: "超级土豆饼",
  portrait: "/profile-lux.jpg",
  contacts: [
    {
      id: "resume",
      label: "下载占位简历",
      shortLabel: "RESUME",
      href: "/resume-placeholder.pdf",
      event: "resume_download",
      download: "刘芯羽-AIPM-简历.pdf",
      placeholder: true,
    },
    {
      id: "email",
      label: "13478454399@163.com",
      shortLabel: "EMAIL",
      href: "mailto:13478454399@163.com?subject=%E6%9D%A5%E8%87%AA%E4%B8%AA%E4%BA%BA%E7%BD%91%E7%AB%99%E7%9A%84%E5%B2%97%E4%BD%8D%E6%B2%9F%E9%80%9A",
      event: "contact_click",
      placeholder: false,
    },
    {
      id: "github",
      label: "liuliuliu0221",
      shortLabel: "GITHUB",
      href: "https://github.com/liuliuliu0221",
      event: "contact_click",
      external: true,
      placeholder: false,
    },
    {
      id: "xiaohongshu",
      label: "小红书入口",
      shortLabel: "REDNOTE",
      href: "https://www.xiaohongshu.com/user/profile/63f4f96f000000000f01239d",
      event: "contact_click",
      external: true,
      placeholder: false,
    },
    {
      id: "wechat",
      label: "微信二维码",
      shortLabel: "WECHAT",
      href: "/wechat-qr-lux.jpg",
      event: "contact_click",
      external: true,
      placeholder: false,
    },
  ] satisfies ContactLink[],
};
