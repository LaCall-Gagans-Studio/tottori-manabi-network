import Link from 'next/link'
import { unstable_cache } from 'next/cache'

import { FaHeart, FaLightbulb, FaLeaf, FaQuoteLeft } from 'react-icons/fa6'
import { FiArrowRight } from 'react-icons/fi'

/* ============================================================
 *  日替わりコンテンツ「今日の一言」
 *
 *  目的:
 *    - つなかんを訪れる保護者・子どもに、毎日少しの安心と気づきを届ける
 *    - Googlebot のクロール頻度向上 (ページの軽微な更新を毎日発生させる)
 *    - 既存ページの SEO を補完する追加テキストコンテンツ
 *
 *  ISR 戦略:
 *    - unstable_cache で 24 時間 (86400 秒) キャッシュ。
 *    - キャッシュキーに JST 日付 (YYYY-MM-DD) を含めるため、
 *      日付が変わると新しいキャッシュエントリが作られ、
 *      自動的に新しいメッセージが選択されます (旧キャッシュは revalidate で破棄)。
 *    - 同一日であれば誰がアクセスしても同一のメッセージが表示される
 *      (決定論的: 日付文字列のハッシュを配列長で剰余)。
 *  ============================================================ */

type Category = 'message' | 'tip' | 'quote' | 'reminder'

type DailyContent = {
  category: Category
  text: string
  /** 引用元を表示したい場合のみ */
  source?: string
  /** 「詳しく知る」リンク (任意) */
  cta?: { label: string; href: string }
}

/**
 * 配列は順序を変えず、末尾追加のみで運用してください。
 * 順序を変えると過去日の表示が遡及的に変わるため、SEO 上の同一性が崩れます。
 */
const DAILY_CONTENTS: DailyContent[] = [
  {
    category: 'message',
    text: 'お子さんが学校に行けない日があっても、それは「サボり」ではありません。\n心と体が、少し休息を求めているサインかもしれません。',
  },
  {
    category: 'message',
    text: '「今日は学校に行けなかった」その一日も、お子さんと向き合った大切な一日です。\n振り返ったとき、無駄な時間など一つもありません。',
  },
  {
    category: 'reminder',
    text: '親として完璧でなくていい。一緒に悩み、一緒に考える。\nそれだけで充分です。',
  },
  {
    category: 'message',
    text: '学校に行くことだけがゴールではありません。\nお子さんが「自分らしく」過ごせる場所を、一緒に探しましょう。',
    cta: { label: 'フリースクールを探す', href: '/dicts' },
  },
  {
    category: 'reminder',
    text: '「行きたくない」の一言の裏には、何百もの感情があります。\n否定せず、ただ受け止めることから始めてみませんか。',
  },
  {
    category: 'tip',
    text: '朝の体調不良が続くときは、一度かかりつけ医に相談してみるのも一つの選択肢です。\n体と心は深くつながっています。',
  },
  {
    category: 'tip',
    text: 'フリースクールの見学は、ぜひお子さんと一緒に行ってみてください。\n「自分が選ぶ」体験そのものが、次の一歩につながります。',
    cta: { label: '見学できる施設を見る', href: '/dicts' },
  },
  {
    category: 'tip',
    text: '鳥取県内には教育支援センターが11か所あります。\n公立施設なので、費用をかけずに利用できます。',
    cta: { label: '教育支援センター一覧', href: '/dicts?type=3' },
  },
  {
    category: 'tip',
    text: '鳥取県認定のフリースクールでの活動は、\n学校の出席扱いとして認められる場合があります。',
    cta: { label: '認定フリースクール一覧', href: '/dicts?recognized=true' },
  },
  {
    category: 'tip',
    text: 'オンラインの相談窓口なら、家から出ずに最初の一歩を踏み出せます。\n「話を聞いてもらう」だけでも、心は少し軽くなります。',
    cta: { label: 'よくあるご質問を見る', href: '/faq' },
  },
  {
    category: 'quote',
    text: '子どもの可能性は、\n学校という枠の中だけにあるのではない。',
    source: '不登校支援に携わる元教員より',
  },
  {
    category: 'quote',
    text: '焦らないこと。比べないこと。\n子どもには、子どものペースがある。',
  },
  {
    category: 'message',
    text: '不登校は、人生のリセットではなく、\n新しい学びの始まりです。',
  },
  {
    category: 'reminder',
    text: '親の安心は、子どもの安心。\n今日は、自分のための時間を5分だけ作ってみませんか。',
  },
  {
    category: 'message',
    text: '「学校に行けない」を「別の道を選んだ」に\n言い換えてみるだけで、見える景色が変わることがあります。',
  },
  {
    category: 'reminder',
    text: '同じ悩みを持つ保護者は、あなたの想像以上にたくさんいます。\n一人で抱え込まなくて大丈夫です。',
    cta: { label: 'つなかんに相談する', href: '/about' },
  },
  {
    category: 'message',
    text: '今日、お子さんが笑顔になる瞬間が一つでもあれば、\nそれは確かな前進です。',
  },
  {
    category: 'tip',
    text: '「学校復帰」だけが目標ではありません。\n将来の「社会的自立」を見据えて、いろいろな選択肢を持ちましょう。',
  },
  {
    category: 'tip',
    text: 'お子さんの「好きなこと」「夢中になれること」が、\n次の扉を開く鍵になることがあります。',
    cta: { label: 'OB・OGの声を読む', href: '/articles?tags=3' },
  },
  {
    category: 'tip',
    text: '鳥取県内のフリースクール・教育支援センターを比較するなら、\n「つなかん」の検索ページから簡単に探せます。',
    cta: { label: '施設を検索する', href: '/dicts' },
  },
  {
    category: 'reminder',
    text: '困ったときは、まず一人で抱えずに、\n誰かに話してみることが何よりも大切です。',
  },
  {
    category: 'message',
    text: 'お子さんの「行きたくない」気持ちには、必ず理由があります。\nそれを一緒に探していきましょう。',
  },
  {
    category: 'message',
    text: '学校以外にも、子どもが安心して過ごせる場所は、\n鳥取の中にもたくさんあります。',
    cta: { label: '安心できる居場所を探す', href: '/dicts' },
  },
  {
    category: 'reminder',
    text: '親自身の時間も大切に。\nあなたが元気でいることが、お子さんの安心につながります。',
  },
  {
    category: 'message',
    text: '不登校は「問題」ではなく、\nお子さんからの大切な「サイン」かもしれません。',
  },
]

