'use client'

import { ScrollReveal } from '@/components/animation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                关于
                <span className="block bg-linear-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                  我
                </span>
              </h2>
              <div className="h-1 w-12 rounded-full bg-accent" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p className="text-lg">
                一名前端工程师，热衷于构建高性能、美观且沉浸式的 Web 体验。
                深耕 React、TypeScript 与 Three.js，
                在工程与艺术之间架起桥梁。
              </p>
              <p>
                我的工作涵盖从复杂 Web 应用的架构设计到创意 WebGL 体验的打造。
                信奉整洁的代码、深思熟虑的设计，以及服务于目标的技术。
              </p>
              <p>
                目前正在探索 AI 驱动开发、空间计算界面以及不断演进的 Web 平台的前沿。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  )
}
