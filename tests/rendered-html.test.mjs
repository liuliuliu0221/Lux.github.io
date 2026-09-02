import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const requestPath = path !== "/" && !path.endsWith("/") && !path.split("/").at(-1)?.includes(".") ? `${path}/` : path;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(requestPath, "http://localhost"), { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the cinematic Lux portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>Lux｜AI Product Manager · Indie Developer<\/title>/i);
  assert.match(html, /AI Product Manager · Indie Developer/);
  assert.match(html, /了解我的故事/);
  assert.match(html, /class="hero-film"/);
  assert.match(html, /autoPlay="" loop="" muted="" playsInline=""/);
  assert.match(html, /id="about"/);
  assert.match(html, /我是刘芯羽/);
  assert.match(html, /Human–AI Interaction/);
  assert.match(html, /id="skills"/);
  assert.match(html, /Product Thinking/);
  assert.match(html, /Technical Fluency/);
  assert.match(html, /Research Depth/);
  assert.match(html, /id="projects"/);
  assert.match(html, />Ideas,</);
  assert.match(html, />made</);
  assert.match(html, />useful\.</);
  assert.match(html, /核反应堆氩气介质中物质反应机制/);
  assert.match(html, /水滴待办/);
  assert.match(html, /id="blog"/);
  assert.match(html, /AI越懂你，为什么越容易答错/);
  assert.match(html, /ACADEMIC PUBLICATIONS/);
  assert.match(html, /PUB\.001/);
  assert.match(html, /PUB\.002/);
  assert.match(html, /10\.3390\/atmos13071071/);
  assert.match(html, /10\.1016\/j\.atmosenv\.2026\.122119/);
  assert.match(html, /id="contact"/);
  assert.match(html, /超级土豆饼/);
  assert.match(html, /href="mailto:13478454399@163\.com/);
  assert.match(html, /github\.com\/liuliuliu0221/);
  assert.match(html, /xiaohongshu\.com\/user\/profile\/63f4f96f000000000f01239d/);
  assert.match(html, /href="\/resume-placeholder\.pdf"/);
  assert.match(html, /当前下载文件为占位简历/);
  assert.match(html, /http:\/\/localhost:3000\/og\.png/);
  assert.match(html, /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex, nofollow")[^>]*>/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.doesNotMatch(html, /PES Explorer|STATIC PES|ENERGY COORDINATE|DALIAN · CHINA/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
});

test("keeps content on the homepage and rejects old standalone routes", async () => {
  const [blogResponse, articleResponse] = await Promise.all([render("/blog"), render("/blog/dft-to-transformer")]);
  for (const response of [blogResponse, articleResponse]) {
    assert.equal(response.status, 404);
    const html = await response.text();
    assert.match(html, /404 \/ LOST FRAME/);
    assert.match(html, /这一幕不在/);
    assert.match(html, /href="\/#blog"/);
  }
});

test("serves sitemap and robots metadata routes", async () => {
  const [sitemapResponse, robotsResponse] = await Promise.all([render("/sitemap.xml"), render("/robots.txt")]);
  assert.equal(sitemapResponse.status, 200);
  assert.equal(robotsResponse.status, 200);
  assert.doesNotMatch(await sitemapResponse.text(), /\/blog/);
  const robotsText = await robotsResponse.text();
  assert.match(robotsText, /Disallow: \//);
  assert.match(robotsText, /Sitemap: http:\/\/localhost:3000\/sitemap\.xml/);
});

test("keeps the redesign responsive, accessible, and evidence-based", async () => {
  const [portfolio, css, packageJson, profileData, projectData, layout, og] = await Promise.all([
    readFile(new URL("../components/CinematicPortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../data/profile.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(portfolio, /<main id="main">/);
  assert.match(portfolio, /aria-labelledby="hero-title"/);
  assert.match(portfolio, /useScroll/);
  assert.match(portfolio, /useTransform/);
  assert.match(portfolio, /whileInView/);
  assert.match(portfolio, /prefers-reduced-motion|viewport=\{\{ once: true/);
  assert.match(portfolio, /lucide-react/);
  assert.match(packageJson, /"framer-motion"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.match(css, /family=Almarai/);
  assert.match(css, /Instrument\+Serif/);
  assert.match(css, /feTurbulence/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /grid-template-columns:\s*repeat\(4/);
  assert.match(css, /--cream:\s*#e1e0cc/);
  assert.match(css, /--primary:\s*#dedbc8/);
  assert.match(profileData, /name: "刘芯羽"/);
  assert.match(profileData, /englishName: "Lux"/);
  assert.match(profileData, /education: "大连理工大学（985）硕士"/);
  assert.match(profileData, /13478454399@163\.com/);
  assert.match(profileData, /github\.com\/liuliuliu0221/);
  assert.match(profileData, /placeholder: true/);
  assert.match(projectData, /id: "05"/);
  assert.match(projectData, /项目结项报告涉密，不公开展示/);
  assert.match(layout, /Lux — AI Product Manager · Indie Developer/);
  assert.ok(og.byteLength > 100_000);
});
