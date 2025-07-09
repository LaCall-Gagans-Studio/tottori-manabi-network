import type { CollectionConfig } from 'payload'

export const Dict: CollectionConfig = {
  slug: 'dict',
  labels: {
    singular: '施設',
    plural: '施設',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '基本情報',
          fields: [
            {
              // 公開状況
              name: 'published',
              type: 'checkbox',
              defaultValue: false,
              label: '公開中',
              admin: {
                position: 'sidebar',
              },
            },
            {
              // 詳細ページの有無
              name: 'hasPage',
              type: 'checkbox',
              defaultValue: false,
              label: '詳細ページあり',
            },
            {
              // 種別
              name: 'type',
              type: 'relationship',
              label: '種別',
              relationTo: 'dictType',
              hasMany: true,
            },
            {
              // 名前
              name: 'name',
              type: 'text',
              required: true,
              label: '名前',
            },
            {
              // 運営組織
              name: 'org',
              type: 'text',
              label: '運営組織',
            },
            {
              // 住所
              name: 'address',
              type: 'text',
              label: '住所',
            },
            {
              // アイキャッチ（短）
              name: 'slogan_short',
              type: 'text',
              label: 'アイキャッチ（短）',
            },
            {
              // アイキャッチ（長）
              name: 'slogan_long',
              type: 'textarea',
              label: 'アイキャッチ（長）',
            },
            {
              // タグ
              name: 'tags',
              type: 'relationship',
              label: 'タグ',
              hasMany: true,
              relationTo: 'dictTags',
            },
            {
              // ターゲット
              name: 'targets',
              type: 'relationship',
              label: 'ターゲット',
              hasMany: true,
              relationTo: 'dictTargets',
            },
            {
              // 送迎
              name: 'transport',
              type: 'text',
              label: '送迎',
            },
            {
              // 給食
              name: 'lunch',
              type: 'text',
              label: '給食',
            },
            {
              // 学費
              name: 'tuition',
              type: 'text',
              label: '学費',
            },
            {
              // 認定
              name: 'recognition',
              type: 'checkbox',
              defaultValue: false,
              label: '認定',
            },
            {
              // サムネイル
              name: 'thumbnail',
              type: 'upload',
              label: 'サムネイル',
              relationTo: 'media',
            },
          ],
        },
        {
          label: '詳細情報',
          fields: [
            {
              // 代表者氏名
              name: 'chair',
              type: 'text',
              label: '代表者氏名',
            },
            {
              // ギャラリー
              name: 'gallery',
              type: 'upload',
              label: 'ギャラリー',
              relationTo: 'media',
              hasMany: true,
            },
            {
              // 引用
              name: 'citation',
              type: 'textarea',
              label: '引用',
            },
            {
              // キーワード
              name: 'keywords',
              type: 'array',
              label: 'キーワード',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                },
              ],
            },
            {
              // ポイント
              name: 'point',
              type: 'richText',
              label: 'ポイント',
            },
            {
              // 本文
              name: 'main',
              type: 'richText',
              label: '本文',
            },
            {
              // 時間割
              name: 'schedule',
              type: 'richText',
              label: '時間割',
            },
            {
              // 費用
              name: 'costs',
              type: 'richText',
              label: '費用',
            },
            {
              // 行事
              name: 'events',
              type: 'richText',
              label: '行事',
            },
            {
              // 定員
              name: 'capacity',
              type: 'number',
              label: '定員',
            },
            {
              // 設立年月日
              name: 'date_launch',
              type: 'date',
              label: '設立年月日',
            },
            {
              // 認定年月日
              name: 'date_recognized',
              type: 'date',
              label: '認定年月日（認定済の場合）',
            },
            {
              // 座標
              name: 'location',
              type: 'point',
              label: '座標',
            },
            {
              // Link
              name: 'link',
              type: 'text',
              label: 'URL',
            },
          ],
        },
      ],
    },
  ],
}
