import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Reveal-on-scroll helper. Adds `is-visible` once an element enters the
 * viewport. Respects prefers-reduced-motion (the CSS zeroes the animation).
 *
 * Usage:
 *   const el = ref<HTMLElement>()
 *   useReveal(el)
 *   <div ref="el" class="reveal">…</div>
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const target = ref<T>()
  const visible = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        stop()
      }
    },
    { threshold: 0.15 },
  )

  return { target, visible }
}
