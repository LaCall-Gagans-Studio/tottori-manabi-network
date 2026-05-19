import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { getNews } from '../lib/getNews'
import { FormatDate } from '@/app/(frontend)/lib/utils'
import type { News } from '../lib/getNews'
import { siteConfig } from '../siteConfig'
import { JsonLd, buildBreadcrumbSchema } from '../JsonLd'

import { CiSquareChevRight } from 'react-icons/ci'

const categoryMap: Record<News['type'], { label: string; class: string }> = {
  events: { label: '相談会・配信', class: 'bg-ws-secondary' },
  article: { label: 'コラム・特集', class: 'bg-ws-primary' },
  notice: { label: 'お知らせ', class: 'bg-ws-tertiary' },
}

function NewsListSkeleton() {
  return (
    <ul className="animate-pulse" aria-hidden="true">
      {[...Array(8)].map((_, i) => (
        <li key={i} className="border-b-2 border-dotted border-ws-black py-4">
          <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </li>
      ))}
    </ul>
  )
}

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
          <time
            dateTime={article.date_created}
            className="text-gray-700 text-sm text-nowrap group-hover:underline mb-1"
          >
            <FormatDate date={article.date_created} />
          </time>
          <div className="flex items-center justify-between gap-3 sm:gap-5">
            <CiSquareChevRight
              className="text-2xl sm:text-3xl text-ws-primary group-hover:text-white group-hover:bg-ws-primary rounded-lg duration-300"
              aria-hidden="true"
            />
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
    <p className="text-gray-700 text-center py-8">現在、記事はありません。</p>
  )
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams
  const q = resolvedParams.q || 'notice'
  const categoryLabel = categoryMap[q as keyof typeof categoryMap]?.label ?? '最新情報'

  return (
    <>
      <Header />
      <main>
        <section
          className="w-11/12 lg:w-3/4 mx-auto py-12"
          aria-labelledby="news-page-heading"
        >
          <h1 id="news-page-heading" className="text-center text-3xl font-bold mb-6 text-gray-800">
            {categoryLabel}
          </h1>

          <Suspense fallback={<NewsListSkeleton />}>
            <NewsList q={q} />
          </Suspense>
        </section>
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${categoryLabel} | ${siteConfig.siteName}`,
          url: `${siteConfig.url}/news?q=${q}`,
          isPartOf: { '@id': `${siteConfig.url}/#website` },
          breadcrumb: buildBreadcrumbSchema([
            { name: 'ホーム', url: '/' },
            { name: categoryLabel, url: `/news?q=${q}` },
          ]),
        }}
      />
    </>
  )
}

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
  alternates: { canonical: '/news' },
}
