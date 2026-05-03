import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Certifications } from '@/collections/Certifications'
import { Experience } from '@/collections/Experience'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Projects } from '@/collections/Projects'
import { Stack } from '@/collections/Stack'
import { Users } from '@/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— AZRAYAAL CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
  collections: [Users, Media, Projects, Experience, Certifications, Stack, Pages],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
  typescript: {
    outputFile: path.resolve(dirname, '..', 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/azrayaal-v2',
    connectOptions: {
      // Fail fast in dev instead of waiting 30s
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    },
  }),
  plugins: [
    seoPlugin({
      collections: ['projects', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        return `${(doc as { title?: string })?.title ?? ''} — AZRAYAAL`
      },
      generateDescription: ({ doc }) => {
        return (doc as { description?: string })?.description ?? ''
      },
    }),
  ],
  sharp,
})
