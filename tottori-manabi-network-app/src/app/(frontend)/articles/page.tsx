// components
import { getArticles } from '../lib/getArticle'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { FormatDate } from '../lib/utils'

// icon
import { CiHeart, CiShare2 } from 'react-icons/ci'

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams

  const rawArticles = await getArticles()
  const articles = !resolvedParams.sort ? rawArticles.sort(() => Math.random() - 0.5) : rawArticles

  return (
    <main>
      <Header />
      <div className="p-4 pt-4 lg:pt-12 mb-12 lg:h-full w-full mx-auto bg-ws-white z-20">
        <div className="w-11/12 lg:w-4/6 h-auto mx-auto grid grid-cols-2 lg:grid-cols-3 gap-8 items-center relative">
          {articles?.map((article) => (
            <div key={article.id}>
              <a
                href={`/articles/${article.id}`}
                className="relative group duration-300 cursor-pointer flex-col flex gap-2 group"
              >
                <img
                  className="w-full h-44 rounded-lg object-cover group-hover:opacity-30 group-hover:duration-300"
                  src={article.thumbnail?.url ?? undefined}
                  alt="サムネイル"
                />
                <h1 className="text-base lg:text-lg font-bold line-clamp-2">{article.name}</h1>
                <h2 className="text-xs text-slate-400 line-clamp-2">{article.slogan_short}</h2>
                <div className="flex items-center my-3">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={
                      article.createdBy?.icon && typeof article.createdBy.icon === 'object'
                        ? (article.createdBy.icon.url ?? undefined)
                        : undefined
                    }
                    alt="ライターのアイコン"
                  />

                  <div className="text-xs text-slate-600 ml-2">
                    <p>{article.createdBy?.name ? article.createdBy.name : '匿名投稿'}</p>
                    <span>
                      <FormatDate date={article.date_updated} />
                    </span>
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-2">
                <CiHeart className="text-2xl cursor-pointer" />
                <span className="text-sm font-thin">22</span>
                <CiShare2 className="text-2xl ml-1 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
