import { cn } from '@/lib/utils'

interface SectionLabelProps {
  index?: string | number
  label: string
  className?: string
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {index !== undefined && (
        <span
          className="text-[10px] tracking-widest uppercase shrink-0"
          style={{ color: 'var(--fg-70)', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          [{String(index).padStart(2, '0')}]
        </span>
      )}
      <span
        className="text-[10px] tracking-[0.25em] uppercase shrink-0"
        style={{ color: 'var(--fg )', fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--fg-08)' }} />
    </div>
  )
}
