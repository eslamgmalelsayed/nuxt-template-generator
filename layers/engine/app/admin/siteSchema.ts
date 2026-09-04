/**
 * Editing schema for the site-level fields of SiteConfig — everything EXCEPT
 * `sections` (edited on the Content page) and `key` (immutable). Same descriptor
 * system, so the Site page and its validation come from one source too.
 */
import type { Field } from '../types/schema'

const navItemFields: Field[] = [
  { key: 'label', label: 'Label', type: 'localized' },
  { key: 'to', label: 'Link', type: 'text', placeholder: '#about' },
]

export const siteSchema: Field[] = [
  {
    key: 'brand',
    label: 'Brand',
    type: 'group',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'subBrand', label: 'Sub-brand', type: 'text', optional: true },
      { key: 'tagline', label: 'Tagline', type: 'localized', optional: true },
      { key: 'logo', label: 'Logo', type: 'image', optional: true },
    ],
  },
  {
    key: 'nav',
    label: 'Navigation links',
    type: 'array',
    itemLabel: 'Link',
    item: { key: '', type: 'group', fields: navItemFields },
  },
  {
    key: 'seo',
    label: 'SEO',
    type: 'group',
    fields: [
      { key: 'title', label: 'Title', type: 'localized' },
      { key: 'description', label: 'Description', type: 'localized-multiline' },
      { key: 'ogImage', label: 'Social share image', type: 'image', optional: true },
    ],
  },
  {
    key: 'organization',
    label: 'Organization (schema.org)',
    type: 'group',
    fields: [
      { key: 'legalName', label: 'Legal name', type: 'text' },
      { key: 'foundingYear', label: 'Founding year', type: 'number' },
      { key: 'logo', label: 'Logo', type: 'image', optional: true },
      { key: 'addressLocality', label: 'City', type: 'text' },
      { key: 'addressCountry', label: 'Country code', type: 'text', placeholder: 'SA' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      {
        key: 'sameAs',
        label: 'Social profile URLs',
        type: 'array',
        itemLabel: 'URL',
        optional: true,
        item: { key: '', type: 'text', placeholder: 'https://…' },
      },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    type: 'group',
    optional: true,
    fields: [
      { key: 'note', label: 'Note', type: 'localized', optional: true },
      {
        key: 'columns',
        label: 'Columns',
        type: 'array',
        itemLabel: 'Column',
        optional: true,
        item: {
          key: '',
          type: 'group',
          fields: [
            { key: 'title', label: 'Title', type: 'localized' },
            {
              key: 'links',
              label: 'Links',
              type: 'array',
              itemLabel: 'Link',
              item: { key: '', type: 'group', fields: navItemFields },
            },
          ],
        },
      },
    ],
  },
  {
    key: 'features',
    label: 'Features',
    type: 'group',
    optional: true,
    fields: [
      {
        key: 'scrollTop',
        label: 'Show scroll-to-top button',
        type: 'boolean',
        default: true,
      },
    ],
  },
]
