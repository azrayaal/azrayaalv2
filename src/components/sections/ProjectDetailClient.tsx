'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { ProjectCard } from '@/components/ui/ProjectCard'
import type { Project } from '@/types'

interface ProjectDetailClientProps {
  project: Project
  relatedProjects: Project[]
  prevProject: Project | null
  nextProject: Project | null
}

export function ProjectDetailClient({
  project,
  relatedProjects,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  return (
    <>
      {/* ── Overview ──────────────────────────────── */}
      <section className="py-16 md:py-24 border-b" style={{ borderColor: 'var(--fg-06)' }}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left: description */}
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel label="Overview" className="mb-6" />
              <RevealText>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--fg-60)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {project.description}
                </p>
              </RevealText>

              {/* Placeholder long-form content */}
              <RevealText delay={0.1}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  This project was built with a focus on production reliability, developer
                  experience, and long-term maintainability. Every architectural decision
                  was made with scale in mind — from the data model to the deployment
                  pipeline.
                </p>
              </RevealText>

              {/* CTA links */}
              <div className="flex flex-wrap gap-3 pt-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 border px-5 py-3 text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
                    style={{ borderColor: 'var(--fg-20)', color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    LIVE SITE
                    <span className="group-hover:translate-x-0.5 transition-transform inline-block">↗</span>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 border px-5 py-3 text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
                    style={{ borderColor: 'var(--fg-10)', color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    VIEW CODE
                    <span className="group-hover:translate-x-0.5 transition-transform inline-block">↗</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right: sidebar */}
            <div className="lg:col-span-5 space-y-0">
              <ProjectSidebar project={project} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Specs / Details ───────────────────────── */}
      <ProjectSpecs project={project} />

      {/* ── Gallery placeholder ───────────────────── */}
      <ProjectGallery project={project} />

      {/* ── Related projects ──────────────────────── */}
      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} />
      )}

      {/* ── Prev / Next navigation ────────────────── */}
      <ProjectNavigation prev={prevProject} next={nextProject} />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Sidebar                                                         */
