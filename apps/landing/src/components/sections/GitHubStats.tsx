'use client'

import { Github } from 'lucide-react'
import { AnimatedNumber, ScrollReveal } from '@/components/animation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const STATS = [
  { label: '仓库', value: 30, suffix: '+' },
  { label: 'Star', value: 50, suffix: '+' },
  { label: '贡献', value: 500, suffix: '+' },
  { label: '编码年限', value: 5, suffix: '+' },
]

export function GitHubStats() {
  return (
    <Section id="github">
      <Container>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Github className="h-6 w-6 text-accent" />
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                GitHub
              </h2>
            </div>
            <p className="mx-auto max-w-xl text-text-secondary">
              开源贡献与公开项目。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat, idx) => (
            <ScrollReveal key={stat.label} delay={idx * 0.1}>
              <div className="rounded-xl border border-border bg-bg-surface/50 p-6 text-center transition-colors hover:border-accent/30">
                <div className="text-3xl font-bold tracking-tight text-accent md:text-4xl">
                  <AnimatedNumber
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="mt-2 text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
