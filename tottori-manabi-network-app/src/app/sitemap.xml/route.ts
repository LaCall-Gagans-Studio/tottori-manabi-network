import { getArticles } from '../(frontend)/lib/getArticle'
import { getDicts } from '../(frontend)/lib/getDict'
import { siteConfig } from '../(frontend)/siteConfig'

export async function GET() {
  const baseUrl = siteConfig.url

  // 固定ページのルート
  const staticRoutes = ['', 'dicts', 'articles', 'news', 'about']

  // データ取得
  const [dicts, articles] = await Promise.all([getDicts(), getArticles()])

  // 辞書エントリ（dicts）は ID で遷移しているようなので注意
  const dictRoutes = dicts.map((entry) => `dicts/${entry.id}`)
  const articleRoutes = articles.map((article) => `articles/${article.id}`)

  const allRoutes = [...staticRoutes, ...dictRoutes, ...articleRoutes]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}/${route}</loc>
  </url>`,
  )
  .join('')}
</urlset>`

  return new Response(body.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
