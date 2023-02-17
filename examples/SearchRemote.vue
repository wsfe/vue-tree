<template>
  <div style="height: 100%">
    <VTreeSearch
      v-model="value"
      :load="load"
      search-remote
      checkable
      @search="handleSearch"
      ><span slot="empty">slot 传进来的暂无数据</span></VTreeSearch
    >
    {{ value }}
  </div>
</template>

<script lang="ts">
import { VTreeSearch, TreeNode } from '../src'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, reactive, ref } from 'vue'

const genData = (extra = {}) => {
  return treeDataGenerator(
    Object.assign(
      {
        treeDepth: 3,
        nodesPerLevel: 5,
        sameIdTitle: true,
        inOrder: true,
        forceString: true
      },
      extra
    )
  )
}

export default defineComponent({
  name: 'Search',
  components: {
    VTreeSearch
  },
  setup() {
    const times = reactive([3, 2, 5])
    const index = ref(0)
    const load = (node: TreeNode | null, resolve: Function) => {
      setTimeout(() => {
        const data = genData({ nodesPerLevel: times[index.value] }).data
        resolve(data)
      }, 10)
    }
    const value = reactive(['93', '124'])
    function handleSearch() {
      index.value++
      if (index.value >= times.length) index.value = 0
    }
    return {
      times,
      index,
      load,
      value,
      handleSearch
    }
  }
})
</script>
