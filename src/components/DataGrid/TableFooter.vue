<template>
  <div class="pagination">
    <div>
      <label>Items per page: </label>
      <select v-model="itemsPage">
        <option v-for="item in options" :key="item" :value="item">
          {{ item === -1 ? 'All' : item }}
        </option>
      </select>
    </div>
    <div>{{ startItem }} - {{ endItem }} of {{ itemsLength }}</div>
    <div>
      <button v-if="page > 1" @click="$emit('setPage', 1)" aria-label="Go to first page">
        First
      </button>
      <button v-if="page > 1" @click="$emit('setPage', page - 1)" aria-label="Go to previous page">
        Previous
      </button>
      <button
        v-if="page < pageCount"
        @click="$emit('setPage', page + 1)"
        aria-label="Go to next page"
      >
        Next
      </button>
      <button
        v-if="page < pageCount"
        @click="$emit('setPage', pageCount)"
        aria-label="Go to last page"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  itemsPerPageOptions: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10 // Default value
  },
  page: {
    type: [Number, String],
    default: 1 // Default value
  },
  itemsLength: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['setItemsPerPage', 'update:itemsPerPage', 'setPage'])

const itemsPage = computed({
  get: () => props.itemsPerPage,
  set: (value) => emit('update:itemsPerPage', value)
})

const sizeOfPage = computed(() => (itemsPage.value == -1 ? props.itemsLength : itemsPage.value))

const options = computed(() => {
  const uniqueOptions = new Set([ ...props.itemsPerPageOptions.filter((size) => size <= props.itemsLength),props.itemsPerPage]);
  return Array.from(uniqueOptions);
});

const pageCount = computed(() => {
  if (itemsPage.value === -1 || props.itemsLength === 0) return 1
  return Math.ceil(props.itemsLength / itemsPage.value)
})

const startItem = computed(() => {
  return (props.page - 1) * sizeOfPage.value + 1
})

const endItem = computed(() => {
  return Math.min(props.page * sizeOfPage.value, props.itemsLength)
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;

  div {
    margin: 15px;
  }
}
</style>
