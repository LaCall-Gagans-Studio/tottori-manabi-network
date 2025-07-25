import { siteConfig } from '../(frontend)/siteConfig'

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
  `

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
