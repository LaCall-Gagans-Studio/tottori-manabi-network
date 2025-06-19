import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Ongoing() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center px-4 gap-6 lg:gap-24">
        <Image
          src="/not-found/notfound-icon.png"
          alt="ページは準備中です。"
          width={600}
          height={400}
          className="object-cover"
        />
        <div className="flex flex-col text-left items-left lg:items-center justify-center">
          <h1 className="text-3xl my-2">このページは作成中です</h1>
          <p className="text-base">今しばらくお待ちください🙇</p>
          <Link
            href="/"
            className="px-6 py-3 my-8 w-56 text-center bg-ws-secondary rounded-full text-ws-white text-xl hover:bg-opacity-65 duration-300"
          >
            トップに戻る
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