const CATEGORY_META: Record<
  Category,
  { label: string; Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }> }
> = {
  message: { label: '今日のことば', Icon: FaHeart },
  tip: { label: '今日のヒント', Icon: FaLightbulb },
  quote: { label: 'こころに残る一節', Icon: FaQuoteLeft },
  reminder: { label: 'リマインダー', Icon: FaLeaf },
}

/**
 * 文字列を 32bit 整数にハッシュする決定論的関数 (FNV-1a 風)。
 * 同じ入力からは常に同じ値を返すため、日替わりの決定論的選択に使用します。
 */
function hashString(str: string): number {
  let hash = 2166136261
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = (hash * 16777619) >>> 0
  }
  return hash
}

/**
 * 「Asia/Tokyo」基準で本日の YYYY-MM-DD を返す。
 * サーバーが UTC で動作していても JST 0:00 で切り替わるようにする。
 */
function getTodayKeyJst(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/**
 * 表示用に「M月D日(曜)」を返す。
 */
function getDisplayDateJst(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(now)
}

/**
 * ISR の本体。
 * - revalidate: 86400 で 24h キャッシュ。
 * - 引数 dateKey を含めるため、日付が変わると別エントリとして取得され
 *   実質的に毎日 0:00 (JST) で新しいコンテンツが返されます。
 */
const getDailyContentCached = unstable_cache(
  async (dateKey: string): Promise<{ content: DailyContent; index: number; total: number }> => {
    const index = hashString(dateKey) % DAILY_CONTENTS.length
    return {
      content: DAILY_CONTENTS[index],
      index,
      total: DAILY_CONTENTS.length,
    }
  },
  ['daily-content-v1'],
  {
    revalidate: 86400,
    tags: ['daily-content'],
  },
)

export default async function DailyMessage() {
  const now = new Date()
  const dateKey = getTodayKeyJst(now)
  const displayDate = getDisplayDateJst(now)
  const { content, index, total } = await getDailyContentCached(dateKey)

  const meta = CATEGORY_META[content.category]
  const Icon = meta.Icon

  return (
    <section aria-labelledby="daily-message-heading" className="bg-ws-gray/40 py-12 lg:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 id="daily-message-heading" className="text-center mb-8">
          <span className="block text-4xl lg:text-3xl font-thin text-gray-500 tracking-[0.3em]">
            DAILY
          </span>
          <span className="block text-lg lg:text-xl font-bold text-gray-800 mt-1">
            今日のひとこと
          </span>
        </h2>

        <article
          className="relative bg-white rounded-2xl shadow-md border border-ws-primary/20 px-6 py-8 lg:px-10 lg:py-10 transition-shadow hover:shadow-lg"
          aria-label={`${displayDate}の${meta.label}`}
        >
          {/* 左上の日付バッジ */}
          <time
            dateTime={dateKey}
            className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-ws-primary text-white text-xs lg:text-sm px-3 py-1.5 rounded-full font-semibold shadow-sm"
          >
            {displayDate}
          </time>

          {/* 右上のカテゴリラベル */}
          <span
            className="absolute -top-3 right-6 inline-flex items-center gap-1.5 bg-white text-ws-primary text-xs px-3 py-1.5 rounded-full font-semibold border border-ws-primary shadow-sm"
            aria-hidden="true"
          >
            <Icon className="text-sm" />
            {meta.label}
          </span>

          <div className="flex items-start gap-4 mt-2">
            <span
              aria-hidden="true"
              className="hidden lg:flex shrink-0 w-12 h-12 rounded-full bg-ws-primary/10 text-ws-primary items-center justify-center text-xl"
            >
              <Icon />
            </span>

            <div className="flex-1 min-w-0">
              <p className="text-base lg:text-xl leading-loose text-slate-800 whitespace-pre-wrap font-medium">
                {content.text}
              </p>

              {content.source && (
                <p className="mt-4 text-xs lg:text-sm text-slate-600">— {content.source}</p>
              )}

              {content.cta && (
                <div className="mt-6">
                  <Link
                    href={content.cta.href}
                    className="inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-ws-primary hover:text-white hover:bg-ws-primary border-2 border-ws-primary rounded-full px-5 py-2 transition-colors duration-200"
                  >
                    {content.cta.label}
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* 装飾: 右下にうっすらアクセント */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-24 h-24 bg-ws-primary/5 rounded-tl-full pointer-events-none"
          />
        </article>

        <p className="text-center mt-4 text-xs text-slate-500">
          毎日更新 ・ 本日のひとこと {index + 1} / {total}
        </p>
      </div>
    </section>
  )
}
