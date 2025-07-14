import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { getNews } from '../lib/getNews'
import { FormatDate } from '@/app/(frontend)/lib/utils'
import type { News } from '../lib/getNews'
import Link from 'next/link'

// icon
import { CiSquareChevRight } from 'react-icons/ci'

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams
  const q = resolvedParams.q || 'notice'

  // PayloadCMS 用のクエリを構築
  const queryString = `where[type][equals]=${q}`

  // 絞り込んで取得
  const filteredNews = await getNews(queryString)

  const categoryMap: Record<News['type'], { label: string; class: string }> = {
    events: { label: '相談会・配信', class: 'bg-ws-secondary' },
    article: { label: 'コラム・特集', class: 'bg-ws-primary' },
    notice: { label: 'お知らせ', class: 'bg-ws-tertiary' },
  }

  return (
    <main>
      <Header />

      <section className="w-11/12 lg:w-3/4 mx-auto py-12">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
          {categoryMap[q as keyof typeof categoryMap]?.label ?? '最新情報'}
        </h1>

        {filteredNews.length > 0 ? (
          <ul>
            {filteredNews.map((article) => (
              <li
                key={article.id}
                className="flex flex-col item-start border-b-2 border-dotted border-ws-black py-4 group"
              >
                <time className="text-gray-500 text-sm text-nowrap group-hover:underline mb-1">
                  <FormatDate date={article.date_created} />
                </time>
                <div className="flex items-center justify-between gap-3 sm:gap-5">
                  <CiSquareChevRight className="text-2xl sm:text-3xl text-ws-primary group-hover:text-white group-hover:bg-ws-primary rounded-lg duration-300" />
                  <Link
                    href={article.link}
                    className="hover:underline w-11/12 text-ws-primary text-base sm:text-xl font-semibold group-hover:underline leading-relaxed line-clamp-1"
                  >
                    {article.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-8">現在、記事はありません。</p>
        )}
      </section>

      <Footer />
    </main>
  )
}
