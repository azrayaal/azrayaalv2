'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Container } from '@/components/layout/Container'
import type { Project } from '@/types'

const FALLBACK_PROJECTS: Project[] = [
  { id: '1', title: 'ORBITAL PLATFORM', slug: 'orbital-platform', description: 'A cloud-native infrastructure management platform handling 50M+ daily operations. Real-time monitoring, automated scaling, and intelligent anomaly detection.', stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Terraform'], year: 2025, status: 'completed', featured: true, liveUrl: '#', githubUrl: '#', order: 1 },
  { id: '2', title: 'SYNTHCORE API', slug: 'synthcore-api', description: 'High-throughput REST and GraphQL API gateway with intelligent caching, rate limiting, and distributed tracing. Processes 10M requests per day.', stack: ['Node.js', 'TypeScript', 'GraphQL', 'Redis', 'Kafka'], year: 2025, status: 'completed', featured: true, liveUrl: '#', githubUrl: '#', order: 2 },
  { id: '3', title: 'FLUX EDITOR', slug: 'flux-editor', description: 'Browser-based collaborative code editor with real-time sync, AI completions, and embedded terminal. Built on CodeMirror 6 and Yjs CRDTs.', stack: ['React', 'TypeScript', 'WebSockets', 'Yjs', 'CodeMirror'], year: 2024, status: 'completed', featured: false, githubUrl: '#', order: 3 },
  { id: '4', title: 'SIGNAL CMS', slug: 'signal-cms', description: 'Headless CMS framework built on Payload v3 with a custom block-based page builder, live preview, and multi-tenant support.', stack: ['Payload CMS', 'Next.js', 'MongoDB', 'TypeScript'], year: 2024, status: 'completed', featured: false, githubUrl: '#', order: 4 },
  { id: '5', title: 'VECTOR MONITOR', slug: 'vector-monitor', description: 'Real-time observability dashboard for distributed systems. Integrates with Prometheus and Grafana with a custom React-based UI.', stack: ['React', 'TypeScript', 'Prometheus', 'WebSockets'], year: 2024, status: 'in-progress', featured: false, githubUrl: '#', order: 5 },
  { id: '6', title: 'MESH PROTOCOL', slug: 'mesh-protocol', description: 'Peer-to-peer data synchronization protocol implementation in TypeScript. Used in offline-first applications.', stack: ['TypeScript', 'WebRTC', 'CRDTs', 'IndexedDB'], year: 2023, status: 'completed', featured: false, githubUrl: '#', order: 6 },
  { id: '7', title: 'DEPLOY CLI', slug: 'deploy-cli', description: 'Zero-config deployment CLI tool that provisions cloud infrastructure, sets up CI/CD pipelines, and manages secrets in a single command.', stack: ['Node.js', 'TypeScript', 'AWS CDK', 'Docker'], year: 2023, status: 'archived', featured: false, githubUrl: '#', order: 7 },
  { id: '8', title: 'QUANTUM AUTH', slug: 'quantum-auth', description: 'Passwordless authentication system using WebAuthn, FIDO2, and passkey support. Drop-in SDK for Next.js applications.', stack: ['TypeScript', 'WebAuthn', 'Next.js', 'PostgreSQL'], year: 2023, status: 'completed', featured: false, githubUrl: '#', order: 8 },
]

type FilterKey = 'all' | 'featured' | 'in-progress' | 'archived'
type ViewMode = 'grid' | 'list'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'featured', label: 'FEATURED' },
  { key: 'in-progress', label: 'IN PROGRESS' },
  { key: 'archived', label: 'ARCHIVED' },
]

interface ProjectsArchiveProps {
  data?: Project[]
}

