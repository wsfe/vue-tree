<template>
  <div style="width: 200px;">
    <CTreeDrop
      v-model="value"
      :data="data"
      checkable
      clearable
      drop-placeholder="请选择"
      :dropdown-min-width="300"
      dropdown-width-fixed
    >
      <span slot="empty">slot 传进来的暂无数据</span>
    </CTreeDrop>
    {{ value }}
  </div>
</template>

<script>
import { CTreeDrop } from '../src'
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

const data = genData().data

export default {
  name: 'DropDataChange',
  components: {
    CTreeDrop,
  },
  data () {
    return {
      data: [],
      value: '2',
    }
  },
  watch: {
    value: {
      handler (newVal) {
        setTimeout(() => {
          this.data = data
        }, 3000)
      },
      immediate: true,
    },
  },
}
</script>
