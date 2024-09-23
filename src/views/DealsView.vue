<template>
  <main class="container-view">
    <div
      class="cols-sm-12"
      :class="[
        {
          'cols-9': Object.keys(currentRow).length,
          'cols-12': !Object.keys(currentRow).length
        }
      ]"
    >
      <DataGrid @rowDetails="rowDetails" />
    </div>

    <!-- TaskPane appears only if currentRow has data -->
    <div v-if="Object.keys(currentRow).length" class="cols-3 sm-absolute">
      <TaskPane :data="currentRow" @close="closeTaskPane" />
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import DataGrid from '../components/DataGrid/DataGrid.vue'
import TaskPane from '../components/TaskPane.vue'

// State to hold current row details
const currentRow = ref({})

// Event handler for row selection
const rowDetails = (value) => {
  currentRow.value = value
}

// Close TaskPane by clearing currentRow
const closeTaskPane = () => {
  currentRow.value = {}
}
</script>

<style lang="scss" scoped></style>
