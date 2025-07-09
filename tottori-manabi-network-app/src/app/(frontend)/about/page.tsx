// library
import Link from 'next/link'

// icons
import { FiChevronRight } from 'react-icons/fi'

// components
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { Button_big } from '@/app/components/button-big'

export default async function HomePage() {
  const merits = [
    {
      num: '01',
      small: '鳥取県の公認を受けた',
      large: '安心できる情報源',
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
    <main>
      <Header />
      <div className="pt-24 bg-opacity-80 relative w-10/12 lg:w-auto max-w-5xl mx-auto px-4 text-center pb-24">
        <p className="text-xl lg:text-2xl font-bold  leading-relaxed mb-14 text-ws-primary">
          鳥取県でフリースクール<span className="hidden lg:inline">・</span>
          <br />
          相談できる場所を探すなら、
          <br className="lg:hidden" />
          まずはココから調べてみよう
        </p>

        <Title text="そもそも教育支援センター・フリースクールって何？" />
        <div className="text-left">
          <Title_small text="教育支援センター（適応指導教室）とは？" />
          <p className="ml-4">
            鳥取県内の市町が設置する公立の支援施設です。
            <br />
            不登校や登校が難しい小・中学生が、安心して通える「学校以外の学びの場」として利用できます。
            <br />
            学校復帰に向けた学習や相談、体験活動を通じて、子どもたちの成長を支援しています。現在、県内には11か所設置されています。
          </p>

          <Title_small text="フリースクールとは？" />
          <p className="ml-4">
            民間の団体やNPOが運営する、自由な学びや体験の場です。主に不登校の小学生から高校生までを対象に、学校の代わりとなる日中の過ごし場所や学習支援を提供しています。
            <br />
            鳥取県のガイドラインに基づく認定制度があり、認定されたフリースクールでの活動は学校の出席扱いとして認められることがあります。現在、県内に10か所の認定施設があります。
          </p>

          <p className="mt-5">
            不登校の児童生徒は全国的に増えており、鳥取県も例外ではありません。だからこそ、学校以外にも「安心して過ごせる場所」「自分らしく学べる環境」が必要です。行政と民間が連携し、地域全体で子どもたちの学びと成長を支える取り組みが進んでいます。
          </p>
        </div>

        <Title text="つなかんって？" />

        <p className=" font-semibold mt-6 text-2xl mb-2 text-left">
          つながり、かんじる、
          <br className="lg:hidden" />
          多様な学びの情報局。
        </p>

        <p className=" mb-6 text-base lg:text-lg text-left">
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

        <Title text="つなかんの特徴" />

        <ol className="grid grid-cols-1 gap-2 lg:gap-4">
          {merits.map((merit) => (
            <Link
              key={merit.num}
              href={merit.link}
              className={`bg-white flex h-24 lg:h-36 relative items-center justify-start gap-4 rounded-md p-5 shadow-md hover:shadow-xl hover:opacity-70 duration-500 transition-shadow `}
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

        <Button_big
          text={<p>さっそくフリースクール・教育支援センターを探す</p>}
          url="/dicts"
          props="mt-6 px-12"
        />
      </div>
      <Footer />
    </main>
  )
}

const Title = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center mb-4 border-b-2 border-gray-300 mt-8">
      <div className="w-3 h-12 bg-ws-primary mr-3"></div>
      <h1 className="text-xl lg:text-2xl font-bold py-2 text-left">{text}</h1>
    </div>
  )
}

const Title_small = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center mb-4  border-gray-300 mt-6">
      <div className="w-3 h-6 bg-ws-primary mr-3"></div>
      <h1 className="text-base lg:text-lg font-thin py-2">{text}</h1>
    </div>
  )
}
