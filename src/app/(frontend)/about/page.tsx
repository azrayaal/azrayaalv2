import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GridBackground } from '@/components/ui/GridBackground'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Stack } from '@/components/sections/Stack'
import { getExperience } from '@/lib/getExperience'
import { getStack } from '@/lib/getGlobals'

export const metadata: Metadata = {
  title: 'About — AZRAYAAL',
  description: 'Full-stack developer building systems at the intersection of design and engineering precision.',
}

export const revalidate = 60

export default async function AboutPage() {
  const [experience, stack] = await Promise.all([getExperience(), getStack()])

  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="relative py-24 border-b overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <GridBackground size="lg" />
        <Container size="wide">
          <SectionLabel label="About" className="mb-8" />
          <h1
            style={{
              fontFamily: 'var(--font-dot-gothic)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              lineHeight: 0.9,
              color: '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            FULL-STACK
            <br />
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>DEVELOPER</span>
          </h1>
        </Container>
      </section>

      <About />
      <Experience data={experience.length > 0 ? experience : undefined} />
      <Stack data={stack.length > 0 ? stack : undefined} />
    </div>
  )
}
