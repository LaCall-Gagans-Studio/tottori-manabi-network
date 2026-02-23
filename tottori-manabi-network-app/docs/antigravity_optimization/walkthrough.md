# Walkthrough - Antigravity 最適化

RSC ストリーミングのタイムアウト（Connection closed）を解消するため、データ取得処理の全最適化を実施しました。

## 変更一覧

### データ取得ライブラリ（3 ファイル）

| 変更               | Before              | After                                                        |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| limit              | `1000`              | Dict/News: `200`、Article: `100`                             |
| depth（Article）   | `2`                 | `1`（一覧表示に depth:2 は不要）                             |
| fetchキャッシュ    | `cache: 'no-store'` | `next: { revalidate: 60 }`                                   |
| エラーハンドリング | なし（クラッシュ）  | `try-catch` + `res.ok` チェック、失敗時は `[]`/`null` を返却 |
| console.log        | 本番コードに残置    | 削除                                                         |

render_diffs(file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getDict.ts)

render_diffs(file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getArticle.ts)

render_diffs(file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getNews.ts)

### ページコンポーネント（4 ファイル）

各ページにデータ取得専用の async Server Component を切り出し、`<Suspense>` でラップしました。これにより、**データ取得中もブラウザとの接続（ストリーム）が維持され、Connection closed が解消**されます。

```
Page コンポーネント（即時レスポンス）
├─ Header（即時描画）
├─ <Suspense fallback={<Skeleton />}>
│    └─ XxxList（async、データ取得後に描画）
└─ Footer（即時描画）
```

- [dicts/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/dicts/page.tsx>): `DictList` + `DictCard` に分離、重複コード削除、スケルトン UI 追加
- [articles/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/articles/page.tsx>): `ArticleList` に分離、スケルトン UI 追加
- [events/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/events/page.tsx>): `EventList` に分離、スケルトン UI 追加
- [news/page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/news/page.tsx>): `NewsList` に分離、スケルトン UI 追加

## 検証

- `npm run lint`：**エラーなし（exit code: 0）**

## 今後の推奨対応（スコープ外）

> [!TIP]
> さらに高速化したい場合は、**Payload Local API（`getPayload()`）** への書き換えが有効です。Next.js サーバーから自身の API に HTTP リクエストを投げるオーバーヘッドをゼロにできます。ただし、アーキテクチャ変更が必要なため別タスクでの対応を推奨します。
