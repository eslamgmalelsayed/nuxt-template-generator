<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { ServicesData } from '../../types/template'

defineProps<{ sectionId: string; data: ServicesData }>()
const { tl } = useSiteConfig()
</script>

<template>
  <section :id="sectionId" class="border-t border-border bg-surface/40 py-20 lg:py-28">
    <div class="container-x">
      <div class="max-w-2xl">
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="heading-display mt-4 text-3xl text-text sm:text-4xl">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 text-lg text-muted">{{ tl(data.intro) }}</p>
      </div>

      <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal
          v-for="(item, i) in data.items"
          :key="i"
          as="li"
          :delay="(i % 3) * 90"
          class="card group"
        >
          <span
            class="inline-flex h-12 w-12 items-center justify-center rounded-xl transition"
            style="background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent)"
            aria-hidden="true"
          >
            <AppIcon :name="item.icon" class="h-6 w-6" />
          </span>
          <h3 class="heading-display mt-5 text-lg text-text">{{ tl(item.title) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ tl(item.description) }}</p>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
