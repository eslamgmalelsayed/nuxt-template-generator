import type { ThemeConfig } from '@strata/engine/types'

/**
 * Rolaco theme preset — dark "electric power" aesthetic with a designed light
 * counterpart. These values are injected as CSS variables at runtime, so any
 * other business template can ship its own theme.ts without touching components.
 */
export const rolacoTheme: ThemeConfig = {
  dark: {
    bg: '#05070f',
    surface: '#0a0f1f',
    surface2: '#0f172e',
    surface3: '#16213f',
    border: '#1e2a48',
    text: '#e8edf9',
    textMuted: '#aeb9d4',
    accent: '#2f7bff',
    accentStrong: '#1d5ad6',
    glow: '#38bdf8',
  },
  light: {
    bg: '#f6f8ff',
    surface: '#ffffff',
    surface2: '#eef2fb',
    surface3: '#e4ebfa',
    border: '#d5def0',
    text: '#0a0f1f',
    textMuted: '#4a5878',
    accent: '#2f7bff',
    accentStrong: '#1d5ad6',
    glow: '#2f7bff',
  },
  fonts: {
    display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
    body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    arabic: "'Cairo', ui-sans-serif, system-ui, sans-serif",
  },
}
