'use client'

import { ArrowUpRight, Github, Mail } from 'lucide-react'
import { ScrollReveal } from '@/components/animation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SOCIAL } from '@/lib/constants'

export function Contact() {
  return (
    <Section id="contact">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              联系我
            </h2>
            <p className="mb-8 text-text-secondary">
              有项目想聊聊，或者只是想打个招呼？随时欢迎。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <a href={SOCIAL.email}>
                  <Mail className="mr-2 h-4 w-4" />
                  发送邮件
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  )
}
