import type { Experience, Project, Skill } from '@/types'

export const SITE = {
  title: '肘子',
  description:
    '前端工程师 / 创意开发者，探索 Three.js 沉浸式体验与创意编程。',
  url: 'https://zhouzi.icu',
  author: 'Zhouzi',
  icp: '京ICP备2026025149号',
} as const

export const SOCIAL = {
  github: 'https://github.com/hyh112300',
  email: 'mailto:hyh112300@163.com',
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
  { name: 'Vue 2/3', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'TailwindCSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Vant', category: 'frontend' },
  { name: 'ElementUI', category: 'frontend' },
  { name: 'uni-app', category: 'frontend' },
  { name: 'ECharts', category: 'frontend' },
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
    company: '个人项目',
    role: '全栈开发者',
    period: '2024 — 至今',
    description: '构建个人品牌与创意项目。',
    highlights: [
      'Next.js 15 + Three.js + TypeScript 构建个人网站',
      'Three.js / R3F 沉浸式 3D 交互体验',
      'CI/CD 流水线与 Docker 自动化部署',
      'AI 驱动开发工作流',
    ],
  },
  {
    company: '某科技公司',
    role: '前端开发工程师',
    period: '2022.06 — 2025.06',
    description: '银行金融系统前端开发。',
    highlights: [
      'Vue 2/3 + Vant/ElementUI 构建金融系统',
      '核心业务模块重构（额度预测→绑卡激活全流程）',
      '修复通话监听逻辑，解决 30% 外呼记录丢失',
      '抽离公共组件，报表开发效率提升 40%',
      'uni-App 三端协同移动办公平台',
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
  {
    title: '某银行管理平台',
    description:
      '银行内部管理平台，客户画像、资产分析、外呼任务与资质审核。',
    tags: ['Vue 2', 'ElementUI', 'ECharts', 'JavaScript'],
  },
  {
    title: '某银行移动工作台',
    description:
      '理财经理移动办公平台，uni-App 三端协同，外呼任务闭环与资产查询。',
    tags: ['uni-app', 'Vue 3', 'ECharts', 'Cross-platform'],
  },
  {
    title: '某微信银行项目',
    description:
      '微信公众号金融服务平台，账户查询、贷款申请、企业对账等。',
    tags: ['Vue 2', 'Vant', 'Vuex', '微信JS-SDK'],
  },
]

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const
