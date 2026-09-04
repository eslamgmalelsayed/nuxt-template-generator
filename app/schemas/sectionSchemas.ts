/**
 * The editing schema for every section kind. Mirrors the data shapes in
 * types/template.ts, but as runtime descriptors so the dashboard can generate
 * forms and the server can validate — from one source. Keyed by the same
 * SectionComponent names the render registry uses. Labels are localized (en/ar)
 * so the dashboard renders in either language.
 */
import type { Field, SectionSchema, SectionSchemaRegistry } from '#engine/types'
import type { Localized } from '#engine/types'

/** Compact localized-label helper. */
const L = (en: string, ar: string): Localized => ({ en, ar })

const ICON_OPTIONS = ['bolt', 'bulb', 'grid', 'shield', 'cpu', 'chart']

/** Reusable CTA group ({ label, to, variant }). */
const ctaFields: Field[] = [
  { key: 'label', label: L('Label', 'التسمية'), type: 'localized' },
  { key: 'to', label: L('Link', 'الرابط'), type: 'text', placeholder: '#contact' },
  {
    key: 'variant',
    label: L('Style', 'النمط'),
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
  label: L('Hero', 'الواجهة'),
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'centered', label: 'Centered' },
  ],
  fields: [
    { key: 'eyebrow', label: L('Eyebrow', 'تمهيد'), type: 'localized', optional: true },
    { key: 'title', label: L('Title', 'العنوان'), type: 'localized' },
    {
      key: 'titleAccent',
      label: L('Title accent', 'تمييز العنوان'),
      type: 'localized',
      optional: true,
    },
    {
      key: 'subtitle',
      label: L('Subtitle', 'العنوان الفرعي'),
      type: 'localized-multiline',
      optional: true,
    },
    {
      key: 'ctas',
      label: L('Call-to-action buttons', 'أزرار الإجراء'),
      type: 'array',
      itemLabel: L('Button', 'زر'),
      optional: true,
      item: { key: '', type: 'group', fields: ctaFields },
    },
    {
      key: 'media',
      label: L('Hero media', 'وسائط الواجهة'),
      type: 'group',
      optional: true,
      fields: [
        {
          key: 'type',
          label: L('Type', 'النوع'),
          type: 'select',
          options: [
            { value: 'svg', label: 'Animated SVG' },
            { value: '3d', label: '3D' },
          ],
        },
        { key: 'variant', label: L('Variant', 'النمط'), type: 'text', optional: true },
      ],
    },
  ],
}

const stats: SectionSchema = {
  kind: 'StatsSection',
  label: L('Stats', 'الإحصائيات'),
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'banded', label: 'Banded' },
  ],
  fields: [
    { key: 'heading', label: L('Heading', 'العنوان'), type: 'localized', optional: true },
    {
      key: 'items',
      label: L('Stats', 'الإحصائيات'),
      type: 'array',
      itemLabel: L('Stat', 'إحصائية'),
      item: {
        key: '',
        type: 'group',
        fields: [
          { key: 'value', label: L('Value', 'القيمة'), type: 'number' },
          {
            key: 'suffix',
            label: L('Suffix', 'لاحقة'),
            type: 'text',
            optional: true,
            placeholder: '+',
          },
          { key: 'label', label: L('Label', 'التسمية'), type: 'localized' },
        ],
      },
    },
  ],
}

const about: SectionSchema = {
  kind: 'AboutSection',
  label: L('About', 'نبذة'),
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'stacked', label: 'Stacked' },
  ],
  fields: [
    { key: 'eyebrow', label: L('Eyebrow', 'تمهيد'), type: 'localized', optional: true },
    { key: 'heading', label: L('Heading', 'العنوان'), type: 'localized' },
    {
      key: 'body',
      label: L('Paragraphs', 'الفقرات'),
      type: 'array',
      itemLabel: L('Paragraph', 'فقرة'),
      item: { key: '', type: 'localized-multiline' },
    },
    {
      key: 'highlights',
      label: L('Highlights', 'النقاط المميزة'),
      type: 'array',
      itemLabel: L('Highlight', 'نقطة'),
      optional: true,
      item: { key: '', type: 'localized' },
    },
  ],
}

