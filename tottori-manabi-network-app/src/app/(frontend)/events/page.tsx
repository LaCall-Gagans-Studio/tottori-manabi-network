// components
import { Suspense } from 'react'
import { getEvents } from '../lib/getArticle'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { FormatDate } from '../lib/utils'
import { ShareButton } from '@/app/components/section.article/shareButton'
import { buildArticleQuery } from '../lib/ArticleQuery'

// ─── Skeleton ───────────────────────────────────
function EventListSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="w-full aspect-[4/3] rounded-lg bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

// ─── データ取得コンポーネント ────────────────────────
async function EventList({ query, tags }: { query: string; tags: number[] }) {
  const rawArticles = await getEvents(query)
  const articles = tags.length
    ? rawArticles.filter((article) => article.tags?.some((tag) => tags.includes(tag.id)))
    : rawArticles

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.length === 0 && (
        <div className="col-span-2 lg:col-span-3 text-center text-slate-500 text-sm">
          該当する記事が見つかりませんでした。
        </div>
      )}
      {articles?.map((article) => (
        <div key={article.id}>
          <a
            href={`/articles/${article.id}`}
            className="relative group duration-300 cursor-pointer flex-col flex gap-2 group"
          >
            <img
              className="w-full aspect-[4/3] rounded-lg object-cover group-hover:opacity-30 group-hover:duration-300"
              src={article.thumbnail?.url ?? undefined}
              alt="サムネイル"
            />
            <h1 className="text-base lg:text-lg font-bold line-clamp-2">{article.name}</h1>
            <h2 className="text-xs text-slate-400 line-clamp-2">{article.slogan_short}</h2>
            <div className="flex items-center my-3">
              <img
                className="w-6 h-6 rounded-full"
                src={
                  article.createdBy?.icon && typeof article.createdBy.icon === 'object'
                    ? (article.createdBy.icon.url ?? undefined)
                    : undefined
                }
                alt="ライターのアイコン"
              />
              <div className="text-xs text-slate-600 ml-2">
                <p>{article.createdBy?.name ? article.createdBy.name : '匿名投稿'}</p>
                <span>
                  <FormatDate date={article.date_updated} />
                </span>
              </div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <ShareButton title={article.name} id={article.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── ページ ─────────────────────────────────────
export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams

  const tags =
    resolvedParams.tags
      ?.split(',')
      .map(Number)
      .filter((n) => !isNaN(n)) || []

  const query = buildArticleQuery({ tags })

  return (
    <main>
      <Header />
      <div className="p-4 pt-4 lg:pt-12 mb-12 lg:h-full w-full mx-auto bg-ws-white z-20">
        <div className="w-11/12 lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-6 relative">
          <Suspense fallback={<EventListSkeleton />}>
            <EventList query={query} tags={tags} />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}

import { Metadata } from 'next'
import { siteConfig } from '../siteConfig'

const title = '鳥取の不登校・教育支援コラム一覧'
const description =
  '鳥取県内のフリースクールや教育支援に関する記事・体験談・コラムを一覧で紹介。不登校支援のヒントや地域の取り組みを知るための読み物コンテンツです。'
const url = `${siteConfig.url}/articles`
const image = `${siteConfig.url}/logo.png`
const keywords = [
  ...siteConfig.keywords,
  '不登校コラム',
  '教育支援',
  'フリースクール',
  '体験談',
  '子ども支援',
  '鳥取',
  '読み物',
  '教育記事',
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
