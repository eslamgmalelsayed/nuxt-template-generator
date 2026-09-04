<script setup lang="ts">
import type { AboutData } from '#engine/types'

// Centered single-column about variant, with highlights as pills — vs the
// default two-column layout with highlight cards.
defineProps<{ sectionId: string; data: AboutData }>()
const { tl } = useSiteContent()
</script>

<template>
  <section :id="sectionId" class="section">
    <div class="container-x flex max-w-3xl flex-col items-center text-center">
      <p v-if="data.eyebrow" class="eyebrow justify-center">{{ tl(data.eyebrow) }}</p>
      <h2 class="h2 mt-4 text-text">{{ tl(data.heading) }}</h2>

      <div class="measure mt-6 space-y-4">
        <p v-for="(p, i) in data.body" :key="i" class="body-lg text-muted">{{ tl(p) }}</p>
      </div>

      <ul v-if="data.highlights?.length" class="mt-8 flex flex-wrap justify-center gap-3">
        <li
          v-for="(h, i) in data.highlights"
          :key="i"
          class="small rounded-full border border-border px-4 py-2 text-text"
        >
          {{ tl(h) }}
        </li>
      </ul>
    </div>
  </section>
</template>
