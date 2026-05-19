import type { MetadataRoute } from 'next'

import { getArticles, getEvents } from './(frontend)/lib/getArticle'
import { getDicts } from './(frontend)/lib/getDict'
import { siteConfig } from './(frontend)/siteConfig'

/* ============================================================
 *  Next.js App Router 標準のサイトマップ生成 (MetadataRoute.Sitemap)
 *
 *  - URL: /sitemap.xml (Next.js が自動配信)
 *  - 静的ルート + Payload CMS から取得した動的ルートを統合
 *  - ベース URL は process.env.NEXT_PUBLIC_SITE_URL 優先、未設定なら siteConfig.url
 *  - revalidate: 3600 (1h) でキャッシュ -- データソースが落ちても静的ルートは返るよう防御
 *  - getDicts / getArticles 内部の fetch は next: { revalidate: 60 } で個別キャッシュされるため
 *    実害なく安全に呼び出せる
 *  ============================================================ */

export const revalidate = 3600

/**
 * サイトの絶対 URL ベース。
 * 環境変数 NEXT_PUBLIC_SITE_URL が設定されていればそれを優先し、
 * 未設定時は siteConfig.url (https://www.tuna-kan.org) をフォールバックとして使用。
 * 末尾スラッシュは除去して連結を一貫させる。
 */
function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url ?? 'https://www.tuna-kan.org'
  return url.replace(/\/+$/, '')
}

/**
 * Payload 側で正式な updatedAt が無いレコード向けの安全な日付パース。
 * 不正値の場合は現在時刻にフォールバックする (sitemap が空にならないように)。
 */
function toDate(value: unknown): Date {
  if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date()
}

type StaticEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const STATIC_ROUTES: StaticEntry[] = [
  // トップページ: 日替わりコンテンツ (DailyMessage) を導入したため daily 扱い
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  // 主要カテゴリ: CMS 更新で頻繁に内容が増えるため weekly
  { path: '/dicts', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/articles', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/news', changeFrequency: 'weekly', priority: 0.8 },
  // ほぼ固定の情報ページは monthly
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.8 },
  // 規約・準備中ページは低優先
  { path: '/policy', changeFrequency: 'yearly', priority: 0.3 },
]

/**
 * Promise.allSettled でラップし、片方の CMS 取得が失敗しても
 * もう片方と静的ルートだけは返せるようにする防御策。
 */
async function safeFetch<T>(fn: () => Promise<T[]>, label: string): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error(`[sitemap] failed to fetch ${label}:`, err)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const now = new Date()

  /* ---------- 静的ルート ---------- */
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  /* ---------- 動的ルート: Payload CMS から取得 ----------
     - dicts: 詳細ページを持つ (hasPage=true) もののみ
     - articles: type=article で公開済み
     - events: type=events で公開済み (event-detail は /events/[slug])
     どれか失敗しても残りは出力されるよう Promise.allSettled で並列実行。
  */
  const [dicts, articles, events] = await Promise.all([
    safeFetch(() => getDicts('where[hasPage][equals]=true'), 'dicts'),
    safeFetch(() => getArticles(), 'articles'),
    safeFetch(() => getEvents(), 'events'),
  ])

  type WithTimestamps = { id: string | number; date_updated?: string | null; updatedAt?: string }

  const dictEntries: MetadataRoute.Sitemap = (dicts as unknown as WithTimestamps[]).map((d) => ({
    url: `${baseUrl}/dicts/${d.id}`,
    lastModified: toDate(d.updatedAt ?? d.date_updated ?? now),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const articleEntries: MetadataRoute.Sitemap = (articles as unknown as WithTimestamps[]).map(
    (a) => ({
      url: `${baseUrl}/articles/${a.id}`,
      lastModified: toDate(a.date_updated ?? a.updatedAt ?? now),
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  )

  const eventEntries: MetadataRoute.Sitemap = (events as unknown as WithTimestamps[]).map((e) => ({
    url: `${baseUrl}/events/${e.id}`,
    lastModified: toDate(e.date_updated ?? e.updatedAt ?? now),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  /* ---------- (将来) ニュース個別ページの URL を出すなら ここに追加 ----------
     現在 /news は一覧のみで詳細ページが無いためエントリは静的ルートで止める。
     例: const newsEntries = (await getNews()).map((n) => ({ url: `${baseUrl}/news/${n.id}`, ... }))
  */

  return [...staticEntries, ...dictEntries, ...articleEntries, ...eventEntries]
}
