import { ArticleWriter } from '@/payload-types'

export async function getArticleWriter(): Promise<ArticleWriter[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articleWriter?limit=1000`, {
    cache: 'no-store',
  })
  const json = await res.json()
  return json.docs
}
