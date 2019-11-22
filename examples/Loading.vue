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

const genData = (extra = {}) => {
  return treeDataGenerator(Object.assign({
    treeDepth: 3,
    nodesPerLevel: 5,
    sameIdTitle: true,
  }, extra))
}

export default {
  name: 'Loading',
  components: {
    CTree,
  },
  data () {
    return {
      basicUsage: genData().data,
      loading: false,
    }
  },
  methods: {
    handleToggle () {
      this.loading = !this.loading
    },
  },
}
</script>
