<script setup lang="ts">
/**
 * Animated SVG hero visual — a glowing skyline with pulsing windows and
 * "current" flowing along power lines. Decorative (aria-hidden), themed via
 * CSS variables, and paused by the global prefers-reduced-motion rule.
 *
 * The hero media slot is config-driven (media.type = 'svg' | '3d'); a future
 * 3D variant can be dropped in behind <ClientOnly> without changing sections.
 */
import { useMediaQuery } from '@vueuse/core'

withDefaults(defineProps<{ variant?: string }>(), { variant: 'skyline' })

// SMIL <animateMotion> isn't covered by the CSS reduced-motion rule, so gate it here
const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

// deterministic-ish window grid so SSR and client markup match
const buildings = [
  { x: 40, w: 46, h: 150 },
  { x: 96, w: 60, h: 210 },
  { x: 166, w: 40, h: 120 },
  { x: 216, w: 70, h: 260 },
  { x: 296, w: 50, h: 175 },
  { x: 356, w: 64, h: 230 },
  { x: 430, w: 44, h: 140 },
  { x: 484, w: 58, h: 200 },
]
const baseY = 360
function windows(b: { x: number; w: number; h: number }, i: number) {
  const cells: { x: number; y: number; on: boolean }[] = []
  const cols = Math.max(1, Math.floor(b.w / 16))
  const rows = Math.max(1, Math.floor(b.h / 22))
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = (i * 7 + r * 3 + c * 5) % 4 === 0
      cells.push({ x: b.x + 8 + c * 16, y: baseY - b.h + 14 + r * 22, on })
    }
  }
  return cells
}
</script>

<template>
  <svg
    class="hero-visual h-full w-full"
    viewBox="0 0 600 400"
    fill="none"
    role="presentation"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--surface-3)" />
        <stop offset="100%" stop-color="var(--surface)" />
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- ambient halo -->
    <rect x="0" y="0" width="600" height="400" fill="url(#halo)" />

    <!-- energy ring -->
    <circle
      class="ring"
      cx="300"
      cy="120"
      r="66"
      stroke="var(--glow)"
      stroke-width="1.5"
      stroke-opacity="0.5"
    />
    <circle
      class="ring ring--slow"
      cx="300"
      cy="120"
      r="90"
      stroke="var(--accent)"
      stroke-width="1"
      stroke-opacity="0.3"
      stroke-dasharray="4 10"
    />

    <!-- flowing power lines -->
    <g stroke-linecap="round">
      <path
        class="flow"
        d="M0 300 C 120 300, 160 210, 300 210 S 480 120, 600 120"
        stroke="var(--accent)"
        stroke-width="2"
      />
      <path
        class="flow flow--2"
        d="M0 340 C 160 340, 220 270, 360 270 S 520 200, 600 190"
        stroke="var(--glow)"
        stroke-width="1.5"
      />
    </g>

    <!-- skyline -->
    <g>
      <rect
        v-for="(b, i) in buildings"
        :key="i"
        :x="b.x"
        :y="baseY - b.h"
        :width="b.w"
        :height="b.h"
        rx="3"
        fill="url(#bldg)"
        stroke="var(--border)"
      />
      <template v-for="(b, i) in buildings" :key="`w${i}`">
        <rect
          v-for="(c, j) in windows(b, i)"
          :key="j"
          :x="c.x"
          :y="c.y"
          width="6"
          height="9"
          rx="1"
          :fill="c.on ? 'var(--glow)' : 'var(--border)'"
          :class="c.on ? 'win win--on' : 'win'"
          :style="c.on ? { animationDelay: `${((i * 3 + j) % 8) * 0.4}s` } : undefined"
        />
      </template>
      <line x1="20" y1="360" x2="580" y2="360" stroke="var(--border)" stroke-width="2" />
    </g>

    <!-- travelling pulses -->
    <template v-if="!reduced">
      <circle class="pulse" r="4" fill="var(--glow)" filter="url(#glow)">
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          path="M0 300 C 120 300, 160 210, 300 210 S 480 120, 600 120"
        />
      </circle>
      <circle class="pulse" r="3" fill="var(--accent)" filter="url(#glow)">
        <animateMotion
          dur="9s"
          repeatCount="indefinite"
          path="M0 340 C 160 340, 220 270, 360 270 S 520 200, 600 190"
        />
      </circle>
    </template>
  </svg>
</template>

<style scoped>
.flow {
  stroke-dasharray: 8 14;
  animation: flow-dash 5s linear infinite;
}
.flow--2 {
  animation-duration: 7.5s;
}
@keyframes flow-dash {
  to {
    stroke-dashoffset: -44;
  }
}
.ring {
  transform-origin: 300px 120px;
  animation: spin 44s linear infinite;
}
.ring--slow {
  animation-duration: 66s;
  animation-direction: reverse;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.win--on {
  animation: win-pulse 5.5s ease-in-out infinite;
}
@keyframes win-pulse {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}
</style>
