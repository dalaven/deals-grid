<template>
  <div class="search">
    <label>Search</label>
    <input v-model="query" type="text" />
    <slot name="extraActions" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  search: {
    type: String,
    required: true
  },
  rows: Object
})

const emit = defineEmits(['update:search'])

const query = computed({
  get: () => props.search,
  set: (value) => emit('update:search', value)
})
</script>
