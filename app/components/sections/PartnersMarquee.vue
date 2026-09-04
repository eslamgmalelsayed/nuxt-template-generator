<script setup lang="ts">
import type { PartnersData } from '#engine/types'

// Auto-scrolling marquee variant — infinite logo strip, pauses on hover,
// falls back to a static centered wrap under prefers-reduced-motion.
defineProps<{ sectionId: string; data: PartnersData }>()
const { tl } = useSiteContent()
</script>

<template>
  <section
    :id="sectionId"
    class="section-tight overflow-hidden border-y border-border bg-surface/40"
  >
    <div class="container-x">
      <p v-if="data.eyebrow" class="eyebrow justify-center text-center">{{ tl(data.eyebrow) }}</p>
      <h2 v-if="data.heading" class="h3 mt-3 text-center text-text">{{ tl(data.heading) }}</h2>
    </div>

    <div class="marquee mt-8" role="group" :aria-label="tl(data.heading)">
      <div class="marquee__track">
        <span v-for="(logo, i) in data.logos" :key="`a${i}`" class="marquee__item">{{
          logo.name
        }}</span>
        <span
          v-for="(logo, i) in data.logos"
          :key="`b${i}`"
          class="marquee__item"
          aria-hidden="true"
          >{{ logo.name }}</span
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}
.marquee__track {
  display: flex;
  width: max-content;
  gap: 4rem;
  animation: marquee 28s linear infinite;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__item {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-muted);
  opacity: 0.72;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}
.marquee__item:hover {
  opacity: 1;
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem 3rem;
  }
  .marquee__item[aria-hidden='true'] {
    display: none;
  }
}
</style>
