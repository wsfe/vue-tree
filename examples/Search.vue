<template>
  <VTreeSearch
    ref="treeSearchRef"
    v-model="value"
    checkable
    :expandOnFilter="false"
  >
    <span slot="empty">slot 传进来的暂无数据</span>
    <template slot="actions">
      <span style="margin-left: 5px">折叠</span>
      <span style="margin-left: 5px">展开</span>
      <span style="margin-left: 5px">slot 按钮</span>
    </template>
  </VTreeSearch>
</template>

<script lang="ts">
import { VTreeSearch } from '../src'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, onMounted, reactive, ref } from 'vue-demi'
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
  setup(props) {
    // const data = reactive(genData().data)
    const data = genData().data
    const value = ref('2')
    const treeSearchRef = ref()
    onMounted(() => {
      console.log(treeSearchRef.value.setData(data))
    })
    return {
      treeSearchRef,
      // data,
      value
    }
  }
})
</script>
