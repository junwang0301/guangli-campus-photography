# 光厘大学生摄影 AI 优化平台

Next.js 静态站点，可部署到 GitHub Pages。包含首页、AI 修图工作台、校园作品、校园取景与项目介绍。

## 阿里云百炼 API Key

GitHub Pages 不能运行服务端函数。此版本由浏览器直接请求阿里云百炼 DashScope 接口，因此 Key 会出现在公开 JavaScript 中，任何访客都能提取。请仅用于个人演示，并在演示结束后立即轮换密钥。

打开 `lib/server-config.ts`，填写：

```ts
export const DASHSCOPE_API_KEY = "YOUR_DASHSCOPE_API_KEY";
export const QWEN_IMAGE_MODEL = "qwen-image-3.0-pro";
export const QWEN_API_BASE = "https://dashscope.aliyuncs.com/api/v1";
```

API Key 需要在阿里云百炼控制台创建，并确认账号已开通千问图像编辑模型和计费额度。

未配置有效 Key 时，站内会自动使用浏览器本地曝光、对比度和饱和度增强作为降级模式。

## 本地运行

```powershell
$env:Path = "C:\Users\13420\.codex\tools\node-v20.20.2-win-x64;$env:Path"
npm install
npm run dev
```

## 验证与静态构建

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

`npm run build` 会生成纯静态目录 `out/`。

## GitHub Pages 部署

仓库包含 `.github/workflows/deploy-pages.yml`。向 `main` 分支推送后：

1. GitHub Actions 自动构建并上传 Pages Artifact。
2. 在仓库 `Settings > Pages` 中将 Source 设为 `GitHub Actions`。
3. 网站地址为 `https://junwang0301.github.io/guangli-campus-photography/`。

## 图片版权

社区与取景页面的演示照片来自 Unsplash，仅作为产品视觉示例；页面已使用“Unsplash 精选”作为来源标识，不冒充具体摄影师或高校作品。

## MVP 边界

不包含账号、数据库、真实发帖、点赞评论、收藏与云端个人相册。图片不会写入服务器磁盘。