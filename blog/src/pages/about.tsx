import Layout from '@theme/Layout';
import type {ReactNode} from 'react';

export default function About(): ReactNode {
  return (
    <Layout title="关于我" description="肘子香香的个人简介">
      <main style={{maxWidth: 800, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>关于我</h1>

        <h2>👋 你好，我是肘子香香</h2>
        <p>一个热爱技术和生活的开发者。</p>

        <h2>💻 技术栈</h2>
        <ul>
          <li><strong>前端</strong>: React, TypeScript, Vue, Three.js</li>
          <li><strong>后端</strong>: Node.js, Python</li>
          <li><strong>工具</strong>: VS Code, Git, Docker, Nginx</li>
          <li><strong>设计</strong>: Figma, MasterGo</li>
        </ul>

        <h2>🎯 这个网站</h2>
        <p>本站是一个个人技术与生活分享空间，包含：</p>
        <ul>
          <li><strong>首页</strong> — 一个基于 Three.js 的 3D 交互体验</li>
          <li><strong>精选资源</strong> — 整理各技术栈的优质资源</li>
          <li><strong>指南</strong> — 个人笔记与开发实践</li>
          <li><strong>博客</strong> — 技术文章与生活随笔</li>
        </ul>

        <h2>🔗 链接</h2>
        <ul>
          <li><a href="https://github.com/hyh112300" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>

        <hr />
        <p style={{color: 'var(--ifm-color-emphasis-600)', fontSize: '0.9rem'}}>
          本站 ICP 备案号：京ICP备2026025149号
        </p>
      </main>
    </Layout>
  );
}
