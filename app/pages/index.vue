<script setup lang="ts">
const { config, sections, tl } = useSiteContent()

// Per-locale SEO meta (getters keep it reactive to locale changes)
useSeoMeta({
  title: () => tl(config.seo.title),
  description: () => tl(config.seo.description),
  ogTitle: () => tl(config.seo.title),
  ogDescription: () => tl(config.seo.description),
  ogType: 'website',
})

// schema.org Organization — rich results for a company profile
useSchemaOrg([
  defineOrganization({
    name: config.organization.legalName,
    foundingDate: String(config.organization.foundingYear),
    email: config.organization.email,
    telephone: config.organization.phone,
    address: {
      addressLocality: config.organization.addressLocality,
      addressCountry: config.organization.addressCountry,
    },
  }),
])
</script>

<template>
  <SectionRenderer :sections="sections" />
</template>
