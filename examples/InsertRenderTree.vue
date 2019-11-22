<template>
  <CTree
    ref="tree"
    :data="treeData"
    :render="renderTree"
  />
</template>

<script>
import CTree from '../src'

export default {
  name: 'InsertRenderTree',
  components: {
    CTree,
  },
  data () {
    return {
      treeData: [{}],
    }
  },
  methods: {
    renderTree (h, node) {
      return (
        <div>
          <input type="text"/>
          <button onClick={this.handleAdd.bind(this, node)}>Add sibling</button>
          <button onClick={this.handleAddChild.bind(this, node)}>Add child</button>
          <button onClick={this.handleDelete.bind(this, node)}>Remove</button>
        </div>
      )
    },
    handleAdd (node) {
      this.$refs.tree.insertAfter({}, node.id)
    },

    handleAddChild (node) {
      this.$refs.tree.append({}, node.id)
    },

    handleDelete (node) {
      this.$refs.tree.remove(node.id)
    },
  },
}
</script>
