<script setup>
import { ref } from 'vue'
import Table from './Table.vue'
import TableActions from './TableActions.vue'
import mockData from '../../mocks/dealsData.json'
import { useVuejsCsv } from '../../composable/useVuejsCsv'
const { vueJsCsvExport } = useVuejsCsv()

const emit = defineEmits(['rowDetails'])

const dataRows = ref(mockData)
const clue = ref('')
const perPage = ref(5)
const itemsPerPageOptions = ref([5, 10, 20, 50, 100, 200, 500, 1000, -1])

const rowDetails = (value) => {
  emit('rowDetails', value)
}

const exportCsv = () => {
  vueJsCsvExport(dataRows.value, 'Deals result', Object.keys(dataRows.value[0] || {}))
}
</script>

<template>
  <main>
    <table-actions v-model:search="clue" :rows="dataRows">
      <template v-slot:extraActions>
        <button @click="exportCsv">Exportar</button>
      </template>
    </table-actions>
    <div>
      <Table
        :rows="dataRows"
        :search="clue"
        :items-per-page="perPage"
        :items-per-page-options="itemsPerPageOptions"
        @rowDetails="rowDetails"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  padding: 20px 50px;
}

.search {
  display: flex;
  justify-content: flex-end;
  label {
    margin-right: 15px;
  }
}
</style>
