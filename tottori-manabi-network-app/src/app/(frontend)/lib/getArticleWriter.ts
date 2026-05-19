import { ArticleWriter } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export async function getArticleWriter(): Promise<ArticleWriter[]> {
  try {
    const res = await fetch(apiUrl('/api/articleWriter?limit=1000'), {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error(`[getArticleWriter] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getArticleWriter] unexpected error:', err)
    return []
  }
}
