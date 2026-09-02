<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

withDefaults(defineProps<{ as?: string; delay?: number }>(), { as: 'div', delay: 0 })

const el = ref<HTMLElement>()
const visible = ref(false)
const { stop } = useIntersectionObserver(
  el,
  ([e]) => {
    if (e?.isIntersecting) {
      visible.value = true
      stop()
    }
  },
  { threshold: 0.12 },
)
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :style="delay ? { animationDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
