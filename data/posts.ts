export type ExternalPost = {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  code: string;
  url: string;
  image: string;
  source: string;
};

export const externalPosts: ExternalPost[] = [
  {
    title: "AI越懂你，为什么越容易答错？真正的个性化，是知道什么时候不该记得",
    description: "AI 长期记忆正成为主流产品标配，但过期、错位或不相关的记忆同样会误导回答。文章从四类记忆失效出发，讨论个性化产品为何需要主动遗忘。",
    publishedAt: "2026-08-20",
    tags: ["AI 记忆", "个性化", "产品机制"],
    code: "LOG.004",
    url: "https://www.woshipm.com/ai/6451657.html",
    image: "/posts/ai-memory-forgetting.png",
    source: "人人都是产品经理",
  },
  {
    title: "当 Claude 开始打包金融 Agent，垂直 AI 不能再靠“更懂行业”",
    description: "当平台把行业知识、数据连接与任务分工封装成标准组件，垂直 AI 的竞争重点也从“更懂行业”转向能否对业务结果负责。",
    publishedAt: "2026-08-11",
    tags: ["AI Agent", "垂直 AI", "产品战略"],
    code: "LOG.003",
    url: "https://www.woshipm.com/ai/6444046.html",
    image: "/posts/claude-finance-agent.png",
    source: "人人都是产品经理",
  },
  {
    title: "有引用，不等于可信：AI搜索从“展示来源”到“支持核验”还差什么？",
    description: "引用会快速提升用户信任，但链接存在并不代表结论得到支持。文章拆解 AI 搜索引用链路，并提出从展示来源走向支持核验的产品方向。",
    publishedAt: "2026-08-10",
    tags: ["AI 搜索", "引用核验", "信任设计"],
    code: "LOG.002",
    url: "https://mp.weixin.qq.com/s/jaTJvKNIsac-0-gwIcwPiA",
    image: "/posts/ai-search-citations.png",
    source: "微信公众号",
  },
  {
    title: "SecondMe 为什么难以走出尝鲜期：AI 身份产品的三重冷启动",
    description: "AI 身份产品要求用户先投入大量个人信息，价值却要在建模后才能判断。文章从信息、价值与社交三层冷启动分析 SecondMe 的留存难题。",
    publishedAt: "2026-08-06",
    tags: ["SecondMe", "AI 身份", "冷启动"],
    code: "LOG.001",
    url: "https://mp.weixin.qq.com/s/TEgeXCEwCzpn4CfLDqYOcg",
    image: "/posts/secondme-cold-start.png",
    source: "微信公众号",
  },
];
