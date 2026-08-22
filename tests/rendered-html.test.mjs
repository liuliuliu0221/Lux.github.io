import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(path, "http://localhost"), {
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
  assert.match(html, /id="skills"/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="blog"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /查看 PM 决策日志/);
  assert.match(html, /决策点 · CASE/);
  assert.match(html, /选择技能查看说明/);
  assert.match(html, /这些能级不是静态的/);
  assert.match(html, /我的能力不是来自某一行代码/);
  assert.match(html, /查看我的项目/);
  assert.match(html, /href="\/blog\/dft-to-transformer"/);
  assert.match(html, /http:\/\/localhost:3000\/og\.png/);
  assert.match(html, /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex, nofollow")[^>]*>/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /姓名待补充（内容占位）/);
  assert.match(html, /href="\/resume-placeholder\.pdf"/);
  assert.match(html, /下载占位简历/);
  assert.match(html, /当前姓名、邮箱、外部主页和简历均为功能占位资料/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("renders the blog index and article as independent routes", async () => {
  const [indexResponse, articleResponse] = await Promise.all([
    render("/blog"),
    render("/blog/dft-to-transformer"),
  ]);

  assert.equal(indexResponse.status, 200);
  assert.equal(articleResponse.status, 200);

  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /<title>Observation Log｜PES Explorer<\/title>/);
  assert.match(indexHtml, /CONTENT DRAFT/);
  assert.match(indexHtml, /DFT → AI/);
  assert.match(indexHtml, /CONTINUE THE DISCUSSION/);
  assert.match(indexHtml, /data-scope="global"/);
  assert.match(indexHtml, /href="\/blog\/dft-to-transformer"/);
  assert.match(indexHtml, /http:\/\/localhost:3000\/og\.png/);

  const articleHtml = await articleResponse.text();
  assert.match(
    articleHtml,
    /<title>从 DFT 到 Transformer：归纳偏置的迁移思考｜PES Explorer<\/title>/,
  );
  assert.match(articleHtml, /没有真正“无偏”的模型/);
  assert.match(articleHtml, /内容状态：本文为网站功能验证使用的初稿/);
  assert.match(
    articleHtml,
    /<meta(?=[^>]*property="og:title")(?=[^>]*content="从 DFT 到 Transformer：归纳偏置的迁移思考")[^>]*>/,
  );
  assert.match(
    articleHtml,
    /<meta(?=[^>]*name="twitter:title")(?=[^>]*content="从 DFT 到 Transformer：归纳偏置的迁移思考")[^>]*>/,
  );
  assert.match(articleHtml, /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex, nofollow")[^>]*>/);
  assert.doesNotMatch(articleHtml, /og\.png/);
});

test("serves sitemap and robots metadata routes", async () => {
  const [sitemapResponse, robotsResponse] = await Promise.all([
    render("/sitemap.xml"),
    render("/robots.txt"),
  ]);

  assert.equal(sitemapResponse.status, 200);
  assert.equal(robotsResponse.status, 200);
  assert.doesNotMatch(await sitemapResponse.text(), /blog\/dft-to-transformer/);
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
  assert.match(html, /href="\/blog"/);
});

test("keeps the experience accessible and draft data explicit", async () => {
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
  assert.match(skills, /aria-pressed=/);
  assert.match(skills, /onFocus=/);
  assert.match(projects, /Dialog\.Title/);
  assert.match(projects, /aria-label=\{`查看/);
  assert.match(projects, /onCloseAutoFocus/);
  assert.match(projects, /lastTriggerRef\.current\?\.focus\(\)/);
  assert.match(projectData, /内容草案/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /scroll-margin-top/);
  assert.match(css, /\.site-header \.desktop-nav/);
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
  assert.match(profileData, /replace-me@example\.com/);
  assert.match(profileData, /placeholder: true/);
  assert.match(profileData, /linkedin/);
  assert.match(profileData, /xiaohongshu/);
  assert.match(profileData, /wechat/);
  assert.match(analytics, /resume_download[\s\S]*project_open[\s\S]*contact_click/);
  assert.match(analytics, /pes:analytics/);
  assert.match(errorPage, /pes:client-error/);
  assert.match(enhancements, /--scroll-progress/);
  assert.match(enhancements, /IntersectionObserver/);
  assert.match(enhancements, /pointer-probe-layer/);
  assert.match(enhancements, /pointer-probe-trail/);
  assert.match(enhancements, /data-scope="global"/);
  assert.match(enhancements, /globalCompositeOperation = "lighter"/);
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
