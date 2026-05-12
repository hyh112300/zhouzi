import type { Experience, Project, Skill } from '@/types'

export const SITE = {
  title: '肘子',
  description:
    '前端工程师，专注于 Three.js、React 与创意编程，打造沉浸式数字体验。',
  url: 'https://zhouzi.icu',
  author: 'Zhouzi',
  icp: '京ICP备2026025149号',
} as const

export const SOCIAL = {
  github: 'https://github.com/hyh112300',
  email: 'mailto:hi@zhouzi.icu',
} as const

export const NAV_ITEMS = [
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '经历', href: '#experience' },
  { label: '项目', href: '#projects' },
  { label: '博客', href: '/blog' },
  { label: '联系', href: '#contact' },
] as const

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'TailwindCSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  // AI/ML
  { name: 'AI Agents', category: 'ai-ml' },
  { name: 'LLM APIs', category: 'ai-ml' },
  { name: 'RAG', category: 'ai-ml' },
  // Tools
  { name: 'Docker', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Linux', category: 'tools' },
]

export const EXPERIENCES: Experience[] = [
  {
    company: 'Current',
    role: '前端工程师',
    period: '2024 — 至今',
    description: '使用前沿技术构建现代 Web 应用。',
    highlights: [
      '使用 Next.js 和 React 架构并构建高性能 Web 应用',
      '基于 Three.js 和 WebGL 开发沉浸式 3D 体验',
      '主导前端架构决策与代码审查',
      '搭建 CI/CD 流水线与自动化部署工作流',
    ],
  },
  {
    company: 'Previous',
    role: '软件工程师',
    period: '2022 — 2024',
    description: '全栈开发，聚焦 React 生态与 Node.js。',
    highlights: [
      '构建并维护多个生产级应用',
      '优化应用性能，Lighthouse 评分 95+',
      '实现桌面端与移动端的完整响应式适配',
      '与设计团队协作打造直观的用户界面',
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    title: 'Zhouzi.icu',
    description:
      '个人网站，融合沉浸式 3D 体验、Next.js 与创意编程技术。',
    tags: ['Next.js', 'Three.js', 'TypeScript', 'Framer Motion'],
    href: 'https://zhouzi.icu',
    github: 'https://github.com/hyh112300/zhouzi',
  },
]

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const
