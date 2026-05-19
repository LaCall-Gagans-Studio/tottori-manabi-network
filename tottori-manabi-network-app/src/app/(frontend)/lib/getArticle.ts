import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ArticleTag, ArticleWriter } from '@/payload-types'
import { Media } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export interface Articles {
  id: string
  published: string
  name: string
  slogan_short: string
  tags: ArticleTag[] | null
  thumbnail: Media
  date_created: string
  date_updated: string
  createdBy: ArticleWriter | null
  keywords: string[]
}

export interface Article extends Articles {
  // richTexts
  pre: SerializedEditorState
  main: SerializedEditorState
}

////////////////////////////////////// 取得処理

// getArticles
export async function getArticles(queryString: string = ''): Promise<Articles[]> {
  const baseParams = new URLSearchParams({
    'where[published][equals]': 'true',
    'where[type][equals]': 'article',
    depth: '1',
    limit: '100',
  })

  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  try {
    const res = await fetch(apiUrl(`/api/article?${finalQuery}`), {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`[getArticles] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getArticles] unexpected error:', err)
    return []
  }
}

// getEvents
export async function getEvents(queryString: string = ''): Promise<Articles[]> {
  const baseParams = new URLSearchParams({
    'where[published][equals]': 'true',
    'where[type][equals]': 'events',
    depth: '1',
    limit: '100',
  })

  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  try {
    const res = await fetch(apiUrl(`/api/article?${finalQuery}`), {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`[getEvents] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getEvents] unexpected error:', err)
    return []
  }
}

// getArticle
export async function getArticle(id: string): Promise<Article | null> {
  const params = new URLSearchParams({
    'where[published][equals]': 'true',
    depth: '2',
  })

  try {
    const res = await fetch(apiUrl(`/api/article/${id}?${params.toString()}`), {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`[getArticle] fetch failed: ${res.status} ${res.statusText}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('[getArticle] unexpected error:', err)
    return null
  }
}
