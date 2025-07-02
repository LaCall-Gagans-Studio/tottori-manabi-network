// modules
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// icons
import { FaRegQuestionCircle } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'

export default function About() {
  const merits = [
    {
      num: '01',
      small: '鳥取県の公認を受けた',
      large: '安心できる情報源',
      props: 'lg:col-span-2 lg:justify-center lg:gap-6',
      link: '#merit01',
    },
    {
      num: '02',
      small: 'フリースクール・教育支援センターと',
      large: '直接つながれるネットワーク',
      link: '#merit02',
    },
    {
      num: '03',
      small: '地域との連携強化',
      large: '教育機関や福祉機関との<br />ネットワークづくり',
      link: '#merit03',
    },
    // {
    //   num: '04',
    //   small: '運営ノウハウの蓄積',
    //   large: 'フリースクール等の<br />情報整備・可視化ができる',
    //   link: '#merit04',
    // },
    // {
    //   num: '05',
    //   small: '自由度の高い活動設計',
    //   large: '地域や対象に応じた<br />柔軟な取り組みが可能',
    //   link: '#merit05',
    // },
  ]

  return (
    <section
      className="pt-12 mt-24 pb-1 bg-opacity-80 relative"
      style={{
        backgroundImage: "url('/root/about-bg.png')",
        backgroundSize: 'auto 100%',
      }}
    >
      <div className="absolute -top-32 lg:-top-32 overflow-hidden z-20 w-full">
        <div className="flex animate-ticker h-64 lg:h-96 w-[400vw]">
          {' '}
          {/* 可変幅確保 */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative w-[200vw] lg:w-[100vw] h-64 lg:h-96 shrink-0">
              <Image
                src="/root/about-slide.png"
                alt={`バナー画像 ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="right-0 top-8 absolute overflow-hidden z-30 w-64 lg:w-[32rem]">
        <Image
          src="/root/about-label.png"
          alt="つながり、かんじる。多様な学びの情報局"
          width={512}
          height={128}
          className="w-full h-auto"
        />
      </div>

      <div className="relative pb-16 pt-64 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xl lg:text-3xl font-bold text-ws-white leading-relaxed mb-8">
            鳥取県でフリースクール<span className="hidden lg:inline">・</span>
            <br />
            相談できる場所を探すなら、
            <br className="lg:hidden" />
            まずはココから調べてみよう
          </p>

          <h2 className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-center mb-4 border-y-2 border-dotted border-ws-white py-12">
            <div className="relative h-16 lg:h-28 w-10/12">
              <Image
                src="/logo-long.png"
                alt="つなかん｜つながり、かんじる、多様な学びの情報局"
                fill
                className="object-contain bg-ws-white"
              />
            </div>
            <span className="text-xl lg:text-3xl font-bold text-ws-white lg:ml-2">って？</span>
          </h2>

          <p className="text-ws-white font-semibold mt-6 text-2xl mb-2 text-left">
            つながり、かんじる、
            <br className="lg:hidden" />
            多様な学びの情報局。
          </p>

          <p className="text-ws-white font-medium mb-6 text-base lg:text-lg text-left">
            『つなかん』は、鳥取県にあるすべてのフリースクールの情報を掲載することを目指して活動しているプロジェクトです。
            元教諭の３児の母と、不登校支援に携わる大学生が主に運営しています。
            <br />
            フリースクール情報の他にも、相談窓口、保護者コミュニティの場、他の専門機関の紹介ページなど、不登校や行きしぶりへの不安が軽減されていくコンテンツを随時追加していきます。
          </p>

          <Link
            href="https://www.instagram.com/tottori.manabi.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white border font-semibold border-ws-primary text-ws-primary py-6 px-12 rounded-full hover:bg-red-50 transition-colors my-10"
          >
            つなかんをSNSで知る (Instagram)
          </Link>

          <h3 className="font-bold text-2xl text-ws-white mb-6">
            <span>＼ つなかんの特徴 ／</span>
          </h3>

          <ol className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
            {merits.map((merit) => (
              <Link
                key={merit.num}
                href={merit.link}
                className={`bg-white flex h-24 lg:h-36 relative items-center justify-start gap-4 rounded-md p-5 shadow-md hover:shadow-xl hover:opacity-70 duration-500 transition-shadow ${merit.props ?? ''}`}
              >
                <span className="text-4xl lg:text-6xl font-extrabold text-ws-secondary mr-2">
                  {merit.num}
                </span>
                <span className="h-3/4 lg:h-5/6 w-0.5 rotate-12 bg-ws-primary"></span>
                <div>
                  <p className="text-ws-primary text-sm lg:text-base text-left">{merit.small}</p>
                  <p
                    className="text-ws-primary font-bold text-left text-base lg:text-xl lg:leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: merit.large.replace(/<br.*?>/g, '<br />'),
                    }}
                  />
                </div>
                <FiChevronRight className="absolute right-2 text-4xl text-slate-200" />
              </Link>
            ))}
          </ol>

          <div className="mt-4 lg:mt-12">
            <Link
              href="/ongoing"
              className="mx-auto w-auto gap-4 text-lg hover:underline flex items-center justify-center text-white font-bold py-3 px-10 rounded-full"
            >
              <FaRegQuestionCircle className="text-2xl" />
              もっと詳しく見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
