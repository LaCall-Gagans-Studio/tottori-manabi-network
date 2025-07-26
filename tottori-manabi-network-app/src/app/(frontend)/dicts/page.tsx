// libs
import { Metadata } from 'next'
import { siteConfig } from '../siteConfig'

// components
import { getDicts } from '../lib/getDict'
import { DictFilter } from './dictsFilter'
import { DictTargetsConverts } from '../lib/utils'
import { buildDictQuery } from '../lib/dictQuery'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

// icon
import { CiLocationOn, CiUser } from 'react-icons/ci'

export default async function DictsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams

  const tags = resolvedParams.tags?.split(',').map(Number) || []
  const type = resolvedParams.type?.split(',').map(Number) || []
  const targets = resolvedParams.targets?.split(',').map(Number) || []
  const recognized =
    resolvedParams.recognized === undefined ? null : resolvedParams.recognized === 'true'
  const keyword = resolvedParams.keyword || ''
  const sortBy = resolvedParams.sort || ''

  const query = buildDictQuery({ tags, type, targets, recognized, keyword, sortBy })
  const rawDicts = await getDicts(query)
  const dicts = !resolvedParams.sort ? rawDicts.sort(() => Math.random() - 0.5) : rawDicts

  return (
    <main>
      <Header />
      <div className="p-4 pt-4 lg:pt-12 mb-12 lg:h-full w-full mx-auto bg-[#f8fdee] lg:bg-transparent z-20">
        <div className="w-full lg:max-w-[800px] lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-6 lg:gap-8 items-center relative">
          <DictFilter initialResults={dicts} />
          {dicts?.map((dict) =>
            dict.hasPage ? (
              <a
                key={dict.id}
                href={`/dicts/${dict.id}`}
                className="h-52 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
              >
                <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-1 lg:group-hover:-translate-x-8 transition-all">
                  <img
                    className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center"
                    src={dict.thumbnail?.url ?? undefined}
                    alt="画像がありません"
                  />
                  <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">
                    <h1 className="text-base lg:text-2xl font-bold text-ws-primary text-nowrap">
                      {dict.name}
                    </h1>
                    <h2 className="text-xs lg:text-base font-medium text-slate-600 text-nowrap">
                      {dict.slogan_short}
                    </h2>
                    <h2 className="mt-1 text-base w-full font-thin text-slate-600 text-nowrap group-hover:animate-marquee ">
                      {dict.slogan_long ? dict.slogan_long : '詳細がありません'}
                    </h2>

                    <div className="mt-2 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <CiUser className="text-ws-primary" />
                        <div className="text-xs lg:text-sm font-normal text-slate-400 flex">
                          {dict.targets && <DictTargetsConverts targets={dict.targets} />}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <CiLocationOn className="text-ws-primary mt-1" />
                        <p className="text-sm font-normal text-slate-400 text-nowrap overflow-hidden">
                          {dict.address}
                        </p>
                      </div>

                      <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap justify-end gap-1 lg:font-semibold text-slate-600">
                        {dict.tags?.map((tag) => (
                          <p key={tag.id} className="bg-ws-black px-1 py-1 rounded text-slate-50">
                            {tag.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full w-16 flex items-center bg-ws-black absolute right-0 top-0 z-0 rounded-r-lg">
                  <p className="text-right w-6 ml-auto pr-2 font-bold text-white">詳細を見る</p>
                </div>
              </a>
            ) : (
              <a
                key={dict.id}
                href={dict.link}
                className="h-36 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
              >
                <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300">
                  <img
                    className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center"
                    src={dict.thumbnail?.url ?? undefined}
                    alt="画像がありません"
                  />
                  <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">
                    <h1 className="text-base lg:text-2xl font-bold text-ws-primary text-nowrap">
                      {dict.name}
                    </h1>

                    <div className="mt-2 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <CiUser className="text-ws-primary" />
                        <div className="text-xs lg:text-sm font-normal text-slate-400 flex">
                          {dict.targets && <DictTargetsConverts targets={dict.targets} />}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <CiLocationOn className="text-ws-primary mt-1" />
                        <p className="text-sm font-normal text-slate-400 text-nowrap overflow-hidden">
                          {dict.address}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600">
                        ※詳細ページはまだありません。外部リンクに飛びます。
                      </p>

                      <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap justify-end gap-1 lg:font-semibold text-slate-600">
                        {dict.tags?.map((tag) => (
                          <p key={tag.id} className="bg-ws-black px-1 py-1 rounded text-slate-50">
                            {tag.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full w-16 flex items-center bg-ws-black absolute right-0 top-0 z-0 rounded-r-lg">
                  <p className="text-right w-6 ml-auto pr-2 font-bold text-white">サイトに行く</p>
                </div>
              </a>
            ),
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

const title = '鳥取のフリースクール・教育支援施設 一覧'
const description =
  '鳥取県内のフリースクールや教育支援センター、不登校支援施設などの情報を一覧で紹介。不登校・学びの多様性に関心のある方必見の施設ガイドです。'
const url = `${siteConfig.url}/dicts`
const image = `${siteConfig.url}/logo.png`
const keywords = [
  ...siteConfig.keywords,
  '鳥取',
  '不登校',
  'フリースクール',
  '教育支援',
  '居場所',
  '多様な学び',
  '支援機関',
  '一覧',
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
    images: [
      {
        url: image,
        width: 1200,
        height: 800,
        alt: title,
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
