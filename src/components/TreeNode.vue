<template>
  <div :class="indentWrapperCls">
    <template v-if="showLine">
      <template v-for="(level, index) in data._level" :key="level">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          :style="{
            alignSelf: 'stretch',
            width: `${nodeIndent}px`,
          }"
        >
          <path
            fill="none"
            :d="polylinePoints(index === data._level - 1)"
            :stroke-width="strokeWidth"
            :stroke="showLineParams.color"
            :stroke-dasharray="strokeDasharray"
          />
        </svg>
      </template>
    </template>
    <div
      :class="wrapperCls"
      :style="{
        paddingLeft: showLine ? 'none' : `${data._level * nodeIndent}px`,
      }"
    >
      <div :class="dropBeforeCls"></div>
      <div ref="nodeBody" :class="nodeBodyCls" v-on="dropListeners">
        <!-- 展开按钮 -->
        <div :class="expandCls">
          <!-- 外层用于占位，icon 用于点击 -->
          <!-- <i
            v-show="!data?.isLeaf && !data?._loading"
            @click="handleExpand"
          ></i> -->
          <span v-show="!data?.isLeaf && !data?._loading" style="cursor: pointer;">
            <span v-if="showLine" @click="handleExpand">
              <svg v-if="props.data?.expand" focusable="false" data-icon="minus-square" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
              <svg v-else focusable="false" data-icon="plus-square" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
            </span>
            <i
              v-else
              @click="handleExpand"
            ></i>
          </span>
          <LoadingIcon v-if="data?._loading" :class="loadingIconCls" />
        </div>

        <!-- 复选框 -->
        <div v-if="showCheckbox" :class="checkboxWrapperCls">
          <div :class="checkboxCls" @click="handleCheck"></div>
        </div>

        <!-- 标题 -->
        <div
          :class="titleCls"
          @click="handleSelect"
          @dblclick="handleDblclick"
          @contextmenu="handleRightClick"
          v-on="dragListeners"
          :draggable="draggable && !disableAll && !data?.disabled"
        >
          <slot :node="fullData">
            <component v-if="renderFunction" :is="renderComponent"></component>
            <template v-else>{{ data ? data[titleField] : '' }}</template>
          </slot>
        </div>
      </div>
      <div :class="dropAfterCls"></div>
    </div>
  </div>
</template>

<script lang="ts">
type PickedProps = Required<Pick<TreeProps,
  'titleField' |
  'keyField' |
  'checkable' |
  'selectable' |
  'unselectOnClick' |
  'disableAll' |
  'draggable' |
  'droppable' |
  'nodeIndent'
>> & Pick<TreeProps, 'render' | 'showLine'>

export type TreeNodeProps = PickedProps & {
  data: TreeNode,
  getNode: GetNodeFn,
  noSiblingNodeMap: Record<string, true>,
}
</script>

<script setup lang="ts">
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
  h,
  toRef,
} from 'vue'
import { TreeNode } from '../store'
import LoadingIcon from './LoadingIcon.vue'
import { dragHoverPartEnum, showLineType } from '../constants'
import { TREE_NODE_EVENTS } from '../constants/events'
import { useTreeNodeCls } from '../hooks/useTreeNodeCls'
import { TreeProps } from './Tree.vue'
import { GetNodeFn, ShowLine } from '../types'

const props = defineProps<TreeNodeProps>()

const emit = defineEmits([...TREE_NODE_EVENTS])

const dragoverBody = ref(false)
const dragoverBefore = ref(false)
const dragoverAfter = ref(false)

const showLineParams = computed(() => {
  const defaultParams: Required<ShowLine> = {
    width: 1,
    type: showLineType.solid,
    color: '#D3D3D3',
    polyline: false,
    dashDensity: 3,
  }
  let params: Required<ShowLine> = defaultParams
  if (typeof props.showLine === 'object') {
    let dashDensity = defaultParams.dashDensity
    if (typeof props.showLine.dashDensity === 'number' && props.showLine.dashDensity >= 1 && props.showLine.dashDensity <= 10) {
      dashDensity = props.showLine.dashDensity
    }

    params = {
      width: props.showLine.width ?? defaultParams.width,
      type: props.showLine.type ?? defaultParams.type,
      color: props.showLine.color ?? defaultParams.color,
      polyline: props.showLine.polyline ?? defaultParams.polyline,
      dashDensity,
    }
  }
  return params
})

const strokeWidth = computed(() => showLineParams.value.width * 100 / props.nodeIndent)

const strokeDasharray = computed(() => {
  switch (showLineParams.value.type) {
    case showLineType.dashed:
      return 100 / (showLineParams.value.dashDensity * 2)
    default:
      break
  }
  return 'none'
})

