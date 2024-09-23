import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TableHeader from '../DataGrid/TableHeader.vue'
import TableColumn from '../DataGrid/TableColumn.vue'

describe('TableHeader', () => {
  it('Format title to human language', () => {
    const wrapper = mount(TableHeader, { props: { items: ['deal_name'] } })
    expect(wrapper.getComponent(TableColumn).html()).toContain('Deal name')
  })
})
