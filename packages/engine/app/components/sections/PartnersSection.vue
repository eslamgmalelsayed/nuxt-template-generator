<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { PartnersData } from '../../types/template'

defineProps<{ sectionId: string; data: PartnersData }>()
const { tl } = useSiteConfig()
</script>

<template>
  <section :id="sectionId" class="border-y border-border bg-surface/40 py-14">
    <div class="container-x">
      <p v-if="data.eyebrow" class="eyebrow justify-center text-center">{{ tl(data.eyebrow) }}</p>
      <h2 v-if="data.heading" class="heading-display mt-3 text-center text-2xl text-text">
        {{ tl(data.heading) }}
      </h2>

      <ul class="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        <li v-for="(logo, i) in data.logos" :key="i" class="flex items-center justify-center">
          <span
            class="text-lg font-semibold tracking-wide text-muted opacity-70 transition hover:opacity-100"
            :style="{ fontFamily: 'var(--font-display)' }"
          >
            {{ logo.name }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
