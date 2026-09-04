/**
 * Editing schema for ThemeConfig — same descriptor system as the sections, so
 * the theme editor and its validation come from one source too.
 */
import type { Field } from '../types/schema'

const palette = (): Field[] => [
  { key: 'bg', label: 'Background', type: 'color' },
  { key: 'surface', label: 'Surface', type: 'color' },
  { key: 'surface2', label: 'Surface 2', type: 'color' },
  { key: 'surface3', label: 'Surface 3', type: 'color' },
  { key: 'border', label: 'Border', type: 'color' },
  { key: 'text', label: 'Text', type: 'color' },
  { key: 'textMuted', label: 'Muted text', type: 'color' },
  { key: 'accent', label: 'Accent', type: 'color' },
  { key: 'accentStrong', label: 'Accent (strong / button fill)', type: 'color' },
  { key: 'glow', label: 'Glow', type: 'color' },
]

const selectOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }))

export const themeSchema: Field[] = [
  { key: 'light', label: 'Light palette', type: 'group', fields: palette() },
  { key: 'dark', label: 'Dark palette', type: 'group', fields: palette() },
  {
    key: 'shape',
    label: 'Corner shape',
    type: 'select',
    options: selectOptions(['sharp', 'soft', 'pill']),
  },
  {
    key: 'density',
    label: 'Spacing density',
    type: 'select',
    options: selectOptions(['compact', 'default', 'airy']),
  },
  {
    key: 'typeScale',
    label: 'Type scale',
    type: 'select',
    options: selectOptions(['compact', 'default', 'spacious']),
  },
  {
    key: 'fonts',
    label: 'Fonts',
    type: 'group',
    optional: true,
    fields: [
      { key: 'display', label: 'Display font', type: 'text', optional: true },
      { key: 'body', label: 'Body font', type: 'text', optional: true },
      { key: 'arabic', label: 'Arabic font', type: 'text', optional: true },
    ],
  },
]

/** Real ThemeConfig defaults for the preset selects (used when a theme omits them). */
export const themePresetDefaults = { shape: 'soft', density: 'default', typeScale: 'default' }
