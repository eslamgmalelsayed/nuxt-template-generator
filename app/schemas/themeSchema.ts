/**
 * Editing schema for ThemeConfig — same descriptor system as the sections, so
 * the theme editor and its validation come from one source too. Labels are
 * localized (en/ar) for the bilingual dashboard.
 */
import type { Field } from '#engine/types'
import type { Localized } from '#engine/types'

const L = (en: string, ar: string): Localized => ({ en, ar })

const palette = (): Field[] => [
  { key: 'bg', label: L('Background', 'الخلفية'), type: 'color' },
  { key: 'surface', label: L('Surface', 'السطح'), type: 'color' },
  { key: 'surface2', label: L('Surface 2', 'السطح ٢'), type: 'color' },
  { key: 'surface3', label: L('Surface 3', 'السطح ٣'), type: 'color' },
  { key: 'border', label: L('Border', 'الحدود'), type: 'color' },
  { key: 'text', label: L('Text', 'النص'), type: 'color' },
  { key: 'textMuted', label: L('Muted text', 'نص خافت'), type: 'color' },
  { key: 'accent', label: L('Accent', 'اللون المميّز'), type: 'color' },
  {
    key: 'accentStrong',
    label: L('Accent (strong / button fill)', 'اللون المميّز الغامق'),
    type: 'color',
  },
  { key: 'glow', label: L('Glow', 'التوهّج'), type: 'color' },
]

const selectOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }))

export const themeSchema: Field[] = [
  { key: 'light', label: L('Light palette', 'الألوان الفاتحة'), type: 'group', fields: palette() },
  { key: 'dark', label: L('Dark palette', 'الألوان الداكنة'), type: 'group', fields: palette() },
  {
    key: 'shape',
    label: L('Corner shape', 'شكل الزوايا'),
    type: 'select',
    options: selectOptions(['sharp', 'soft', 'pill']),
  },
  {
    key: 'density',
    label: L('Spacing density', 'كثافة التباعد'),
    type: 'select',
    options: selectOptions(['compact', 'default', 'airy']),
  },
  {
    key: 'typeScale',
    label: L('Type scale', 'مقياس الخط'),
    type: 'select',
    options: selectOptions(['compact', 'default', 'spacious']),
  },
  {
    key: 'fonts',
    label: L('Fonts', 'الخطوط'),
    type: 'group',
    optional: true,
    fields: [
      { key: 'display', label: L('Display font', 'خط العناوين'), type: 'text', optional: true },
      { key: 'body', label: L('Body font', 'خط النص'), type: 'text', optional: true },
      { key: 'arabic', label: L('Arabic font', 'الخط العربي'), type: 'text', optional: true },
    ],
  },
]

/** Real ThemeConfig defaults for the preset selects (used when a theme omits them). */
export const themePresetDefaults = { shape: 'soft', density: 'default', typeScale: 'default' }
