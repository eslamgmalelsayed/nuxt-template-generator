<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { ProjectsData } from '../../types/template'

defineProps<{ sectionId: string; data: ProjectsData }>()
const { tl } = useSiteConfig()

// tasteful gradient placeholders (no external images -> stays self-contained for SSG)
const grads = [
  'linear-gradient(135deg,#0f172e,#2f7bff)',
  'linear-gradient(135deg,#05070f,#16213f)',
  'linear-gradient(135deg,#16213f,#38bdf8)',
  'linear-gradient(135deg,#0a0f1f,#4d90ff)',
  'linear-gradient(135deg,#0f172e,#38bdf8)',
  'linear-gradient(135deg,#05070f,#2f7bff)',
]
</script>

<template>
  <section :id="sectionId" class="py-20 lg:py-28">
    <div class="container-x">
      <div class="max-w-2xl">
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="heading-display mt-4 text-3xl text-text sm:text-4xl">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 text-lg text-muted">{{ tl(data.intro) }}</p>
      </div>

      <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(p, i) in data.items" :key="i" as="li" :delay="(i % 3) * 90">
          <article
            class="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-border p-5"
          >
            <span
              class="absolute inset-0"
              :style="{ background: grads[i % grads.length] }"
              aria-hidden="true"
            />
            <span
              class="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-40"
              style="background: linear-gradient(to top, rgba(5, 7, 15, 0.85), transparent 70%)"
              aria-hidden="true"
            />
            <div class="relative">
              <p class="text-xs font-semibold uppercase tracking-wider" style="color: var(--glow)">
                {{ tl(p.category) }}
              </p>
              <h3 class="heading-display mt-1 text-lg text-white">{{ tl(p.title) }}</h3>
            </div>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
