/**
 * Editing schema for the site-level fields of SiteConfig — everything EXCEPT
 * `sections` (edited on the Content page) and `key` (immutable). Same descriptor
 * system, so the Site page and its validation come from one source too. Labels
 * are localized (en/ar) for the bilingual dashboard.
 */
import type { Field } from '../types/schema'
import type { Localized } from '../types/template'

const L = (en: string, ar: string): Localized => ({ en, ar })

const navItemFields: Field[] = [
  { key: 'label', label: L('Label', 'التسمية'), type: 'localized' },
  { key: 'to', label: L('Link', 'الرابط'), type: 'text', placeholder: '#about' },
]

export const siteSchema: Field[] = [
  {
    key: 'brand',
    label: L('Brand', 'العلامة التجارية'),
    type: 'group',
    fields: [
      { key: 'name', label: L('Name', 'الاسم'), type: 'text' },
      { key: 'subBrand', label: L('Sub-brand', 'الاسم الفرعي'), type: 'text', optional: true },
      {
        key: 'tagline',
        label: L('Tagline', 'العبارة التعريفية'),
        type: 'localized',
        optional: true,
      },
      { key: 'logo', label: L('Logo', 'الشعار'), type: 'image', optional: true },
    ],
  },
  {
    key: 'nav',
    label: L('Navigation links', 'روابط التنقل'),
    type: 'array',
    itemLabel: L('Link', 'رابط'),
    item: { key: '', type: 'group', fields: navItemFields },
  },
  {
    key: 'seo',
    label: L('SEO', 'تحسين محركات البحث'),
    type: 'group',
    fields: [
      { key: 'title', label: L('Title', 'العنوان'), type: 'localized' },
      { key: 'description', label: L('Description', 'الوصف'), type: 'localized-multiline' },
      {
        key: 'ogImage',
        label: L('Social share image', 'صورة المشاركة'),
        type: 'image',
        optional: true,
      },
    ],
  },
  {
    key: 'organization',
    label: L('Organization (schema.org)', 'المنظمة'),
    type: 'group',
    fields: [
      { key: 'legalName', label: L('Legal name', 'الاسم القانوني'), type: 'text' },
      { key: 'foundingYear', label: L('Founding year', 'سنة التأسيس'), type: 'number' },
      { key: 'logo', label: L('Logo', 'الشعار'), type: 'image', optional: true },
      { key: 'addressLocality', label: L('City', 'المدينة'), type: 'text' },
      {
        key: 'addressCountry',
        label: L('Country code', 'رمز الدولة'),
        type: 'text',
        placeholder: 'SA',
      },
      { key: 'email', label: L('Email', 'البريد الإلكتروني'), type: 'text' },
      { key: 'phone', label: L('Phone', 'الهاتف'), type: 'text' },
      {
        key: 'sameAs',
        label: L('Social profile URLs', 'روابط التواصل الاجتماعي'),
        type: 'array',
        itemLabel: L('URL', 'رابط'),
        optional: true,
        item: { key: '', type: 'text', placeholder: 'https://…' },
      },
    ],
  },
  {
    key: 'footer',
    label: L('Footer', 'التذييل'),
    type: 'group',
    optional: true,
    fields: [
      { key: 'note', label: L('Note', 'ملاحظة'), type: 'localized', optional: true },
      {
        key: 'columns',
        label: L('Columns', 'الأعمدة'),
        type: 'array',
        itemLabel: L('Column', 'عمود'),
        optional: true,
        item: {
          key: '',
          type: 'group',
          fields: [
            { key: 'title', label: L('Title', 'العنوان'), type: 'localized' },
            {
              key: 'links',
              label: L('Links', 'الروابط'),
              type: 'array',
              itemLabel: L('Link', 'رابط'),
              item: { key: '', type: 'group', fields: navItemFields },
            },
          ],
        },
      },
    ],
  },
  {
    key: 'features',
    label: L('Features', 'الميزات'),
    type: 'group',
    optional: true,
    fields: [
      {
        key: 'scrollTop',
        label: L('Show scroll-to-top button', 'إظهار زر العودة للأعلى'),
        type: 'boolean',
        default: true,
      },
    ],
  },
]
