/**
 * Contracts for the config-driven template engine.
 * A "business template" = SiteConfig + ThemeConfig + a chosen order of Sections.
 * Components read these types; they never hardcode business content.
 */

/** A string localized into every supported locale. */
export interface Localized {
  en: string
  ar: string
}

export type LocaleCode = 'en' | 'ar'

/* ---------------------------------------------------------------- */
/* Theme                                                            */
/* ---------------------------------------------------------------- */

export interface ThemePalette {
  bg: string
  surface: string
  surface2: string
  surface3: string
  border: string
  text: string
  textMuted: string
  accent: string
  /** deeper accent used as the fill behind white button text (must meet AA ≥4.5:1) */
  accentStrong: string
  glow: string
}

export interface ThemeConfig {
  light: ThemePalette
  dark: ThemePalette
  fonts?: {
    display?: string
    body?: string
    arabic?: string
  }
}

/* ---------------------------------------------------------------- */
/* Sections                                                         */
/* ---------------------------------------------------------------- */

/** Keys of the section registry (see components/SectionRenderer.vue). */
export type SectionComponent =
  | 'HeroSection'
  | 'StatsSection'
  | 'AboutSection'
  | 'ServicesSection'
  | 'ProjectsSection'
  | 'PartnersSection'
  | 'ContactSection'

export interface Section<T = unknown> {
  /** anchor id, e.g. "services" */
  id: string
  /** the section kind (which registry entry to render) */
  component: SectionComponent
  /** layout variant within the kind; falls back to 'default' when omitted */
  variant?: string
  enabled?: boolean
  data: T
}

export interface Cta {
  label: Localized
  to: string
  variant?: 'primary' | 'ghost'
}

export interface HeroData {
  eyebrow?: Localized
  title: Localized
  titleAccent?: Localized
  subtitle?: Localized
  ctas?: Cta[]
  media?: { type: 'svg' | '3d'; variant?: string }
}

export interface StatItem {
  value: number
  suffix?: string
  label: Localized
}
export interface StatsData {
  heading?: Localized
  items: StatItem[]
}

export interface AboutData {
  eyebrow?: Localized
  heading: Localized
  body: Localized[]
  highlights?: Localized[]
}

export interface ServiceItem {
  icon: string // key of an inline icon
  title: Localized
  description: Localized
}
export interface ServicesData {
  eyebrow?: Localized
  heading: Localized
  intro?: Localized
  items: ServiceItem[]
}

export interface ProjectItem {
  title: Localized
  category: Localized
  image?: string
}
export interface ProjectsData {
  eyebrow?: Localized
  heading: Localized
  intro?: Localized
  items: ProjectItem[]
}

export interface PartnersData {
  eyebrow?: Localized
  heading?: Localized
  logos: { name: string; src?: string }[]
}

export interface ContactData {
  eyebrow?: Localized
  heading: Localized
  intro?: Localized
  email: string
  phone: string
  address: Localized
  cta?: Cta
}

/* ---------------------------------------------------------------- */
/* Site config (one per business preset)                            */
/* ---------------------------------------------------------------- */

export interface NavItem {
  label: Localized
  to: string
}

export interface OrganizationInfo {
  legalName: string
  foundingYear: number
  logo?: string
  addressLocality: string
  addressCountry: string
  email: string
  phone: string
  sameAs?: string[]
}

export interface SeoConfig {
  title: Localized
  description: Localized
  ogImage?: string
}

export interface SiteConfig {
  key: string
  brand: {
    name: string
    subBrand?: string
    tagline?: Localized
    logo?: string
  }
  nav: NavItem[]
  sections: Section[]
  seo: SeoConfig
  organization: OrganizationInfo
  footer?: {
    note?: Localized
    columns?: { title: Localized; links: NavItem[] }[]
  }
}

export interface Template {
  config: SiteConfig
  theme: ThemeConfig
}

/* ---------------------------------------------------------------- */
/* Nuxt app.config typing — each app provides its site + theme here  */
/* ---------------------------------------------------------------- */
declare module 'nuxt/schema' {
  interface AppConfigInput {
    site?: SiteConfig
    theme?: ThemeConfig
  }
  interface AppConfig {
    site: SiteConfig
    theme: ThemeConfig
  }
}
