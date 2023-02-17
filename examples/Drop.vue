<template>
  <div>
    <div style="width: 200px">
      <p>自定义展示 slot ：</p>
      <VTreeDrop
        v-model="value"
        :data="data"
        checkable
        clearable
        drop-placeholder="请选择"
        :placement="placement"
        :dropdown-min-width="300"
        dropdown-width-fixed
        @checked-change="handleCheckedChange"
      >
        <template #display="scope">
          <div style="width: 170px; text-overflow: ellipsis; overflow: hidden">
            {{
              scope.checkedNodes.map((node: TreeNode) => node.title).join(',')
            }}
          </div>
        </template>
      </VTreeDrop>
      {{ value }}
    </div>
    <div style="width: 200px">
      <p>默认：</p>
      <VTreeDrop
        v-model="value"
        :data="data"
        checkable
        clearable
        drop-placeholder="请选择"
        :placement="placement"
        :dropdown-min-width="300"
        dropdown-width-fixed
        @checked-change="handleCheckedChange"
      >
        <template #empty>slot 传进来的暂无数据</template>
      </VTreeDrop>
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts">
import { VTreeDrop, TreeNode } from '../src'
import type { PlacementType } from '../src/types'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, ref } from 'vue-demi'

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
  name: 'Drop',
  components: {
    VTreeDrop
  },
  setup() {
    const data = ref(genData().data)
    const value = ref('2')
    const placement = ref<PlacementType>('bottom-start')
    function handleCheckedChange() {
      console.log('checked-change')
    }
    return {
      data,
      value,
      placement,
      handleCheckedChange
    }
  }
})
</script>
