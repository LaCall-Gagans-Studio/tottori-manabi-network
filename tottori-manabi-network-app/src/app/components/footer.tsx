import { CiMail } from 'react-icons/ci'
import { FaLine } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* コンタクト */}
      <div className="bg-ws-primary text-white py-10">
        <div className="max-w-5xl mx-auto px-4 text-center flex flex-col lg:flex-row justify-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-6xl">CONTACT</h3>
            <p className="mt-2 mb-4 font-semibold">お気軽にご質問・ご相談ください</p>
            <div className="flex justify-center mt-2 gap-2">
              <a className="underline pointer-events-auto cursor-pointer">よくあるご質問</a>｜
              <a className="underline pointer-events-auto cursor-pointer">つなかんとは？</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
            <div className="text-xl lg:text-2xl">
              <a
                href="#"
                className="inline-flex text-nowrap items-center px-6 py-3 text-ws-primary font-bold gap-3 bg-ws-white border-4 border-ws-white rounded-full shadow hover:opacity-80"
              >
                <CiMail className="text-4xl" />
                申し込みフォーム
              </a>
            </div>
            <div className="text-xl lg:text-2xl">
              <a
                href="#"
                className="inline-flex text-nowrap items-center px-6 py-3 text-ws-primary font-bold gap-3 bg-ws-white border-4 border-ws-white rounded-full shadow hover:opacity-80"
              >
                <FaLine className="text-4xl" />
                公式LINEを追加する
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 text-gray-300 py-8 text-sm">
        {/* Simplified Sitemap */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold text-white mb-2">保護者向け</h4>
            <ul>
              <li>
                <a href="https://www.tottori-internship.net/about/" className="hover:underline">
                  つなかんとは？
                </a>
              </li>
              <li>
                <a href="https://www.tottori-internship.net/search/" className="hover:underline">
                  フリースクール・教育支援センター検索
                </a>
              </li>
              <li>
                <a href="https://www.tottori-internship.net/manual/" className="hover:underline">
                  教育者の声
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">学生向け</h4>
            <ul>
              <li>
                <a
                  href="https://www.tottori-internship.net/company/manual/"
                  className="hover:underline"
                >
                  OB・OGの声
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">その他</h4>
            <ul>
              <li>
                <a href="https://www.tottori-internship.net/news/" className="hover:underline">
                  お知らせ
                </a>
              </li>
              <li>
                <a href="https://www.tottori-internship.net/faq/" className="hover:underline">
                  よくあるご質問
                </a>
              </li>
              <li>
                <a href="https://www.tottori-internship.net/contact/" className="hover:underline">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">規約等</h4>
            <ul>
              <li>
                <a href="https://www.tottori-internship.net/policy/" className="hover:underline">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="https://www.tottori-internship.net/terms/" className="hover:underline">
                  利用規約
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-gray-400 py-6 text-xs">
        <div className="max-w-6xl mx-auto px-4 text-center md:text-left md:flex justify-between items-center">
          <div>
            <p className="font-bold text-white text-xl">
              つなかん <br className="lg:hidden" />
              <span className="text-sm font-normal">とっとりフリースクールネットワーク</span>
            </p>
            <p>鳥取県令和7年度不登校支援情報発信・相談業務事業</p>
            <p>〒680-0843 鳥取県鳥取市南吉方3丁目215番地 Tel: Not prepared</p>
            <p>
              E-mail:{' '}
              <a
                href="mailto:tottori-manabi-network@gmail.com"
                className="text-ws-primary hover:underline"
              >
                tottori-manabi-network@gmail.com
              </a>
            </p>
          </div>
          <small className="block mt-4 md:mt-0">© 2025 とっとりフリースクールネットワーク</small>
        </div>
      </div>
    </footer>
  )
}
