<template>
  <div>
    <CTree
      v-model="value"
      :data="data"
      checkable
      draggable
      droppable
      @node-drop="handleDrop"
    >
      <span slot="empty">slot 传进来的暂无数据</span>
    </CTree>
    {{ value }}
  </div>
</template>

<script>
import CTree from '../src'
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
  name: 'Drag',
  components: {
    CTree,
  },
  data () {
    const data = genData().data
    return {
      data,
      value: ['0'],
    }
  },
  methods: {
    handleDrop () {
      console.log('node drop')
    },
  },
}
</script>
