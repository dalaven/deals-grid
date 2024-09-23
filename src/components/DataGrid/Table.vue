<template>
  <div class="data-grid">
    <div class="table__wrapper">
      <table>
        <table-header
          :items="headersItems"
          :allSelected="allSelected"
          :someSelected="someSelected"
          @sortData="sortData"
          @select-all="selectAll"
        >
        </table-header>
        <tbody>
          <tr
            v-for="(row, index) in paginatedRows"
            :key="index"
            @click="showRowDetails(row, index)"
            class="table-body__tr cursor-pointer"
          >
            <td class="select-row">
              <input type="checkbox" v-model="selectedRows" :value="index" />
            </td>
            <td v-for="(column, colIndex) in Object.values(row)" :key="colIndex">
              {{ typeof column === 'object' ? column.join(', ') : column }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table-footer
      v-model:itemsPerPage="currentItemsPerPage"
      :page="page"
      :itemsLength="filteredRows.length"
      :items-per-page-options="itemsPerPageOptions"
      @setPage="setPage"
    />
  </div>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue'
import TableHeader from './TableHeader.vue'
import TableFooter from './TableFooter.vue'

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  search: {
    type: String,
    default: ''
  },
  ItemsPerPage: {
    type: Number,
    default: 5
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [5, 10, -1]
  }
})

const emit = defineEmits(['rowDetails'])

const selectedRows = ref([])
const page = ref(1)
const currentItemsPerPage = ref(props.ItemsPerPage)

const headersItems = computed(() => Object.keys(props.rows[0] || {}))

// Handle search and filter the rows based on search input
const filteredRows = computed(() => {
  if (props.search.length > 2) {
    const query = props.search.toLowerCase()
    return props.rows.filter((row) => Object.values(row).join('').toLowerCase().includes(query))
  }
  return props.rows
})

// Calculate the number of rows to display based on pagination
const paginatedRows = computed(() => {
  const sizeOfPage =
    currentItemsPerPage.value === -1 ? filteredRows.value.length : currentItemsPerPage.value
  const start = (page.value - 1) * sizeOfPage
  const end = start + sizeOfPage
  return filteredRows.value.slice(start, end)
})

// Sort rows based on selected column and direction
const sortData = (sortBy, sortDirection) => {
  filteredRows.value.sort((a, b) => {
    const valA = a[sortBy]
    const valB = b[sortBy]

    if (sortDirection === 'ASC') {
      return typeof valA === 'string' ? valA.localeCompare(valB) : valA - valB
    } else {
      return typeof valB === 'string' ? valB.localeCompare(valA) : valB - valA
    }
  })
}

const allSelected = computed(() => selectedRows.value.length === paginatedRows.value.length)
const someSelected = computed(() => selectedRows.value.length > 0)

// Select All rows logic
const selectAll = () => {
  if (allSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = paginatedRows.value.map((_, index) => index)
  }
  emit('rowDetails', {})
}

// Update page
const setPage = (value) => {
  page.value = value
}

const showRowDetails = (row, index) => {
  if (!selectedRows.value.includes(index)) {
    selectedRows.value.push(index)
  }
  if (selectedRows.value.length === 1) {
    emit('rowDetails', row)
  } else {
    emit('rowDetails', {})
  }
}

// Watch for changes in page or items per page to update the displayed rows
watch([currentItemsPerPage, page], () => {
  if (props.search.length <= 2) {
    paginatedRows.value = [...filteredRows.value]
  }
})

watch(selectedRows, (value) => {
  emit('rowDetails', {})
})
</script>

<style lang="scss">
.data-grid {
  width: 100%;
  max-width: 100%;

  .table__wrapper {
    overflow: auto;
    border-radius: inherit;
  }

  table {
    width: 100%;
    border-spacing: 0;

    .table-body__tr {
      th {
        height: var(--v-table-header-height);

        .table-header__content {
          display: flex;
          justify-content: space-between;
        }
      }

      td {
        border-bottom: thin solid black;
        &.select-row {
          text-align: center;
          width: 50px;
        }
      }
    }
  }
}
</style>
