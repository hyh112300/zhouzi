import { defineConfig } from 'vitepress'

const SITE_TITLE = '肘子'
const SITE_URL = 'https://zhouzi.icu'
const BLOG_URL = `${SITE_URL}/blog`

export default defineConfig({
  title: '肘子博客',
  description:
    '前端工程、创意编程、AI 与技术的思考与实践。',
  lang: 'zh-CN',
  base: '/blog/',

  head: [
    ['link', { rel: 'canonical', href: BLOG_URL }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: '肘子博客' }],
    ['meta', { property: 'og:url', content: BLOG_URL }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '肘子博客' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          '前端工程、创意编程、AI 与技术的思考与实践。',
      },
    ],
  ],

  sitemap: {
    hostname: BLOG_URL,
  },

  themeConfig: {
    siteTitle: SITE_TITLE,
    logo: false,

    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '标签', link: '/tags' },
      { text: '归档', link: '/archive' },
      {
        text: '主站',
        link: 'https://zhouzi.icu',
      },
    ],

    sidebar: {
      '/posts/': [
        {
          text: '最新文章',
          items: [
            { text: '用 R3F 构建 3D 体验', link: '/posts/building-3d-experiences' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hyh112300' },
    ],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
      },
    },

    footer: {
      message: '© 2026 肘子. 京ICP备2026025149号',
      copyright: 'Built with VitePress',
    },

    outline: {
      level: [2, 3],
    },

    lastUpdated: true,
  },

  markdown: {
    image: {
      lazyLoading: true,
    },
    math: true,
  },
})
