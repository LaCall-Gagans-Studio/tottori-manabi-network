import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'ユーザー｜編集注意',
    plural: 'ユーザー｜編集注意',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    // 記事投稿用の API キー認証。管理画面でユーザーごとに有効化・発行する（docs/article-api.md）
    useAPIKey: true,
  },
  fields: [],
}
