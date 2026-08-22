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
    slug: "reaction-path",
    title: "量子化学反应路径研究",
    type: "RESEARCH SYSTEM",
    challenge: "高精度计算覆盖完整构象空间时，计算成本快速增长。",
    decision: "采用分层计算策略，把高精度资源集中到关键构象与过渡区域。",
    outcome: "形成一条兼顾计算可信度与资源效率的可复用研究路径。",
    evidence: "内容草案：论文与具体计算指标待发布前核验。",
    tags: ["DFT", "反应路径", "计算权衡"],
    curve: {
      startEnergy: 40,
      barrierEnergy: 88,
      endEnergy: 24,
      transitionProgress: 0.34,
    },
  },
  {
    id: "02",
    slug: "active-learning",
    title: "主动学习辅助科研",
    type: "ML WORKFLOW",
    challenge: "有效标注数据稀缺，均匀采样会把大量预算花在低价值区域。",
    decision: "优先选择模型不确定度最高的样本，持续更新训练数据分布。",
    outcome: "把算力与标注投入聚焦到最能改善模型的区域。",
    evidence: "内容草案：代码仓库与模型指标待发布前核验。",
    tags: ["主动学习", "不确定性", "采样策略"],
    curve: {
      startEnergy: 48,
      barrierEnergy: 78,
      endEnergy: 20,
      transitionProgress: 0.52,
    },
  },
  {
    id: "03",
    slug: "ai-product-demo",
    title: "AI 产品 Demo",
    type: "PRODUCT PROTOTYPE",
    challenge: "功能范围扩大后，交互复杂度和交付成本同时上升。",
    decision: "收缩低频能力，围绕单一核心任务建立可演示的闭环。",
    outcome: "以更清晰的价值主张组织 Demo、交互路径与 PRD。",
    evidence: "内容草案：Demo、PRD 与真实用户反馈待发布前补充。",
    tags: ["MVP", "范围管理", "产品闭环"],
    curve: {
      startEnergy: 34,
      barrierEnergy: 70,
      endEnergy: 16,
      transitionProgress: 0.68,
    },
  },
];
