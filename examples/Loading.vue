<template>
  <div>
    <CTree
      :data="basicUsage"
      :loading="loading"
    ></CTree>
    <button @click="handleToggle">Toggle Loading</button>
  </div>
</template>

<script>
import CTree from '@'
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
    function handleToggle(){
      loading.value = !loading.value
    }
    return {
      basicUsage,
      loading
    }
  }
})
</script>
