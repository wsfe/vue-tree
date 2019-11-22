<template>
  <div style="width: 200px;">
    <CTreeDrop
      v-model="value"
      :data="data"
      checkable
      clearable
      :cascade="false"
      :loading="loading"
      drop-placeholder="请选择"
      :dropdown-min-width="300"
      @checked-change="handleCheckedChange"
    >
      <span slot="empty">slot 传进来的暂无数据</span>
    </CTreeDrop>
    {{ value }}
    <button @click="handleChangeValue">Change Value</button>
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

const data = [
    {
      "id": "p1-id",
      "title": "c(lL%8",
      "checked": false,
      "children": [
        {
          "id": "c1-1-id",
          "title": "c1-1",
          "children": []
        },
        {
          "id": "c1-2-id",
          "title": "c1-2",
          "checked": false,
          "children": []
        }
      ]
    },
    {
      "id": "p2-id",
      "title": "KfQrp",
      "checked": false,
      "children": [
        {
          "id": "c2-1-id",
          "title": "c2-1",
          "checked": false,
          "children": []
        },
        {
          "id": "c2-2-id",
          "title": "c1-2",
          "checked": false,
          "children": [
            {
              "id": "c2-2-1-id",
              "title": "c1-2-1",
              "checked": false,
              "children": []
            }
          ]
        }
      ]
    }
  ]

export default {
  name: 'DropRemote',
  components: {
    CTreeDrop,
  },
  data () {
    return {
      data: [],
      value: '',
      loading: false,
    }
  },
  created () {
    this.handleSetData()
  },
  methods: {
    handleChangeValue () {
      setTimeout(() => {
        this.value = 'c1-1-id,c1-2-id'
      }, 100)
    },
    handleCheckedChange (params) {
      console.log('rrr checked change', params)
    },
    handleSetData () {
      this.loading = true
      setTimeout(() => {
        this.data = data
        this.$nextTick(() => {
          this.value = 'c1-1-id,c1-2-id'
          this.loading = false
        })
      }, 2000)
    },
  },
}
</script>
