'use client'

import { ScrollReveal } from '@/components/animation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { EXPERIENCES } from '@/lib/constants'

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              工作经历
            </h2>
            <p className="mx-auto max-w-xl text-text-secondary">
              我的职业发展历程。
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <ScrollReveal
                key={exp.company}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.15}
              >
                <div className="relative pl-12 md:pl-0">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg-primary md:left-1/2 md:-translate-x-1/2" />

                  <div
                    className={`rounded-xl border border-border bg-bg-surface/50 p-6 transition-colors hover:border-accent/30 md:w-[calc(50%-2rem)] ${
                      idx % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:pr-8'
                    }`}
                  >
                    <span className="text-sm font-medium text-accent">
                      {exp.period}
                    </span>
                    <h3 className="mt-1 text-xl font-semibold">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {exp.company}
                    </p>
                    <p className="mt-3 text-text-secondary">
                      {exp.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map(highlight => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
