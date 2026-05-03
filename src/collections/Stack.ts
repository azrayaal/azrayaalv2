import type { CollectionConfig } from 'payload'

export const Stack: CollectionConfig = {
  slug: 'stack',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'order'],
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name or emoji',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
