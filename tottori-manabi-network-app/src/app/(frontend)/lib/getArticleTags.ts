import { ArticleTag } from '@/payload-types'

export async function getArticleTags(): Promise<ArticleTag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articleTags?limit=1000`, {
    cache: 'no-store',
  })
  const json = await res.json()
  return json.docs
}
