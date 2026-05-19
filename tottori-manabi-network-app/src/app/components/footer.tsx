import { CiMail } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa6'
import Link from 'next/link'

const CONTACT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdLSt6eRfqxkhKIXissDbGS6GoreU-Fw-wGPY238exlaOG8Fw/viewform?usp=sf_link'

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        サイトフッター
      </h2>

      {/* コンタクト */}
      <section aria-labelledby="contact-heading" className="bg-ws-primary text-white py-10">
        <div className="max-w-5xl mx-auto px-4 text-center flex flex-col lg:flex-row justify-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h3 id="contact-heading" className="font-bold text-6xl">
              CONTACT
            </h3>
            <p className="mt-2 mb-4 font-semibold">お気軽にご質問・ご相談ください</p>
            <div className="flex justify-center mt-2 gap-2">
              <Link href="/faq" className="underline cursor-pointer py-2 inline-block">
                よくあるご質問
              </Link>
              <span aria-hidden="true">｜</span>
              <Link href="/about" className="underline cursor-pointer py-2 inline-block">
                つなかんとは？
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
            <div className="text-xl lg:text-2xl">
              <Link
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="お問い合わせフォームを新しいタブで開く"
                className="inline-flex text-nowrap items-center px-6 py-3 text-ws-primary font-bold gap-3 bg-ws-white border-4 border-ws-white rounded-full shadow hover:opacity-80"
              >
                <CiMail className="text-4xl" aria-hidden="true" />
                お問い合わせ
              </Link>
            </div>
            <div className="text-xl lg:text-2xl">
              <a
                href="https://www.instagram.com/tunakan_tottori/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="公式 Instagram で DM 相談（新しいタブで開く）"
                className="inline-flex text-nowrap items-center px-6 py-3 text-ws-primary font-bold gap-3 bg-ws-white border-4 border-ws-white rounded-full shadow hover:opacity-80"
              >
                <FaInstagram className="text-4xl" aria-hidden="true" />
                公式SNSからDMで相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="フッターナビゲーション" className="bg-gray-800 text-gray-200 py-8 text-sm">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold text-white mb-2">保護者向け</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="hover:underline inline-block py-2 min-h-[44px]">
                  つなかんとは？
                </Link>
              </li>
              <li>
                <Link href="/dicts" className="hover:underline inline-block py-2 min-h-[44px]">
                  フリースクール・教育支援センター検索
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?tags=5"
                  className="hover:underline inline-block py-2 min-h-[44px]"
                >
                  教育者の声
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">学生向け</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/articles?tags=3"
                  className="hover:underline inline-block py-2 min-h-[44px]"
                >
                  OB・OGの声
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">その他</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/news?q=notice"
                  className="hover:underline inline-block py-2 min-h-[44px]"
                >
                  お知らせ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline inline-block py-2 min-h-[44px]">
                  よくあるご質問
                </Link>
              </li>
              <li>
                <Link
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-block py-2 min-h-[44px]"
                  aria-label="お問い合わせフォームを新しいタブで開く"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">規約等</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/policy?s=policy"
                  className="hover:underline inline-block py-2 min-h-[44px]"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/policy?s=rule"
                  className="hover:underline inline-block py-2 min-h-[44px]"
                >
                  オンラインコミュニティ利用規定
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-gray-900 text-gray-300 py-6 text-xs">
        <div className="max-w-6xl mx-auto px-4 text-center md:text-left md:flex justify-between items-center">
          <address className="not-italic">
            <p className="font-bold text-white text-xl">
              つなかん <br className="lg:hidden" />
              <span className="text-sm font-normal">とっとりフリースクールネットワーク</span>
            </p>
            <p>鳥取県令和7年度不登校支援情報発信・相談業務事業</p>
            <p>〒680-0843 鳥取県鳥取市南吉方3丁目215番地</p>
            <p>
              E-mail:{' '}
              <a
                href="mailto:tottori.manabi.network@gmail.com"
                className="text-white underline hover:no-underline"
              >
                tottori.manabi.network@gmail.com
              </a>
            </p>
          </address>
          <small className="block mt-4 md:mt-0">© 2025 とっとりフリースクールネットワーク</small>
        </div>
      </div>
    </footer>
  )
}
