export const SITE = {
  title: 'Zhouzi',
  description:
    'Frontend engineer crafting immersive digital experiences with Three.js, React, and creative coding.',
  url: 'https://zhouzi.icu',
  author: 'Zhouzi',
  icp: '京ICP备2026025149号',
} as const

export const SOCIAL = {
  github: 'https://github.com/hyh112300',
  email: 'mailto:hi@zhouzi.icu',
} as const

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
