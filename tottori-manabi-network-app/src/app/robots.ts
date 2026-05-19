import type { MetadataRoute } from 'next'

import { siteConfig } from './(frontend)/siteConfig'

/*
  Next.js App Router 標準の robots.txt 生成。
  - URL: /robots.txt (Next.js が自動配信)
  - sitemap の絶対 URL を含めることで Google Search Console が自動検出可能
  - 管理画面 (Payload) と内部 API はクロール対象から除外
*/

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url ?? 'https://www.tuna-kan.org'
  return url.replace(/\/+$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*', '/_next/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
