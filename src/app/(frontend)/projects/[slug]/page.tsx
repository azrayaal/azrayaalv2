import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { GridBackground } from '@/components/ui/GridBackground'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectDetailClient } from '@/components/sections/ProjectDetailClient'
import { getProjectBySlug, getProjects } from '@/lib/getProjects'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — AZRAYAAL`,
    description: project.description,
    openGraph: {
      title: `${project.title} — AZRAYAAL`,
      description: project.description,
    },
  }
}

export const revalidate = 60

const STATUS_LABELS: Record<string, string> = {
  completed: 'COMPLETED',
  'in-progress': 'IN PROGRESS',
  archived: 'ARCHIVED',
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  // Fetch current project + all projects for nav
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ])

  if (!project) notFound()

  // Next / prev navigation
  const sortedProjects = allProjects.length > 0
    ? [...allProjects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    : FALLBACK_PROJECTS
  const currentIndex = sortedProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? sortedProjects[currentIndex - 1] : null
  const nextProject = currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : null

  // Related projects (same stack, excluding current)
  const relatedProjects = sortedProjects
    .filter((p) => p.slug !== slug)
    .filter((p) => p.stack?.some((t) => project.stack?.includes(t)))
    .slice(0, 3)

  return (
    <div className="pt-14 min-h-screen">

      {/* ── Hero / Header ────────────────────────────────── */}
      <section
        className="relative border-b overflow-hidden"
        style={{ borderColor: 'var(--fg-06)' }}
      >
        <GridBackground size="lg" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--fg-05) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        <Container size="wide">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 pt-10 md:pt-14 mb-10 md:mb-12">
            <Link
              href="/"
              className="text-[9px] tracking-widest uppercase transition-opacity hover:opacity-100"
              style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              HOME
            </Link>
            <span style={{ color: 'var(--fg-15)', fontSize: '9px' }}>/</span>
            <Link
              href="/projects"
              className="text-[9px] tracking-widest uppercase transition-opacity hover:opacity-100"
              style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              PROJECTS
            </Link>
            <span style={{ color: 'var(--fg-15)', fontSize: '9px' }}>/</span>
            <span
              className="text-[9px] tracking-widest uppercase truncate max-w-[120px]"
              style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {project.title}
            </span>
          </div>

          {/* Main title area */}
          <div className="pb-12 md:pb-16">
            <div className="flex items-start gap-4 flex-wrap mb-4">
              {/* Status badge */}
              <span
                className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1.5 border"
                style={{
                  borderColor: project.status === 'in-progress' ? 'var(--fg-30)' : 'var(--fg-15)',
                  color: project.status === 'in-progress' ? 'var(--fg-60)' : 'var(--fg-30)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                }}
              >
                {STATUS_LABELS[project.status] ?? project.status}
              </span>
              {project.featured && (
                <span
                  className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1.5 border"
                  style={{ borderColor: 'var(--fg-15)', color: 'var(--fg-30)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  FEATURED
                </span>
              )}
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: 'var(--font-dot-gothic)',
                fontSize: 'clamp(2.75rem, 7vw, 8rem)',
                lineHeight: 0.9,
                color: 'var(--fg)',
                letterSpacing: '-0.01em',
              }}
            >
              {project.title}
            </h1>

            {/* Info strip */}
            <div
              className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-6 border-t"
              style={{ borderColor: 'var(--fg-08)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>YEAR</span>
                <span className="text-[10px] tabular-nums" style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}>{project.year}</span>
              </div>
              {project.stack && project.stack.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>STACK</span>
                  <span className="text-[10px]" style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}>{project.stack.length} TECHNOLOGIES</span>
                </div>
              )}
              <div className="flex items-center gap-3 ml-auto">
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] tracking-widest uppercase border-b pb-0.5 transition-opacity hover:opacity-100"
                    style={{ borderColor: 'var(--fg-15)', color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    GITHUB ↗
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] tracking-widest uppercase border-b pb-0.5 transition-opacity hover:opacity-100"
                    style={{ borderColor: 'var(--fg-15)', color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    LIVE ↗
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Body (client for animations) ─────────────────── */}
      <ProjectDetailClient
        project={project}
        relatedProjects={relatedProjects}
        prevProject={prevProject}
        nextProject={nextProject}
      />

    </div>
  )
}

// Fallback used for prev/next when DB is offline
const FALLBACK_PROJECTS = [
  { id: '1', title: 'ORBITAL PLATFORM', slug: 'orbital-platform', description: 'Cloud-native infrastructure management.', stack: ['Next.js', 'TypeScript', 'AWS'], year: 2025, status: 'completed' as const, featured: true, order: 1 },
  { id: '2', title: 'SYNTHCORE API', slug: 'synthcore-api', description: 'High-throughput API gateway.', stack: ['Node.js', 'GraphQL'], year: 2025, status: 'completed' as const, featured: true, order: 2 },
  { id: '3', title: 'FLUX EDITOR', slug: 'flux-editor', description: 'Collaborative code editor.', stack: ['React', 'WebSockets'], year: 2024, status: 'completed' as const, featured: false, order: 3 },
  { id: '4', title: 'SIGNAL CMS', slug: 'signal-cms', description: 'Headless CMS framework.', stack: ['Payload CMS', 'Next.js'], year: 2024, status: 'completed' as const, featured: false, order: 4 },
]
