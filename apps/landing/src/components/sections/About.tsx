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
                前端工程师，三年金融科技经验，
                深耕 Vue 与 React 生态，现专注 Three.js 沉浸式体验。
              </p>
              <p>
                曾就职于北京宇信科技，负责邮储银行微信银行及北京银行掌上银行家
                等大型金融系统的前端开发。
              </p>
              <p>
                信奉整洁的代码与服务于目标的技术，
                不断探索 Web 平台的前沿。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  )
}
