'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { formatDate } from '@/lib/utils'
import type { Experience as ExperienceType } from '@/types'

const FALLBACK_EXPERIENCE: ExperienceType[] = [
  {
    id: '1',
    company: 'COMPANY ONE',
    role: 'Senior Full-Stack Engineer',
    startDate: '2023-01-01',
    endDate: undefined,
    description: 'Led architecture and development of core platform features. Scaled systems from 10K to 1M users. Implemented real-time infrastructure and optimized database performance.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
    location: 'Remote / Jakarta, ID',
  },
  {
    id: '2',
    company: 'STUDIO DIGITAL',
    role: 'Frontend Engineer',
    startDate: '2021-06-01',
    endDate: '2022-12-01',
    description: 'Built interactive digital experiences for global clients. Specialized in high-performance animations and complex UI systems.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Three.js'],
    location: 'Jakarta, Indonesia',
  },
  {
    id: '3',
    company: 'STARTUP LABS',
    role: 'Full-Stack Developer',
    startDate: '2020-03-01',
    endDate: '2021-05-01',
    description: 'Developed end-to-end features for SaaS products. Owned full delivery lifecycle from technical design to deployment.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Docker'],
    location: 'Bandung, Indonesia',
  },
]

interface ExperienceProps {
  data?: ExperienceType[]
}

export function Experience({ data = FALLBACK_EXPERIENCE }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <SectionLabel index="02" label="Experience" className="mb-12 md:mb-16" />
        <div>
          {data.map((exp, i) => (
            <ExperienceRow key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ExperienceRow({ experience, index }: { experience: ExperienceType; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const isCurrent = !experience.endDate

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative border-b py-6 md:py-8"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'var(--hover-row)' }}
      />

      {/* Mobile layout (stacked) */}
      <div className="relative flex flex-col gap-3 md:hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {experience.company}
              </h3>
              {isCurrent && (
                <span
                  className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 border"
                  style={{ borderColor: 'var(--fg-20)', color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  NOW
                </span>
              )}
            </div>
            <p
              className="text-[11px] font-bold mt-0.5 tracking-wide"
              style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {experience.role}
            </p>
          </div>
          <p
            className="text-[9px] tracking-wider tabular-nums text-right shrink-0"
            style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {formatDate(experience.startDate)}
            <br />
            {experience.endDate ? formatDate(experience.endDate) : 'PRESENT'}
          </p>
        </div>
        <p
          className="text-[11px] leading-relaxed"
          style={{ color: 'var(--fg-45, var(--fg-40))', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {experience.description}
        </p>
        {experience.technologies && (
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[9px] tracking-wider uppercase px-2 py-0.5 border"
                style={{ borderColor: 'var(--fg-08)', color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Desktop layout (grid) */}
      <div className="relative hidden md:grid grid-cols-12 gap-8 items-start">
        <div className="col-span-1 pt-1">
          <span
            className="text-[10px] tabular-nums"
            style={{ color: 'var(--fg-70)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="col-span-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {experience.company}
            </h3>
            {isCurrent && (
              <span
                className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 border"
                style={{ borderColor: 'var(--fg-20)', color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                NOW
              </span>
            )}
          </div>
          <p
            className="text-[11px] mt-1 tracking-wide font-bold"
            style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {experience.role}
          </p>
        </div>
        <div className="col-span-5">
          <p
            className="text-[11px] leading-relaxed font-bold"
            style={{ color: 'var(--fg-45, var(--fg-40))', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {experience.description}
          </p>
          {experience.technologies && (
            <div className="flex flex-wrap gap-1.5 mt-3 font-bold">
              {experience.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] tracking-wider uppercase px-2 py-0.5 border"
                  style={{ borderColor: 'var(--fg-08)', color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-3 text-right">
          <p
            className="text-[10px] tracking-wider tabular-nums"
            style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {formatDate(experience.startDate)} — {experience.endDate ? formatDate(experience.endDate) : 'PRESENT'}
          </p>
          {experience.location && (
            <p
              className="text-[9px] tracking-widest uppercase mt-1"
              style={{ color: 'var(--fg-18, var(--fg-70))', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {experience.location}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
