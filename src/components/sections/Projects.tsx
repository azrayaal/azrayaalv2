'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Project } from '@/types'

const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ORBITAL PLATFORM',
    slug: 'orbital-platform',
    description: 'A cloud-native infrastructure management platform handling 50M+ daily operations. Real-time monitoring, automated scaling, and intelligent anomaly detection.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Terraform'],
    year: 2025,
    status: 'completed',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
    order: 1,
  },
  {
    id: '2',
    title: 'SYNTHCORE API',
    slug: 'synthcore-api',
    description: 'High-throughput REST and GraphQL API gateway with intelligent caching, rate limiting, and distributed tracing. Processes 10M requests per day.',
    stack: ['Node.js', 'TypeScript', 'GraphQL', 'Redis', 'Kafka'],
    year: 2025,
    status: 'completed',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
    order: 2,
  },
  {
    id: '3',
    title: 'FLUX EDITOR',
    slug: 'flux-editor',
    description: 'Browser-based collaborative code editor with real-time sync, AI completions, and embedded terminal. Built on CodeMirror 6 and Yjs CRDTs.',
    stack: ['React', 'TypeScript', 'WebSockets', 'Yjs', 'CodeMirror'],
    year: 2024,
    status: 'completed',
    featured: false,
    githubUrl: '#',
    order: 3,
  },
  {
    id: '4',
    title: 'SIGNAL CMS',
    slug: 'signal-cms',
    description: 'Headless CMS framework built on Payload v3 with a custom block-based page builder, live preview, and multi-tenant support.',
    stack: ['Payload CMS', 'Next.js', 'MongoDB', 'TypeScript'],
    year: 2024,
    status: 'completed',
    featured: false,
    githubUrl: '#',
    order: 4,
  },
]

interface ProjectsProps {
  data?: Project[]
}

export function Projects({ data = FALLBACK_PROJECTS }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <SectionLabel index="03" label="Projects" className="flex-1" />
          <Link
            href="/projects"
            className="text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-100 shrink-0"
            style={{ color: 'var(--fg-30)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            View All →
          </Link>
        </div>

        <div>
          {data.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group border-b relative"
      style={{ borderColor: 'var(--fg-06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/projects/${project.slug}`} className="block py-6 md:py-10">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scaleX: 0, originX: 0 }}
          animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'var(--hover-row)' }}
        />

        {/* Mobile layout */}
        <div className="relative flex flex-col gap-3 md:hidden">
          <div className="flex items-start justify-between gap-3">
            <h3
              style={{
                fontFamily: 'var(--font-dot-gothic)',
                fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                color: 'var(--fg)',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>
            <span
              className="text-[9px] tabular-nums shrink-0 pt-0.5"
              style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {project.year}
            </span>
          </div>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[9px] tracking-wider uppercase px-2 py-0.5 border"
                style={{ borderColor: 'var(--fg-08)', color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="relative hidden md:grid grid-cols-12 gap-8 items-start">
          <div className="col-span-1 pt-1.5">
            <span
              className="text-[10px] tabular-nums"
              style={{ color: 'var(--fg-70)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="col-span-4">
            <motion.h3
              animate={hovered ? { x: 6 } : { x: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-dot-gothic)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                color: 'var(--fg)',
                letterSpacing: '0.02em',
              }}
            >
              {project.title}
            </motion.h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span
                className="text-[9px] tracking-widest font-bold"
                style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {project.year}
              </span>
              {project.status === 'in-progress' && (
                <span
                  className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 border"
                  style={{ borderColor: 'var(--fg-60)', color: 'var(--fg-60)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  IN PROGRESS
                </span>
              )}
              {project.featured && (
                <span
                  className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 border"
                  style={{ borderColor: 'var(--fg-60)', color: 'var(--fg-60)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  FEATURED
                </span>
              )}
            </div>
          </div>
          <div className="col-span-4">
            <p
              className="text-[11px] leading-relaxed"
              style={{ color: 'var(--fg-60)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {project.description}
            </p>
          </div>
          <div className="col-span-3 flex flex-col items-end gap-3">
            <div className="flex flex-wrap gap-1.5 justify-end">
              {project.stack?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] tracking-wider uppercase px-2 py-0.5 border"
                  style={{ borderColor: 'var(--fg-08)', color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <span
                  className="text-[9px] tracking-wider uppercase border-b pb-0.5 group-hover:opacity-100 transition-opacity opacity-40"
                  style={{ borderColor: 'var(--fg-20)', color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  GITHUB →
                </span>
              )}
              {project.liveUrl && (
                <span
                  className="text-[9px] tracking-wider uppercase border-b pb-0.5 group-hover:opacity-100 transition-opacity opacity-40"
                  style={{ borderColor: 'var(--fg-20)', color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  LIVE →
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
