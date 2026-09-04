<script setup lang="ts">
import type { StatsData } from '#engine/types'

// Banded stats variant — one bordered card with divided columns, vs the default
// open 4-up grid.
defineProps<{ sectionId: string; data: StatsData }>()
const { tl } = useSiteContent()
</script>

<template>
  <section :id="sectionId" class="section-tight">
    <div class="container-x">
      <h2 v-if="data.heading" class="sr-only">{{ tl(data.heading) }}</h2>
      <dl
        class="card grid grid-cols-2 gap-6 sm:grid-cols-4 sm:divide-x sm:divide-border sm:rtl:divide-x-reverse"
      >
        <div v-for="(s, i) in data.items" :key="i" class="text-center sm:px-4">
          <dt class="sr-only">{{ tl(s.label) }}</dt>
          <dd>
            <span class="h2 block" style="color: var(--accent)">
              <StatCounter :value="s.value" :suffix="s.suffix" />
            </span>
            <span class="small mt-1 block text-muted">{{ tl(s.label) }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
