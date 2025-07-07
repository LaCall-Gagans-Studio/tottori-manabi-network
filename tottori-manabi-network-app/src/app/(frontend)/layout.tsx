import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './styles.css'

// --- SEOとメタデータのための基本情報を一元管理 ---
// 変更が必要な場合はこのオブジェクトを編集するだけで済みます。
const siteConfig = {
  title: 'つなかん｜鳥取のフリースクール情報・不登校支援ネットワーク',
  description:
    '鳥取県のフリースクール情報なら「つなかん」。不登校や行き渋りで悩むお子様と保護者のため、元教員が県内の施設を徹底比較。特徴や費用、サポート内容を網羅し、お子様に最適な学びの場探しを支援します。',
  url: 'https://www.tuna-kan.org',
  siteName: 'とっとりフリースクールネットワーク つなかん',
  twitterId: 'YourTwitterHandle',
}

// --- Next.js Metadata APIによる設定 ---
export const metadata: Metadata = {
  // metadataBaseを設定すると、OGP画像などの相対パスを自動で絶対パスに変換してくれます。
  metadataBase: new URL(siteConfig.url),

  // ページのタイトル
  title: {
    default: siteConfig.title, // デフォルトのタイトル
    template: `%s | ${siteConfig.siteName}`, // 各ページで設定されたタイトルにサイト名を付与
  },

  // ページの説明
  description: siteConfig.description,

  // キーワード (現在のGoogleでは評価されませんが、設定する場合はこちら)
  keywords: [
    '鳥取県',
    '不登校',
    'フリースクール',
    '行き渋り',
    '引きこもり',
    '教育支援',
    '親の会',
    '鳥取市',
    '米子市',
    '倉吉市',
    '居場所',
    '多様な学び',
    '学習支援',
    '通信制高校',
    '教育相談',
    '発達障害',
  ],

  // クローラー（検索エンジン）への指示
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // 正規URLの設定
  alternates: {
    canonical: '/',
  },

  // OGP (Open Graph Protocol) の設定 - Facebook, LINEなどでシェアされた際に表示
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `【鳥取の保護者様へ】お子様に合うフリースクールが見つかる｜${siteConfig.siteName}`, // SNS向けに少しキャッチーなタイトル
    description: siteConfig.description,
    siteName: siteConfig.siteName,
    images: [
      {
        url: '/common/logo.webp', // metadataBaseにより絶対パスに変換されます
        width: 600,
        height: 600,
        alt: `${siteConfig.siteName}のロゴ`, // 具体的なaltテキスト
      },
    ],
  },

  // Twitterカードの設定
  twitter: {
    card: 'summary_large_image',
    site: `@${siteConfig.twitterId}`, // サイト運営者のTwitterアカウント
    title: `【鳥取の保護者様へ】お子様に合うフリースクールが見つかる｜${siteConfig.siteName}`, // OGPと同じタイトル
    description: siteConfig.description,
    images: [`${siteConfig.url}/common/logo.webp`], // 必ず絶対パスで指定
  },

  // Googleサイト所有権の確認タグ
  verification: {
    google: 'EzH28jpTZShqeDUipsnA9Hjd5yTcKMGEPQQ4hkPLjFU',
  },

  // Webサイトのアイコン設定
  icons: {
    icon: '/favicon.ico',
  },

  // ビューポート設定
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

// --- 構造化データ (JSON-LD) の設定 ---
// 検索エンジンにサイトの構造や意味をより正確に伝えるためのデータ
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteConfig.title,
      url: siteConfig.url,
      // 検索結果にサイト内検索ボックスを表示させるための設定
      // ※サイトに検索機能がある場合 (例: /search?q=検索語) に有効
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.siteName,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/common/logo.webp`,
        width: 600,
        height: 600,
      },
      description:
        '鳥取県内のフリースクール情報を網羅するポータルサイト。元教員の運営者が、不登校や多様な学びを求める子どもたちと保護者に寄り添い、信頼できる情報を提供します。',
      // 運営者の情報を公開できる場合は、以下を追加すると信頼性が高まります
      // "founder": {
      //    "@type": "Person",
      //    "name": "運営者名",
      //    "jobTitle": "元教員"
      // }
    },
  ],
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      {/* 
        <head>内のタグは基本的にmetadataオブジェクトで管理されます。
        JSON-LDのようなscriptタグや、サードパーティのスクリプトなど、
        metadataで管理できないもののみ、ここに記述します。
      */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-slate-50">{children}</body>
    </html>
  )
}
