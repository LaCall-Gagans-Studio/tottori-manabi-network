# 記事を API で作る（Payload の API キー認証）

エージェント（つむぎ）が `/api/article` に記事を作れるようにするための設定と手順。
`users` コレクションに `auth.useAPIKey: true` を入れてある。API キーを有効にしたユーザーは
`Authorization: users API-Key <キー>` で認証でき、`article` の create/update が通る（`article` の create 等は「ログイン済みなら可」の既定のまま）。

## 初回セットアップ（とうまさん）

1. **DB にカラムを追加する（デプロイより先）**
   `supabase/migrations/20261117120000_users_api_key.sql` を本番 DB に適用する（Supabase の SQL エディタ、または承認のうえつむぎに適用させる）。
   本番では Payload の自動スキーマ反映が走らないため、先にデプロイするとログインが壊れる。
2. このブランチをマージ → Vercel にデプロイ。
3. `https://www.tuna-kan.org/admin` に入り、**専用ユーザーを新規作成**（例: `agent-tsumugi@…`、パスワードは長いランダム値）。
   既存の編集者アカウントのキーは使わない（権限を分けて、漏れたときにそのユーザーだけ止められるように）。
4. そのユーザーの編集画面で **「Enable API Key」をオン** → 表示された **API Key** を控えて保存。
5. キーを **VPS の環境変数 `TUNAKAN_API_KEY`**（つむぎの実行環境）に入れる。リポジトリ・チャット・Vercel には置かない。
   失効させたいときは同画面で Enable API Key をオフ（または再発行）。

## 使い方

```bash
# 下書きを1件作る（published=false）。キーは環境変数から読む
curl -sS -X POST https://www.tuna-kan.org/api/article \
  -H "Authorization: users API-Key $TUNAKAN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"タイトル","type":"article","published":false,"slogan_short":"…"}'
```

- 成功すると `{"doc":{"id":…,"published":false,…},"message":"Article successfully created."}` が返る。
- `pre` / `main` は Lexical の richText JSON。`tags` は `articleTags` の id 配列、`thumbnail` は `media` の id（先に `/api/media` にアップロード）。
- **公開しない**: 作成時は必ず `published:false`。公開（`true`）はとうまさんの指示があるときだけ。

## 注意

- `article` は `read: () => true` のため、**下書き（`published=false`）も `/api/article` から誰でも読める**。フロントは published で絞っているが、API では絞られていない。下書きに公開前の内容を置く場合は read アクセス制御の見直しが別途必要。
- キーは `PAYLOAD_SECRET` で暗号化して保存される。`PAYLOAD_SECRET` を変えると既存キーは無効になる。
