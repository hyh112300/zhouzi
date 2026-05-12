import type { Metadata } from 'next'
import { About } from '@/components/sections/About'
import { BlogEntry } from '@/components/sections/BlogEntry'
import { Contact } from '@/components/sections/Contact'
import { CreativeLab } from '@/components/sections/CreativeLab'
import { Experience } from '@/components/sections/Experience'
import { GitHubStats } from '@/components/sections/GitHubStats'
import { Hero } from '@/components/sections/Hero'
import { Philosophy } from '@/components/sections/Philosophy'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://zhouzi.icu',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GitHubStats />
      <Philosophy />
      <CreativeLab />
      <BlogEntry />
      <Contact />
    </>
  )
}
