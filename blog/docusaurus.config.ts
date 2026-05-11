import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '肘子香香',
  tagline: '个人博客 & 知识库',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://zhouzi.icu',
  baseUrl: '/blog/',

  organizationName: 'hyh112300',
  projectName: 'zhouzi',

  onBrokenLinks: 'throw',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/hyh112300/zhouzi/tree/main/blog/',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/hyh112300/zhouzi/tree/main/blog/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '肘子香香',
      logo: {
        alt: '肘子香香',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'awesomeSidebar',
          position: 'left',
          label: '精选资源',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'left',
          label: '指南',
        },
        {to: '/blog', label: '博客', position: 'left'},
        {to: '/about', label: '关于', position: 'left'},
        {
          href: 'https://github.com/hyh112300/zhouzi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '内容',
          items: [
            {
              label: '精选资源',
              to: '/docs/awesome/ai',
            },
            {
              label: '指南',
              to: '/docs/guide/libraries',
            },
            {
              label: '博客',
              to: '/blog',
            },
          ],
        },
        {
          title: '关于',
          items: [
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hyh112300',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 肘子香香 | 京ICP备2026025149号`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
