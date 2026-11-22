-- Payload の API キー認証 (auth.useAPIKey) 用のカラムを users に追加する。
-- 本番は NODE_ENV=production で Payload の自動スキーマ反映(push)が走らないため、
-- コードをデプロイする「前に」この SQL を適用すること（先にデプロイするとログインが失敗する）。
-- カラム名は Payload(drizzle) の命名規則: enableAPIKey -> enable_a_p_i_key, apiKey -> api_key, apiKeyIndex -> api_key_index
-- 何度流しても安全 (IF NOT EXISTS)。

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS enable_a_p_i_key boolean;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS api_key varchar;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS api_key_index varchar;
