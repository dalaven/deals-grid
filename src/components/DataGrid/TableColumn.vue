<template>
  <th @click="sortData(data)" class="cursor-pointer">
    <div class="table-header__content">
      <slot>
        <strong> {{ data }} </strong>
      </slot>
      <IconArrowDown v-if="direction === ''" class="sorted-icon opacity-icon" />
      <IconArrowDown v-if="direction === 'ASC'" class="sorted-icon" />
      <IconArrowUp v-if="direction === 'DESC'" class="sorted-icon" />
    </div>
  </th>
</template>

<script setup>
import { ref } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import IconArrowUp from '../icons/IconArrowUp.vue'

const props = defineProps({
  data: String
})
const emit = defineEmits(['sortData'])

const direction = ref('')

const sortData = (item) => {
  // Toggle sorting direction
  direction.value = direction.value === 'ASC' ? 'DESC' : 'ASC'
  emit('sortData', item, direction.value)
}
</script>

<style lang="scss" scoped>
.table-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sorted-icon {
    height: 15px;
    width: 15px;
  }

  .opacity-icon {
    opacity: 0.3;
  }
}
</style>
