<template>
  <div :class="wrapperCls">
    <!-- 滚动区域 -->
    <div
      ref="scrollArea"
      :class="scrollAreaCls"
      @scroll.passive.stop="handleTreeScroll"
    >
      <!-- 可见节点区域，包括上下两片空白加渲染的节点 -->
      <div :class="blockAreaCls">
        <div :style="{ height: `${topSpaceHeight}px` }"></div>
        <VTreeNode
          v-for="node in (expandAnimation.ready.value ? expandAnimation.topNodes.value : renderNodes)"
          v-bind="treeNodeProps"
          :key="node[keyField]"
          :data="node"
          :getNode="getNode"
          :noSiblingNodeMap="noSiblingNodeMap"
          v-on="treeNodeListeners"
          :class="getNodeClassName(node)"
          :style="{
            minHeight: `${nodeMinHeight}px`,
          }"
          @check="handleNodeCheck"
          @select="handleNodeSelect"
          @expand="handleNodeExpand"
          @node-drop="handleNodeDrop"
        >
          <template #default="slotProps">
            <slot name="node" v-bind="slotProps"></slot>
          </template>
        </VTreeNode>
        <template v-if="expandAnimation.ready.value">
          <Transition
            name="vtree-expand-animation"
            @after-enter="expandAnimation.onExpandAnimationFinish"
            @after-leave="expandAnimation.onExpandAnimationFinish"
          >
            <div
              v-show="expandAnimation.currentExpandState.value"
              :style="{
                display: 'grid',
              }"
            >
              <div :style="{ overflow: 'hidden' }">
                <VTreeNode
                  v-for="node in expandAnimation.middleNodes.value"
                  v-bind="treeNodeProps"
                  :key="node[keyField]"
                  :data="node"
                  :getNode="getNode"
                  :noSiblingNodeMap="noSiblingNodeMap"
                  v-on="treeNodeListeners"
                  :class="getNodeClassName(node)"
                  :style="{
                    minHeight: `${nodeMinHeight}px`,
                  }"
                  @check="handleNodeCheck"
                  @select="handleNodeSelect"
                  @expand="handleNodeExpand"
                  @node-drop="handleNodeDrop"
                >
                  <template #default="slotProps">
                    <slot name="node" v-bind="slotProps"></slot>
                  </template>
                </VTreeNode>
              </div>
            </div>
          </Transition>
          <VTreeNode
            v-for="node in expandAnimation.bottomNodes.value"
            v-bind="treeNodeProps"
            :key="node[keyField]"
            :data="node"
            :getNode="getNode"
            :noSiblingNodeMap="noSiblingNodeMap"
            v-on="treeNodeListeners"
            :class="getNodeClassName(node)"
            :style="{
              minHeight: `${nodeMinHeight}px`,
            }"
            @check="handleNodeCheck"
            @select="handleNodeSelect"
            @expand="handleNodeExpand"
            @node-drop="handleNodeDrop"
          >
            <template #default="slotProps">
              <slot name="node" v-bind="slotProps"></slot>
            </template>
          </VTreeNode>
        </template>
        <div :style="{ height: `${bottomSpaceHeight}px` }"></div>
      </div>
    </div>
    <!-- 暂无数据 -->
    <div v-show="!blockLength" :class="emptyCls">
      <span :class="emptyTextDefaultCls">
        <slot name="empty">
          {{ emptyText }}
        </slot>
      </span>
    </div>
    <!-- 加载中 -->
    <div v-show="loading || isRootLoading" :class="loadingCls">
      <div :class="loadingWrapperCls">
        <slot name="loading">
          <LoadingIcon :class="loadingIconCls" />
        </slot>
      </div>
    </div>
    <!-- 监听容器 resize 用的 iframe -->
    <iframe ref="iframe" :class="iframeCls"></iframe>
  </div>
</template>

<script lang="ts">
export interface TreeProps {
  /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
  data?: AnyPropsArrayType,

  /** 数据为空时显示的文本 */
  emptyText?: string,

  /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
  modelValue?: string | number | TreeNodeKeyType[],

  /** 是否可单选 */
  selectable?: boolean,

  /** 是否可多选 */
  checkable?: boolean,

  /** 多选模式下 value 分隔符 */
  separator?: string,

