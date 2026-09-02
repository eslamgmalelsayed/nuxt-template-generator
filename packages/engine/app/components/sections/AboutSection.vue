<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { AboutData } from '../../types/template'

defineProps<{ sectionId: string; data: AboutData }>()
const { tl } = useSiteConfig()
</script>

<template>
  <section :id="sectionId" class="py-20 lg:py-28">
    <div class="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
      <Reveal>
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="heading-display mt-4 text-3xl text-text sm:text-4xl">{{ tl(data.heading) }}</h2>
        <div class="mt-6 space-y-4">
          <p v-for="(p, i) in data.body" :key="i" class="text-base leading-relaxed text-muted">{{ tl(p) }}</p>
        </div>
      </Reveal>

      <Reveal :delay="120">
        <ul v-if="data.highlights?.length" class="grid gap-4">
          <li v-for="(h, i) in data.highlights" :key="i" class="card flex items-center gap-4">
            <span
              class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
              style="background: var(--accent)"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <span class="font-medium text-text">{{ tl(h) }}</span>
          </li>
        </ul>
      </Reveal>
    </div>
  </section>
</template>
