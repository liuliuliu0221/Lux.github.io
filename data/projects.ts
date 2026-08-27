export type Project = {
  id: string;
  slug: string;
  title: string;
  type: string;
  challenge: string;
  decision: string;
  outcome: string;
  evidence: string;
  tags: string[];
  url?: string;
  curve: {
    startEnergy: number;
    barrierEnergy: number;
    endEnergy: number;
    transitionProgress: number;
  };
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "argon-radionuclide-mechanism",
    title: "核反应堆氩气介质中物质反应机制",
    type: "COMPUTATIONAL CHEMISTRY",
    challenge: "核反应堆氩气介质中的放射性核素反应机制复杂，Po、Pb、Bi 缺少可直接沿用的量化计算方法与基组方案。",
    decision: "围绕关键核素自主摸索计算路径，逐步建立并校验 Po、Pb、Bi 的量化计算方法与基组组合。",
    outcome: "形成了可用于项目研究的 Po、Pb、Bi 量化计算方法与基组方案。",
    evidence: "项目结项报告涉密，不公开展示；此处仅呈现经本人确认的研究范围与结果。",
    tags: ["量子化学", "PBTK", "反应机制"],
    curve: { startEnergy: 40, barrierEnergy: 88, endEnergy: 24, transitionProgress: 0.24 },
  },
  {
    id: "02",
    slug: "create-xiaohongshu-ai-review",
    title: "小红书 AI 产品漫画评测工作流",
    type: "CONTENT AUTOMATION SKILL",
    challenge: "AI 产品评测同时涉及近期选品、事实核验、视觉一致性和逐页配文，单点生成难以稳定交付完整图文包。",
    decision: "把流程拆成选品、视觉确认、联网调研、分镜确认、图片生成和配文六个阶段，并设置人工确认点与固定质量检查。",
    outcome: "沉淀为可复用 Skill，可交付 4–5 张 3:4 漫画图、逐页配文、来源与提示词。",
    evidence: "公开仓库包含完整 SKILL.md、调研规则与图像提示词规范，采用 MIT License。",
    tags: ["AI 产品评测", "内容工作流", "ImageGen"],
    url: "https://github.com/liuliuliu0221/create-xiaohongshu-ai-review",
    curve: { startEnergy: 34, barrierEnergy: 70, endEnergy: 16, transitionProgress: 0.38 },
  },
  {
    id: "03",
    slug: "paper-radar",
    title: "Paper Radar",
    type: "LOCAL-FIRST RESEARCH TOOL",
    challenge: "研究动态分散在不同期刊与主题中，人工检索、筛选和整理邮件摘要需要重复投入。",
    decision: "采用本地优先架构，以 Crossref 检索、SQLite 去重、可解释关键词排序和发送前预览组成闭环。",
    outcome: "完成支持期刊与主题配置、每日/每周 HTML 报告、Streamlit 界面与 CLI 的 Alpha 版本。",
    evidence: "公开仓库提供 Python 源码、测试、配置示例和 0.1.0 Alpha 使用说明。",
    tags: ["Python", "SQLite", "Research Workflow"],
    url: "https://github.com/liuliuliu0221/paper-radar",
    curve: { startEnergy: 48, barrierEnergy: 82, endEnergy: 18, transitionProgress: 0.51 },
  },
  {
    id: "04",
    slug: "woshipm-article-writing-skill",
    title: "人人都是产品经理文章写作 Skill",
    type: "EDITORIAL WORKFLOW SKILL",
    challenge: "长篇 AI 产品文章既要具备鲜明观点，也要保证公开事实可核验，避免虚构经验和无依据结论。",
    decision: "建立从资料检索、选题、提纲到分节写作和终稿审校的阶段化流程，并在关键节点保留人工确认。",
    outcome: "形成可复用的中文长文写作 Skill，并配套 Markdown 检查脚本与参考规范。",
    evidence: "公开仓库提供完整工作流、检查脚本和 MIT License。",
    tags: ["Writing Skill", "事实核验", "Human-in-the-loop"],
    url: "https://github.com/liuliuliu0221/woshipm-article-writing-skill",
    curve: { startEnergy: 32, barrierEnergy: 66, endEnergy: 14, transitionProgress: 0.65 },
  },
  {
    id: "05",
    slug: "drop-todo",
    title: "水滴待办（WaterDropTodo）",
    type: "MACOS PRODUCT",
    challenge: "传统待办列表把截止压力呈现为抽象时间，用户很难持续感知任务的紧迫程度。",
    decision: "将任务映射为 MacBook 刘海下方的液滴，用位置、颜色和生命周期交互表达时间变化，并坚持本地优先。",
    outcome: "完成 0.2.0 版本，覆盖创建、完成花园、逾期废墟、召回、本地持久化和减少动态效果。",
    evidence: "公开仓库提供 SwiftUI、AppKit、Metal 源码，以及 Swift Testing/XCTest 测试。",
    tags: ["SwiftUI", "Local-first", "Time Awareness"],
    url: "https://github.com/liuliuliu0221/drop-todo",
    curve: { startEnergy: 44, barrierEnergy: 86, endEnergy: 20, transitionProgress: 0.78 },
  },
];
