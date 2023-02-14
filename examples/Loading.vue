<template>
  <div>
    <CTree
    ref="tree"
      :data="basicUsage"
      :loading="loading"
    ></CTree>
    <button @click="handleToggle">Toggle Loading</button>
  </div>
</template>

<script lang="ts">
import CTree from '@/index'
import treeDataGenerator from '../tests/tree-data-generator'
import {defineComponent,ref} from 'vue-demi'

const genData = (extra = {}) => {
  return treeDataGenerator(Object.assign({
    treeDepth: 3,
    nodesPerLevel: 5,
    sameIdTitle: true,
  }, extra))
}

export default defineComponent({
  name: 'Loading',
  components: {
    CTree,
  },
  setup(){
    const basicUsage = ref(genData().data)
    const loading = ref(false)
    const tree = ref()
    function handleToggle(){
      loading.value = !loading.value
    }
    return {
      basicUsage,
      loading,
      tree,
      handleToggle
    }
  }
})
</script>
