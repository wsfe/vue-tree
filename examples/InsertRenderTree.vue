<template>
  <VTree ref="tree" :data="treeData" :render="renderTree" />
</template>

<script lang="ts">
import VTree, { TreeNode } from '../src'
import { defineComponent, reactive, ref, h } from 'vue-demi'
export default defineComponent({
  name: 'InsertRenderTree',
  components: {
    VTree
  },
  setup() {
    const treeData = reactive([{}])
    const tree = ref()
    const renderTree = (node: TreeNode) => {
      return h('div', {}, [
        h('input', { type: 'text' }),
        h('button', { onClick: handleAdd.bind(this, node) }, 'Add sibling'),
        h('button', { onClick: handleAddChild.bind(this, node) }, 'Add child'),
        h('button', { onClick: handleDelete.bind(this, node) }, 'Remove')
      ])
    }
    const handleAdd = (node: TreeNode) => {
      tree.value.insertAfter({}, node.id)
    }

    const handleAddChild = (node: TreeNode) => {
      tree.value.append({}, node.id)
    }

    const handleDelete = (node: TreeNode) => {
      tree.value.remove(node.id)
    }
    return {
      tree,
      treeData,
      renderTree
    }
  }
})
</script>
