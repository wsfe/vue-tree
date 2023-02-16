<template>
  <div style="height: 100%;">
    <VTreeSearch
      v-model="value"
      :data="data"
      checkable
      :search-method="searchMethod"          b v
      @search="handleSearch"
    ><span slot="empty">slot 传进来的暂无数据</span></VTreeSearch>
    {{ value }}
  </div>
</template>

<script lang="ts">
import { VTreeSearch } from '../src'
import treeDataGenerator from '../tests/tree-data-generator'

const genData = (extra = {}) => {
  return treeDataGenerator(Object.assign({
    treeDepth: 3,
    nodesPerLevel: 5,
    sameIdTitle: true,
    inOrder: true,
    forceString: true,
  }, extra))
}

export default {
  name: 'Search',
  components: {
    VTreeSearch,
  },
  data () {
    return {
      data: [] as any[],
      times: [3, 2, 5],
      index: 0,
      value: ['93', '124'],
    }
  },
  methods: {
    searchMethod (keyword: string): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.data = genData({ nodesPerLevel: this.times[this.index] }).data
          resolve()
        }, 10)
      })
    },
    handleSearch () {
      this.index++
      if (this.index >= this.times.length) this.index = 0
    },
  },
}
</script>
