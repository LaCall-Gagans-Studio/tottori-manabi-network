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
    limit: '1000',
  })

  // 追加クエリがある場合は末尾に追加
  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  console.log(finalQuery)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?${finalQuery}`, {
    cache: 'no-store',
  })

  const json = await res.json()
  return json.docs
}
