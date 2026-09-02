<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core'

const props = withDefaults(defineProps<{ value: number; suffix?: string; duration?: number }>(), {
  suffix: '',
  duration: 2400,
})

const el = ref<HTMLElement>()
const display = ref(0)
const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
let started = false

function run() {
  if (started) return
  started = true
  if (reduced.value) {
    display.value = props.value
    return
  }
  const start = performance.now()
  const from = 0
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - p, 3)
    display.value = Math.round(from + (props.value - from) * eased)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const { stop } = useIntersectionObserver(el, ([e]) => {
  if (e?.isIntersecting) {
    run()
    stop()
  }
})

watch(reduced, (r) => {
  if (r && started) display.value = props.value
})
</script>

<template>
  <!-- dir=ltr keeps "50+" reading correctly even inside an RTL (Arabic) layout -->
  <span ref="el" dir="ltr" style="display: inline-block">{{ display }}{{ suffix }}</span>
</template>
