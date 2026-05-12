export interface Skill {
  name: string
  category: SkillCategory
  level?: number // 0-100, omitted for decorative-only
}

export type SkillCategory = 'frontend' | 'backend' | 'ai-ml' | 'tools'

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  href?: string
  github?: string
  cover?: string
}

export interface BlogPost {
  title: string
  description: string
  date: string
  href: string
  tags?: string[]
  readingTime?: string
}

export interface NavItem {
  label: string
  href: string
}
