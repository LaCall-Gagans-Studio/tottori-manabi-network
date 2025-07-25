// libs
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Metadata } from 'next'
import { siteConfig } from '../../siteConfig'

// components
import { getArticle } from '../../lib/getArticle'
import { FormatDate } from '../../lib/utils'
import { ShareButton } from '@/app/components/section.article/shareButton'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

// icons

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const article = await getArticle(resolvedParams.slug)

  if (!article) return notFound()

  return (
    <main>
      <Header />
      <div className="p-4 pt-4 lg:pt-12 pb-24 w-full relative flex mx-auto h-auto bg-ws-white lg:bg-transparent">
        {/* <div className="w-1/3 h-full relative">
          <div className="sticky top-0">
            <div className="flex items-center my-3 mb-12">
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
            </div>
          </div>
        </div> */}

        <div className="w-full lg:w-1/2 mx-auto">
          <img
            className="w-full h-full max-h-96 rounded-lg object-cover mb-24"
            src={article.thumbnail?.url ?? undefined}
            alt="サムネイル"
          />
          <h1 className="text-3xl font-bold text-ws-primary">{article.name}</h1>
          <div className="flex items-center my-6 mb-12">
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
          <div className="">
            <RichText data={article.main} className="prose max-w-none text-slate-600" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getArticle(params.slug)

  if (!article) return {}

  const title = `${article.name} | 鳥取のフリースクール・教育支援センター・不登校支援の現場を取材`
  const description =
    article.slogan_short?.slice(0, 100) +
    `${article.name} の取材記事です。不登校に関する生の声や支援の実態を紹介します。`
  const image = article.thumbnail?.url || `${siteConfig.url}/logo.png`
  const url = `${siteConfig.url}/dicts/${params.slug}`
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
          height: 630,
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
