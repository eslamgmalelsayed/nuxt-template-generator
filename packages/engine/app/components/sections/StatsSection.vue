<script setup lang="ts">
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { StatsData } from '../../types/template'

defineProps<{ sectionId: string; data: StatsData }>()
const { tl } = useSiteConfig()
</script>

<template>
  <section :id="sectionId" class="border-y border-border bg-surface/40 py-14">
    <div class="container-x">
      <h2 v-if="data.heading" class="sr-only">{{ tl(data.heading) }}</h2>
      <dl class="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        <div v-for="(s, i) in data.items" :key="i" class="text-center">
          <dt class="sr-only">{{ tl(s.label) }}</dt>
          <dd>
            <span class="heading-display block text-4xl sm:text-5xl" style="color: var(--accent)">
              <StatCounter :value="s.value" :suffix="s.suffix" />
            </span>
            <span class="mt-2 block text-sm text-muted">{{ tl(s.label) }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