const polylinePoints = (isDirectParentLine: boolean) => {
  if (!showLineParams.value.polyline || !isDirectParentLine) return 'M50,0 L50,100'
  const parent = props.getNode(props.data[props.keyField])?._parent
  if (parent && props.noSiblingNodeMap[parent[props.keyField]] && props.noSiblingNodeMap[props.data[props.keyField]]) return 'M50,0 L50,50 M100,50 L50,50'
  return 'M50,0 L50,100 M100,50 L50,50'
}

const {
  indentWrapperCls,
  wrapperCls,
  nodeBodyCls,
  dropBeforeCls,
  dropAfterCls,
  checkboxWrapperCls,
  expandCls,
  loadingIconCls,
  checkboxCls,
  titleCls,
} = useTreeNodeCls(props, {
  dragoverBody,
  dragoverBefore,
  dragoverAfter,
})

const fullData = computed(() => {
  return (
    props.getNode(props.data ? props.data[props.keyField] : '') ||
    props.data ||
    ({} as TreeNode)
  )
})
const showCheckbox = computed(() => {
  return props.checkable
})
const renderFunction = props.data?.render || props.render || null
const renderComponent = computed(() => {
  return defineComponent({
    name: 'Render',
    functional: true,
    render() {
      if (typeof renderFunction !== 'function') return h('div')
      return renderFunction(fullData.value)
    }
  })
})
const dragListeners = computed(() => {
  let result = {}
  if (props.draggable && !props.disableAll && !props.data?.disabled) {
    result = {
      dragstart: handleDragStart
    }
  }
  return result
})
const dropListeners = computed(() => {
  let result = {}
  if (props.droppable) {
    result = {
      dragenter: handleDragEnter.bind(getCurrentInstance()),
      dragover: handleDragOver.bind(getCurrentInstance()),
      dragleave: handleDragLeave.bind(getCurrentInstance()),
      drop: handleDrop.bind(getCurrentInstance())
    }
  }
  return result
})

function handleExpand(): void {
  if (props.data?.isLeaf) return
  emit('expand', fullData.value)
}

function handleCheck(): void {
  if (props.disableAll || props.data?.disabled || !props.checkable) return
  emit('check', fullData.value)
}

function handleSelect(e: MouseEvent): void {
  emit('click', fullData.value, e)
  if (props.selectable) {
    if (props.disableAll || props.data?.disabled) return
    if (props.data?.selected && !props.unselectOnClick) return
    emit('select', fullData.value)
  } else if (props.checkable) {
    handleCheck()
  } else {
    handleExpand()
  }
}

function handleDblclick(e: MouseEvent): void {
  emit('node-dblclick', fullData.value, e)
}

function handleRightClick(e: MouseEvent): void {
  emit('node-right-click', fullData.value, e)
}

//#region Drag handlers
/** 计算拖拽到节点的哪个部分 */
const nodeBody = ref()
function getHoverPart(e: DragEvent) {
  const boundingClientRect = nodeBody.value.getBoundingClientRect()
  const height = boundingClientRect.height
  const y = e.clientY - boundingClientRect.top
  if (y <= height * 0.3) return dragHoverPartEnum.before
  if (y <= height * (0.3 + 0.4)) return dragHoverPartEnum.body
  return dragHoverPartEnum.after
}

/**
 * 重置 dragover 标志位
 * @param hoverPart 计算出的拖拽部分
 * @param isLeaveOrDrop 是否是 dragleave 或者 drop 事件，如果是则不再把标志位置为 true
 */
function resetDragoverFlags(
  hoverPart: dragHoverPartEnum,
  isLeaveOrDrop = false
) {
  dragoverBefore.value = false
  dragoverBody.value = false
  dragoverAfter.value = false
  if (!isLeaveOrDrop) {
    if (hoverPart === dragHoverPartEnum.before) dragoverBefore.value = true
    else if (hoverPart === dragHoverPartEnum.body) dragoverBody.value = true
    else if (hoverPart === dragHoverPartEnum.after)
      dragoverAfter.value = true
  }
}

function handleDragStart(e: DragEvent): void {
  if (e.dataTransfer) {
    e.dataTransfer.setData('node', JSON.stringify(props.data))
  }
  if (props.data?.expand) handleExpand()
  emit('node-dragstart', fullData.value, e)
}

function handleDragEnter(e: DragEvent): void {
  e.preventDefault()
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart)
  emit('node-dragenter', fullData.value, e, hoverPart)
}

function handleDragOver(e: DragEvent): void {
  e.preventDefault()
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart)
  emit('node-dragover', fullData.value, e, hoverPart)
}

function handleDragLeave(e: DragEvent): void {
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart, true)
  emit('node-dragleave', fullData.value, e, hoverPart)
}

function handleDrop(e: DragEvent): void {
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart, true)
  emit('node-drop', fullData.value, e, hoverPart)
}

defineOptions({
  name: 'VTreeNode',
})
</script>
