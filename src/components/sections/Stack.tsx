'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Marquee } from '@/components/ui/Marquee'
import type { StackItem } from '@/types'

const ALL_TECHNOLOGIES = [
  'TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Redis', 'Docker', 'AWS', 'Tailwind CSS', 'Framer Motion', 'GraphQL',
  'Prisma', 'Payload CMS', 'Git', 'Linux', 'Terraform', 'Kubernetes',
]

const FALLBACK_STACK: StackItem[] = [
  { id: '1', category: 'FRONTEND', technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion'], order: 1 },
  { id: '2', category: 'BACKEND', technologies: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Prisma'], order: 2 },
  { id: '3', category: 'CMS & CONTENT', technologies: ['Payload CMS', 'Sanity', 'Contentful', 'Lexical'], order: 3 },
  { id: '4', category: 'INFRASTRUCTURE', technologies: ['Docker', 'AWS', 'Vercel', 'Terraform', 'Kubernetes', 'Linux'], order: 4 },
]

interface StackProps {
  data?: StackItem[]
}

export function Stack({ data = FALLBACK_STACK }: StackProps) {
  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 border-t overflow-hidden"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <SectionLabel index="04" label="Tech Stack" className="mb-12 md:mb-16" />
      </Container>

      {/* Marquee belts */}
      <div
        className="border-y py-4 mb-2"
        style={{ borderColor: 'var(--fg-06)' }}
      >
        <Marquee items={ALL_TECHNOLOGIES} speed={25} direction="left" separator="·" itemClassName="text-[11px] tracking-[0.2em] uppercase" />
      </div>
      <div
        className="border-b py-4"
        style={{ borderColor: 'var(--fg-06)' }}
      >
        <Marquee items={[...ALL_TECHNOLOGIES].reverse()} speed={35} direction="right" separator="·" itemClassName="text-[11px] tracking-[0.2em] uppercase" />
      </div>

      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-0 border-t" style={{ borderColor: 'var(--fg-06)' }}>
          {data.map((stack, i) => (
            <StackColumn key={stack.id} stack={stack} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function StackColumn({ stack, index }: { stack: StackItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-r border-b last:border-r-0 md:last:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4n)]:border-r-0 p-5 md:p-6"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <p
        className="text-[9px] tracking-[0.25em] uppercase mb-4"
        style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        {stack.category}
      </p>
      <ul className="space-y-2">
        {stack.technologies.map((tech) => (
          <li
            key={tech}
            className="text-[11px] tracking-wider"
            style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            <span style={{ color: 'var(--fg-15)' }}>→ </span>
            {tech}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
