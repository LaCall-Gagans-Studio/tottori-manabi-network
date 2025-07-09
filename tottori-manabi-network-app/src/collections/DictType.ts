import type { CollectionConfig } from 'payload'

export const DictType: CollectionConfig = {
  slug: 'dictType',
  labels: {
    singular: '施設タイプ',
    plural: '施設タイプ',
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
