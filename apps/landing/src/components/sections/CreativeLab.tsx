'use client'

import { Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/animation'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const EXPERIMENTS = [
  {
    title: '3D 粒子宇宙',
    description: '基于自定义着色器的交互式粒子系统。',
    tags: ['Three.js', 'GLSL', 'R3F'],
  },
  {
    title: 'WebGL 流体模拟',
    description: '浏览器中的实时流体动力学仿真。',
    tags: ['WebGL', 'Compute', 'Shaders'],
  },
  {
    title: '空间 UI 原型',
    description: '探索面向空间计算的深度界面。',
    tags: ['Three.js', 'Interaction', 'UI/UX'],
  },
]

export function CreativeLab() {
  return (
    <Section id="creative-lab">
      <Container>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                创意实验室
              </h2>
            </div>
            <p className="mx-auto max-w-xl text-text-secondary">
              探索 Web 技术边界的实验性项目。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {EXPERIMENTS.map((exp, idx) => (
            <ScrollReveal key={exp.title} delay={idx * 0.1}>
              <div className="group relative rounded-xl border border-border bg-bg-surface/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30">
                <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                  {exp.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {exp.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
