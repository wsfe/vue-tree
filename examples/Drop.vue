<template>
  <div style="padding: 10px;">
    <div style="width: 200px">
      <p>自定义展示 slot ：</p>
      <VTreeDrop
        ref="treeDropRef"
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
    <div style="width: 200px">
      <p>单选：</p>
      <VTreeDrop
        v-model="value2"
        :data="data"
        selectable
        clearable
        drop-placeholder="请选择"
        :placement="placement"
        :dropdown-min-width="300"
        dropdown-width-fixed
        @selected-change="handleSelectedChange"
      >
        <template #empty>slot 传进来的暂无数据</template>
      </VTreeDrop>
      选中的值：{{ value2 }}
    </div>
    <div style="width: 200px">
      <p>多选（保持顺序）：</p>
      <VTreeDrop
        v-model="orderValue"
        :data="data"
        checkable
        clearable
        drop-placeholder="请选择"
        :placement="placement"
        :dropdown-min-width="300"
        dropdown-width-fixed
        maintain-check-order
        @checked-change="handleCheckedChange"
      />
      <div>顺序值：{{ orderValue }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { VTreeDrop, TreeNode } from '../src'
import type { PlacementType } from '../src/types'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, onMounted, ref } from 'vue'

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
    const value2 = ref('2')
    const orderValue = ref([])
    const placement = ref<PlacementType>('bottom-start')
    function handleCheckedChange() {
      console.log('checked-change')
    }
    function handleSelectedChange() {
      console.log('selected-change')
    }
    const treeDropRef = ref<InstanceType<typeof VTreeDrop>>()
    onMounted(() => {
      console.log('drop titleField', treeDropRef.value?.titleField)
      console.log('drop keyField', treeDropRef.value?.keyField)
    })
    return {
      treeDropRef,
      data,
      value,
      value2,
      orderValue,
      placement,
      handleCheckedChange,
      handleSelectedChange,
    }
  }
})
</script>
