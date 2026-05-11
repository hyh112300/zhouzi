import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/awesome/ai">
            浏览精选资源
          </Link>
          <Link className="button button--secondary button--lg" to="/blog">
            阅读博客
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://zhouzi.icu">
            返回首页 ←
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="肘子香香 — 个人博客与知识库，分享前端技术、开发资源和学习笔记">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>🔥 精选资源</h3>
                <p>汇聚各技术栈优质资源，AI、前端、React、Vue、Node.js 等分类整理</p>
                <Link to="/docs/awesome/ai">浏览 →</Link>
              </div>
              <div className={styles.card}>
                <h3>📖 个人指南</h3>
                <p>常用库推荐、开发环境配置、技术调研笔记</p>
                <Link to="/docs/guide/libraries">浏览 →</Link>
              </div>
              <div className={styles.card}>
                <h3>✍️ 博客</h3>
                <p>技术文章与生活随笔</p>
                <Link to="/blog">浏览 →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
