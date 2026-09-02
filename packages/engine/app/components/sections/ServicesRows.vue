<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { ServicesData } from '../../types/template'

// Alternating-rows services variant — full-width rows that zig-zag, vs the
// default 3-column card grid.
defineProps<{ sectionId: string; data: ServicesData }>()
const { tl } = useSiteConfig()
</script>

<template>
  <section :id="sectionId" class="section border-t border-border bg-surface/40">
    <div class="container-x">
      <div class="max-w-2xl">
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="h2 mt-4 text-text">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 body-lg text-muted">{{ tl(data.intro) }}</p>
      </div>

      <ul class="mt-12 flex flex-col divide-y divide-border">
        <Reveal
          v-for="(item, i) in data.items"
          :key="i"
          as="li"
          class="flex items-center gap-6 py-6"
          :class="i % 2 === 1 ? 'flex-row-reverse text-end' : ''"
        >
          <span
            class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
            style="
              background: color-mix(in srgb, var(--accent) 14%, transparent);
              color: var(--accent);
            "
            aria-hidden="true"
          >
            <AppIcon :name="item.icon" class="h-7 w-7" />
          </span>
          <div>
            <h3 class="h4 text-text">{{ tl(item.title) }}</h3>
            <p class="mt-1 body text-muted">{{ tl(item.description) }}</p>
          </div>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
