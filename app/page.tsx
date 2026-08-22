import type { Metadata } from "next";
import Link from "next/link";
import { HeroPesExperience } from "@/components/HeroPesExperience";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkillEnergyDiagram } from "@/components/SkillEnergyDiagram";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: { absolute: "PES Explorer｜AI 产品经理候选人" },
  description:
    "在技术逻辑与产品思维之间，寻找 Human-AI Interaction 的全局最优解。",
};

const productCraft = [
  {
    title: "需求挖掘与定义",
    description: "从模糊目标中提取用户、场景边界与可验证的成功标准。",
  },
  {
    title: "技术方案权衡",
    description: "在精度、速度与资源约束之间，形成可解释的产品决策。",
  },
  {
    title: "跨角色沟通",
    description: "在工程指标与业务价值之间，建立清楚、可执行的共同语言。",
  },
  {
    title: "数据驱动决策",
    description: "用数据验证假设，让迭代方向建立在证据而非直觉之上。",
  },
];

const technicalDepth = [
  {
    title: "Python 全栈数据处理",
    description: "使用 Pandas、NumPy 构建从原始数据到洞察的处理流程。",
  },
  {
    title: "机器学习建模",
    description: "理解 PyTorch、GNN、主动学习及模型训练与推理过程。",
  },
  {
    title: "量子化学计算",
    description: "具备 DFT、Gaussian、PySCF 与高维构象空间研究经验。",
  },
  {
    title: "系统架构思维",
    description: "能够从计算复杂度、接口和体验共同评估方案可行性。",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <SiteHeader home />

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true">01 / </span>Potential Energy Surface
            </p>
            <h1 id="hero-title">
              Finding the Global Minimum of
              <span> Human-AI Interaction.</span>
            </h1>
            <p className="hero-description">
              我曾在高维化学空间里求解薛定谔方程，现在我在产品空间中寻找最优路径。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#about">
                探索我的势能面 <span aria-hidden="true">↓</span>
              </a>
              <p>AI Product Manager Candidate</p>
            </div>
          </div>

          <HeroPesExperience />

          <p className="scroll-coordinate" aria-hidden="true">
            ENERGY COORDINATE · 1.00
          </p>
        </section>

        <section className="site-section about-section" id="about" aria-labelledby="about-title">
          <div className="section-heading" data-reveal="up">
            <p className="section-index">02 / ABOUT</p>
            <h2 id="about-title">
              我能在技术逻辑与产品思维之间，找到最优解。
            </h2>
            <p className="section-lead">
              7 年学术训练教会我的不是某个具体知识，而是如何在高度不确定的高维空间里找到那个最优解。我把这套能力拆解为产品力与技术力，向你展示。
            </p>
          </div>

          <div className="capability-grid">
            <article className="capability-panel product-panel" data-reveal="from-center-left">
              <div className="panel-heading">
                <p>PRODUCT CRAFT</p>
                <span>产品力</span>
              </div>
              <h3>将模糊的需求，转化为可执行的路径。</h3>
              <ul>
                {productCraft.map((item) => (
                  <li key={item.title}>
                    <span aria-hidden="true">+</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="panel-closer">
                我做的每一个产品决策，本质上都是一条低能量路径——让用户用最少的认知摩擦达成目标。
              </p>
            </article>

            <div className="bridge" aria-hidden="true">
              <span className="atom-symbol">⚛︎</span>
              <i />
            </div>

            <article className="capability-panel technical-panel" data-reveal="from-center-right">
              <div className="panel-heading">
                <p>TECHNICAL DEPTH</p>
                <span>技术力</span>
              </div>
              <h3>理解模型底层原理，用代码将想法变为现实。</h3>
              <ul>
                {technicalDepth.map((item) => (
                  <li key={item.title}>
                    <span aria-hidden="true">+</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="panel-closer">
                我把求解物理问题的思维框架，迁移到了产品决策中。
              </p>
            </article>
          </div>

          <div className="about-closure" data-reveal="up">
            <p className="bridge-copy">核心价值——填平技术与产品之间的鸿沟。</p>
            <blockquote>“我的能力不是来自某一行代码，而是来自在高维空间里寻找最优解的本能。”</blockquote>
            <a className="section-cta" href="#projects">查看我的项目 <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="site-section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading section-heading-row" data-reveal="up">
            <div>
              <p className="section-index">03 / SKILLS</p>
              <h2 id="skills-title">技能能级图</h2>
            </div>
            <p className="section-lead">
              从产品方法论到量子化学计算，一组仍在持续跃迁的能力能级。
            </p>
          </div>

          <SkillEnergyDiagram />
          <p className="data-note">
            注：掌握深度与 eV 为个人自评和视觉隐喻，正式发布前将结合真实项目证据复核。
          </p>
          <p className="section-closing" data-reveal="up">
            这些能级不是静态的。我正在向“AI 系统设计”和“产品增长策略”的更高能级跃迁。
          </p>
        </section>

        <section className="site-section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading section-heading-row" data-reveal="up">
            <div>
              <p className="section-index">04 / PROJECTS</p>
              <h2 id="projects-title">低能量路径，不是偶然。</h2>
            </div>
            <p className="section-lead">
              每个项目都经历过一座能量壁垒。真正重要的是如何识别约束、做出取舍并抵达结果。
            </p>
          </div>

          <ProjectsExplorer />
          <p className="data-note">
            当前项目文案为基于设计方案整理的内容草案，不包含未经核验的论文或量化成果。
          </p>
        </section>

        <section className="site-section blog-section" id="blog" aria-labelledby="blog-title">
          <div className="section-heading section-heading-row" data-reveal="up">
            <div>
              <p className="section-index">05 / OBSERVATION LOG</p>
              <h2 id="blog-title">用科学视角，观测 AI 世界。</h2>
            </div>
            <p className="section-lead">
              从学术迁移、技术拆解与产品决策三个方向记录观察。当前文章为功能验证初稿，正式发布前仍需作者复核。
            </p>
          </div>

          <div className="post-list" data-reveal="up">
            {posts.map((post) => (
              <article className="post-row" key={post.code}>
                <span>{post.code}</span>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.tags.join(" / ")}</p>
                <Link className="post-status" href={`/blog/${post.slug}`}>READ ↗</Link>
              </article>
            ))}
          </div>
          <Link className="blog-index-link" href="/blog">查看全部观测日志 →</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