const services: SectionSchema = {
  kind: 'ServicesSection',
  label: L('Services', 'الخدمات'),
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'rows', label: 'Rows' },
  ],
  fields: [
    { key: 'eyebrow', label: L('Eyebrow', 'تمهيد'), type: 'localized', optional: true },
    { key: 'heading', label: L('Heading', 'العنوان'), type: 'localized' },
    { key: 'intro', label: L('Intro', 'مقدمة'), type: 'localized-multiline', optional: true },
    {
      key: 'items',
      label: L('Services', 'الخدمات'),
      type: 'array',
      itemLabel: L('Service', 'خدمة'),
      item: {
        key: '',
        type: 'group',
        fields: [
          {
            key: 'icon',
            label: L('Icon', 'أيقونة'),
            type: 'select',
            options: ICON_OPTIONS.map((v) => ({ value: v, label: v })),
          },
          { key: 'title', label: L('Title', 'العنوان'), type: 'localized' },
          { key: 'description', label: L('Description', 'الوصف'), type: 'localized-multiline' },
        ],
      },
    },
  ],
}

const projects: SectionSchema = {
  kind: 'ProjectsSection',
  label: L('Projects', 'المشاريع'),
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'list', label: 'List' },
  ],
  fields: [
    { key: 'eyebrow', label: L('Eyebrow', 'تمهيد'), type: 'localized', optional: true },
    { key: 'heading', label: L('Heading', 'العنوان'), type: 'localized' },
    { key: 'intro', label: L('Intro', 'مقدمة'), type: 'localized-multiline', optional: true },
    {
      key: 'items',
      label: L('Projects', 'المشاريع'),
      type: 'array',
      itemLabel: L('Project', 'مشروع'),
      item: {
        key: '',
        type: 'group',
        fields: [
          { key: 'title', label: L('Title', 'العنوان'), type: 'localized' },
          { key: 'category', label: L('Category', 'الفئة'), type: 'localized' },
          { key: 'image', label: L('Image', 'صورة'), type: 'image', optional: true },
        ],
      },
    },
  ],
}

const partners: SectionSchema = {
  kind: 'PartnersSection',
  label: L('Partners', 'الشركاء'),
  variants: [
    { value: 'default', label: 'Default' },
    { value: 'marquee', label: 'Marquee' },
  ],
  fields: [
    { key: 'eyebrow', label: L('Eyebrow', 'تمهيد'), type: 'localized', optional: true },
    { key: 'heading', label: L('Heading', 'العنوان'), type: 'localized', optional: true },
    {
      key: 'logos',
      label: L('Logos', 'الشعارات'),
      type: 'array',
      itemLabel: L('Logo', 'شعار'),
      item: {
        key: '',
        type: 'group',
        fields: [
          { key: 'name', label: L('Name', 'الاسم'), type: 'text' },
          { key: 'src', label: L('Image', 'صورة'), type: 'image', optional: true },
        ],
      },
    },
  ],
}

const contact: SectionSchema = {
  kind: 'ContactSection',
  label: L('Contact', 'تواصل'),
  fields: [
    { key: 'eyebrow', label: L('Eyebrow', 'تمهيد'), type: 'localized', optional: true },
    { key: 'heading', label: L('Heading', 'العنوان'), type: 'localized' },
    { key: 'intro', label: L('Intro', 'مقدمة'), type: 'localized-multiline', optional: true },
    { key: 'email', label: L('Email', 'البريد الإلكتروني'), type: 'text' },
    { key: 'phone', label: L('Phone', 'الهاتف'), type: 'text' },
    { key: 'address', label: L('Address', 'العنوان'), type: 'localized' },
    { key: 'cta', label: L('Button', 'زر'), type: 'group', optional: true, fields: ctaFields },
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
