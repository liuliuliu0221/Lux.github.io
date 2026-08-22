export type Skill = {
  id: string;
  name: string;
  depth: number;
  rarity: number;
  uncertainty: number;
  detail: string;
  energy: string;
  evidence: string;
};

export const skills: Skill[] = [
  {
    id: "product-method",
    name: "AI 产品方法论",
    depth: 70,
    rarity: 58,
    uncertainty: 6,
    detail: "需求分析 · PRD · 竞品调研 · 用户故事",
    energy: "Ea 1.4 eV",
    evidence: "通过 AI 产品 Demo 的需求收敛和核心闭环设计持续验证。",
  },
  {
    id: "python-data",
    name: "Python / 数据处理",
    depth: 85,
    rarity: 66,
    uncertainty: 4,
    detail: "Pandas · NumPy · 数据可视化 · 数据管线",
    energy: "Ea 1.8 eV",
    evidence: "用于科研数据清洗、计算结果分析与模型训练数据准备。",
  },
  {
    id: "machine-learning",
    name: "机器学习 / 深度学习",
    depth: 75,
    rarity: 72,
    uncertainty: 6,
    detail: "PyTorch · GNN · 主动学习 · 模型评估",
    energy: "Ea 2.0 eV",
    evidence: "通过主动学习工作流理解训练、采样与推理之间的反馈循环。",
  },
  {
    id: "quantum-chemistry",
    name: "量子化学计算",
    depth: 80,
    rarity: 91,
    uncertainty: 5,
    detail: "DFT · Gaussian · PySCF · 反应路径",
    energy: "Ea 2.6 eV",
    evidence: "来自高维构象空间、过渡态与反应路径问题的长期研究训练。",
  },
  {
    id: "cross-domain",
    name: "跨领域沟通",
    depth: 90,
    rarity: 84,
    uncertainty: 4,
    detail: "技术翻译 · 结构化表达 · 多角色协作",
    energy: "Ea 2.3 eV",
    evidence: "把技术约束翻译为产品选择，也把业务目标转化为工程问题。",
  },
];
