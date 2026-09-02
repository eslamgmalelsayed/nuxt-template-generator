<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { HeroData } from '../../types/template'

defineProps<{ sectionId: string; data: HeroData }>()
const { tl } = useSiteConfig()
</script>

<template>
  <section :id="sectionId" class="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
    <!-- backdrop -->
    <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -top-24 start-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
      style="
        background: radial-gradient(
          circle,
          color-mix(in srgb, var(--accent) 22%, transparent),
          transparent 65%
        );
      "
      aria-hidden="true"
    />

    <div class="container-x relative grid items-center gap-12 lg:grid-cols-2">
      <div>
        <p v-if="data.eyebrow" class="eyebrow">
          <span class="inline-block h-1.5 w-1.5 rounded-full" style="background: var(--glow)" />
          {{ tl(data.eyebrow) }}
        </p>

        <h1 class="h1 mt-5 text-text">
          {{ tl(data.title) }}
          <span v-if="data.titleAccent" class="block" style="color: var(--accent)">{{
            tl(data.titleAccent)
          }}</span>
        </h1>

        <p v-if="data.subtitle" class="mt-6 measure body-lg text-muted">
          {{ tl(data.subtitle) }}
        </p>

        <div v-if="data.ctas?.length" class="mt-9 flex flex-wrap gap-3">
          <a
            v-for="cta in data.ctas"
            :key="cta.to"
            :href="cta.to"
            :class="cta.variant === 'ghost' ? 'btn-ghost' : 'btn-primary'"
          >
            {{ tl(cta.label) }}
          </a>
        </div>
      </div>

      <div class="relative aspect-[3/2] w-full animate-floaty">
        <HeroVisual :variant="data.media?.variant" />
      </div>
    </div>
  </section>
</template>
