'use client'

import type { SkillCategory } from '@/types'
import { ScrollReveal } from '@/components/animation'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SKILLS } from '@/lib/constants'

const CATEGORIES: { key: SkillCategory, label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai-ml', label: 'AI / ML' },
  { key: 'tools', label: 'Tools' },
]

export function Skills() {
  return (
    <Section id="skills" variant="alt">
      <Container>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              技能栈
            </h2>
            <p className="mx-auto max-w-xl text-text-secondary">
              日常使用的技术与工具，用于构建生产级应用。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, catIdx) => {
            const categorySkills = SKILLS.filter(
              s => s.category === category.key,
            )

            return (
              <ScrollReveal key={category.key} delay={catIdx * 0.1}>
                <div className="rounded-xl border border-border bg-bg-surface/50 p-6 transition-colors hover:border-accent/30">
                  <h3 className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
                    {category.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <Badge key={skill.name} variant="skill">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