/* ─────────────────────────────────────────────────────────────── */
function ProjectSidebar({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const details = [
    { label: 'YEAR', value: String(project.year) },
    { label: 'TYPE', value: 'ENGINEERING PROJECT' },
    { label: 'STATUS', value: project.status.toUpperCase().replace('-', ' ') },
    { label: 'ROLE', value: 'FULL-STACK DEVELOPER' },
  ]

  return (
    <div ref={ref}>
      {/* Details table */}
      <div
        className="border mb-6"
        style={{ borderColor: 'var(--fg-08)' }}
      >
        <div
          className="px-4 py-2.5 border-b"
          style={{ borderColor: 'var(--fg-06)', background: 'var(--fg-02)' }}
        >
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
            PROJECT INFO
          </span>
        </div>
        {details.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
            style={{ borderColor: 'var(--fg-05)' }}
          >
            <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              {item.label}
            </span>
            <span className="text-[10px] tracking-wider" style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Tech stack */}
      {project.stack && project.stack.length > 0 && (
        <div
          className="border"
          style={{ borderColor: 'var(--fg-08)' }}
        >
          <div
            className="px-4 py-2.5 border-b"
            style={{ borderColor: 'var(--fg-06)', background: 'var(--fg-02)' }}
          >
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              TECH STACK
            </span>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                className="text-[10px] tracking-wider uppercase px-2.5 py-1 border"
                style={{
                  borderColor: 'var(--fg-10)',
                  color: 'var(--fg-50)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Specs section                                                   */
/* ─────────────────────────────────────────────────────────────── */
function ProjectSpecs({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const specs = [
    { label: 'ARCHITECTURE', value: 'Monorepo, microservices-ready, modular domain structure' },
    { label: 'DEPLOYMENT', value: 'Docker containers, CI/CD via GitHub Actions, hosted on AWS' },
    { label: 'PERFORMANCE', value: 'Sub-100ms p95 latency, Lighthouse score 98+' },
    { label: 'TESTING', value: 'Unit + integration tests, E2E with Playwright, >85% coverage' },
  ]

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 border-b"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <SectionLabel label="Technical Specs" className="mb-10 md:mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border" style={{ borderColor: 'var(--fg-08)' }}>
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 border-b border-r last:border-r-0 odd:md:border-r even:md:border-r-0 [&:nth-last-child(-n+2)]:border-b-0"
              style={{ borderColor: 'var(--fg-08)' }}
            >
              <p className="text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                {spec.label}
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-55, var(--fg-50))', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                {spec.value}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Gallery                                                         */
/* ─────────────────────────────────────────────────────────────── */
function ProjectGallery({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  // Show 3 placeholder frames (replace with real gallery when images available)
  const frames = [
    { label: 'DASHBOARD VIEW', aspect: '16/9' },
    { label: 'DETAIL PANEL', aspect: '4/3' },
    { label: 'MOBILE VIEW', aspect: '3/4' },
  ]

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 border-b overflow-hidden"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <SectionLabel label="Gallery" className="mb-10 md:mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Large frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <GalleryFrame label={frames[0].label} aspect={frames[0].aspect} index={0} />
          </motion.div>

          {/* Small frames stacked */}
          <div className="md:col-span-4 flex flex-row md:flex-col gap-4 md:gap-6">
            {frames.slice(1).map((frame, i) => (
              <motion.div
                key={frame.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 md:flex-none"
              >
                <GalleryFrame label={frame.label} aspect="4/3" index={i + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function GalleryFrame({ label, aspect, index }: { label: string; aspect: string; index: number }) {
  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{
        aspectRatio: aspect,
        border: '1px solid var(--fg-06)',
        background: 'var(--fg-02)',
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--fg-04) 1px, transparent 1px),
            linear-gradient(90deg, var(--fg-04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span
          style={{
            fontFamily: 'var(--font-dot-gothic)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            color: 'var(--fg-06)',
            letterSpacing: '-0.01em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--fg-15)', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {label}
        </span>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: 'var(--fg-04)' }}
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          EXPAND ↗
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Related projects                                                */
/* ─────────────────────────────────────────────────────────────── */
function RelatedProjects({ projects }: { projects: Project[] }) {
  return (
    <section
      className="py-16 md:py-24 border-b"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <SectionLabel label="Related Projects" className="mb-10 md:mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Prev / Next navigation                                          */
/* ─────────────────────────────────────────────────────────────── */
function ProjectNavigation({
  prev,
  next,
}: {
  prev: Project | null
  next: Project | null
}) {
  return (
    <section className="border-b" style={{ borderColor: 'var(--fg-06)' }}>
      <div className="grid grid-cols-2 divide-x" style={{ borderColor: 'var(--fg-06)' }}>
        {/* Prev */}
        <div
          className={prev ? '' : 'opacity-20 pointer-events-none'}
          style={{ borderColor: 'var(--fg-06)' }}
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col gap-2 p-6 md:p-8 transition-colors hover:opacity-90"
            >
              <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                ← PREVIOUS
              </span>
              <span
                className="group-hover:-translate-x-1 transition-transform"
                style={{ fontFamily: 'var(--font-dot-gothic)', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', color: 'var(--fg)', letterSpacing: '0.02em' }}
              >
                {prev.title}
              </span>
              <span className="text-[9px] tabular-nums" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                {prev.year}
              </span>
            </Link>
          ) : (
            <div className="p-6 md:p-8">
              <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-15)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                ← FIRST PROJECT
              </span>
            </div>
          )}
        </div>

        {/* Next */}
        <div className={next ? '' : 'opacity-20 pointer-events-none'}>
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end gap-2 p-6 md:p-8 text-right transition-colors hover:opacity-90"
            >
              <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                NEXT →
              </span>
              <span
                className="group-hover:translate-x-1 transition-transform"
                style={{ fontFamily: 'var(--font-dot-gothic)', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', color: 'var(--fg)', letterSpacing: '0.02em' }}
              >
                {next.title}
              </span>
              <span className="text-[9px] tabular-nums" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                {next.year}
              </span>
            </Link>
          ) : (
            <div className="flex justify-end p-6 md:p-8">
              <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-15)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                LAST PROJECT →
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Back to all */}
      <div className="flex justify-center py-8 border-t" style={{ borderColor: 'var(--fg-06)' }}>
        <Link
          href="/projects"
          className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase border-b pb-0.5 transition-opacity hover:opacity-100"
          style={{ color: 'var(--fg-30)', borderColor: 'var(--fg-10)', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          VIEW ALL PROJECTS
        </Link>
      </div>
    </section>
  )
}
