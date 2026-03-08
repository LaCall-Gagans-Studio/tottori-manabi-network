// libs
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
// import RadarChartBlock from '@/app/components/section.dict/radarChartBlock'
import WordCloudCanvas from '@/app/components/section.dict/wordCloudBlock'
import { siteConfig } from '../../siteConfig'
import Link from 'next/link'

// components
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { getDict } from '../../lib/getDict'
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

export default async function DictPage(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const dict = await getDict(resolvedParams.slug)

  if (!dict) return notFound()

  return (
    <main>
      <Header />
      <div className="p-4 pt-4 lg:pt-12  w-full mx-auto bg-[#f8fdee] lg:bg-transparent z-20">
        <div className="w-full lg:max-w-[1200px] lg:w-4/5 h-auto mx-auto">
          <h1 className="text-3xl font-bold text-ws-primary">{dict.name}</h1>
          <h2 className="text-lg">{dict.org}</h2>

          {dict.chair && <p className="text-sm text-slate-500">代表者：{dict.chair}</p>}
          <p className="text-sm text-slate-500">{dict.address}</p>

          <div className="text-sm flex gap-1 lg:gap-2 py-2 flex-wrap">
            {dict.tags?.map((tag) => (
              <Link
                href={'/dicts?tags=' + tag.id}
                key={tag.id}
                className="bg-ws-black px-1 py-1 rounded text-slate-50 cursor-pointer hover:bg-ws-primary duration-300"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <div className="flex mt-6 flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 h-72 lg:h-96">
              <ImageCarousel
                imgs={
                  dict.gallery?.map((media) => ({
                    id: media?.id,
                    alt: media?.alt || '',
                    url: media?.url || '',
                  })) ?? []
                }
              />
            </div>
            <div className="w-full lg:w-3/5 p-1 ml-2">
              <h1 className="text-2xl mb-3">{dict.slogan_short}</h1>
              <h3 className="text-base whitespace-pre-wrap">{dict.slogan_long}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm lg:text-base mx-auto w-10/12 mt-12">
            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
              <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                <CiUser />
                <p className="text-sm lg:text-base">対象</p>
              </div>
              <div className="text-base flex">
                {dict.targets && <DictTargetsConverts targets={dict.targets} />}
              </div>
            </div>
            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
              <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                <CiLocationArrow1 />
                <p className="text-sm lg:text-base">送迎</p>
              </div>
              <div className="text-center">{dict.transport}</div>
            </div>
            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
              <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                <CiForkAndKnife />
                <p className="text-sm lg:text-base">給食</p>
              </div>
              <div className="text-center">{dict.lunch}</div>
            </div>
          </div>

          <div className="bg-ws-gray w-full lg:w-10/12 mx-auto mt-12 relative p-6">
            <FaQuoteLeft className="absolute left-1" />
            <p className="text-base lg:text-lg whitespace-pre-wrap">{dict.citation}</p>
            <FaQuoteRight className="absolute right-1" />
            <a href={dict.link} className="absolute right-0 -bottom-5 text-sm text-ws-primary">
              {dict.org} HPから
            </a>
          </div>

          <div className="flex relative flex-col lg:flex-row mt-24 justify-between gap-12 lg:gap-0">
            <div className="w-full lg:w-7/12 flex flex-col">
              <div className="prose">
                <RichText data={dict.main} className="" />
              </div>

              <div className="mt-12 text-sm lg:text-base flex flex-col gap-8 lg:gap-10">
                <Accordion
                  icon={<CiClock1 />}
                  title="時間割"
                  text={<RichText data={dict.schedule} className="prose" />}
                />
                <Accordion
                  icon={<CiCoins1 />}
                  title="費用"
                  text={<RichText data={dict.costs} className="prose" />}
                />
                <Accordion
                  icon={<CiCalendarDate />}
                  title="行事など"
                  text={<RichText data={dict.events} className="prose" />}
                />
              </div>
            </div>

            <div className="w-11/12 lg:w-5/12 mx-auto lg:mx-0 flex flex-col justify-start items-center overflow-visible">
              {/* レーダーチャート */}
              {/* <RadarChartBlock data={dict.keywords} /> */}

              <div className="mb-4 flex flex-col items-center justify-center text-center text-sm">
                <p>
                  {dict.name}
                  <br />
                  を表すキーワード
                </p>
                <WordCloudCanvas keywords={dict.keywords} />
              </div>

              <div className="w-full lg:w-4/6 h-auto px-2 pb-3 lg:pb-1 bg-ws-gray rounded-md mt-4 lg:mt-0">
                <img src="/dict/point.webp" alt="可奈子ポイント" className="h-auto w-full mt-4" />
                <div className="text-sm prose">
                  <RichText data={dict.point} className="" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-8 lg:mt-12 text-ws-primary text-2xl items-center font-semibold gap-2">
            <CiSquareMore />
            <h2>その他</h2>
          </div>
          <div className="pl-4 flex mt-4 flex-col gap-3">
            <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
              <CiFaceSmile />
              <p>定員</p>
              <div className="text-black text-sm lg:text-base">
                {dict.capacity === 99 ? '定員上限なし' : dict.capacity}
              </div>
            </div>
            <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
              <CiBookmarkCheck />
              <p>認定の有無</p>
              <div className="text-black text-sm lg:text-base">
                {dict.type?.[0]?.id == 3
                  ? '行政の施設です'
                  : dict.recognition
                    ? '認定済み'
                    : 'まだ認定されていません'}
              </div>
              <Tooltips
                main={
                  <>
                    Q. 認定とは？
                    <br />
                    <br />
                    A.
                    不登校児童生徒が学校外の民間施設で支援等を受けた際に、学校や市町村（学校組合）教育委員会が「出席扱い」と判断されるフリースクールに与えられるもの。
                    <br />
                    <br />
                    認定を受けると、
                    <br />
                    ・公教育機関の出席扱いになる
                    <br />
                    ・学費の補助が受けられる
                    <br />
                    など、様々な利点があります。
                  </>
                }
              />
            </div>
            <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
              <CiStopwatch />
              <p>設立年月日</p>
              <div className="text-black text-sm lg:text-base">
                <FormatDate date={dict.date_launch} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center my-11">
            <GoogleMapEmbed location={dict.location} width="80%" height="360" />
          </div>

          <div className="flex my-24 h-32 lg:h-40 items-center justify-center gap-4 lg:gap-16">
            <a
              href={dict.link}
              className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100"
            >
              <h6 className="text-sm lg:text-xl font-semibold">
                このフリースクールの
                <br className="lg:hidden" />
                HPに行く
              </h6>
              <p className="text-xs mt-2">外部リンクに飛びます</p>
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdLSt6eRfqxkhKIXissDbGS6GoreU-Fw-wGPY238exlaOG8Fw/viewform?usp=sf_link"
              className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100"
            >
              <h6 className="text-sm lg:text-xl font-semibold">まずは相談してみる</h6>
              <p className="text-xs mt-2">
                お気軽に
                <br className="lg:hidden" />
                お聞きください
              </p>
              <p className="text-xs lg:mt-2 hidden lg:inline">
                フォームに
                <br className="lg:hidden" />
                ご入力ください
              </p>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const dict = await getDict(resolvedParams.slug)

  if (!dict) return {}

  const title = `${dict.name} | 鳥取のフリースクール・教育支援センター・不登校関連情報を解説`
  const description =
    dict.slogan_short?.slice(0, 100) +
    `${dict.name} の紹介ページです。対象・送迎・費用などの情報を詳しく掲載しています`
  const image = dict.gallery?.[0]?.url || `${siteConfig.url}/logo.png`
  const url = `${siteConfig.url}/dicts/${dict.id}`
  const keywords = [...(siteConfig.keywords || []), dict.name, dict.org]

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
          alt: dict.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}
