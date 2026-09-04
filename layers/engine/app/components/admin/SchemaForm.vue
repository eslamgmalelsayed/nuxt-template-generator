<script setup lang="ts">
// Renders an object's editable fields from a schema. Recurses with FieldControl.
import type { Field } from '../../types/schema'

defineProps<{
  fields: Field[]
  // the object holding these fields (a node of the page's reactive draft)
  model: Record<string, unknown>
}>()
</script>

<template>
  <div class="grid gap-5">
    <AdminFieldControl v-for="f in fields" :key="f.key" :field="f" :parent="model" :pkey="f.key" />
  </div>
</template>
