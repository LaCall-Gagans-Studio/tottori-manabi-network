// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Dict } from './collections/Dict'
import { DictTags } from './collections/DictTags'
import { DictTargets } from './collections/DictTargets'
import { DictType } from './collections/DictType'
import { Article } from './collections/Article'
import { ArticleTags } from './collections/ArticleTags'
import { ArticleWriter } from './collections/ArticleWriter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: ['https://www.tuna-kan.org', 'https://localhost:3000/'],
  collections: [
    Users,
    Media,
    Dict,
    DictTags,
    DictTargets,
    DictType,
    Article,
    ArticleTags,
    ArticleWriter,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true, // Apply storage to 'media' collection
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto', // Cloudflare R2 uses 'auto' as the region
        endpoint: process.env.R2_PUBLIC_URL || '',
      },
    }),
  ],
})
