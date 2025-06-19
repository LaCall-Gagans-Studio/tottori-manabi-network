import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">お探しのページは見つかりませんでした。</p>
        <a href="" className="text-blue-500 underline">
          トップページに戻る
        </a>
      </div>

      <Footer />
    </main>
  )
}
