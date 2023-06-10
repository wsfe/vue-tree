<template>
  <div class="container">
    <div class="tree">
      <VTree ref="tree" :data="treeData" checkable selectable></VTree>
    </div>
    <div class="control">
      <div class="desc-block">
        <p>说明：在 Chrome 下表现良好</p>
        <p>浏览器元素/文档是有最大高度限制的，过多数据会导致显示不正常</p>
        <p>生成节点比较耗时，请注意节点深度</p>
      </div>
      <hr>
      <div class="controls">
        <label>节点深度：</label>
        <input v-model="params.treeDepth" type="number" />
        (请输入 1-10 的整数)
      </div>
      <div class="controls">
        <label>每层节点个数：</label>
        <input v-model="params.nodesPerLevel" type="number" />
      </div>
      <div class="controls">
        <label>预计生成节点个数：</label>
        <span>
          {{ totalNodesToGenerate }}
          <span v-if="tooManyNodes" style="color: red">节点过多或无效节点数，请调整节点深度或个数</span>
        </span>
      </div>
      <div class="controls">
        <label>已生成节点个数：</label>
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
          <span v-if="!isTreeSet" style="color: red">树数据已生成</span>
          <span v-else style="color: green">树数据已设置</span>
        </div>
      </div>
      <hr>
      <div class="controls">
        <div class="actions">
          <button @click="handleExpandAll">展开全部节点</button>
          <button @click="handleCollapseAll">折叠全部节点</button>
        </div>
      </div>
      <div class="controls">
        <label>滚动节点id：</label>
        <input v-model="scrollKey" type="text" />
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
        <input v-model.number="scrollValue" type="text" />
      </div>
      <div class="controls">
        <div class="actions">
          <button @click="handleScrollToNode">滚动到此节点</button>
        </div>
        <div class="actions">
          <p>(滚动只对没被折叠的节点有效)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VTree from '../src'
import treeDataGenerator from '../tests/tree-data-generator'
import { computed, defineComponent, ref } from 'vue-demi'

interface TreeMockMeta {
  treeDepth: number
  nodesPerLevel: number
}

const dataAmountMap: Record<string, TreeMockMeta> = {
  '1w': {
    treeDepth: 3,
    nodesPerLevel: 22
  },
  '10w': {
    treeDepth: 3,
    nodesPerLevel: 47
  },
  '20w': {
    treeDepth: 3,
    nodesPerLevel: 59
  },
  '30w': {
    treeDepth: 3,
    nodesPerLevel: 67
  }
}

export default defineComponent({
  name: 'Performance',
  components: {
    VTree
  },
  setup() {
    const cache = ref<any[]>([])
    const isTreeSet = ref(false)
    const params = ref({
      treeDepth: 2,
      nodesPerLevel: 5
    })
    const nodeTotal = ref(0)
    const treeData = ref([])

    const scrollKey = ref('')

    const scrollVerticalOption = ref('top')
    const scrollValue = ref(0)
    const tree = ref()

    const totalNodesToGenerate = computed(() => {
      const d = ~~Number(params.value.treeDepth)
      const n = ~~Number(params.value.nodesPerLevel)

      if (d < 1 || d > 10) return 0
      if (n < 1) return 0

      let total = 0
      let times = d
      while (times) {
        total += Math.pow(n, times--)
      }

      return total
    })

    const tooManyNodes = computed(() => {
      return totalNodesToGenerate.value < 1 || totalNodesToGenerate.value > 1000000
    })

    const handleGenerate = () => {
      if (tooManyNodes.value) return
      const mock = treeDataGenerator(
        Object.assign({}, params.value, {
          inOrder: true,
          sameIdTitle: true,
          forceString: true
        })
      )
      cache.value = mock.data
      nodeTotal.value = mock.total
      isTreeSet.value = false
    }
    const handleGenerateTotal = (amount: string) => {
      Object.assign(params.value, dataAmountMap[amount])
      handleGenerate()
    }
    const handleSetData = () => {
      // this.treeData = cache.concat()
      /** 性能模式 */
      tree.value.setData(cache.value.concat())
      isTreeSet.value = true
    }
    const handleScrollToNode = () => {
      tree.value.scrollTo(
        scrollKey.value,
        scrollValue.value || scrollVerticalOption.value
      )
    }

    const handleExpandAll = () => {
      tree.value.setExpandAll(true)
    }

    const handleCollapseAll = () => {
      tree.value.setExpandAll(false)
      tree.value.scrollTo('0', 0)
    }

    return {
      tree,
      cache,
      isTreeSet,
      params,
      nodeTotal,
      treeData,
      scrollKey,
      scrollVerticalOption,
      scrollValue,
      handleGenerate,
      handleGenerateTotal,
      handleSetData,
      handleScrollToNode,
      totalNodesToGenerate,
      tooManyNodes,
      handleExpandAll,
      handleCollapseAll,
    }
  },
  created() {
    this.handleGenerate()
  }
})
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
    padding: 10px 0;
    border-left: 1px solid gray;

    .desc-block {
      padding: 0 30px;
    }

    .controls {
      @left-len: 150px;

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
