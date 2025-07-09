import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ArticleTag, ArticleWriter } from '@/payload-types'
import { Media } from '@/payload-types'

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
  main: SerializedEditorState
}

////////////////////////////////////// 取得処理

// getArticles
export async function getArticles(queryString: string = ''): Promise<Articles[]> {
  const baseParams = new URLSearchParams({
    'where[published][equals]': 'true',
    depth: '2',
    limit: '1000',
  })

  // 追加クエリがある場合は末尾に追加
  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  console.log(finalQuery)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/article?${finalQuery}`, {
    cache: 'no-store',
  })

  const json = await res.json()
  return json.docs
}

// getArticle
export async function getArticle(id: string): Promise<Article> {
  const params = new URLSearchParams({
    'where[published][equals]': 'true',
    depth: '2',
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}?${params.toString()}`,
    {
      cache: 'no-store',
    },
  )

  const json = await res.json()
  return json
}
