'use client'

export function ScanlineOverlay() {
  return (
    <>
      {/* CRT scanlines — uses --scanline-color so light mode stays subtle */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            var(--scanline-color) 2px,
            var(--scanline-color) 4px
          )`,
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[9996]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 60%, color-mix(in srgb, var(--bg) 50%, transparent) 100%)`,
        }}
      />
    </>
  )
}
