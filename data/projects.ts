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
  tone?: "reactor";
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
    tone: "reactor",
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
    slug: "productwoc",
    title: "ProductWoc",
    type: "LOCAL-FIRST AI DEVELOPMENT",
    challenge: "AI 编程流程容易丢失上下文，模型变更、代码补丁与验证证据难以追踪，失败后也缺少安全恢复路径。",
    decision: "构建本地优先的 Planning → Development 工作流，以不可变快照、人工审批、受控 Patch、Evidence 与回滚机制约束 Agent 执行。",
    outcome: "完成 Web 与 CLI 双端、断点恢复和多模型路由；通过 Gate G3、308 项测试与 15 项构建，并以 MIT 协议开源。",
    evidence: "公开仓库包含架构决策、质量门禁、安全策略与完整验证报告。",
    tags: ["Agent Workflow", "Local-first", "Evidence & Recovery"],
    url: "https://github.com/liuliuliu0221/ProductWoc",
    curve: { startEnergy: 36, barrierEnergy: 78, endEnergy: 15, transitionProgress: 0.66 },
  },
  {
    id: "05",
    slug: "drop-todo",
    title: "WaterDropTodo",
    type: "MACOS PRODUCT",
    challenge: "传统待办工具聚焦任务记录与状态管理，完成后的反馈较弱，用户难以持续感知长期积累与成就感。",
    decision: "围绕“完成任务—即时反馈—花园成长—持续使用”设计核心循环，独立完成 macOS 客户端、成长收集体系、本地持久化与分阶段版本交付。",
    outcome: "完成 4 个阶段迭代，从 1.0 升级至 5.0，落地 8 项核心能力；用户周均使用 5 天，次日留存率 50%，版本更新后活跃度提升 20%。",
    evidence: "完成 16 种花朵、5 档稀有度与 3 级花池设计，并通过 5,000 次任务事件和性能测试验证。",
    tags: ["SwiftUI", "Growth Loop", "Local-first"],
    url: "https://waterdroptodo.cn",
    curve: { startEnergy: 44, barrierEnergy: 86, endEnergy: 20, transitionProgress: 0.78 },
  },
];
