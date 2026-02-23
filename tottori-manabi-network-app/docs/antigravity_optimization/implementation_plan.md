# 実装計画 - データ取得の Antigravity 最適化

RSC ストリーミングのタイムアウト（Connection closed）を解決するため、データ取得処理を軽量・高速化します。

## 現状の問題点

| 問題                                                       | 該当箇所                              |
| ---------------------------------------------------------- | ------------------------------------- |
| `limit: '1000'` で全件取得しており、ペイロードが重大       | getDict.ts, getArticle.ts, getNews.ts |
| `cache: 'no-store'` で毎リクエストごとに DB 問い合わせ     | 全 fetch                              |
| `console.log` が本番コードに残っている                     | getDict.ts, getArticle.ts, getNews.ts |
| `res.ok` チェックや `try-catch` がなく、失敗時にクラッシュ | 全 fetch                              |
| 一覧ページがデータ取得完了まで何も表示しない               | dicts/page.tsx, articles/page.tsx 等  |

> [!IMPORTANT]
> 要件3「Payload Local API の活用」については、現在のプロジェクト構成では `getPayload()` はサーバーコンポーネント内での同一プロセス実行時のみ有効です。今回は **HTTP fetch + ISR** の組み合わせで十分な効果が得られるため、Local API への書き換えは今回のスコープ外とします（将来の最適化として提案）。

## 変更一覧

---

### データ取得ライブラリ

#### [MODIFY] [getDict.ts](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getDict.ts>)

- `getDicts`: `limit: '1000'` → `limit: '200'`（施設数は最大でも100件台のため余裕を持たせた値）
- `getDicts` / `getDict`: `cache: 'no-store'` → `next: { revalidate: 60 }`
- `console.log` を削除
- `try-catch` + `res.ok` チェックを追加（失敗時は `[]` or `null` を返す）

#### [MODIFY] [getArticle.ts](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getArticle.ts>)

- `getArticles` / `getEvents`: `limit: '1000'` → `limit: '100'`、`depth: '2'` → `depth: '1'`
- `cache: 'no-store'` → `next: { revalidate: 60 }`
- `console.log` を削除
- `try-catch` + `res.ok` チェックを追加

#### [MODIFY] [getNews.ts](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getNews.ts>)

- `limit: '1000'` → `limit: '200'`
- `cache: 'no-store'` → `next: { revalidate: 60 }`
- `console.log` を削除
- `try-catch` + `res.ok` チェックを追加

---

### ページコンポーネント

#### [MODIFY] [dicts/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/dicts/page.tsx>)

- データ取得部分を別の async Server Component (`DictList`) に切り出し、`<Suspense>` でラップ
- スケルトン UI (Loading) を追加

#### [MODIFY] [articles/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/articles/page.tsx>)

- データ取得部分を別の async Server Component (`ArticleList`) に切り出し、`<Suspense>` でラップ

#### [MODIFY] [events/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/events/page.tsx>)

- データ取得部分を別の async Server Component (`EventList`) に切り出し、`<Suspense>` でラップ

#### [MODIFY] [news/page.tsx](<file:///c:/Users/Tohma\Dev\tottori-manabi-network\tottori-manabi-network-app/src/app/(frontend)/news/page.tsx>)

- データ取得部分を別の async Server Component (`NewsList`) に切り出し、`<Suspense>` でラップ

---

## 検証計画

### 自動チェック

- `npm run lint`：型エラー・構文エラーがないことを確認

### 手動確認

1. `/dicts`、`/articles`、`/events`、`/news` を開き、スケルトン UI が表示されてからコンテンツが描画されることを確認
2. `Connection closed` エラーが発生しないことを確認
3. 2回目以降のアクセスが ISR キャッシュで高速化されていることを確認
