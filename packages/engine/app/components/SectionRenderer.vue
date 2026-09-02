<script setup lang="ts">
import type { Section, SectionComponent } from '../types/template'
import HeroSection from './sections/HeroSection.vue'
import StatsSection from './sections/StatsSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import PartnersSection from './sections/PartnersSection.vue'
import ContactSection from './sections/ContactSection.vue'

/** Maps a section's `component` key from config to the real component. */
const registry: Record<SectionComponent, unknown> = {
  HeroSection,
  StatsSection,
  AboutSection,
  ServicesSection,
  ProjectsSection,
  PartnersSection,
  ContactSection,
}

defineProps<{ sections: Section[] }>()
</script>

<template>
  <component
    :is="registry[s.component]"
    v-for="s in sections"
    :key="s.id"
    :section-id="s.id"
    :data="s.data"
  />
</template>
