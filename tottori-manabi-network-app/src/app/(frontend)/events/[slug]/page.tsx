// libs
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

// components
import { getArticle } from '../../lib/getArticle'
import { FormatDate } from '../../lib/utils'
import { ShareButton } from '@/app/components/section.article/shareButton'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { siteConfig } from '../../siteConfig'
import RichTextWithToc from '@/app/components/section.article/richTextWithToc'

// icons
import { CiLogout } from 'react-icons/ci'

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const article = await getArticle(resolvedParams.slug)

  if (!article) return notFound()

  return (
    <main>
      <Header />
      <div className="p-4 pt-4 lg:pt-12 pb-6 w-full flex items-start mx-auto h-auto">
        <aside className="hidden lg:block w-56 sticky top-24 self-start pb-3 px-6 ">
          <Link href="/articles">
            <CiLogout className="text-3xl bg-ws-primary text-white rounded-full p-1 font-semibold hover:text-ws-primary hover:bg-white duration-300" />
          </Link>

          <div className="flex items-center mt-6">
            <img
              className="w-10 h-10 rounded-full"
              src={
                article.createdBy?.icon && typeof article.createdBy.icon === 'object'
                  ? (article.createdBy.icon.url ?? undefined)
                  : undefined
              }
              alt="ライターのアイコン"
            />

            <p className="text-lg font-medium ml-3">
              {article.createdBy?.name ? article.createdBy.name : '匿名投稿'}
            </p>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {article.createdBy?.comment ? article.createdBy.comment : '匿名で投稿されています。'}
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
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-12 lg:mb-24">
            <img
              className="w-full h-full object-cover"
              src={article.thumbnail?.url ?? undefined}
              alt="サムネイル"
            />
          </div>
          <h1 className="text-3xl font-bold text-ws-primary">{article.name}</h1>
          <div className="flex items-center my-6 lg:my-12">
            <img
              className="w-8 h-8 rounded-full"
              src={
                article.createdBy?.icon && typeof article.createdBy.icon === 'object'
                  ? (article.createdBy.icon.url ?? undefined)
                  : undefined
              }
              alt="ライターのアイコン"
            />

            <div className="text-sm text-slate-600 ml-2">
              <p>{article.createdBy?.name ? article.createdBy.name : '匿名投稿'}</p>
              <span>
                <FormatDate date={article.date_updated} />
              </span>
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

        <aside className="hidden lg:block w-56 sticky top-24 self-start"></aside>
      </div>

      {/* 最後のプロフィール */}
      <div className="w-11/12 lg:w-1/2 mx-auto pb-24 border-t border-t-slate-400">
        <div className="flex mt-6 gap-2">
          {article.tags?.map((tag) => (
            <Link
              href={'/articles?tags=' + tag.id}
              key={tag.id}
              className="border px-1 py-1 rounded cursor-pointer hover:bg-ws-primary hover:text-white duration-300"
            >
              {tag.name}
            </Link>
          ))}
        </div>

        <div className="flex mt-6 text-4xl lg:text-3xl">
          <ShareButton title={article.name} id={article.id} />
        </div>
        <div className="flex relative mt-12">
          <img
            className="w-20 h-20 rounded-full"
            src={
              article.createdBy?.icon && typeof article.createdBy.icon === 'object'
                ? (article.createdBy.icon.url ?? undefined)
                : undefined
            }
            alt="ライターのアイコン"
          />

          <div className="ml-3">
            <p className="text-xl font-medium ">
              {article.createdBy?.name ? article.createdBy.name : '匿名投稿'}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {article.createdBy?.comment ? article.createdBy.comment : '匿名で投稿されています。'}
            </p>
            <div className="mt-1 text-xs lg:text-sm text-slate-500">
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
              className="mt-6 px-3 py-2 bg-ws-primary text-white text-xs font-medium hover:text-ws-primary hover:bg-white hover:border-ws-primary hover:border rounded-lg duration-300"
            >
              つなかんメンバーを見る
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const article = await getArticle(resolvedParams.slug)

  if (!article) return {}

  const title = `${article.name} | 鳥取のフリースクール・教育支援センター・不登校支援の現場を取材`
  const description =
    article.slogan_short?.slice(0, 100) +
    `${article.name} の取材記事です。不登校に関する生の声や支援の実態を紹介します。`
  const image = article.thumbnail?.url || `${siteConfig.url}/logo.png`
  const url = `${siteConfig.url}/articles/${article.id}`
  const keywords = [...(siteConfig.keywords || []), article.name]

  return {
    title,
    description,
    keywords,
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    metadataBase: new URL('https://tuna-kan.org'),
    alternates: {
      canonical: url,
    },
  }
}
