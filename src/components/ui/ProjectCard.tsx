'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        {/* Thumbnail placeholder / artwork */}
        <div
          className="relative w-full overflow-hidden mb-4"
          style={{
            aspectRatio: '16/9',
            background: 'var(--fg-03)',
            border: '1px solid var(--fg-06)',
          }}
        >
          {/* Grid pattern inside card */}
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

          {/* Project index large */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="select-none"
              style={{
                fontFamily: 'var(--font-dot-gothic)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'var(--fg-06)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: 'var(--fg-04)' }}
          >
            <span
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              VIEW PROJECT →
            </span>
          </motion.div>

          {/* Status badge top-right */}
          {project.status === 'in-progress' && (
            <div
              className="absolute top-3 right-3 text-[8px] tracking-widest uppercase px-2 py-1 border"
              style={{
                borderColor: 'var(--fg-20)',
                color: 'var(--fg-50)',
                background: 'var(--bg)',
                fontFamily: 'var(--font-ibm-plex-mono)',
              }}
            >
              IN PROGRESS
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div
              className="absolute top-3 left-3 text-[8px] tracking-widest uppercase px-2 py-1 border"
              style={{
                borderColor: 'var(--fg-15)',
                color: 'var(--fg-40)',
                background: 'var(--bg)',
                fontFamily: 'var(--font-ibm-plex-mono)',
              }}
            >
              FEATURED
            </div>
          )}
        </div>

        {/* Card info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <motion.h3
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-dot-gothic)',
                fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                color: 'var(--fg)',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </motion.h3>
            <span
              className="text-[9px] tabular-nums shrink-0 pt-1"
              style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {project.year}
            </span>
          </div>

          <p
            className="text-[11px] leading-relaxed line-clamp-2"
            style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {project.description}
          </p>

          {/* Stack pills */}
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[8px] tracking-wider uppercase px-1.5 py-0.5 border"
                  style={{
                    borderColor: 'var(--fg-08)',
                    color: 'var(--fg-25)',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
