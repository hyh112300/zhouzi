# zhouzi.icu — 肘子香香的个人站

> 3D 交互首页 + 博客 & 知识库

## 快速开始

```bash
# 安装依赖 & 启动
cd landing && npm install && npm run dev    # 首页 http://localhost:5173
cd blog   && npm install && npm run start   # 博客 http://localhost:3000
```

## 构建

```bash
cd landing && npm run build   # → landing/dist/
cd blog   && npm run build    # → blog/build/
```

## 项目结构

```
landing/    3D 首页 (Vite + Three.js + GSAP)
blog/       Docusaurus 博客 + 精选资源 + 指南
nginx/      Nginx 配置
```
