<template>
  <thead>
    <tr>
      <th class="select-all">
        <input
          type="checkbox"
          :model-value="allSelected"
          @click="$emit('selectAll')"
          :indeterminate="someSelected && !allSelected"
        />
      </th>
      <TableColumn v-for="item in items" :key="item" :data="item" @sortData="sortData">
        {{ formatLabel(item) }}
      </TableColumn>
    </tr>
  </thead>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import TableColumn from './TableColumn.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  allSelected: {
    type: Boolean,
    default: false
  },
  someSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['sortData', 'selectAll'])

const formatLabel = (label) => {
  return label
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/^./, (firstChar) => firstChar.toUpperCase()) // Capitalize the first letter
}

const sortData = (item, direction) => {
  emit('sortData', item, direction)
}
</script>

<style lang="scss" scoped>
.select-all {
  width: 50px;
}
</style>
