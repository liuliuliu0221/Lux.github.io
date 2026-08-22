# PES Explorer

个人作品集网站，以势能面探索为核心视觉隐喻，展示产品能力、技术能力、项目决策和文章。

当前完成第三阶段的工程实现：响应式主页、交互式 Skills/Projects 图形、项目决策日志、Blog、SEO，以及按需加载并可自动降级的 3D PES。网站默认按 Preview 环境构建，不会被搜索引擎收录。

当前还包括集中式占位资料、可下载占位简历、联系入口、本地行为事件接口、404 与客户端错误恢复页。桌面端会自动延迟加载 3D；移动端先展示静态 poster，在首次交互后才加载低质量 3D，以保护首屏性能。

## 本地运行

环境要求：Node.js >= 22.13。

```bash
npm ci
npm run dev
```

本地地址默认为 `http://localhost:3000/`。

复制 `.env.example` 后可调整环境：

- `NEXT_PUBLIC_ENABLE_PES_3D=false`：紧急关闭 3D，只保留静态 poster。
- `NEXT_PUBLIC_SITE_ENV=preview`：保持全站 `noindex`。
- `NEXT_PUBLIC_SITE_ENV=production`：仅在内容全部核验且正式域名已配置后使用。

## 质量检查

```bash
npm run lint
npm run typecheck
npm test
```

## 内容状态

页面中的个人姓名、正式联系方式、PDF 简历和项目量化成果仍待提供。当前所有模拟资料都明确标为“内容占位”或“内容草案”；首篇文章也标记为功能验证初稿。替换并核验这些内容之前，不应切换到 Production 或公开发布。

## 当前质量基线

- lint、typecheck、Production build 和 5 项自动测试通过。
- 桌面 1440 × 900、移动 375 × 812 浏览器流程通过。
- Lighthouse 移动端本地 Production：Performance 76、Accessibility 100、Best Practices 96、SEO 66、LCP 4.2 s、TBT 220 ms、CLS 0。
- SEO 分数受 Preview `noindex` 影响；Performance 与 LCP 尚未达到 MVP 目标，需在正式部署和真实设备上继续优化与复测。
