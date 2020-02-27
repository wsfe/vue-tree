<template>
  <div class="container">
    <div class="tree">
      <CTree
        ref="tree"
        :data="treeData"
        checkable
        selectable
      ></CTree>
    </div>
    <div class="control">
      <div class="desc-block">
        <p>说明：在 Chrome 下表现良好</p>
        <p>在火狐浏览器下，因为其异步滚动策略 (scroll-linked) ，在快速滚动时会导致内容空白。</p>
        <p>另：浏览器元素/文档是有最大高度限制的，过多数据会导致显示不正常(Chrome 下 100 万条可以正常显示，但是在火狐或 Edge 则不行)</p>
      </div>
      <div class="controls">
        <label>节点深度：</label>
        <input
          v-model="params.treeDepth"
          type="number"
        >
      </div>
      <div class="controls">
        <label>每层节点个数：</label>
        <input
          v-model="params.nodesPerLevel"
          type="number"
        >
      </div>
      <div class="controls">
        <label>总节点个数：</label>
        {{ nodeTotal }}
      </div>
      <div class="controls">
        <div class="actions">
          <button @click="handleGenerate">生成树节点数据</button>
          <button @click="handleGenerateTotal('1w')">1w 节点</button>
          <button @click="handleGenerateTotal('10w')">10w 节点</button>
          <button @click="handleGenerateTotal('20w')">20w 节点</button>
          <button @click="handleGenerateTotal('30w')">30w 节点</button>
        </div>
        <div class="actions">
          <button @click="handleSetData">设置树数据</button>
        </div>
        <div class="actions">
          <span v-if="!isTreeSet" style="color: red;">树数据已生成</span>
          <span v-else  style="color: green;">树数据已设置</span>
        </div>
      </div>
      <div class="controls">
        <label>滚动节点id：</label>
        <input
          v-model="scrollKey"
          type="text"
        />
      </div>
      <div class="controls">
        <label>滚动垂直位置：</label>
        <select v-model="scrollVerticalOption">
          <option value="top">top</option>
          <option value="center">center</option>
          <option value="bottom">bottom</option>
        </select>
      </div>
      <div class="controls">
        <label>滚动垂直偏移值：</label>
        <input
          v-model.number="scrollValue"
          type="text"
        />
      </div>
      <div class="controls">
        <div class="actions">
          <button @click="handleScrollToNode">滚动到此节点</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CTree from '@'
import treeDataGenerator from '../tests/tree-data-generator'

const dataAmountMap = {
  '1w': {
    treeDepth: 2,
    nodesPerLevel: 100,
  },
  '10w': {
    treeDepth: 2,
    nodesPerLevel: 320,
  },
  '20w': {
    treeDepth: 2,
    nodesPerLevel: 450,
  },
  '30w': {
    treeDepth: 2,
    nodesPerLevel: 550,
  },
}

let cache = []

export default {
  name: 'Performance',
  components: {
    CTree,
  },
  data () {
    return {
      cache: [],
      isTreeSet: false,
      params: {
        treeDepth: 2,
        nodesPerLevel: 5,
      },
      nodeTotal: 0,
      treeData: [],
      scrollKey: '',
      scrollVerticalOption: 'top',
      scrollValue: 0,
    }
  },
  methods: {
    handleGenerate () {
      const mock = treeDataGenerator(Object.assign({}, this.params, { inOrder: true, sameIdTitle: true, forceString: true }))
      cache = mock.data
      this.nodeTotal = mock.total
      this.isTreeSet = false
    },
    handleGenerateTotal (amount) {
      Object.assign(this.params, dataAmountMap[amount])
      this.handleGenerate()
    },
    handleSetData () {
      // this.treeData = cache.concat()
      /** 性能模式 */
      this.$refs.tree.setData(cache.concat())
      this.isTreeSet = true
    },
    handleScrollToNode () {
      this.$refs.tree.scrollTo(this.scrollKey, this.scrollValue || this.scrollVerticalOption)
    },
  },
  created () {
    this.handleGenerate()
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .tree {
    flex: 2;
  }
  .control {
    flex: 1;
    padding: 30px 0;
    border-left: 1px solid gray;
    .desc-block {
      padding: 10px 30px;
      margin-bottom: 20px;
    }
    .controls {
      @left-len: 120px;

      padding: 10px;
      label {
        display: inline-block;
        width: @left-len;
        text-align: right;
      }
      .actions {
        margin-left: @left-len;
        margin-bottom: 10px;
        button {
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
