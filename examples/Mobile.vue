<template>
  <div class="container">
    <!-- 单选 -->
    <div class="panel">
      <div class="header">单选修改背景</div>
      <div class="body">
        <div  style="height: 300px">
          <VTree
              v-model="selectableValue"
              :data="selectable"
              @update:modelValue="() => {}"
              selectable
            ></VTree>
        </div>
      </div>
    </div>
    <!-- 多选 -->
    <div class="panel">
      <div class="header">多选，父节点不能选择</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree
              v-if="showCheckable"
              v-model="checkableValue"
              :data="checkable"
              checkable
              ignore-mode="parents"
              :cascade="false"
            ></VTree>
          </div>
        </div>
        <div class="desc">
          <div class="desc-block">
            <p>多选，父节点不能选择</p>
            v-model: <br />
            {{ checkableValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VTree, { TreeNode } from '../src'
import { IgnoreType } from '../src/types'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, ref, nextTick } from 'vue-demi'

const genData = (extra = {}) => {
  return treeDataGenerator(
    Object.assign(
      {
        treeDepth: 3,
        nodesPerLevel: 5,
        sameIdTitle: true
      },
      extra
    )
  )
}

const selectableData = genData().data
const selectableValue = ref('')
const selectable = ref(selectableData)
const showCheckable = ref(true)
const checkableData = genData().data
    checkableData[0].expand = true
    checkableData[1].children![0].disabled = true
const checkableValue = ref<(string | number)[]>([checkableData[0].id!])
const checkable = ref(checkableData)
const checkableIgnoreMode = ref<IgnoreType>('none')
const checkableCascade = ref(true)
function onIgnoreBtnClick(mode: IgnoreType) {
  checkableIgnoreMode.value = mode
  showCheckable.value = false
  nextTick(() => {
    checkableValue.value = []
    showCheckable.value = true
  })
}
function onCascadeBtnClick(mode: boolean) {
  checkableCascade.value = mode
  showCheckable.value = false
  nextTick(() => {
    checkableValue.value = []
    showCheckable.value = true
  })
}
function onResetBtnClick() {
  showCheckable.value = false
  nextTick(() => {
    checkableIgnoreMode.value = 'none'
    checkableCascade.value = true
    checkableValue.value = []
    showCheckable.value = true
  })
}

</script>

<style lang="less" scoped>

:deep(.ctree-tree-node_selected) {
  background-color: #eef5ff;
  border-radius: 4px;
  .ctree-tree-node__title {
    background: none;
  }
}
:deep(.ctree-tree-node__wrapper.ctree-tree-node__wrapper_is-leaf.ctree-tree-node_checked) {
  background-color: #eef5ff;
  border-radius: 4px;
}
:deep(.ctree-tree-node__checkbox_wrapper) {
  display: none;
}
:deep(.ctree-tree-node__wrapper_is-leaf) {
  .ctree-tree-node__checkbox_wrapper {
    display: flex;
  }
}
.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  .panel {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;

    .header {
      height: 30px;
      border-bottom: 1px solid lightgray;
      padding: 10px 30px;
    }

    .body {
      display: flex;

      .interface {
        flex: 1;
        padding: 10px 30px;
        border-right: 1px solid lightgray;
      }

      .desc {
        flex: 1;
        padding: 10px 30px;

        .desc-block {
          padding: 5px 0;
          margin-bottom: 10px;
          border-bottom: 1px solid lightgray;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>