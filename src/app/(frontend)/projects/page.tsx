import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GridBackground } from '@/components/ui/GridBackground'
import { ProjectsArchive } from '@/components/sections/ProjectsArchive'
import { getProjects } from '@/lib/getProjects'

export const metadata: Metadata = {
  title: 'Projects — AZRAYAAL',
  description: 'A curated archive of engineering projects spanning systems architecture, developer tooling, and digital experiences.',
}

export const revalidate = 60

const META = [
  { label: 'TYPE', value: 'ARCHIVE' },
  { label: 'DOMAIN', value: 'ENGINEERING' },
  { label: 'OUTPUT', value: 'PRODUCTION SYSTEMS' },
]

export default async function ProjectsPage() {
  const projects = await getProjects()
  const count = projects.length || 8 // 8 = fallback count

  return (
    <div className="pt-14 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 border-b overflow-hidden"
        style={{ borderColor: 'var(--fg-06)' }}
      >
        <GridBackground size="lg" />

        {/* Dot matrix bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--fg-05) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        <Container size="wide">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 md:mb-12">
            <a
              href="/"
              className="text-[9px] tracking-widest uppercase transition-opacity hover:opacity-100"
              style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              HOME
            </a>
            <span style={{ color: 'var(--fg-15)', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '9px' }}>/</span>
            <span
              className="text-[9px] tracking-widest uppercase"
              style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              PROJECTS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            {/* Left: headline */}
            <div className="lg:col-span-7">
              <h1
                className="leading-none"
                style={{
                  fontFamily: 'var(--font-dot-gothic)',
                  fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                  lineHeight: 0.88,
                  color: 'var(--fg)',
                  letterSpacing: '-0.01em',
                }}
              >
                PROJECT
                <br />
                <span style={{ color: 'var(--fg-15)' }}>ARCHIVE</span>
              </h1>
            </div>

            {/* Right: meta + description */}
            <div className="lg:col-span-5 space-y-6">
              {/* Meta grid */}
              <div
                className="border p-4 space-y-0"
                style={{ borderColor: 'var(--fg-08)' }}
              >
                {META.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                    style={{ borderColor: 'var(--fg-05)' }}
                  >
                    <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                      {item.label}
                    </span>
                    <span className="text-[10px] tracking-wider" style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                    COUNT
                  </span>
                  <span className="text-[10px] tracking-wider tabular-nums" style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                    {String(count).padStart(2, '0')} PROJECTS
                  </span>
                </div>
              </div>

              <p
                className="text-[12px] leading-relaxed"
                style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                A curated selection of engineering work spanning systems architecture,
                developer tooling, and digital experiences. Production-grade,
                precision-engineered.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Archive (client component: filters + view toggle) ── */}
      <ProjectsArchive data={projects.length > 0 ? projects : undefined} />

    </div>
  )
}
