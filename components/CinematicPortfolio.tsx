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
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
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
    title: "Product Thinking.",
    description: "把模糊问题压缩成清晰、可验证的产品路径。",
    items: ["需求挖掘与定义", "PRD 与用户故事", "竞品与数据研究", "Human-in-the-loop 设计"],
  },
  {
    number: "02",
    title: "Technical Fluency.",
    description: "理解模型与工程边界，让产品决策落到真实约束上。",
    items: ["Python / 数据处理", "机器学习与深度学习", "AI 工作流与 Agent", "本地优先架构"],
  },
  {
    number: "03",
    title: "Research Depth.",
    description: "在高不确定性的研究空间里，持续提出并验证假设。",
    items: ["量子化学与 DFT", "高维构象空间", "反应路径研究", "学术写作与事实核验"],
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

            <div className="hero-topline">
              <span>AI PRODUCT / 2026</span>
              <span>RESEARCH → PRODUCT</span>
            </div>

            <div className="cinematic-copy">
              <div className="hero-title-wrap">
                <motion.p
                  className="hero-intro"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease }}
                >
                  AI Product Manager · Indie Developer
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
                  从量子化学走向 AI 产品，用研究者的严谨与创造者的直觉，
                  在复杂系统中找到更清晰、更低摩擦的路径。
                </p>
                <a className="cinematic-cta" href="#about">
                  <span>走进我的实验室</span>
                  <i aria-hidden="true"><ArrowRight size={16} strokeWidth={1.7} /></i>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="about-new" id="about" aria-labelledby="about-title">
          <div className="about-card">
            <p className="micro-label">ABOUT / CROSS-DISCIPLINARY</p>
            <h2 id="about-title">
              <MultiStyleWords
                segments={[
                  { text: `你好，我是${profile.name}，` },
                  { text: "一名研究复杂系统的", className: "serif-accent" },
                  { text: "AI 产品经理与独立开发者。" },
                ]}
              />
            </h2>

            <div className="about-body-grid">
              <motion.figure
                className="portrait-frame"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease }}
              >
                <Image
                  src={profile.portrait}
                  alt={`${profile.name}的个人照片`}
                  fill
                  sizes="(max-width: 760px) 88vw, 31vw"
                  priority
                />
                <figcaption>
                  <span>PORTRAIT / 001</span>
                  <span>{profile.englishName}</span>
                </figcaption>
              </motion.figure>

              <div className="about-narrative">
                <ScrollRevealText>
                  长期的科研训练让我习惯在高维、模糊且充满约束的空间里拆解问题、验证假设并寻找最优路径。如今，我把同一套思维迁移到 AI 产品：理解技术边界，识别真实需求，再把复杂能力转化为自然、可信、可用的体验。
                </ScrollRevealText>
                <dl className="profile-facts">
                  <div><dt>ROLE</dt><dd>{profile.role}</dd></div>
                  <div><dt>EDUCATION</dt><dd>{profile.education}</dd></div>
                  <div><dt>BACKGROUND</dt><dd>量子化学 / 高维构象空间</dd></div>
                  <div><dt>FOCUS</dt><dd>Human–AI Interaction</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-new noise-field" id="skills" aria-labelledby="skills-title">
          <header className="editorial-heading">
            <p className="micro-label">EXPERTISE / HOW I WORK</p>
            <h2 id="skills-title">
              <MultiStyleWords
                segments={[
                  { text: "Studio-grade thinking for complex AI products." },
                  { text: "Built on evidence. Powered by curiosity.", className: "muted-line" },
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
              <p>From research<br />to product.</p>
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
