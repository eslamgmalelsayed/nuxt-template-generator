<script setup lang="ts">
import type { Component } from 'vue'
import type { Section, SectionComponent } from '../types/template'
import HeroSection from './sections/HeroSection.vue'
import HeroCentered from './sections/HeroCentered.vue'
import StatsSection from './sections/StatsSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import ServicesRows from './sections/ServicesRows.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import PartnersSection from './sections/PartnersSection.vue'
import ContactSection from './sections/ContactSection.vue'

/**
 * Registry keyed by section KIND → layout VARIANT → component.
 * Config picks the kind via `component` and the layout via `variant`
 * (falls back to 'default' when the variant is omitted or unknown).
 */
const registry: Record<SectionComponent, Record<string, Component>> = {
  HeroSection: { default: HeroSection, centered: HeroCentered },
  StatsSection: { default: StatsSection },
  AboutSection: { default: AboutSection },
  ServicesSection: { default: ServicesSection, rows: ServicesRows },
  ProjectsSection: { default: ProjectsSection },
  PartnersSection: { default: PartnersSection },
  ContactSection: { default: ContactSection },
}

defineProps<{ sections: Section[] }>()

function resolve(s: Section): Component {
  const variants = registry[s.component]
  return variants[s.variant ?? 'default'] ?? variants.default
}
</script>

<template>
  <component :is="resolve(s)" v-for="s in sections" :key="s.id" :section-id="s.id" :data="s.data" />
</template>
