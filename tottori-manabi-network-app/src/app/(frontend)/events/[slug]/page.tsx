import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import Image from 'next/image'

import { getArticle } from '../../lib/getArticle'
import { FormatDate } from '../../lib/utils'
import { ShareButton } from '@/app/components/section.article/shareButton'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { siteConfig } from '../../siteConfig'
import RichTextWithToc from '@/app/components/section.article/richTextWithToc'
import {
  JsonLd,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../../JsonLd'

import { CiLogout } from 'react-icons/ci'

export default async function EventDetailPage(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const article = await getArticle(resolvedParams.slug)

  if (!article) return notFound()

  const articleUrl = `${siteConfig.url}/events/${article.id}`
  const articleImage = article.thumbnail?.url || `${siteConfig.url}/logo.png`

  return (
    <>
      <Header />
      <main>
        <article className="p-4 pt-4 lg:pt-12 pb-6 w-full flex items-start mx-auto h-auto">
          <aside
            className="hidden lg:block w-56 sticky top-24 self-start pb-3 px-6"
            aria-label="記事サイドバー"
          >
            <Link href="/articles" aria-label="コラム一覧に戻る">
              <CiLogout
                className="text-3xl bg-ws-primary text-white rounded-full p-1 font-semibold hover:text-ws-primary hover:bg-white duration-300"
                aria-hidden="true"
              />
            </Link>

            <div className="flex items-center mt-6">
              {article.createdBy?.icon &&
              typeof article.createdBy.icon === 'object' &&
              article.createdBy.icon.url ? (
                <Image
                  src={article.createdBy.icon.url}
                  alt={`${article.createdBy.name ?? '匿名'}のアイコン`}
                  width={40}
                  height={40}
                  sizes="40px"
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  className="w-10 h-10 rounded-full bg-slate-200 inline-block"
                  aria-hidden="true"
                />
              )}

              <p className="text-lg font-medium ml-3">
                {article.createdBy?.name ? article.createdBy.name : '匿名投稿'}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              {article.createdBy?.comment
                ? article.createdBy.comment
                : '匿名で投稿されています。'}
            </p>
            <div className="mt-6">
              <Link
                href="/about#staff"
                className="mt-6 px-3 py-2 bg-ws-primary text-white text-xs font-medium hover:text-ws-primary hover:bg-white hover:border-ws-primary hover:border rounded-lg duration-300"
              >
                つなかんメンバーを見る
              </Link>
            </div>
          </aside>

          <div className="w-11/12 lg:w-1/2 mx-auto">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-12 lg:mb-24">
              <Image
                src={articleImage}
                alt={article.thumbnail?.alt || `${article.name}のサムネイル`}
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                priority
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-ws-primary">{article.name}</h1>
            <div className="flex items-center my-6 lg:my-12">
              {article.createdBy?.icon &&
              typeof article.createdBy.icon === 'object' &&
              article.createdBy.icon.url ? (
                <Image
                  src={article.createdBy.icon.url}
                  alt={`${article.createdBy.name ?? '匿名'}のアイコン`}
                  width={32}
                  height={32}
                  sizes="32px"
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  className="w-8 h-8 rounded-full bg-slate-200 inline-block"
                  aria-hidden="true"
                />
              )}

              <div className="text-sm text-slate-700 ml-2">
                <p>{article.createdBy?.name ? article.createdBy.name : '匿名投稿'}</p>
                <time dateTime={article.date_updated}>
                  <FormatDate date={article.date_updated} />
                </time>
              </div>

              <div className="ml-12">
                <ShareButton title={article.name} id={article.id} />
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <RichText data={article.pre} className="max-w-none" />
                <RichTextWithToc data={article.main} />
              </div>
            </div>
          </div>

          <aside className="hidden lg:block w-56 sticky top-24 self-start" aria-hidden="true" />
        </article>
      </main>

      <section
        className="w-11/12 lg:w-1/2 mx-auto pb-24 border-t border-t-slate-400"
        aria-label="記事の関連情報・著者プロフィール"
      >
        <nav aria-label="記事のタグ" className="flex mt-6 gap-2 flex-wrap">
          {article.tags?.map((tag) => (
            <Link
              href={'/articles?tags=' + tag.id}
              key={tag.id}
              className="border px-2 py-1 rounded cursor-pointer hover:bg-ws-primary hover:text-white duration-300 min-h-[36px] inline-flex items-center"
            >
              {tag.name}
            </Link>
          ))}
        </nav>

        <div className="flex mt-6 text-4xl lg:text-3xl">
          <ShareButton title={article.name} id={article.id} />
        </div>
        <div className="flex relative mt-12">
          {article.createdBy?.icon &&
          typeof article.createdBy.icon === 'object' &&
          article.createdBy.icon.url ? (
            <Image
              src={article.createdBy.icon.url}
              alt={`${article.createdBy.name ?? '匿名'}のアイコン`}
              width={80}
              height={80}
              sizes="80px"
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              loading="lazy"
            />
          ) : (
            <span
              className="w-20 h-20 rounded-full bg-slate-200 inline-block flex-shrink-0"
              aria-hidden="true"
            />
          )}

          <div className="ml-3">
            <p className="text-xl font-medium">
              {article.createdBy?.name ? article.createdBy.name : '匿名投稿'}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {article.createdBy?.comment
                ? article.createdBy.comment
                : '匿名で投稿されています。'}
            </p>
            <div className="mt-1 text-xs lg:text-sm text-slate-700">
              {article.createdBy?.main ? (
                <RichText data={article.createdBy.main} className="max-w-none" />
              ) : (
                '匿名で投稿されています。'
              )}
            </div>
          </div>

          <div className="absolute top-0 right-0">
            <Link
              href="/about#staff"
              className="mt-6 px-3 py-2 bg-ws-primary text-white text-xs font-medium hover:text-ws-primary hover:bg-white hover:border-ws-primary hover:border rounded-lg duration-300 inline-flex min-h-[36px] items-center"
            >
              つなかんメンバーを見る
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...buildArticleSchema({
            title: article.name,
            description: article.slogan_short ?? '',
            image: articleImage,
            url: articleUrl,
            datePublished: article.date_created,
            dateModified: article.date_updated,
            authorName: article.createdBy?.name ?? undefined,
          }),
          breadcrumb: buildBreadcrumbSchema([
            { name: 'ホーム', url: '/' },
            { name: 'イベント・相談会', url: '/events' },
            { name: article.name, url: `/events/${article.id}` },
          ]),
        }}
      />
    </>
  )
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const article = await getArticle(resolvedParams.slug)

  if (!article) return {}

  const title = `${article.name} | 鳥取のフリースクール・教育支援センター・不登校支援イベント`
  const description =
    (article.slogan_short?.slice(0, 100) ?? '') +
    `${article.name} の取材記事です。不登校に関する生の声や支援の実態を紹介します。`
  const image = article.thumbnail?.url || `${siteConfig.url}/logo.png`
  const url = `${siteConfig.url}/events/${article.id}`
  const keywords = [...(siteConfig.keywords || []), article.name]

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 800,
          alt: article.name,
        },
      ],
      publishedTime: article.date_created,
      modifiedTime: article.date_updated,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `/events/${article.id}`,
    },
  }
}
