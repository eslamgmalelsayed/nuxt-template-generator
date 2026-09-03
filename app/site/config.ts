import type { SiteConfig } from '../../layers/engine/types'

/** Neutral blank preset — the base others copy. Proves the engine is not Rolaco-coupled. */
export const starterConfig: SiteConfig = {
  key: 'starter',
  brand: {
    name: 'Acme',
    subBrand: 'Studio',
    tagline: { en: 'Your tagline goes here', ar: 'شعارك هنا' },
  },
  nav: [
    { label: { en: 'Home', ar: 'الرئيسية' }, to: '#hero' },
    { label: { en: 'About', ar: 'من نحن' }, to: '#about' },
    { label: { en: 'Services', ar: 'خدماتنا' }, to: '#services' },
    { label: { en: 'Contact', ar: 'تواصل' }, to: '#contact' },
  ],
  seo: {
    title: { en: 'Acme Studio — Starter', ar: 'أكمي ستوديو — قالب' },
    description: { en: 'A blank Strata starter template.', ar: 'قالب ستراتا مبدئي فارغ.' },
  },
  organization: {
    legalName: 'Acme Studio',
    foundingYear: 2020,
    addressLocality: 'Anywhere',
    addressCountry: 'US',
    email: 'hello@acme.example.com',
    phone: '+1 555 000 0000',
  },
  sections: [
    {
      id: 'hero',
      component: 'HeroSection',
      variant: 'centered',
      data: {
        eyebrow: { en: 'Starter', ar: 'قالب' },
        title: { en: 'Build anything', ar: 'ابنِ أي شيء' },
        titleAccent: { en: 'on Strata', ar: 'على ستراتا' },
        subtitle: {
          en: 'Swap this config and theme to create a brand-new site — no component edits.',
          ar: 'بدّل هذا الإعداد والمظهر لإنشاء موقع جديد كليًا — دون تعديل المكوّنات.',
        },
        ctas: [{ label: { en: 'Get started', ar: 'ابدأ' }, to: '#contact', variant: 'primary' }],
        media: { type: 'svg', variant: 'skyline' },
      },
    },
    {
      id: 'stats',
      component: 'StatsSection',
      variant: 'banded',
      data: {
        heading: { en: 'By the numbers', ar: 'بالأرقام' },
        items: [
          { value: 10, suffix: '+', label: { en: 'Years', ar: 'سنوات' } },
          { value: 200, suffix: '+', label: { en: 'Projects', ar: 'مشاريع' } },
          { value: 30, suffix: '+', label: { en: 'Clients', ar: 'عملاء' } },
          { value: 5, suffix: '', label: { en: 'Offices', ar: 'مكاتب' } },
        ],
      },
    },
    {
      id: 'about',
      component: 'AboutSection',
      variant: 'stacked',
      data: {
        eyebrow: { en: 'Who we are', ar: 'من نحن' },
        heading: { en: 'A short about heading', ar: 'عنوان تعريفي قصير' },
        body: [
          {
            en: 'Replace this placeholder copy with your own story. The engine handles layout, SEO, i18n and a11y.',
            ar: 'استبدل هذا النص التجريبي بقصتك. يتكفّل المحرك بالتخطيط وتحسين محركات البحث والترجمة وإتاحة الوصول.',
          },
        ],
        highlights: [
          { en: 'Point one', ar: 'نقطة أولى' },
          { en: 'Point two', ar: 'نقطة ثانية' },
          { en: 'Point three', ar: 'نقطة ثالثة' },
        ],
      },
    },
    {
      id: 'services',
      component: 'ServicesSection',
      variant: 'rows',
      data: {
        eyebrow: { en: 'What we do', ar: 'ماذا نقدّم' },
        heading: { en: 'Services', ar: 'خدماتنا' },
        items: [
          {
            icon: 'bolt',
            title: { en: 'Service one', ar: 'خدمة أولى' },
            description: { en: 'Describe your service here.', ar: 'صف خدمتك هنا.' },
          },
          {
            icon: 'bulb',
            title: { en: 'Service two', ar: 'خدمة ثانية' },
            description: { en: 'Describe your service here.', ar: 'صف خدمتك هنا.' },
          },
          {
            icon: 'grid',
            title: { en: 'Service three', ar: 'خدمة ثالثة' },
            description: { en: 'Describe your service here.', ar: 'صف خدمتك هنا.' },
          },
        ],
      },
    },
    {
      id: 'projects',
      component: 'ProjectsSection',
      variant: 'list',
      data: {
        eyebrow: { en: 'Work', ar: 'أعمال' },
        heading: { en: 'Selected projects', ar: 'مشاريع مختارة' },
        intro: { en: 'A few things we have shipped.', ar: 'نماذج مما أنجزناه.' },
        items: [
          { title: { en: 'Project Alpha', ar: 'مشروع ألفا' }, category: { en: 'Web', ar: 'ويب' } },
          {
            title: { en: 'Project Beta', ar: 'مشروع بيتا' },
            category: { en: 'Brand', ar: 'هوية' },
          },
          {
            title: { en: 'Project Gamma', ar: 'مشروع غاما' },
            category: { en: 'App', ar: 'تطبيق' },
          },
        ],
      },
    },
    {
      id: 'contact',
      component: 'ContactSection',
      data: {
        eyebrow: { en: 'Get in touch', ar: 'تواصل' },
        heading: { en: 'Contact us', ar: 'تواصل معنا' },
        intro: { en: 'Tell us about your project.', ar: 'أخبرنا عن مشروعك.' },
        email: 'hello@acme.example.com',
        phone: '+1 555 000 0000',
        address: { en: 'Anywhere, USA', ar: 'أي مكان، الولايات المتحدة' },
        cta: { label: { en: 'Send', ar: 'إرسال' }, to: '#contact', variant: 'primary' },
      },
    },
  ],
  footer: {
    note: { en: 'A Strata starter template.', ar: 'قالب ستراتا مبدئي.' },
  },
}
