<template>
  <div>
    <CTree v-model="value" :data="data" checkable draggable droppable @node-drop="handleDrop">
      <template #empty>slot 传进来的暂无数据</template>
    </CTree>
    {{ value }}
  </div>
</template>

<script lang="ts">
import CTree from '../src'
import treeDataGenerator from '../tests/tree-data-generator'
import { reactive, defineComponent,ref } from 'vue-demi'
export default defineComponent({
  name: 'Drag',
  components:{
    CTree
  },
  setup() {
    const value = ref(['0'])
    const genData = (extra = {}) => {
      return treeDataGenerator(Object.assign({
        treeDepth: 3,
        nodesPerLevel: 5,
        sameIdTitle: true,
        inOrder: true,
        forceString: true,
      }, extra))
    }
    const handleDrop = () => {
      console.log('node drop')
    }
    const data = ref(genData().data)

    return {
      data,
      value,
      genData,
      handleDrop
    }
  }
})


</script>
