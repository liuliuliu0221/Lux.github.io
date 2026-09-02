# Lux Portfolio

刘芯羽（Lux）的个人作品集。页面采用深色电影感与暖奶油色视觉系统，展示个人介绍、AI 产品能力、代表项目、文章、学术论文与联系方式。

## 本地运行

环境要求：Node.js >= 22.13。

```bash
npm ci
npm run dev
```

默认地址为 `http://localhost:3000/`；如果端口已被占用，开发服务会自动使用下一个可用端口。

## 质量检查

```bash
npm run typecheck
npm run lint
npm run build
node --test tests/rendered-html.test.mjs
```

## 环境变量

- `NEXT_PUBLIC_SITE_URL`：正式站点地址。
- `NEXT_PUBLIC_SITE_ENV=preview`：保持全站 `noindex`。
- `NEXT_PUBLIC_SITE_ENV=production`：允许搜索引擎索引，仅在内容和正式域名确认后使用。

## 内容状态

姓名、教育经历、项目、文章、论文与联系入口均来自当前项目中的已确认资料。下载简历仍为占位文件，正式公开前需要替换。
