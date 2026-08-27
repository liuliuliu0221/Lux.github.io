import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const requestPath =
    path !== "/" && !path.endsWith("/") && !path.split("/").at(-1)?.includes(".")
      ? `${path}/`
      : path;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(requestPath, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the interactive PES Explorer homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>PES Explorer｜AI 产品经理候选人<\/title>/i);
  assert.match(html, /Finding the Global Minimum of/);
  assert.match(html, /STATIC PES \/ READY/);
  assert.match(html, /class="global-contours"/);
  assert.match(html, /class="scroll-energy-axis"/);
  assert.match(html, /data-scope="global"/);
  assert.match(html, /id="about"/);
  assert.match(html, /02 \/ ABOUT · WHO I AM/);
  assert.match(html, /你好，我是(?:<!-- -->)?刘芯羽/);
  assert.match(html, /WHAT I BRING \/ CAPABILITY/);
  assert.match(html, /BACKGROUND/);
  assert.match(html, /Human–AI Interaction/);
  assert.match(html, /我曾在高维化学空间里计算最优解，现在把同一套逻辑用于 AI 产品实践/);
  assert.doesNotMatch(html, /我曾在高维化学空间里求解问题/);
  assert.match(html, /id="skills"/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="blog"/);
  assert.match(html, /05 \/ BLOG/);
  assert.match(html, /href="#blog"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /查看 PM 决策日志/);
  assert.match(html, /决策点 · CASE/);
  assert.match(html, /选择技能查看说明/);
  assert.match(html, /这些能级不是静态的/);
  assert.match(html, /我的能力不是来自某一行代码/);
  assert.match(html, /查看我的项目/);
  assert.match(html, /href="https:\/\/www\.woshipm\.com\/ai\/6451657\.html"/);
  assert.match(html, /核反应堆氩气介质中物质反应机制/);
  assert.match(html, /水滴待办/);
  assert.match(html, /posts\/ai-memory-forgetting\.png/);
  assert.match(html, /ACADEMIC PUBLICATIONS/);
  assert.match(html, /PUB\.001/);
  assert.match(html, /PUB\.002/);
  assert.match(html, /Effects of Winter Heating on Urban Black Carbon/);
  assert.match(html, /10\.3390\/atmos13071071/);
  assert.match(html, /Nitric acid-enhanced iodine oxoacids nucleation/);
  assert.match(html, /10\.1016\/j\.atmosenv\.2026\.122119/);
  assert.doesNotMatch(html, /DATA PENDING|论文发表信息待补充/);
  assert.match(html, /CONTINUE THE DISCUSSION/);
  assert.match(html, /小红书主页/);
  assert.match(html, /wechat-public-account-qr\.jpg/);
  assert.match(html, /微信公众号[^<]*主页二维码/);
  assert.match(html, /http:\/\/localhost:3000\/og\.png/);
  assert.match(html, /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex, nofollow")[^>]*>/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /刘芯羽/);
  assert.match(html, /AI PM \* Indie Developer/);
  assert.match(html, /大连理工大学（985）硕士/);
  assert.match(html, /profile-lux\.jpg/);
  assert.match(html, /PERSONAL ID \/ PES EXPLORER/);
  assert.match(html, /CONTACT COORDINATE · 001/);
  assert.match(html, /PULL DOWN/);
  assert.match(html, /保持好奇，把想法变成可用的产品。/);
  assert.doesNotMatch(html, /姓名待补充|所在城市待补充|7 年学术训练/);
  assert.match(html, /href="\/resume-placeholder\.pdf"/);
  assert.match(html, /下载占位简历/);
  assert.match(html, /当前简历仍为功能占位文件/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("keeps Blog inside the homepage and removes standalone Blog routes", async () => {
  const [indexResponse, articleResponse] = await Promise.all([
    render("/blog"),
    render("/blog/dft-to-transformer"),
  ]);

  assert.equal(indexResponse.status, 404);
  assert.equal(articleResponse.status, 404);

  for (const response of [indexResponse, articleResponse]) {
    const html = await response.text();
    assert.match(html, /404 \/ COORDINATE NOT FOUND/);
    assert.match(html, /href="\/#blog"/);
  }
});

test("serves sitemap and robots metadata routes", async () => {
  const [sitemapResponse, robotsResponse] = await Promise.all([
    render("/sitemap.xml"),
    render("/robots.txt"),
  ]);

  assert.equal(sitemapResponse.status, 200);
  assert.equal(robotsResponse.status, 200);
  const sitemapText = await sitemapResponse.text();
  assert.doesNotMatch(sitemapText, /\/blog/);
  const robotsText = await robotsResponse.text();
  assert.match(robotsText, /Disallow: \//);
  assert.match(robotsText, /Sitemap: http:\/\/localhost:3000\/sitemap\.xml/);
});

test("renders a branded not-found route", async () => {
  const response = await render("/coordinate-not-found");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /404 \/ COORDINATE NOT FOUND/);
  assert.match(html, /这组坐标不在当前势能面上/);
  assert.match(html, /href="\/#blog"/);
});

test("keeps the experience accessible and verified data explicit", async () => {
  const [home, skills, projects, projectData, css, packageJson, pesLoader, pesScene, envExample, manifestText, profileData, analytics, errorPage, enhancements] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SkillEnergyDiagram.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/ProjectsExplorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../data/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../components/HeroPesExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/PesScene.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/.vite/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../data/profile.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/analytics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/error.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/ExperienceEnhancements.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(home, /<main id="main">/);
  assert.match(home, /aria-labelledby="hero-title"/);
  assert.match(home, /about-profile[\s\S]*?about-profile-facts[\s\S]*?about-capability-heading[\s\S]*?capability-grid/);
  assert.match(home, /id="blog-title">[\s\S]*?className="section-lead"/);
  assert.match(home, /className="post-code"[\s\S]*?className="post-tags"[\s\S]*?className="post-date"/);
  assert.match(skills, /aria-pressed=/);
  assert.match(skills, /viewBox="0 0 1000 250"/);
  assert.match(skills, /return 348 - skill\.rarity \* 3/);
  assert.doesNotMatch(skills, /\[70, 140, 210, 280, 350\]/);
  assert.match(skills, /onFocus=/);
  assert.match(projects, /Dialog\.Title/);
  assert.match(projects, /aria-label=\{`查看/);
  assert.match(projects, /onCloseAutoFocus/);
  assert.match(projects, /lastTriggerRef\.current\?\.focus\(\)/);
  assert.match(projects, /projects\.map\(\(project, index\) => \(/);
  assert.match(projects, /className=\{`reaction-path reaction-path-\$\{index \+ 1\}`\}/);
  assert.match(projectData, /id: "05"/);
  assert.match(projectData, /create-xiaohongshu-ai-review/);
  assert.match(projectData, /项目结项报告涉密，不公开展示/);
  assert.doesNotMatch(projectData, /内容草案/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /scroll-margin-top/);
  assert.match(css, /\.site-header \.desktop-nav/);
  assert.match(css, /\.blog-heading\s*\{[\s\S]*?display:\s*block;[\s\S]*?max-width:\s*none;/);
  assert.match(css, /\.blog-index-list\s*\{[\s\S]*?margin-top:\s*clamp\(4rem, 6vw, 6rem\);/);
  assert.match(css, /\.about-profile\s*\{[\s\S]*?grid-template-columns:\s*minmax\(16rem, 0\.34fr\) minmax\(0, 1fr\)/);
  assert.match(css, /\.about-profile-copy h2\s*\{[\s\S]*?max-width:\s*none;[\s\S]*?white-space:\s*nowrap;/);
  assert.match(css, /\.about-profile-copy h2 small\s*\{[\s\S]*?display:\s*block;/);
  assert.match(css, /\.about-profile-facts\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(css, /\.about-capability-heading\s*\{[\s\S]*?margin-top:\s*clamp\(5rem, 9vw, 9rem\)/);
  assert.match(css, /\.blog-heading h2\s*\{[\s\S]*?white-space:\s*nowrap;/);
  assert.match(css, /\.blog-index-card\s*\{[\s\S]*?grid-template-columns:\s*minmax\(17rem, 31%\) minmax\(0, 1fr\)/);
  assert.match(css, /\.blog-index-card > :not\(\.post-visual\)\s*\{[\s\S]*?width:\s*100%;[\s\S]*?justify-self:\s*stretch;/);
  assert.match(css, /\.blog-index-card > div > p\s*\{[\s\S]*?max-width:\s*none;/);
  assert.match(css, /\.discussion-qr-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(home, /withBasePath\("\/xiaohongshu-profile-qr\.jpg"\)/);
  assert.match(css, /\.xiaohongshu-qr-image\s*\{[\s\S]*?background-repeat:\s*no-repeat/);
  assert.match(css, /\.post-visual\s*\{[\s\S]*?aspect-ratio:\s*16 \/ 9;[\s\S]*?align-self:\s*center;/);
  assert.match(css, /\.identity-badge-main\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.identity-badge\s*\{[\s\S]*?border-radius:\s*clamp\(1\.15rem, 2vw, 1\.8rem\)/);
  assert.match(css, /\.identity-badge-front\s*\{[\s\S]*?background:\s*#ece9df/);
  assert.match(css, /\.identity-badge-back\s*\{[\s\S]*?background:\s*#12372f/);
  assert.match(css, /\.identity-badge-back button\s*\{[\s\S]*?white-space:\s*nowrap;/);
  assert.match(css, /\.identity-badge-flipper\s*\{[\s\S]*?transition:\s*transform 900ms/);
  assert.match(css, /\.identity-badge\[data-flipped="true"\] \.identity-badge-flipper\s*\{[\s\S]*?rotateY\(180deg\)/);
  assert.match(css, /\.contact-identity\s*\{[\s\S]*?background:\s*#12372f/);
  assert.match(css, /\.identity-badge-header\s*\{[\s\S]*?background:\s*#12372f/);
  assert.match(css, /\.identity-badge-footer\s*\{[\s\S]*?background:\s*#12372f/);
  assert.match(css, /\.contact-links\s*\{[\s\S]*?gap:\s*0\.65rem/);
  assert.match(css, /\.contact-links strong\s*\{[\s\S]*?overflow-wrap:\s*anywhere;/);
  assert.match(css, /\.reaction-chart svg\s*\{[\s\S]*?inset:\s*0;[\s\S]*?width:\s*100%;[\s\S]*?height:\s*100%;/);
  assert.match(css, /\.reaction-path-4\s*\{\s*stroke:\s*#43c8cf;\s*\}/);
  assert.match(css, /\.reaction-path-5\s*\{\s*stroke:\s*#4f83d9;\s*\}/);
  assert.match(css, /\.reaction-node\s*\{[\s\S]*?transform:\s*translate\(-50%, -0\.45rem\)/);
  assert.match(css, /\.elastic-lanyard\s*\{[\s\S]*?height:\s*var\(--lanyard-length\)/);
  assert.match(css, /\.elastic-pull-cue\s*\{[\s\S]*?animation:\s*pull-cue-drop 1\.8s ease-in-out infinite/);
  assert.match(css, /\.elastic-pull-cue i::after\s*\{[\s\S]*?rotate\(45deg\)/);
  assert.match(css, /\.elastic-lanyard\s*\{[\s\S]*?width:\s*1\.55rem;[\s\S]*?var\(--lanyard-texture\)/);
  assert.match(css, /background-blend-mode:\s*screen, normal/);
  assert.match(css, /--lanyard-length:\s*114px/);
  assert.match(css, /\.elastic-badge-rig\s*\{[\s\S]*?margin:\s*clamp\(1\.5rem, 3vw, 3rem\) auto 0/);
  assert.match(css, /background-repeat:\s*no-repeat space, no-repeat/);
  assert.match(css, /\.identity-badge-clip::before\s*\{[\s\S]*?border-radius:\s*50%/);
  assert.match(css, /grid-template-areas:[\s\S]*?"visual code"[\s\S]*?"visual content"[\s\S]*?"visual link"/);
  assert.match(pesLoader, /import\("@\/components\/PesScene"\)/);
  assert.match(pesLoader, /prefers-reduced-motion: reduce/);
  assert.match(pesLoader, /saveData/);
  assert.match(pesLoader, /IntersectionObserver/);
  assert.match(pesLoader, /visibilitychange/);
  assert.match(pesLoader, /deferUntilIntent/);
  assert.match(pesLoader, /pointerdown/);
  assert.match(pesLoader, /pointermove/);
  assert.match(pesLoader, /LIVE PES \/ POINTER PROBE/);
  assert.doesNotMatch(pesLoader, /pointer-probe-layer|pointer-probe-trail/);
  assert.match(pesScene, /onFirstFrame/);
  assert.match(pesScene, /requestAnimationFrame/);
  assert.match(pesScene, /setPointer/);
  assert.match(pesScene, /radiusSquared \* radiusSquared - \(scaledX \* scaledX - scaledY \* scaledY\)/);
  assert.match(pesScene, /gaussianFeature/);
  assert.match(pesScene, /centralRidge[\s\S]*reactantBasin[\s\S]*productBasin/);
  assert.match(pesScene, /multi-basin-saddle/);
  assert.doesNotMatch(pesScene, /SphereGeometry|chooseMonteCarloStep|trailGeometry/);
  assert.match(envExample, /NEXT_PUBLIC_ENABLE_PES_3D=true/);
  assert.match(packageJson, /"three"/);
  assert.match(profileData, /13478454399@163\.com/);
  assert.match(profileData, /github\.com\/liuliuliu0221/);
  assert.match(profileData, /xiaohongshu\.com\/user\/profile\/63f4f96f000000000f01239d/);
  assert.doesNotMatch(profileData, /replace-me@example\.com|linkedin\.com\/jobs/);
  assert.match(profileData, /placeholder: true/);
  assert.match(profileData, /linkedin/);
  assert.match(profileData, /xiaohongshu/);
  assert.match(profileData, /wechat/);
  assert.doesNotMatch(profileData, /scholar/i);
  assert.match(analytics, /resume_download[\s\S]*project_open[\s\S]*contact_click/);
  assert.match(analytics, /pes:analytics/);
  assert.match(errorPage, /pes:client-error/);
  assert.match(enhancements, /--scroll-progress/);
  assert.match(enhancements, /IntersectionObserver/);
  assert.match(enhancements, /pointer-probe-layer/);
  assert.match(enhancements, /pointer-probe-trail/);
  assert.match(enhancements, /data-scope="global"/);
  assert.match(enhancements, /globalCompositeOperation = "lighter"/);
  const elasticBadge = await readFile(new URL("../components/ElasticIdentityBadge.tsx", import.meta.url), "utf8");
  assert.match(elasticBadge, /setPointerCapture/);
  assert.match(elasticBadge, /requestAnimationFrame/);
  assert.match(elasticBadge, /prefers-reduced-motion: reduce/);
  assert.match(elasticBadge, /--badge-tilt-x/);
  assert.match(elasticBadge, /--badge-tilt-y/);
  assert.match(elasticBadge, /nextY >= 88/);
  assert.match(elasticBadge, /springHome\(flipAfterReturn\)/);
  assert.match(elasticBadge, /if \(flipAfterReturn\) setFlipped\(\(current\) => !current\)/);
  assert.match(elasticBadge, /setFlipped\(\(current\) => !current\)/);
  assert.match(css, /contour-drift/);
  assert.match(css, /data-reveal/);
  assert.match(css, /\.pointer-probe-layer/);
  assert.match(css, /html\.has-pointer-probe/);
  assert.match(css, /opacity:\s*0\.34/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);

  const manifest = JSON.parse(manifestText);
  assert.deepEqual(manifest["components/HeroPesExperience.tsx"].dynamicImports, ["components/PesScene.ts"]);
  assert.equal(manifest["virtual:vinext-app-browser-entry"].imports.includes("components/PesScene.ts"), false);
});
