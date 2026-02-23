import { Suspense } from 'react'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { getNews } from '../lib/getNews'
import { FormatDate } from '@/app/(frontend)/lib/utils'
import type { News } from '../lib/getNews'
import Link from 'next/link'

// icon
import { CiSquareChevRight } from 'react-icons/ci'

const categoryMap: Record<News['type'], { label: string; class: string }> = {
  events: { label: '相談会・配信', class: 'bg-ws-secondary' },
  article: { label: 'コラム・特集', class: 'bg-ws-primary' },
  notice: { label: 'お知らせ', class: 'bg-ws-tertiary' },
}

// ─── Skeleton ───────────────────────────────────
function NewsListSkeleton() {
  return (
    <ul className="animate-pulse">
      {[...Array(8)].map((_, i) => (
        <li key={i} className="border-b-2 border-dotted border-ws-black py-4">
          <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </li>
      ))}
    </ul>
  )
}

// ─── データ取得コンポーネント ────────────────────────
async function NewsList({ q }: { q: string }) {
  const queryString = `where[type][equals]=${q}`
  const filteredNews = await getNews(queryString)

  return filteredNews.length > 0 ? (
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
  )
}

// ─── ページ ─────────────────────────────────────
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams
  const q = resolvedParams.q || 'notice'

  return (
    <main>
      <Header />

      <section className="w-11/12 lg:w-3/4 mx-auto py-12">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
          {categoryMap[q as keyof typeof categoryMap]?.label ?? '最新情報'}
        </h1>

        <Suspense fallback={<NewsListSkeleton />}>
          <NewsList q={q} />
        </Suspense>
      </section>

      <Footer />
    </main>
  )
}

import { Metadata } from 'next'
import { siteConfig } from '../siteConfig'

const title = '最新のお知らせ・コラム・相談会情報 - 鳥取のフリースクールポータル「つなかん」'
const description =
  '鳥取県内の不登校支援に関する最新情報を掲載。相談会、イベント、配信、コラム、お知らせなどを随時更新。不登校の子どもと保護者をサポートする「つなかん」の公式インフォメーションページ。'
const url = `${siteConfig.url}/news`
const image = `${siteConfig.url}/logo.png`
const keywords = [
  ...siteConfig.keywords,
  'イベント情報',
  '不登校 相談会',
  'コラム 鳥取',
  '不登校支援 情報',
  'お知らせ フリースクール',
]

export const metadata: Metadata = {
  title,
  description,
  keywords,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    images: [{ url: image, width: 1200, height: 800, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
  alternates: { canonical: url },
}
