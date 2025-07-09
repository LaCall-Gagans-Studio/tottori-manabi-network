import type { CollectionConfig } from 'payload'

export const DictTags: CollectionConfig = {
  slug: 'dictTags',
  labels: {
    singular: '施設タグ',
    plural: '施設タグ',
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
