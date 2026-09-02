import type { SiteConfig } from '@strata/engine/types'

/**
 * Rolaco — Arabian Shutoh & Lights (the first business preset).
 * All business content lives here as localized { en, ar } values. Reordering,
 * enabling/disabling, or restyling sections is a config change, never a code change.
 */
export const rolacoConfig: SiteConfig = {
  key: 'rolaco',
  brand: {
    name: 'Rolaco',
    subBrand: 'Arabian Shutoh & Lights',
    tagline: {
      en: 'Powering Saudi Arabia for over 50 years',
      ar: 'نُنير المملكة العربية السعودية منذ أكثر من ٥٠ عامًا',
    },
  },

  nav: [
    { label: { en: 'Home', ar: 'الرئيسية' }, to: '#hero' },
    { label: { en: 'About', ar: 'من نحن' }, to: '#about' },
    { label: { en: 'Services', ar: 'خدماتنا' }, to: '#services' },
    { label: { en: 'Projects', ar: 'أعمالنا' }, to: '#projects' },
    { label: { en: 'Contact', ar: 'تواصل معنا' }, to: '#contact' },
  ],

  seo: {
    title: {
      en: 'Electric Power & Lighting Solutions',
      ar: 'حلول الطاقة الكهربائية والإضاءة',
    },
    description: {
      en: 'Rolaco (Arabian Shutoh & Lights) delivers electric power, switchgear and lighting solutions across Saudi Arabia — trusted for more than 50 years.',
      ar: 'تقدّم رولاكو (الشطوة العربية والإنارة) حلول الطاقة الكهربائية ولوحات التوزيع والإضاءة في جميع أنحاء المملكة العربية السعودية، بخبرة تتجاوز ٥٠ عامًا.',
    },
  },

  organization: {
    legalName: 'Rolaco — Arabian Shutoh & Lights',
    foundingYear: 1974,
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
    email: 'info@rolaco.example.com',
    phone: '+966 11 000 0000',
    sameAs: [],
  },

  sections: [
    {
      id: 'hero',
      component: 'HeroSection',
      data: {
        eyebrow: { en: 'Company Profile', ar: 'الملف التعريفي' },
        title: { en: 'Powering the Kingdom', ar: 'نُشغّل المملكة' },
        titleAccent: { en: 'for 50+ years', ar: 'منذ أكثر من ٥٠ عامًا' },
        subtitle: {
          en: 'Rolaco — Arabian Shutoh & Lights engineers electric power, distribution and lighting solutions that keep Saudi Arabia running, day and night.',
          ar: 'تُصمّم رولاكو — الشطوة العربية والإنارة حلول الطاقة الكهربائية والتوزيع والإضاءة التي تُبقي المملكة تعمل ليلًا ونهارًا.',
        },
        ctas: [
          { label: { en: 'Explore services', ar: 'استكشف خدماتنا' }, to: '#services', variant: 'primary' },
          { label: { en: 'Contact us', ar: 'تواصل معنا' }, to: '#contact', variant: 'ghost' },
        ],
        media: { type: 'svg', variant: 'skyline' },
      },
    },
    {
      id: 'stats',
      component: 'StatsSection',
      data: {
        heading: { en: 'Celebrating a legacy of power', ar: 'إرثٌ من الطاقة نحتفي به' },
        items: [
          { value: 50, suffix: '+', label: { en: 'Years of experience', ar: 'عامًا من الخبرة' } },
          { value: 1200, suffix: '+', label: { en: 'Projects delivered', ar: 'مشروعًا منجزًا' } },
          { value: 25, suffix: '+', label: { en: 'Cities served', ar: 'مدينة نخدمها' } },
          { value: 300, suffix: '+', label: { en: 'Specialists on team', ar: 'مختصًا في فريقنا' } },
        ],
      },
    },
    {
      id: 'about',
      component: 'AboutSection',
      data: {
        eyebrow: { en: 'Who we are', ar: 'من نحن' },
        heading: {
          en: 'Five decades of energizing Saudi Arabia',
          ar: 'خمسة عقود من تزويد المملكة بالطاقة',
        },
        body: [
          {
            en: 'Since 1974, Rolaco — Arabian Shutoh & Lights has been a trusted name in electric power and lighting across the Kingdom. From national infrastructure to landmark developments, we deliver reliable energy where it matters most.',
            ar: 'منذ عام ١٩٧٤، ظلّت رولاكو — الشطوة العربية والإنارة اسمًا موثوقًا في الطاقة الكهربائية والإضاءة في أنحاء المملكة. من البنية التحتية الوطنية إلى المشاريع البارزة، نوفّر طاقة موثوقة حيث تكون الأهم.',
          },
          {
            en: 'Our teams combine deep engineering expertise with world-class products to design, build and maintain power systems that perform for decades.',
            ar: 'تجمع فرقنا بين خبرة هندسية عميقة ومنتجات عالمية المستوى لتصميم وبناء وصيانة أنظمة طاقة تعمل بكفاءة لعقود.',
          },
        ],
        highlights: [
          { en: 'Turnkey electrical contracting', ar: 'مقاولات كهربائية متكاملة' },
          { en: 'Certified engineering teams', ar: 'فرق هندسية معتمدة' },
          { en: 'Nationwide service coverage', ar: 'تغطية خدمية على مستوى المملكة' },
        ],
      },
    },
    {
      id: 'services',
      component: 'ServicesSection',
      data: {
        eyebrow: { en: 'What we do', ar: 'ماذا نقدّم' },
        heading: { en: 'End-to-end power & lighting', ar: 'حلول متكاملة للطاقة والإضاءة' },
        intro: {
          en: 'A full spectrum of electrical services, from generation to the last light fixture.',
          ar: 'باقة متكاملة من الخدمات الكهربائية، من التوليد وحتى آخر وحدة إنارة.',
        },
        items: [
          {
            icon: 'bolt',
            title: { en: 'Electric Power Systems', ar: 'أنظمة الطاقة الكهربائية' },
            description: {
              en: 'Design and installation of high- and low-voltage power systems built for reliability.',
              ar: 'تصميم وتركيب أنظمة الجهد العالي والمنخفض المبنية على الموثوقية.',
            },
          },
          {
            icon: 'bulb',
            title: { en: 'Lighting Solutions', ar: 'حلول الإضاءة' },
            description: {
              en: 'Architectural, urban and industrial lighting engineered for efficiency and beauty.',
              ar: 'إضاءة معمارية وحضرية وصناعية مصمّمة للكفاءة والجمال.',
            },
          },
          {
            icon: 'grid',
            title: { en: 'Switchgear & Distribution', ar: 'لوحات التوزيع والتحكم' },
            description: {
              en: 'Distribution boards and switchgear that protect and route power safely at scale.',
              ar: 'لوحات توزيع وتحكم تحمي الطاقة وتوزّعها بأمان وعلى نطاق واسع.',
            },
          },
          {
            icon: 'shield',
            title: { en: 'Maintenance & Support', ar: 'الصيانة والدعم' },
            description: {
              en: 'Preventive and emergency maintenance that keeps systems running around the clock.',
              ar: 'صيانة وقائية وطارئة تُبقي الأنظمة تعمل على مدار الساعة.',
            },
          },
          {
            icon: 'cpu',
            title: { en: 'Smart Controls', ar: 'أنظمة التحكم الذكية' },
            description: {
              en: 'Automation and smart controls for energy monitoring and optimization.',
              ar: 'أتمتة وأنظمة تحكم ذكية لمراقبة الطاقة وتحسين استهلاكها.',
            },
          },
          {
            icon: 'chart',
            title: { en: 'Energy Consulting', ar: 'الاستشارات في الطاقة' },
            description: {
              en: 'Advisory on efficiency, sustainability and compliance for large-scale projects.',
              ar: 'استشارات في الكفاءة والاستدامة والامتثال للمشاريع الكبرى.',
            },
          },
        ],
      },
    },
    {
      id: 'projects',
      component: 'ProjectsSection',
      data: {
        eyebrow: { en: 'Selected work', ar: 'مختارات من أعمالنا' },
        heading: { en: 'Projects that light the way', ar: 'مشاريع تُضيء الطريق' },
        intro: {
          en: 'A glimpse of the developments we have powered across the Kingdom.',
          ar: 'لمحة من المشاريع التي زوّدناها بالطاقة في أنحاء المملكة.',
        },
        items: [
          { title: { en: 'Riyadh Skyline Towers', ar: 'أبراج أفق الرياض' }, category: { en: 'Urban lighting', ar: 'إضاءة حضرية' } },
          { title: { en: 'Coastal Power Grid', ar: 'شبكة الطاقة الساحلية' }, category: { en: 'Power systems', ar: 'أنظمة طاقة' } },
          { title: { en: 'Industrial City Substation', ar: 'محطة المدينة الصناعية' }, category: { en: 'Switchgear', ar: 'لوحات توزيع' } },
          { title: { en: 'Heritage District Relighting', ar: 'إعادة إنارة الحي التراثي' }, category: { en: 'Architectural', ar: 'إضاءة معمارية' } },
          { title: { en: 'Airport Expansion', ar: 'توسعة المطار' }, category: { en: 'Infrastructure', ar: 'بنية تحتية' } },
          { title: { en: 'Smart Campus', ar: 'الحرم الذكي' }, category: { en: 'Smart controls', ar: 'تحكم ذكي' } },
        ],
      },
    },
    {
      id: 'partners',
      component: 'PartnersSection',
      data: {
        eyebrow: { en: 'Trusted by', ar: 'موضع ثقة' },
        heading: { en: 'Partners & clients', ar: 'شركاؤنا وعملاؤنا' },
        logos: [
          { name: 'Aramco' },
          { name: 'SEC' },
          { name: 'NEOM' },
          { name: 'Red Sea' },
          { name: 'Roshn' },
          { name: 'Diriyah' },
        ],
      },
    },
    {
      id: 'contact',
      component: 'ContactSection',
      data: {
        eyebrow: { en: 'Get in touch', ar: 'لنتواصل' },
        heading: { en: "Let's power your next project", ar: 'لنُشغّل مشروعك القادم' },
        intro: {
          en: 'Tell us about your project and our engineers will get back to you.',
          ar: 'أخبرنا عن مشروعك وسيعاود مهندسونا التواصل معك.',
        },
        email: 'info@rolaco.example.com',
        phone: '+966 11 000 0000',
        address: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
        cta: { label: { en: 'Send inquiry', ar: 'إرسال الطلب' }, to: '#contact', variant: 'primary' },
      },
    },
  ],

  footer: {
    note: {
      en: 'Electric power & lighting solutions, engineered in Saudi Arabia since 1974.',
      ar: 'حلول الطاقة الكهربائية والإضاءة، بخبرة سعودية منذ عام ١٩٧٤.',
    },
  },
}
