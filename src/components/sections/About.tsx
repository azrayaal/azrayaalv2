'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { GridBackground } from '@/components/ui/GridBackground'

const PHILOSOPHY_ITEMS = [
  { label: 'APPROACH', value: 'Systems thinking meets aesthetic precision' },
  { label: 'STACK', value: 'TypeScript, React, Next.js, Node, Postgres' },
  { label: 'PROCESS', value: 'Design-first, performance-obsessed engineering' },
  { label: 'FOCUS', value: 'Full-Stack, Cloud Architecture, Developer Experience' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      {/* <GridBackground size="sm" /> */}

      <Container size="wide">
        <SectionLabel index="01" label="About" className="mb-12 md:mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: headline */}
          <div className="lg:col-span-5">
            <RevealText delay={0.1}>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: 'var(--font-dot-gothic)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)',
                  color: 'var(--fg)',
                  letterSpacing: '-0.01em',
                }}
              >
                Building systems that power the next generation of digital products.
              </h2>
            </RevealText>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <RevealText delay={0.2}>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--fg-60)' }}
              >
                I&apos;m a full-stack developer with a bias toward precision engineering and
                minimal aesthetics. My work lives at the intersection of systems architecture
                and experiential design — where every millisecond and pixel is deliberate.
              </p>
            </RevealText>

            <RevealText delay={0.3}>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--fg-40)' }}
              >
                I approach software the way engineers approach spacecraft: with obsessive
                attention to reliability, performance, and the experience of whoever
                operates it. Zero tolerance for unnecessary abstraction.
              </p>
            </RevealText>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border-t pt-6 md:pt-8"
              style={{ borderColor: 'var(--fg-08)' }}
            >
              {PHILOSOPHY_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-3 border-b"
                  style={{ borderColor: 'var(--fg-05)' }}
                >
                  <span
                    className="text-[9px] tracking-widest uppercase shrink-0 sm:w-24"
                    style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-[12px] tracking-wide"
                    style={{ color: 'var(--fg-55, var(--fg-50))', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