  /** 忽略模式 */
  ignoreMode?: IgnoreType,

  /** 节点标题字段 */
  titleField?: string,

  /** 节点唯一标识字段 */
  keyField?: string,

  /** 节点过滤方法 */
  filterMethod?: FilterFunctionType,

  /** 过滤已选时是否在列表后面展示未加载的已选节点 */
  showUnloadCheckedNodes?: boolean,

  /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
  unloadDataList?: AnyPropsArrayType,

  /** 异步加载方法 */
  load?: LoadFn,

  /** 是否可勾选被过滤节点 */
  filteredNodeCheckable?: boolean,

  /** 父子节点是否关联 */
  cascade?: boolean,

  /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
  enableLeafOnly?: boolean,

  /** 是否禁用所有节点 */
  disableAll?: boolean,

  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean,

  /**
   * 默认展开的节点 key
   * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
   */
  defaultExpandedKeys?: TreeNodeKeyType[],

  /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
  expandedKeys?: TreeNodeKeyType[],

  /** 是否可拖拽 */
  draggable?: boolean,

  /** 是否可放置 */
  droppable?: boolean,

  /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
  beforeDropMethod?: (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean,

  /** 异步加载初始化时是否自动加载根节点 */
  autoLoad?: boolean,

  /** 节点渲染 render 函数 */
  render?: (node: TreeNode) => VNode,

  /**
   * 过滤时是否展开所有可见节点
   * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
   * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
   */
  expandOnFilter?: boolean,

  /** 点击已选中节点是否取消选中 */
  unselectOnClick?: boolean,

  /** 是否显示 loading 图标 */
  loading?: boolean,

  /** 节点根元素的 class ，传入函数以对每个节点定制 class */
  nodeClassName?: string | object | Array<string | object> | ((node: TreeNode) => string | object | Array<string | object>),

  /** 连接线 */
  showLine?: boolean | ShowLine

  /** 是否启用过渡动画，目前仅控制展开收起 */
  animation?: boolean

  /** 子节点缩进 */
  nodeIndent?: number,

  /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
  renderNodeAmount?: number,

  /** 根据节点最小高度计算数据总高度 */
  nodeMinHeight?: number,

  /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
  bufferNodeAmount?: number,

  /**
   * 多选时是否保持选中顺序
   */
  maintainCheckOrder?: boolean,
}

export const DEFAULT_TREE_PROPS = {
  data: () => [],
  unloadDataList: () => [],
  showUnloadCheckedNodes: true,
  emptyText: '暂无数据',
  titleField: 'title',
  keyField: 'id',
  separator: ',',
  checkable: false,
  selectable: false,
  filteredNodeCheckable: false,
  cascade: true,
  enableLeafOnly: false,
  disableAll: false,
  defaultExpandAll: false,
  defaultExpandedKeys: () => [],
  expandedKeys: () => [],
  draggable: false,
  droppable: false,
  beforeDropMethod: () => () => true,
  ignoreMode: ignoreEnum.none,
  autoLoad: true,
  expandOnFilter: true,
  unselectOnClick: true,
  loading: false,

  nodeMinHeight: 30,
  nodeIndent: 20,
  renderNodeAmount: 100,
  bufferNodeAmount: 20,
  maintainCheckOrder: false,
}
</script>

<script setup lang="ts">
import {
  VNode,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  toRefs,
} from 'vue'
import TreeStore, { TreeNode } from '../store'
import VTreeNode from './TreeNode.vue'
import LoadingIcon from './LoadingIcon.vue'
import {
  ignoreEnum,
  dragHoverPartEnum,
} from '../constants'
import { STORE_EVENTS, TREE_EVENTS, TREE_NODE_EVENTS } from '../constants/events'
import { TreeNodeKeyType, INonReactiveData, IgnoreType, AnyPropsArrayType, LoadFn, ShowLine } from '../types'
import { useTreeCls } from '../hooks/useTreeCls'
import { useVirtualList } from '../hooks/useVirtualList'
import { useIframeResize } from '../hooks/useIframeResize'
import { usePublicTreeAPI } from '../hooks/usePublicTreeAPI'
import { FilterFunctionType } from '../store/tree-store'
import { pickReadonly } from '../utils'
import { useExpandAnimation } from '../hooks/useExpandAnimation'
import {ArgumentsType} from "vitest";

const props = withDefaults(defineProps<TreeProps>(), DEFAULT_TREE_PROPS)

const emit = defineEmits(['update:modelValue', ...TREE_EVENTS])

const EXCLUDED_TREE_NODE_EVENTS = ['node-drop', 'check', 'select', 'expand']

const treeNodeListeners = TREE_NODE_EVENTS.reduce((prev, eventName) => {
  if (EXCLUDED_TREE_NODE_EVENTS.indexOf(eventName) < 0) {
    prev[eventName] = (...args: any[]) => {
      emit(eventName, ...args)
    }
  }
  return prev
}, {} as Record<string, Function>)

const getInitialNonReactiveValues = (): INonReactiveData => {
  return {
    store: new TreeStore({
      keyField: props.keyField,
      ignoreMode: props.ignoreMode,
      filteredNodeCheckable: props.filteredNodeCheckable,
      cascade: props.cascade,
      defaultExpandAll: props.defaultExpandAll,
      load: props.load,
      expandOnFilter: props.expandOnFilter,
      maintainCheckOrder: props.maintainCheckOrder,
    }),
    blockNodes: [] as TreeNode[]
  }
}

// Non reactive
let nonReactive = getInitialNonReactiveValues()

/**
 * 转发 store 所触发的事件，通过 vue 组件触发事件可被其他组件监听
 */
 const attachStoreEvents = () => {
  STORE_EVENTS.forEach(eventName => {
   nonReactive.store.on(eventName, (...args: any[]) => {
     emit(eventName, ...args)
   })
 })
}

attachStoreEvents()

/** 更新展开的节点 */
const updateExpandedKeys = () => {
  if (props.expandedKeys.length) {
    nonReactive.store.setExpandAll(false, false)
    nonReactive.store.setExpandKeys(props.expandedKeys, true)
  }
}

const {
  wrapperCls,
  scrollAreaCls,
  blockAreaCls,
  emptyCls,
  emptyTextDefaultCls,
  loadingCls,
  loadingWrapperCls,
  loadingIconCls,
  iframeCls,
} = useTreeCls()

const {
  scrollArea,
  renderNodes,
  blockLength,
  topSpaceHeight,
  bottomSpaceHeight,
  renderStart,
  resetSpaceHeights,
  updateRender,
  updateBlockNodes,
  updateBlockData,
  handleTreeScroll,
  scrollTo,
} = useVirtualList(nonReactive, props)

const expandAnimation = useExpandAnimation(renderNodes, renderStart, props)

const {
  unloadCheckedNodes,
  isRootLoading,

  setData,
  setChecked,
  setCheckedKeys,
  checkAll,
  clearChecked,
  setSelected,
  clearSelected,
  setExpand,
  setExpandKeys,
  setExpandAll,
  getCheckedNodes,
  getCheckedKeys,
  getIndeterminateNodes,
  getSelectedNode,
  getSelectedKey,
  getExpandNodes,
  getExpandKeys,
  getCurrentVisibleNodes,
  getNode,
  getTreeData,
  getFlatData,
  getNodesCount,
  insertBefore,
  insertAfter,
  append,
  prepend,
  remove,
  filter,
  showCheckedNodes,
  loadRootNodes,
  updateNode,
  updateNodes,
} = usePublicTreeAPI(nonReactive, props, {
  resetSpaceHeights,
  updateExpandedKeys,
  updateBlockData,
  updateRender,
})

const getNodeClassName = (node: TreeNode) => {
  return typeof props.nodeClassName === 'function' ? props.nodeClassName(node) : props.nodeClassName
}

const noSiblingNodeMap = computed(() => {
  const parentsOfFirstNode: TreeNode[] = []
  let nodeParent = renderNodes.value[0]?._parent

  while (nodeParent) {
    parentsOfFirstNode.push(nodeParent)
    nodeParent = nodeParent._parent
  }

  const nodesToIterate = parentsOfFirstNode.concat(renderNodes.value)

  const map: Record<string, true> = {}
  const stack: TreeNode[] = []
  nodesToIterate.forEach((renderNode) => {
    const currentNodeLevel = renderNode._level
    let length = stack.length
    while (length) {
      const stackNode = stack[length - 1]
      const stackNodeLevel = stackNode._level
      if (stackNodeLevel > currentNodeLevel) {
        map[stackNode[props.keyField]] = true
        stack.pop()
      } else if (stackNodeLevel === currentNodeLevel) {
        stack.pop()
        break
      } else break
      length--
    }
    stack.push(renderNode)
  })
  stack.forEach((node) => {
    map[node[props.keyField]] = true
  })

  return map
})

type VModelType = TreeNodeKeyType | TreeNodeKeyType[]

const sameValue = (newVal: VModelType, valueCache: VModelType | undefined): boolean => {
  if (Array.isArray(newVal) && Array.isArray(valueCache)) {
    if (
      newVal.length === valueCache.length &&
      newVal.every(val =>
        (valueCache as TreeNodeKeyType[]).some(cache => cache === val)
      )
    )
      return true
  } else if (newVal === valueCache) return true
  return false
}

const valueCache = ref<VModelType | undefined>(
  Array.isArray(props.modelValue)
    ? props.modelValue.concat()
    : props.modelValue
)

//#region Handle node events
const handleNodeCheck = (node: TreeNode): void => {
  if (!props.cascade && props.enableLeafOnly && !node.isLeaf) return
  nonReactive.store.setChecked(
    node[props.keyField],
    node.indeterminate ? true : !node.checked,
    true,
    true,
    true
  )
}
const handleNodeSelect = (node: TreeNode): void => {
  if (props.enableLeafOnly && !node.isLeaf) return
  nonReactive.store.setSelected(node[props.keyField], !node.selected)
}
const handleNodeExpand = (node: TreeNode): void => {
  expandAnimation.updateBeforeExpand(node)
  nonReactive.store.setExpand(node[props.keyField], !node.expand)
}
const handleNodeDrop = (
  data: TreeNode,
  e: DragEvent,
  hoverPart: dragHoverPartEnum
): void => {
  if (!props.droppable) return
  if (e.dataTransfer) {
    try {
      const targetNodeData = JSON.parse(e.dataTransfer.getData('node'))
      const targetKey = targetNodeData[props.keyField]
      const referenceKey = data[props.keyField]
      const shouldDrop: boolean = props.beforeDropMethod(
        targetKey,
        referenceKey,
        hoverPart
      )
      if (shouldDrop) {
        if (targetKey === referenceKey) return
        if (hoverPart === dragHoverPartEnum.before)
          nonReactive.store.insertBefore(targetKey, referenceKey)
        // 如果是拖拽到父节点，并且父节点是展开的，则不管 hoverPart 是不是 after 都拖入为子节点
        else if (
          hoverPart === dragHoverPartEnum.body ||
          (!data.isLeaf && data.expand)
        )
          nonReactive.store.prepend(targetKey, referenceKey)
        else if (hoverPart === dragHoverPartEnum.after)
          nonReactive.store.insertAfter(targetKey, referenceKey)
        emit('node-drop', data, e, hoverPart, getNode(targetKey))
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
//#endregion Handle node events

watch(
  () => props.modelValue,
  newVal => {
    if (props.checkable) {
      // 检查是否由 update:modelValue 事件触发
      if (sameValue(newVal as VModelType, valueCache.value)) return

      // 多选
      let checkedKeys: TreeNodeKeyType[] = []
      if (Array.isArray(newVal)) {
        checkedKeys = newVal.concat()
      } else if (typeof newVal === 'string') {
        checkedKeys =
          newVal === '' ? [] : (newVal as string).split(props.separator)
      }
      nonReactive.store.clearChecked(false, false)
      nonReactive.store.setCheckedKeys(checkedKeys, true)
    } else if (props.selectable) {
      // 检查是否由 update:modelValue 事件触发
      if (newVal === valueCache.value) return

      // 单选
      const currentSelected = nonReactive.store.getSelectedKey()
      if (newVal !== '' && newVal != null) {
        nonReactive.store.setSelected(newVal as TreeNodeKeyType, true)
      } else if ((newVal === '' || newVal == null) && currentSelected) {
        nonReactive.store.setSelected(currentSelected, false)
      }
    }
  }
)

watch(
  () => props.data,
  newData => {
    setData(newData)
  }
)

watch(
  () => props.expandedKeys,
  () => {
    updateExpandedKeys()
  }
)

const updateUnloadStatus = (): void => {
  if (unloadCheckedNodes.value.length) {
    const unloadKeys = nonReactive.store.getUnloadCheckedKeys()
    unloadCheckedNodes.value.forEach(node => {
      node.checked = unloadKeys.indexOf(node[props.keyField]) > -1
    })
  }
}

/**
 * 触发多选 update:modelValue 事件
 */
const emitCheckableInput = (
  checkedNodes: TreeNode[],
  checkedKeys: TreeNodeKeyType[]
): void => {
  if (props.checkable) {
    // 多选
    let emitValue: TreeNodeKeyType[] | string = checkedKeys
    if (!Array.isArray(props.modelValue)) {
      emitValue = emitValue.join(props.separator)
    }
    if (Array.isArray(emitValue)) {
      valueCache.value = emitValue.concat()
    } else {
      valueCache.value = emitValue
    }
    emit('update:modelValue', emitValue)
  }
}

/**
 * 触发单选 update:modelValue 事件
 */
const emitSelectableInput = (
  selectedNode: TreeNode | null,
  selectedKey: TreeNodeKeyType | null
): void => {
  if (props.selectable && !props.checkable) {
    // 单选
    const emitValue: TreeNodeKeyType = selectedKey ? selectedKey : ''
    valueCache.value = emitValue
    emit('update:modelValue', emitValue)
  }
}

onMounted(() => {
  nonReactive.store.on('expand', expandAnimation.updateAfterExpand)
  nonReactive.store.on('visible-data-change', updateBlockNodes)
  nonReactive.store.on('render-data-change', updateRender)
  nonReactive.store.on(
    'checked-change',
    (checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]) => {
      emitCheckableInput(checkedNodes, checkedKeys)
      updateUnloadStatus()
    }
  )
  nonReactive.store.on('selected-change', emitSelectableInput)
  if (props.data.length) {
    setData(props.data)
    if (props.defaultExpandedKeys.length) {
      nonReactive.store.setExpandKeys(props.defaultExpandedKeys, true)
    }
  } else if (typeof props.load === 'function' && props.autoLoad) {
    // Load root data from remote
    if (props.modelValue || props.unloadDataList) {
      setData([])
    }
    loadRootNodes()
  }
})

onBeforeUnmount(() => {
  // 卸载组件之前重置 nonReactive 中的数据，缓解 Vue 切换组件可能导致的内存无法释放问题
  nonReactive.store.disposeListeners()
  const newNonReactive = getInitialNonReactiveValues()
  nonReactive.store = newNonReactive.store
  nonReactive.blockNodes = newNonReactive.blockNodes
})

useIframeResize(updateRender)

const treeNodePropKeys = [
  'titleField',
  'keyField',
  'checkable',
  'selectable',
  'unselectOnClick',
  'disableAll',
  'draggable',
  'droppable',
  'render',
  'nodeIndent',
  'showLine',
] as const

const treeNodeProps = reactive(pickReadonly(toRefs(props), ...treeNodePropKeys))

const setExpandExpose = (...args: ArgumentsType<typeof setExpand>) => {
  if (props.animation) {
    const node = getNode(args[0]);
    if(node) {
      expandAnimation.updateBeforeExpand(node)
    }
  }

  setExpand(...args)
}

defineExpose({
  setData,
  setChecked,
  setCheckedKeys,
  checkAll,
  clearChecked,
  setSelected,
  clearSelected,
  setExpand: setExpandExpose,
  setExpandKeys,
  setExpandAll,
  getCheckedNodes,
  getCheckedKeys,
  getIndeterminateNodes,
  getSelectedNode,
  getSelectedKey,
  getExpandNodes,
  getExpandKeys,
  getCurrentVisibleNodes,
  getNode,
  getTreeData,
  getFlatData,
  getNodesCount,
  insertBefore,
  insertAfter,
  append,
  prepend,
  remove,
  filter,
  showCheckedNodes,
  loadRootNodes,
  updateNode,
  updateNodes,
  scrollTo,
})

defineOptions({
  name: 'VTree',
  inheritAttrs: false,
})
</script>
