import { DotGothic16, IBM_Plex_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { ScanlineOverlay } from '@/components/ui/ScanlineOverlay'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const dotGothic = DotGothic16({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dot-gothic',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className={`${dotGothic.variable} ${ibmPlexMono.variable}`}>
        {/* <NoiseOverlay />
        <ScanlineOverlay /> */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
