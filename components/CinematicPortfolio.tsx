"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Code2, Download, Mail } from "lucide-react";
import { externalPosts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";

const ease = [0.16, 1, 0.3, 1] as const;

function WordsPullUp({ text, className = "", asterisk = false }: { text: string; className?: string; asterisk?: boolean }) {
  const words = text.split(" ");

  return (
    <span className={`words-pull-up ${className}`}>
      {words.map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`}>
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: index * 0.075, ease }}
          >
            {word}
            {asterisk && index === words.length - 1 ? <sup>*</sup> : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MultiStyleWords({ segments }: { segments: Array<{ text: string; className?: string }> }) {
  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, className: segment.className })),
  );

  return (
    <span className="multi-style-words">
      {words.map(({ word, className }, index) => (
        <span className={`word-mask ${className ?? ""}`} key={`${word}-${index}`}>
          <motion.span
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.78, delay: index * 0.065, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedCharacter({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = Math.max(0, index / total - 0.1);
  const end = Math.min(1, index / total + 0.06);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function ScrollRevealText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.86", "end 0.28"] });
  const characters = Array.from(children);

  return (
    <p className="scroll-reveal-copy" ref={ref}>
      {characters.map((char, index) => (
        <AnimatedCharacter
          char={char}
          index={index}
          key={`${char}-${index}`}
          progress={scrollYProgress}
          total={characters.length}
        />
      ))}
    </p>
  );
}

const capabilityCards = [
  {
    number: "01",
    title: "0→1 Product Delivery.",
    description: "从需求洞察到模型验收，推进 AI 产品完整落地链路。",
    items: ["竞品分析与用户研究", "PRD / SDD 可执行规格", "模型评测与效果验收", "2 款产品上线 · 80+ 用户"],
  },
  {
    number: "02",
    title: "AI-Native Building.",
    description: "追踪前沿技术边界，把模型与 Agent 能力转化为实际生产力。",
    items: ["前沿模型能力评估", "Agent 工作流与 Skill", "Vibe Coding 全栈搭建", "自动化提效约 4h/d"],
  },
  {
    number: "03",
    title: "Launch & Growth.",
    description: "不依赖投放，从产品上线到种子用户，再以真实反馈驱动迭代。",
    items: ["自媒体内容触达", "黑客松 / OPC 科技社群", "累计 500+ 早期用户", "测试群反馈与快速迭代"],
  },
];

const aboutAdvantages = [
  {
    number: "01",
    title: "AI 产品 0→1",
    description:
      "覆盖调研、需求定义、模型评测与跨团队上线，并能基于 SDD 和 Vibe Coding 独立完成前后端交付；已上线 2 款产品，服务 80+ 用户，GitHub 开源 10+ 项目。",
  },
  {
    number: "02",
    title: "前沿技术转化",
    description:
      "持续追踪新模型与 Agent 的能力边界，把技术理解沉淀为可复用的开发、运营工作流，个人提效约 4 小时/天。",
  },
  {
    number: "03",
    title: "冷启动与增长闭环",
    description:
      "通过自媒体与科技社群低成本获取种子用户，累计获取 500+ 早期用户，并以测试群反馈驱动快速迭代。",
  },
  {
    number: "04",
    title: "英文一手信息能力",
    description:
      "CET-6、TOEFL 83，可直接阅读英文技术文档、论文与官方 Release Notes，持续跟踪海外开发者社区。",
  },
  {
    number: "05",
    title: "科研式学习与创新",
    description:
      "本科专业第 3、保送至 985 高校攻读硕士；参与核量子化学与国家自然科学基金项目，发表 2 篇 SCI 论文，拥有 2 项专利与 1 项软件著作权。",
  },
];

const contactIcons = { email: Mail, github: Code2, resume: Download } as const;

export function CinematicPortfolio() {
  const resume = profile.contacts.find((contact) => contact.id === "resume");

  return (
    <>
      <main id="main">
        <section className="cinematic-hero" id="home" aria-labelledby="hero-title">
          <div className="cinematic-frame">
            <video className="hero-film" autoPlay loop muted playsInline aria-hidden="true">
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
                type="video/mp4"
              />
            </video>
            <div className="film-wash" aria-hidden="true" />
            <div className="film-noise" aria-hidden="true" />

            <div className="cinematic-copy">
              <div className="hero-title-wrap">
                <motion.p
                  className="hero-intro"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease }}
                >
                  刘芯羽 · AI Product Manager · Indie Developer
                </motion.p>
                <h1 id="hero-title"><WordsPullUp text="Lux" asterisk /></h1>
              </div>
              <motion.div
                className="hero-side-copy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.58, ease }}
              >
                <p>
                  我把量子化学研究中的问题拆解与验证能力，转化为清晰、可信、可用的 AI 产品。
                </p>
                <a className="cinematic-cta" href="#about">
                  <span>了解我的故事</span>
                  <i aria-hidden="true"><ArrowRight size={16} strokeWidth={1.7} /></i>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="about-new" id="about" aria-labelledby="about-title">
          <div className="about-card">
            <p className="micro-label">AI PRODUCT / ABOUT</p>
            <motion.figure
              className="about-portrait"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, ease }}
            >
              <Image
                src="/profile-lux.jpg"
                alt="刘芯羽（Lux）的个人照片"
                fill
                sizes="(max-width: 760px) 66vw, 17rem"
              />
              <figcaption>
                <span>LUX / 2026</span>
                <span>AI PRODUCT BUILDER</span>
              </figcaption>
            </motion.figure>
            <h2 id="about-title">
              <MultiStyleWords
                segments={[
                  { text: `我是${profile.name}，` },
                  { text: "一名兼具产品判断与技术执行力的 AI 产品构建者。", className: "serif-accent" },
                ]}
              />
            </h2>
            <div className="about-story">
              <ScrollRevealText>
                我把研究者的严谨、产品经理的判断与独立构建者的执行力，放进同一条从想法到用户的链路中。
              </ScrollRevealText>
            </div>
            <ol className="about-advantages" aria-label="个人优势">
              {aboutAdvantages.map((advantage, index) => (
                <motion.li
                  key={advantage.number}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.65, delay: index * 0.06, ease }}
                >
                  <span className="advantage-number">{advantage.number}</span>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="expertise-new noise-field" id="skills" aria-labelledby="skills-title">
          <header className="editorial-heading">
            <p className="micro-label">PRODUCT × TECH × GROWTH</p>
            <h2 id="skills-title">
              <MultiStyleWords
                segments={[
                  { text: "From insight to shipped AI products." },
                  { text: "From launch to real user growth.", className: "muted-line" },
                ]}
              />
            </h2>
          </header>

          <div className="capability-cards">
            <motion.article
              className="capability-card capability-film-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, ease }}
            >
              <video autoPlay loop muted playsInline aria-hidden="true">
                <source
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="capability-film-overlay" />
              <p>From idea<br />to real users.</p>
            </motion.article>

            {capabilityCards.map((card, index) => (
              <motion.article
                className="capability-card"
                key={card.number}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, delay: (index + 1) * 0.12, ease }}
              >
                <div className="capability-card-head">
                  <span>{card.number}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}><Check size={13} strokeWidth={1.8} />{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="work-new" id="projects" aria-labelledby="work-title">
          <header className="work-heading">
            <p className="micro-label">SELECTED WORK / 01—05</p>
            <h2 id="work-title"><WordsPullUp text="Ideas, made useful." /></h2>
            <p>从科研方法到内容工作流，再到本地优先的独立产品。每个项目都记录了一次从约束出发的选择。</p>
          </header>

          <div className="work-grid">
            {projects.map((project, index) => (
              <motion.article
                className="work-card"
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease }}
              >
                <header>
                  <span>CASE {project.id}</span>
                  <span>{project.type}</span>
                </header>
                <h3>{project.title}</h3>
                <div className="work-card-copy">
                  <p><small>CHALLENGE</small>{project.challenge}</p>
                  <p><small>DECISION</small>{project.decision}</p>
                  <p><small>OUTCOME</small>{project.outcome}</p>
                </div>
                <footer>
                  <div>{project.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer" aria-label={`在 GitHub 查看${project.title}`}>
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </a>
                  ) : <span className="private-mark">PRIVATE</span>}
                </footer>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="journal-new" id="blog" aria-labelledby="journal-title">
          <header className="journal-heading">
            <p className="micro-label">JOURNAL / FIELD NOTES</p>
            <h2 id="journal-title">
              <MultiStyleWords segments={[
                { text: "观察 AI 世界。" },
                { text: "记录产品背后的机制与判断。", className: "serif-accent" },
              ]} />
            </h2>
          </header>

          <div className="journal-list">
            {externalPosts.map((post, index) => (
              <motion.a
                className="journal-row"
                href={post.url}
                target="_blank"
                rel="noreferrer"
                key={post.code}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.75, delay: index * 0.06, ease }}
              >
                <div className="journal-thumb"><Image src={post.image} alt="" fill sizes="160px" /></div>
                <span className="journal-code">{post.code}</span>
                <div className="journal-copy">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <div className="journal-meta"><span>{post.source}</span><span>{post.publishedAt}</span></div>
                <ArrowUpRight className="journal-arrow" size={21} strokeWidth={1.4} />
              </motion.a>
            ))}
          </div>

          <div className="publication-block">
            <header><p className="micro-label">ACADEMIC PUBLICATIONS</p><span>{publications.length.toString().padStart(2, "0")} VERIFIED RECORDS</span></header>
            <ol>
              {publications.map((publication) => (
                <li key={publication.id}>
                  <span>{publication.id}</span>
                  <div><h3>{publication.title}</h3><p>{publication.authors}</p><small>{publication.venue} · {publication.citation}</small></div>
                  {publication.url ? <a href={publication.url} target="_blank" rel="noreferrer"><ArrowUpRight size={19} strokeWidth={1.4} /></a> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact-new" id="contact" aria-labelledby="contact-title">
          <p className="micro-label">INQUIRIES / LET&apos;S TALK</p>
          <h2 id="contact-title"><WordsPullUp text="Let’s make something useful." /></h2>
          <p className="contact-cn">
            如果你也在思考 AI 产品、复杂系统或新的协作方式，欢迎来聊。也可以在小红书与微信公众号「{profile.publicAccountName}」找到我。
          </p>
          <div className="contact-actions">
            {profile.contacts.map((contact) => {
              const Icon = contactIcons[contact.id as keyof typeof contactIcons] ?? ArrowUpRight;
              return (
                <a
                  href={contact.href}
                  key={contact.id}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noreferrer" : undefined}
                  download={contact.download}
                >
                  <Icon size={17} strokeWidth={1.5} />
                  <span>{contact.shortLabel}</span>
                  <ArrowUpRight size={15} strokeWidth={1.4} />
                </a>
              );
            })}
          </div>

          <footer className="closing-footer">
            <span>{profile.name} / {profile.englishName}</span>
            <span>{profile.role}</span>
            <span>© 2026</span>
          </footer>
          {resume?.placeholder ? <p className="resume-notice">当前下载文件为占位简历，正式发布前请替换。</p> : null}
        </section>
      </main>
    </>
  );
}
