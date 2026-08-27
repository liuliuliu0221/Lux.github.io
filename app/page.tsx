import type { Metadata } from "next";
import Image from "next/image";
import { HeroPesExperience } from "@/components/HeroPesExperience";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkillEnergyDiagram } from "@/components/SkillEnergyDiagram";
import { externalPosts } from "@/data/posts";
import { publications } from "@/data/publications";
import { profile } from "@/data/profile";

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
              <p>{profile.role}</p>
            </div>
          </div>

          <HeroPesExperience />

          <p className="scroll-coordinate" aria-hidden="true">
            ENERGY COORDINATE · 1.00
          </p>
        </section>

        <section className="site-section about-section" id="about" aria-labelledby="about-title">
          <div className="about-profile" data-reveal="up">
            <div className="about-profile-visual">
              <Image
                className="about-profile-photo"
                src={profile.portrait}
                alt={`${profile.name}的个人照片`}
                width={675}
                height={900}
                sizes="(max-width: 760px) calc(100vw - 2.5rem), 30vw"
              />
              <span>PROFILE SAMPLE · 001</span>
            </div>

            <div className="about-profile-copy">
              <p className="section-index">02 / ABOUT · WHO I AM</p>
              <span className="about-profile-kicker">{profile.displayName}</span>
              <h2 id="about-title">你好，我是{profile.name}。<small>{profile.englishName}</small></h2>
              <p className="about-profile-summary">
                {profile.description} 我曾在高维化学空间里计算最优解，现在把同一套逻辑用于 AI 产品实践。
              </p>
              <dl className="about-profile-facts">
                <div>
                  <dt>ROLE</dt>
                  <dd>{profile.role}</dd>
                </div>
                <div>
                  <dt>EDUCATION</dt>
                  <dd>{profile.education}</dd>
                </div>
                <div>
                  <dt>BACKGROUND</dt>
                  <dd>量子化学 / 高维构象空间</dd>
                </div>
                <div>
                  <dt>FOCUS</dt>
                  <dd>Human–AI Interaction</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="about-capability-heading" data-reveal="up">
            <p>WHAT I BRING / CAPABILITY</p>
            <div>
              <h3>在技术逻辑与产品思维之间，找到最优解。</h3>
              <p>
                长期的学术训练教会我的不是某个具体知识，而是如何在高度不确定的高维空间里拆解问题、验证假设并找到可行路径。下面是这套能力在产品与技术两侧的体现。
              </p>
            </div>
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
            P01 来自本人确认信息；P02–P05 根据公开 GitHub 仓库整理，不包含未经核验的量化成果。
          </p>
        </section>

        <section className="site-section blog-section" id="blog" aria-labelledby="blog-title">
          <div className="section-heading section-heading-row blog-heading" data-reveal="up">
            <div>
              <p className="section-index">05 / BLOG</p>
              <h2 id="blog-title">用科学视角，观测 AI 世界。</h2>
              <p className="section-lead">
                记录 AI 产品机制、技术趋势与用户信任。点击文章卡片即可前往原发布平台阅读。
              </p>
            </div>
          </div>

          <div className="blog-index-list" aria-label="文章列表">
            {externalPosts.map((post) => (
              <article className="blog-index-card" key={post.code} data-reveal="up">
                <a className="post-visual" href={post.url} target="_blank" rel="noreferrer" aria-label={`阅读《${post.title}》`}>
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) calc(100vw - 2.5rem), 31vw"
                    style={{ objectFit: "contain" }}
                  />
                </a>
                <div className="post-code">
                  <span>{post.code}</span>
                  <div className="post-tags">
                    {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <span className="post-date">{post.publishedAt}</span>
                </div>
                <div className="post-content">
                  <h3><a href={post.url} target="_blank" rel="noreferrer">{post.title}</a></h3>
                  <p>{post.description}</p>
                </div>
                <div className="post-link">
                  <span>{post.source}</span>
                  <a href={post.url} target="_blank" rel="noreferrer">阅读原文 <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>

          <section className="academic-publications" aria-labelledby="publications-title" data-reveal="up">
            <header className="publication-heading">
              <p>ACADEMIC PUBLICATIONS</p>
              <div>
                <h3 id="publications-title">学术发表</h3>
                <span>在此集中展示经过本人确认的论文与学术成果。</span>
              </div>
            </header>

            <ol className="publication-list">
              {publications.map((publication) => (
                <li className={publication.placeholder ? "is-placeholder" : undefined} key={publication.id}>
                  <div className="publication-code">
                    <span>{publication.id}</span>
                    <span>{publication.year}</span>
                  </div>
                  <div>
                    <h4>{publication.title}</h4>
                    <p>{publication.authors}</p>
                    <small>{publication.venue} · {publication.citation}</small>
                  </div>
                  {publication.url ? (
                    <a href={publication.url} target="_blank" rel="noreferrer">查看发表记录 ↗</a>
                  ) : (
                    <span className="publication-status">DATA PENDING</span>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <aside className="blog-discussion" data-reveal="up">
            <div className="blog-discussion-copy">
              <p>CONTINUE THE DISCUSSION</p>
              <h3>观测不止发生在这里。</h3>
              <span>也可以在小红书和微信公众号“{profile.publicAccountName}”继续交流。</span>
            </div>
            <div className="discussion-qr-grid">
              <a
                className="social-qr-card"
                href="https://www.xiaohongshu.com/user/profile/63f4f96f000000000f01239d"
                target="_blank"
                rel="noreferrer"
                aria-label="打开小红书“超级土豆饼儿”主页"
              >
                <span className="xiaohongshu-qr-image" aria-hidden="true" />
                <strong>小红书主页</strong>
                <small>扫码关注“超级土豆饼儿”</small>
              </a>
              <a
                className="social-qr-card"
                href="/wechat-public-account-qr.jpg"
                target="_blank"
                rel="noreferrer"
                aria-label={`查看微信公众号“${profile.publicAccountName}”主页二维码大图`}
              >
                <Image
                  src="/wechat-public-account-qr.jpg"
                  alt={`微信公众号“${profile.publicAccountName}”主页二维码`}
                  width={430}
                  height={430}
                  sizes="(max-width: 760px) 50vw, 176px"
                />
                <strong>微信公众号主页</strong>
                <small>扫码关注“{profile.publicAccountName}”</small>
              </a>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
