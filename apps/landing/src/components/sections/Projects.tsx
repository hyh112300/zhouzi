'use client'

import { ArrowUpRight, Github } from 'lucide-react'
import { ScrollReveal } from '@/components/animation'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PROJECTS } from '@/lib/constants'

export function Projects() {
  return (
    <Section id="projects" variant="alt">
      <Container>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              项目
            </h2>
            <p className="mx-auto max-w-xl text-text-secondary">
              精选项目展示。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, idx) => (
            <ScrollReveal key={project.title} delay={idx * 0.1}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-bg-surface/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        在线演示
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        <Github className="h-3.5 w-3.5" />
                        源代码
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
