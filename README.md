# AZRAYAAL — Portfolio v2

A cinematic futuristic developer portfolio inspired by Vercel Ship Sydney. Built as a premium digital experience at the intersection of a technology conference, operating system, and digital art installation.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Animation | Framer Motion |
| CMS | Payload CMS v3 |
| Database | MongoDB |
| Rich Text | Lexical Editor |
| Fonts | DotGothic16 (display), IBM Plex Mono (UI) |

## Design Direction

- **Monochrome only** — `#000000` background, `#FFFFFF` text
- **Brutalist futuristic** — oversized typography, editorial spacing, grid composition
- **CRT aesthetic** — scanline overlays, noise textures, dot matrix typography
- **Cinematic motion** — slow fade reveals, scroll-triggered animations, magnetic hover

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally (`mongodb://localhost:27017`)

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the frontend.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload CMS admin.

### Environment Variables

Copy `.env.local` and update:

```env
DATABASE_URI=mongodb://localhost:27017/azrayaal-v2
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/        # Public-facing routes
│   │   ├── page.tsx        # Homepage
│   │   ├── projects/       # Projects listing + detail
│   │   ├── about/          # About page
│   │   └── contact/        # Contact page
│   └── (payload)/          # Payload CMS routes
│       ├── admin/          # Admin dashboard
│       └── api/            # REST API
│
├── components/
│   ├── layout/             # Navbar, Footer, Container
│   ├── sections/           # Hero, About, Experience, Projects, Stack, Certifications, Contact
│   └── ui/                 # GridBackground, NoiseOverlay, ScanlineOverlay, Marquee, etc.
│
├── collections/            # Payload CMS collections
├── lib/                    # Data fetching utilities
├── hooks/                  # useMousePosition, useScrollProgress
├── styles/                 # animations.css, effects.css, typography.css
└── types/                  # TypeScript interfaces
```

## CMS Collections

- **Projects** — Portfolio work with Lexical rich text, gallery, stack, status
- **Experience** — Work history with dates, technologies, location
- **Certifications** — Credentials with issuer, date, verification URL
- **Stack** — Tech categories with ordered technology lists
- **Pages** — Flexible page builder
- **Media** — Image/video uploads with optimization
- **Users** — Admin authentication with role management

## Features

- Server-side rendering with ISR (60s revalidation)
- Draft/publish system via Payload versions
- SEO plugin with meta fields
- Graceful fallback to static data when DB is offline
- CRT scanlines + noise texture overlays
- Scroll-triggered reveal animations
- Magnetic button interactions
- Infinite marquee belt
- Text scramble (DotMatrix) effect
- Cinematic hero with parallax
- Terminal-style metadata UI
# azrayaalv2
