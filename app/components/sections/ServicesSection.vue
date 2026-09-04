<script setup lang="ts">
import type { ServicesData } from '#engine/types'

defineProps<{ sectionId: string; data: ServicesData }>()
const { tl } = useSiteContent()
</script>

<template>
  <section :id="sectionId" class="border-t border-border bg-surface/40 section">
    <div class="container-x">
      <div class="max-w-2xl">
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="h2 mt-4 text-text">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 body-lg text-muted">{{ tl(data.intro) }}</p>
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
            style="
              background: color-mix(in srgb, var(--accent) 14%, transparent);
              color: var(--accent);
            "
            aria-hidden="true"
          >
            <AppIcon :name="item.icon" class="h-6 w-6" />
          </span>
          <h3 class="h4 mt-5 text-text">{{ tl(item.title) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ tl(item.description) }}</p>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
