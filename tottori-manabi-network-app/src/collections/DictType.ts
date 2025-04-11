import type { CollectionConfig } from 'payload'

export const DictType: CollectionConfig = {
  slug: 'dictType',
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
