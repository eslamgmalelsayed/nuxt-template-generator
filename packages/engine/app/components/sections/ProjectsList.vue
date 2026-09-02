<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { ProjectsData } from '../../types/template'

// Compact list variant — thumbnail + category/title rows, vs the default
// large image-card gallery.
defineProps<{ sectionId: string; data: ProjectsData }>()
const { tl } = useSiteConfig()

const grads = [
  'linear-gradient(135deg,#0f172e,#2f7bff)',
  'linear-gradient(135deg,#16213f,#38bdf8)',
  'linear-gradient(135deg,#0a0f1f,#4d90ff)',
  'linear-gradient(135deg,#0f172e,#38bdf8)',
  'linear-gradient(135deg,#05070f,#2f7bff)',
  'linear-gradient(135deg,#16213f,#2f7bff)',
]
</script>

<template>
  <section :id="sectionId" class="section">
    <div class="container-x">
      <div class="max-w-2xl">
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="h2 mt-4 text-text">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 body-lg text-muted">{{ tl(data.intro) }}</p>
      </div>

      <ul class="mt-10 divide-y divide-border">
        <Reveal v-for="(p, i) in data.items" :key="i" as="li" class="flex items-center gap-5 py-5">
          <span
            class="h-14 w-24 shrink-0 rounded-lg"
            :style="{ background: grads[i % grads.length] }"
            aria-hidden="true"
          />
          <div>
            <p class="small font-semibold" style="color: var(--glow)">{{ tl(p.category) }}</p>
            <h3 class="h4 text-text">{{ tl(p.title) }}</h3>
          </div>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
