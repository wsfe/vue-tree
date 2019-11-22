<template>
  <div style="height: 100%;">
    <CTreeSearch
      v-model="value"
      :load="load"
      search-remote
      checkable
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
      times: [3, 2, 5],
      index: 0,
      load: (node, resolve) => {
        setTimeout(() => {
          const data = genData({ nodesPerLevel: this.times[this.index] }).data
          resolve(data)
        }, 10)
      },
      value: ['93', '124'],
    }
  },
  methods: {
    handleSearch () {
      this.index++
      if (this.index >= this.times.length) this.index = 0
    },
  },
}
</script>
