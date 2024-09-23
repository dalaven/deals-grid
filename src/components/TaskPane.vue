<template>
  <div class="task-pane">
    <div class="task-pane__header">
      <h1>Details</h1>
      <!-- Close button -->
      <span class="close-icon" @click="emit('close')">X</span>
    </div>

    <!-- Loop through object data -->
    <div v-for="(item, key) in data" :key="key">
      <strong>{{ key }}:</strong>
      <!-- Handle arrays and regular values -->
      {{ Array.isArray(item) ? item.join(', ') : item }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object
  }
})

const emit = defineEmits(['close']) // Define 'close' event
</script>

<style lang="scss" scoped>
.task-pane {
  padding: 40px 20px;
  background-color: var(--color-background-soft);
  height: 100vw;
  border-left: 2px solid var(--color-background-secondary);
  @media (max-width: 575.98px) {
    width: 100vw;
    border: none;
  }

  .task-pane__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .close-icon {
      margin: 10px;
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
