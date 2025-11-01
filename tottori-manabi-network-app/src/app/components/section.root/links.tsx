// modules
import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Links() {
  return (
    <section
      className="bg-cover bg-center relative z-0 pt-24"
      style={{
        backgroundImage: "url('/root/links-bg.png')",
      }}
    >
      {/* バナーリンク群 */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-6 mb-10">
          <li>
            <Link href="/articles?tags=5" target="_blank">
              <div className="relative w-full aspect-[3/1] hover:opacity-90">
                <Image
                  src="/root/links-staff.png"
                  alt="各種支援機関などスタッフの声"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Link>
          </li>
          <li>
            <Link href="/articles?tags=3" target="_blank">
              <div className="relative w-full aspect-[3/1] hover:opacity-90">
                <Image
                  src="/root/links-student.png"
                  alt="不登校・行き渋りを経験した先輩たちの声"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Link>
          </li>
        </ul>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-center">
          <Bottun_links
            num={0}
            text={
              <>
                フリースクール
                <br className="lg:hidden" />
                一覧
              </>
            }
            sub="FreeSchool list"
            url="/dicts?type=1"
          />
          <Bottun_links
            num={1}
            text={
              <>
                教育支援センター
                <br className="lg:hidden" />
                一覧
              </>
            }
            sub="Support Center List"
            url="/dicts?type=3"
          />
          <Bottun_links num={2} text={<>医療機関一覧</>} sub="Hospital List" url="#" />
          <Bottun_links num={3} text={<>よくあるご質問</>} sub="FAQ" url="/faq" />
        </ul>
      </div>

      {/* 外部リンク群 */}
      <div className="bg-gray-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: '/root/links-tottori.jpg',
              alt: '鳥取県',
              url: 'http://www.pref.tottori.lg.jp/',
            },
          ].map((banner) => (
            <Link
              key={banner.alt}
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full aspect-[3/1] rounded shadow hover:opacity-90"
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const Bottun_links = ({
  num,
  text,
  sub,
  url,
  props,
}: {
  num: number
  text: ReactElement
  sub: string
  url: string
  props?: string
}) => {
  return (
    <li key={num} className="relative overflow-hidden">
      <Link
        href={url}
        className={`block bg-white p-6 py-3 lg:py-12 border-ws-primary border-2 rounded-lg text-left shadow hover:shadow-md transition-shadow h-full relative hover:opacity-80 duration-300 ${props}`}
      >
        <span className="font-bold text-black text-base lg:text-xl">{text}</span>
        <span className="block font-semibold text-ws-primary text-sm lg:text-base">{sub}</span>

        {/* ▼ 右下の三角（外側45度） */}
        <span className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-l-[30px] border-b-ws-primary border-l-transparent" />
      </Link>
    </li>
  )
}
