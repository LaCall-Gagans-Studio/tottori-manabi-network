import { Suspense } from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

import { getArticles } from '../lib/getArticle'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { FormatDate } from '../lib/utils'
import { ShareButton } from '@/app/components/section.article/shareButton'
import { ArticlesFilter } from './articlesFilter'
import { buildArticleQuery } from '../lib/ArticleQuery'
import { siteConfig } from '../siteConfig'
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildItemListSchema,
} from '../JsonLd'

function ArticleListSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse" aria-hidden="true">
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

async function ArticleList({ query, tags }: { query: string; tags: number[] }) {
  const rawArticles = await getArticles(query)
  const articles = tags.length
    ? rawArticles.filter((article) => article.tags?.some((tag) => tags.includes(tag.id)))
    : rawArticles

  return (
    <div>
      {articles.length === 0 ? (
        <p className="text-center text-slate-700 text-sm">
          該当する記事が見つかりませんでした。
        </p>
      ) : (
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-8 list-none">
          {articles.map((article) => (
            <li key={article.id}>
              <a
                href={`/articles/${article.id}`}
                aria-label={`${article.name}の記事を読む`}
                className="relative group duration-300 cursor-pointer flex-col flex gap-2"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={article.thumbnail?.url || '/logo.png'}
                    alt={article.thumbnail?.alt || `${article.name}のサムネイル`}
                    fill
                    sizes="(min-width: 1024px) 280px, 45vw"
                    loading="lazy"
                    className="object-cover group-hover:opacity-70 transition-opacity duration-300"
                  />
                </div>
                <h2 className="text-base lg:text-lg font-bold line-clamp-2">{article.name}</h2>
                <p className="text-xs text-slate-700 line-clamp-2">{article.slogan_short}</p>
                <div className="flex items-center my-3">
                  {article.createdBy?.icon &&
                  typeof article.createdBy.icon === 'object' &&
                  article.createdBy.icon.url ? (
                    <Image
                      src={article.createdBy.icon.url}
                      alt={`${article.createdBy.name ?? '匿名'}のアイコン`}
                      width={24}
                      height={24}
                      sizes="24px"
                      className="w-6 h-6 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="w-6 h-6 rounded-full bg-slate-200 inline-block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="text-xs text-slate-700 ml-2">
                    <p>{article.createdBy?.name ? article.createdBy.name : '匿名投稿'}</p>
                    <time dateTime={article.date_updated}>
                      <FormatDate date={article.date_updated} />
                    </time>
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-2">
                <ShareButton title={article.name} id={article.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {articles.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            ...buildItemListSchema({
              url: `${siteConfig.url}/articles`,
              items: articles.map((a) => ({
                name: a.name,
                url: `/articles/${a.id}`,
              })),
            }),
          }}
        />
      )}
    </div>
  )
}

export default async function ArticlesPage({
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
    <>
      <Header />
      <main>
        <h1 className="sr-only">{title}</h1>
        <div className="p-4 pt-4 lg:pt-12 mb-12 lg:h-full w-full mx-auto bg-ws-white z-20">
          <div className="w-11/12 lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-6 relative">
            <ArticlesFilter />
            <Suspense fallback={<ArticleListSkeleton />}>
              <ArticleList query={query} tags={tags} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url,
          isPartOf: { '@id': `${siteConfig.url}/#website` },
          breadcrumb: buildBreadcrumbSchema([
            { name: 'ホーム', url: '/' },
            { name: 'コラム一覧', url: '/articles' },
          ]),
        }}
      />
    </>
  )
}

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
  alternates: { canonical: '/articles' },
}