export function ProjectsArchive({ data = FALLBACK_PROJECTS }: ProjectsArchiveProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [view, setView] = useState<ViewMode>('grid')

  const filtered = useMemo(() => {
    if (filter === 'all') return data
    if (filter === 'featured') return data.filter((p) => p.featured)
    return data.filter((p) => p.status === filter)
  }, [data, filter])

  return (
    <div>
      {/* Controls bar */}
      <div
        className="sticky top-14 z-30 border-b"
        style={{
          background: 'var(--bg)',
          borderColor: 'var(--fg-08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-4 h-12">
            {/* Filter tabs */}
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="relative px-3 md:px-4 py-3 text-[9px] tracking-[0.18em] uppercase whitespace-nowrap transition-colors"
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    color: filter === f.key ? 'var(--fg)' : 'var(--fg-25)',
                  }}
                >
                  {filter === f.key && (
                    <motion.div
                      layoutId="filter-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: 'var(--fg)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  {f.label}
                </button>
              ))}
            </div>

            {/* Right: count + view toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={filtered.length}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="text-[9px] tracking-widest tabular-nums hidden sm:block"
                  style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {String(filtered.length).padStart(2, '0')} PROJECTS
                </motion.span>
              </AnimatePresence>

              <div
                className="flex items-center border"
                style={{ borderColor: 'var(--fg-10)' }}
              >
                {(['grid', 'list'] as ViewMode[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className="px-2.5 py-1.5 transition-colors"
                    style={{
                      background: view === v ? 'var(--fg-08)' : 'transparent',
                      borderRight: v === 'grid' ? '1px solid var(--fg-10)' : 'none',
                    }}
                    aria-label={`${v} view`}
                  >
                    {v === 'grid' ? (
                      <GridIcon active={view === 'grid'} />
                    ) : (
                      <ListIcon active={view === 'list'} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container size="wide">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <p
                className="text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                NO PROJECTS FOUND
              </p>
            </motion.div>
          ) : view === 'grid' ? (
            <motion.div
              key={`grid-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 py-12 md:py-16"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`list-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-4"
            >
              {filtered.map((project, i) => (
                <ProjectListRow key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  )
}

function ProjectListRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative border-b"
      style={{ borderColor: 'var(--fg-06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'var(--hover-row)' }}
      />
      <Link href={`/projects/${project.slug}`} className="relative block py-5 md:py-6">
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
          {/* Index */}
          <div className="hidden md:block col-span-1">
            <span className="text-[9px] tabular-nums" style={{ color: 'var(--fg-15)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          {/* Title */}
          <div className="col-span-8 md:col-span-4">
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.25 }}
              className="block"
              style={{ fontFamily: 'var(--font-dot-gothic)', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', color: 'var(--fg)', letterSpacing: '0.02em' }}
            >
              {project.title}
            </motion.span>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[9px]" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>{project.year}</span>
              {project.status === 'in-progress' && (
                <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 border" style={{ borderColor: 'var(--fg-20)', color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}>IN PROGRESS</span>
              )}
              {project.status === 'archived' && (
                <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 border" style={{ borderColor: 'var(--fg-10)', color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}>ARCHIVED</span>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="hidden md:block col-span-4">
            <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              {project.description}
            </p>
          </div>
          {/* Stack + arrow */}
          <div className="col-span-4 md:col-span-3 flex items-center justify-end gap-2 md:gap-3">
            <div className="hidden lg:flex flex-wrap gap-1 justify-end">
              {project.stack?.slice(0, 2).map((t) => (
                <span key={t} className="text-[8px] tracking-wider uppercase px-1.5 py-0.5 border" style={{ borderColor: 'var(--fg-08)', color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                  {t}
                </span>
              ))}
            </div>
            <motion.span
              animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.3 }}
              className="text-xs"
              style={{ color: 'var(--fg)' }}
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0" y="0" width="5" height="5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
      <rect x="7" y="0" width="5" height="5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
      <rect x="0" y="7" width="5" height="5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
      <rect x="7" y="7" width="5" height="5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0" y="1" width="12" height="1.5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
      <rect x="0" y="5" width="12" height="1.5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
      <rect x="0" y="9" width="12" height="1.5" fill={active ? 'var(--fg)' : 'var(--fg-25)'} />
    </svg>
  )
}
