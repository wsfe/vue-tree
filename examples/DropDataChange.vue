<template>
  <div style="width: 200px">
    <VTreeDrop
      v-model="value"
      :data="data"
      checkable
      clearable
      drop-placeholder="请选择"
      :dropdown-min-width="300"
      dropdown-width-fixed
    >
      <template #empty>slot 传进来的暂无数据</template>
    </VTreeDrop>
    {{ value }}
  </div>
</template>

<script lang="ts">
import { VTreeDrop } from '../src'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, ref, watch } from 'vue-demi'
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
  name: 'DropDataChange',
  components: {
    VTreeDrop
  },
  setup() {
    const data = ref(genData().data)
    const value = ref('2')
    watch(
      () => value,
      () => {
        setTimeout(() => {
          data.value = genData().data
        }, 3000)
      }
    )
    return {
      data,
      value
    }
  }
})
</script>
