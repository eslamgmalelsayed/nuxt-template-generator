import type { ThemeConfig } from '@strata/engine/types'

/** A deliberately different palette from Rolaco — proves preset-swapping re-skins the site. */
export const starterTheme: ThemeConfig = {
  dark: {
    bg: '#0b0f0e',
    surface: '#111a17',
    surface2: '#16241f',
    surface3: '#1d3029',
    border: '#26382f',
    text: '#e8f2ec',
    textMuted: '#a7bdb2',
    accent: '#10b981',
    accentStrong: '#0b6e4e',
    glow: '#34d399',
  },
  light: {
    bg: '#f5faf7',
    surface: '#ffffff',
    surface2: '#e9f5ef',
    surface3: '#dcefe4',
    border: '#cfe6da',
    text: '#0b1f18',
    textMuted: '#46685b',
    accent: '#0f9d70',
    accentStrong: '#0b6e4e',
    glow: '#0f9d70',
  },
  fonts: {
    display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
    body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    arabic: "'IBM Plex Sans Arabic', 'Inter', ui-sans-serif, system-ui, sans-serif",
  },
}
