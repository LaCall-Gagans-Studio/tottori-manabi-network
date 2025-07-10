import { getNews } from '@/app/(frontend)/lib/getNews'
import NewsClient from './newsClient'

export default async function News() {
  // データ取得
  const rawNews = await getNews()

  console.log(rawNews)

  return <NewsClient allData={rawNews} />
}
