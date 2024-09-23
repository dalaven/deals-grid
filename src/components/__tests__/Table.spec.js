import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Table from '../DataGrid/Table.vue'
import TableFooter from '../DataGrid/TableFooter.vue'
import data from '../../mocks/dealsDataTiny'

describe('Table', () => {
  it('Filter data by text and pagination', () => {
    const wrapper = mount(Table, {
      props: { rows: data, search: 'GreenEnergy', ItemsPerPage: 2, itemsPerPageOptions: [1] }
    })
    expect(wrapper.getComponent(TableFooter).props()).toEqual({
      itemsPerPage: 2,
      itemsPerPageOptions: [1],
      page: 1,
      itemsLength: 1
    })
  })

  it('show all data', () => {
    //All data is -1
    const wrapper = mount(Table, {
      props: { rows: data, search: '', ItemsPerPage: -1, itemsPerPageOptions: [5, 10, 20, -1] }
    })
    const rows = wrapper.findAll('td.select-row')
    expect(rows).toHaveLength(4)
  })
})
