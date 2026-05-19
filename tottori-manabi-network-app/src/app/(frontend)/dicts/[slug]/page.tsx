import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import Image from 'next/image'

import WordCloudCanvas from '@/app/components/section.dict/wordCloudBlock'
import { siteConfig } from '../../siteConfig'

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
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildEducationalOrgSchema,
} from '../../JsonLd'

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

  const detailUrl = `${siteConfig.url}/dicts/${dict.id}`
  const heroImage = dict.gallery?.[0]?.url || `${siteConfig.url}/logo.png`

  return (
    <>
      <Header />
      <main>
        <article className="p-4 pt-4 lg:pt-12 w-full mx-auto bg-[#f8fdee] lg:bg-transparent z-20">
          <div className="w-full lg:max-w-[1200px] lg:w-4/5 h-auto mx-auto">
            <header>
              <h1 className="text-3xl font-bold text-ws-primary">{dict.name}</h1>
              <p className="text-lg">{dict.org}</p>

              {dict.chair && <p className="text-sm text-slate-700">代表者：{dict.chair}</p>}
              <p className="text-sm text-slate-700">{dict.address}</p>

              <div className="text-sm flex gap-1 lg:gap-2 py-2 flex-wrap" aria-label="タグ一覧">
                {dict.tags?.map((tag) => (
                  <Link
                    href={'/dicts?tags=' + tag.id}
                    key={tag.id}
                    className="bg-ws-black px-2 py-1 rounded text-slate-50 cursor-pointer hover:bg-ws-primary duration-300"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </header>

            <div className="flex mt-6 flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2 h-72 lg:h-96">
                <ImageCarousel
                  imgs={
                    dict.gallery?.map((media) => ({
                      id: media?.id,
                      alt: media?.alt || dict.name,
                      url: media?.url || '',
                    })) ?? []
                  }
                />
              </div>
              <div className="w-full lg:w-3/5 p-1 ml-2">
                <p className="text-2xl mb-3 font-semibold">{dict.slogan_short}</p>
                <p className="text-base whitespace-pre-wrap">{dict.slogan_long}</p>
              </div>
            </div>

            <dl className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm lg:text-base mx-auto w-10/12 mt-12">
              <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
                <dt className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                  <CiUser aria-hidden="true" />
                  <span className="text-sm lg:text-base">対象</span>
                </dt>
                <dd className="text-base flex">
                  {dict.targets && <DictTargetsConverts targets={dict.targets} />}
                </dd>
              </div>
              <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
                <dt className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                  <CiLocationArrow1 aria-hidden="true" />
                  <span className="text-sm lg:text-base">送迎</span>
                </dt>
                <dd className="text-center">{dict.transport}</dd>
              </div>
              <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
                <dt className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                  <CiForkAndKnife aria-hidden="true" />
                  <span className="text-sm lg:text-base">給食</span>
                </dt>
                <dd className="text-center">{dict.lunch}</dd>
              </div>
            </dl>

            <blockquote className="bg-ws-gray w-full lg:w-10/12 mx-auto mt-12 relative p-6">
              <FaQuoteLeft className="absolute left-1" aria-hidden="true" />
              <p className="text-base lg:text-lg whitespace-pre-wrap">{dict.citation}</p>
              <FaQuoteRight className="absolute right-1" aria-hidden="true" />
              <cite className="absolute right-0 -bottom-5 text-sm text-ws-primary not-italic">
                <a href={dict.link} target="_blank" rel="noopener noreferrer">
                  {dict.org} HPから
                </a>
              </cite>
            </blockquote>

            <div className="flex relative flex-col lg:flex-row mt-24 justify-between gap-12 lg:gap-0">
              <section className="w-full lg:w-7/12 flex flex-col" aria-labelledby="dict-detail-heading">
                <h2 id="dict-detail-heading" className="sr-only">
                  施設詳細情報
                </h2>
                <div className="prose">
                  <RichText data={dict.main} />
                </div>

                <div className="mt-12 text-sm lg:text-base flex flex-col gap-8 lg:gap-10">
                  <Accordion
                    icon={<CiClock1 aria-hidden="true" />}
                    title="時間割"
                    text={<RichText data={dict.schedule} className="prose" />}
                  />
                  <Accordion
                    icon={<CiCoins1 aria-hidden="true" />}
                    title="費用"
                    text={<RichText data={dict.costs} className="prose" />}
                  />
                  <Accordion
                    icon={<CiCalendarDate aria-hidden="true" />}
                    title="行事など"
                    text={<RichText data={dict.events} className="prose" />}
                  />
                </div>
              </section>

              <aside className="w-11/12 lg:w-5/12 mx-auto lg:mx-0 flex flex-col justify-start items-center overflow-visible">
                <div className="mb-4 flex flex-col items-center justify-center text-center text-sm">
                  <p>
                    {dict.name}
                    <br />
                    を表すキーワード
                  </p>
                  <WordCloudCanvas keywords={dict.keywords} />
                </div>

                <div className="w-full lg:w-4/6 h-auto px-2 pb-3 lg:pb-1 bg-ws-gray rounded-md mt-4 lg:mt-0">
                  <Image
                    src="/dict/point.webp"
                    alt="可奈子ポイント"
                    width={400}
                    height={120}
                    sizes="(min-width: 1024px) 266px, 400px"
                    className="h-auto w-full mt-4"
                  />
                  <div className="text-sm prose">
                    <RichText data={dict.point} />
                  </div>
                </div>
              </aside>
            </div>

            <h2 className="flex mt-8 lg:mt-12 text-ws-primary text-2xl items-center font-semibold gap-2">
              <CiSquareMore aria-hidden="true" />
              その他
            </h2>
            <dl className="pl-4 flex mt-4 flex-col gap-3">
              <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                <CiFaceSmile aria-hidden="true" />
                <dt>定員</dt>
                <dd className="text-black text-sm lg:text-base">
                  {dict.capacity === 99 ? '定員上限なし' : dict.capacity}
                </dd>
              </div>
              <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                <CiBookmarkCheck aria-hidden="true" />
                <dt>認定の有無</dt>
                <dd className="text-black text-sm lg:text-base">
                  {dict.type?.[0]?.id == 3
                    ? '行政の施設です'
                    : dict.recognition
                      ? '認定済み'
                      : 'まだ認定されていません'}
                </dd>
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
                <CiStopwatch aria-hidden="true" />
                <dt>設立年月日</dt>
                <dd className="text-black text-sm lg:text-base">
                  <FormatDate date={dict.date_launch} />
                </dd>
              </div>
            </dl>

            <div className="flex items-center justify-center my-11">
              <GoogleMapEmbed location={dict.location} width="80%" height="360" />
            </div>

            <div className="flex my-24 h-32 lg:h-40 items-center justify-center gap-4 lg:gap-16">
              <a
                href={dict.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dict.name}の公式サイトを新しいタブで開く`}
                className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100"
              >
                <span className="text-sm lg:text-xl font-semibold">
                  このフリースクールの
                  <br className="lg:hidden" />
                  HPに行く
                </span>
                <span className="text-xs mt-2">外部リンクに飛びます</span>
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdLSt6eRfqxkhKIXissDbGS6GoreU-Fw-wGPY238exlaOG8Fw/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="お問い合わせフォームを新しいタブで開く"
                className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100"
              >
                <span className="text-sm lg:text-xl font-semibold">まずは相談してみる</span>
                <span className="text-xs mt-2">
                  お気軽に
                  <br className="lg:hidden" />
                  お聞きください
                </span>
                <span className="text-xs lg:mt-2 hidden lg:inline">
                  フォームにご入力ください
                </span>
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...buildEducationalOrgSchema({
            name: dict.name,
            description: dict.slogan_long || dict.slogan_short || '',
            url: detailUrl,
            image: heroImage,
            address: dict.address,
            org: dict.org,
          }),
          breadcrumb: buildBreadcrumbSchema([
            { name: 'ホーム', url: '/' },
            { name: 'フリースクール・教育支援センター一覧', url: '/dicts' },
            { name: dict.name, url: `/dicts/${dict.id}` },
          ]),
        }}
      />
    </>
  )
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const dict = await getDict(resolvedParams.slug)

  if (!dict) return {}

  const title = `${dict.name} | 鳥取のフリースクール・教育支援センター・不登校関連情報を解説`
  const description =
    (dict.slogan_short?.slice(0, 100) ?? '') +
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
      canonical: `/dicts/${dict.id}`,
    },
  }
}
