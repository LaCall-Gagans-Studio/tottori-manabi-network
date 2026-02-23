export interface News {
  id: string
  name: string
  type: 'events' | 'article' | 'notice'
  date_created: string
  link: string
}

////////////////////////////////////// 取得処理

// getNews
export async function getNews(queryString: string = ''): Promise<News[]> {
  const baseParams = new URLSearchParams({
    depth: '1',
    limit: '200',
  })

  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?${finalQuery}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`[getNews] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getNews] unexpected error:', err)
    return []
  }
}
