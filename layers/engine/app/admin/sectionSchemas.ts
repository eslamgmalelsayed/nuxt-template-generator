/**
 * The editing schema for every section kind. Mirrors the data shapes in
 * types/template.ts, but as runtime descriptors so the dashboard can generate
 * forms and the server can validate — from one source. Keyed by the same
 * SectionComponent names the render registry uses.
 */
import type { Field, SectionSchema, SectionSchemaRegistry } from '../types/schema'

const ICON_OPTIONS = ['bolt', 'bulb', 'grid', 'shield', 'cpu', 'chart']

/** Reusable CTA group ({ label, to, variant }). */
const ctaFields: Field[] = [
  { key: 'label', label: 'Label', type: 'localized' },
  { key: 'to', label: 'Link', type: 'text', placeholder: '#contact' },
  {
    key: 'variant',
    label: 'Style',
    type: 'select',
    optional: true,
    options: [
      { value: 'primary', label: 'Primary' },
      { value: 'ghost', label: 'Ghost' },
    ],
  },
]

const hero: SectionSchema = {
  kind: 'HeroSection',
  label: 'Hero',
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'centered', label: 'Centered' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'localized', optional: true },
    { key: 'title', label: 'Title', type: 'localized' },
    { key: 'titleAccent', label: 'Title accent', type: 'localized', optional: true },
    { key: 'subtitle', label: 'Subtitle', type: 'localized-multiline', optional: true },
    {
      key: 'ctas',
      label: 'Call-to-action buttons',
      type: 'array',
      itemLabel: 'Button',
      optional: true,
      item: { key: '', type: 'group', fields: ctaFields },
    },
    {
      key: 'media',
      label: 'Hero media',
      type: 'group',
      optional: true,
      fields: [
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { value: 'svg', label: 'Animated SVG' },
            { value: '3d', label: '3D' },
          ],
        },
        { key: 'variant', label: 'Variant', type: 'text', optional: true },
      ],
    },
  ],
}

const stats: SectionSchema = {
  kind: 'StatsSection',
  label: 'Stats',
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'banded', label: 'Banded' },
  ],
  fields: [
    { key: 'heading', label: 'Heading', type: 'localized', optional: true },
    {
      key: 'items',
      label: 'Stats',
      type: 'array',
      itemLabel: 'Stat',
      item: {
        key: '',
        type: 'group',
        fields: [
          { key: 'value', label: 'Value', type: 'number' },
          { key: 'suffix', label: 'Suffix', type: 'text', optional: true, placeholder: '+' },
          { key: 'label', label: 'Label', type: 'localized' },
        ],
      },
    },
  ],
}

const about: SectionSchema = {
  kind: 'AboutSection',
  label: 'About',
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'stacked', label: 'Stacked' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'localized', optional: true },
    { key: 'heading', label: 'Heading', type: 'localized' },
    {
      key: 'body',
      label: 'Paragraphs',
      type: 'array',
      itemLabel: 'Paragraph',
      item: { key: '', type: 'localized-multiline' },
    },
    {
      key: 'highlights',
      label: 'Highlights',
      type: 'array',
      itemLabel: 'Highlight',
      optional: true,
      item: { key: '', type: 'localized' },
    },
  ],
}

const services: SectionSchema = {
  kind: 'ServicesSection',
  label: 'Services',
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'rows', label: 'Rows' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'localized', optional: true },
    { key: 'heading', label: 'Heading', type: 'localized' },
    { key: 'intro', label: 'Intro', type: 'localized-multiline', optional: true },
    {
      key: 'items',
      label: 'Services',
      type: 'array',
      itemLabel: 'Service',
      item: {
        key: '',
        type: 'group',
        fields: [
          {
            key: 'icon',
            label: 'Icon',
            type: 'select',
            options: ICON_OPTIONS.map((v) => ({ value: v, label: v })),
          },
          { key: 'title', label: 'Title', type: 'localized' },
          { key: 'description', label: 'Description', type: 'localized-multiline' },
        ],
      },
    },
  ],
}

const projects: SectionSchema = {
  kind: 'ProjectsSection',
  label: 'Projects',
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'list', label: 'List' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'localized', optional: true },
    { key: 'heading', label: 'Heading', type: 'localized' },
    { key: 'intro', label: 'Intro', type: 'localized-multiline', optional: true },
    {
      key: 'items',
      label: 'Projects',
      type: 'array',
      itemLabel: 'Project',
      item: {
        key: '',
        type: 'group',
        fields: [
          { key: 'title', label: 'Title', type: 'localized' },
          { key: 'category', label: 'Category', type: 'localized' },
          { key: 'image', label: 'Image', type: 'image', optional: true },
        ],
      },
    },
  ],
}

const partners: SectionSchema = {
  kind: 'PartnersSection',
  label: 'Partners',
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'marquee', label: 'Marquee' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'localized', optional: true },
    { key: 'heading', label: 'Heading', type: 'localized', optional: true },
    {
      key: 'logos',
      label: 'Logos',
      type: 'array',
      itemLabel: 'Logo',
      item: {
        key: '',
        type: 'group',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'src', label: 'Image', type: 'image', optional: true },
        ],
      },
    },
  ],
}

const contact: SectionSchema = {
  kind: 'ContactSection',
  label: 'Contact',
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'localized', optional: true },
    { key: 'heading', label: 'Heading', type: 'localized' },
    { key: 'intro', label: 'Intro', type: 'localized-multiline', optional: true },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'address', label: 'Address', type: 'localized' },
    { key: 'cta', label: 'Button', type: 'group', optional: true, fields: ctaFields },
  ],
}

export const sectionSchemas: SectionSchemaRegistry = {
  HeroSection: hero,
  StatsSection: stats,
  AboutSection: about,
  ServicesSection: services,
  ProjectsSection: projects,
  PartnersSection: partners,
  ContactSection: contact,
}
