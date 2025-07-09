// libs
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
// import RadarChartBlock from '@/app/components/section.dict/radarChartBlock'
import WordCloudCanvas from '@/app/components/section.dict/wordCloudBlock'

// components
import { getArticle } from '../../lib/getArticle'
import {
  Accordion,
  ImageCarousel,
  GoogleMapEmbed,
  FormatDate,
  Tooltips,
  DictTargetsConverts,
} from '../../lib/utils'

// icons
import {
  CiUser,
  CiLocationArrow1,
  CiForkAndKnife,
  CiClock1,
  CiCoins1,
  CiCalendarDate,
  CiSquareMore,
  CiFaceSmile,
  CiBookmarkCheck,
  CiStopwatch,
} from 'react-icons/ci'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

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
            className="w-full h-80 rounded-lg object-cover mb-24"
            src={article.thumbnail?.url ?? undefined}
            alt="サムネイル"
          />
          <h1 className="text-3xl font-bold text-ws-primary">{article.name}</h1>
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
          <RichText data={article.main} className="" />
        </div>
      </div>

      <Footer />
    </main>
  )
}
