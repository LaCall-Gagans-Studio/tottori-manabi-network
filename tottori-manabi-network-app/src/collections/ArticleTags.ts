import type { CollectionConfig } from 'payload'

export const ArticleTags: CollectionConfig = {
  slug: 'articleTags',
  labels: {
    singular: '記事タグ',
    plural: '記事タグ',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
