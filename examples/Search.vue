<template>
  <CTreeSearch
    v-model="value"
    :data="data"
    checkable
    :expandOnFilter="false"
  >
    <span slot="empty">slot 传进来的暂无数据</span>
    <template slot="actions">
      <span style="margin-left: 5px;">折叠</span>
      <span style="margin-left: 5px;">展开</span>
      <span style="margin-left: 5px;">slot 按钮</span>
    </template>
  </CTreeSearch>
</template>

<script>
import { CTreeSearch } from '../src'
import treeDataGenerator from '../tests/tree-data-generator'
import {defineComponent,reactive,ref} from 'vue-demi'

const genData = (extra = {}) => {
  return treeDataGenerator(Object.assign({
    treeDepth: 3,
    nodesPerLevel: 5,
    sameIdTitle: true,
    inOrder: true,
    forceString: true,
  }, extra))
}

export default defineComponent({
  name: 'Search',
  components: {
    CTreeSearch,
  },
  setup(props){
    const data = reactive(genData().data)
    const value = ref('2')
    return {
      data,
      value
    }
  },
})
</script>
