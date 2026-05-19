import { ArticleTag } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export async function getArticleTags(): Promise<ArticleTag[]> {
  try {
    const res = await fetch(apiUrl('/api/articleTags?limit=1000'), {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error(`[getArticleTags] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getArticleTags] unexpected error:', err)
    return []
  }
}
