import { ReactElement } from 'react'

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
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
          <li>
            <a href="https://www.tottori-internship.net/voice/">
              <img
                src="root/links-staff.png"
                alt="これまでに参加した先輩たちの声"
                className="w-full hover:opacity-90"
              />
            </a>
          </li>
          <li>
            <a href="https://www.tottori-internship.net/company/voice/">
              <img
                src="root/links-student.png"
                alt="インターンシップ受入企業・団体の声"
                className="w-full hover:opacity-90"
              />
            </a>
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
            url="#"
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
            url="#"
          />
          <Bottun_links num={2} text={<>医療機関一覧</>} sub="Hospital List" url="#" />
          <Bottun_links num={3} text={<>よくあるご質問</>} sub="FAQ" url="#" />
        </ul>
      </div>

      {/* 外部リンク群 */}
      <div className="bg-gray-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: 'https://www.tottori-internship.net/user/common/images/footer_banner03.jpg',
              alt: '鳥取県',
              url: 'http://www.pref.tottori.lg.jp/',
            },
          ].map((banner) => (
            <a key={banner.alt} href={banner.url} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full rounded shadow hover:opacity-90"
              />
            </a>
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
      <a
        href={url}
        className={`block bg-white p-6 py-3 lg:py-12 border-ws-primary border-2 rounded-lg text-left shadow hover:shadow-md transition-shadow h-full relative hover:opacity-80 duration-300 ${props}`}
      >
        <span className="font-bold text-black text-base lg:text-xl">{text}</span>
        <span className="block font-semibold text-ws-primary text-sm lg:text-base">{sub}</span>

        {/* ▼ 右下の三角（外側45度） */}
        <span className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-l-[30px] border-b-ws-primary border-l-transparent" />
      </a>
    </li>
  )
}
