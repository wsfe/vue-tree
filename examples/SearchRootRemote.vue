<template>
  <div style="height: 100%;">
    <CTreeSearch
      v-model="value"
      :data="data"
      checkable
      :search-method="searchMethod"
      @search="handleSearch"
    ><span slot="empty">slot 传进来的暂无数据</span></CTreeSearch>
    {{ value }}
  </div>
</template>

<script>
import { CTreeSearch } from '../src'
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
    CTreeSearch,
  },
  data () {
    return {
      data: [],
      times: [3, 2, 5],
      index: 0,
      value: ['93', '124'],
    }
  },
  methods: {
    searchMethod (keyword) {
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
