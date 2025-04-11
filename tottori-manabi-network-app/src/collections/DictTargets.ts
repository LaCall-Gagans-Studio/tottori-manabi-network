import type { CollectionConfig } from 'payload'

export const DictTargets: CollectionConfig = {
  slug: 'dictTargets',
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
