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
        <div :style="topSpaceStyles"></div>
        <CTreeNode
          v-for="node in renderNodes"
          v-bind="$props"
          :key="node[keyField]"
          :data="node"
          :getNode="getNode"
          v-on="treeNodeListeners"
          :class="
            typeof nodeClassName === 'function'
              ? nodeClassName(node)
              : nodeClassName
          "
          :style="{
            minHeight: `${nodeMinHeight}px`,
            paddingLeft: `${node._level * nodeIndent}px`
          }"
          @check="handleNodeCheck"
          @select="handleNodeSelect"
          @expand="handleNodeExpand"
          @node-drop="handleNodeDrop"
        />
        <div :style="bottomSpaceStyles"></div>
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
import {
  VNode,
  defineComponent,
  reactive,
  ref,
  Ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  PropType
} from 'vue-demi'
import TreeStore, { TreeNode } from '../store'
import CTreeNode from './TreeNode.vue'
import LoadingIcon from './LoadingIcon.vue'
import { IEventNames, FilterFunctionType } from '../store/tree-store'
import { ITreeNodeOptions } from '../store/tree-node'
import {
  ignoreEnum,
  verticalPositionEnum,
  VerticalPositionType,
  dragHoverPartEnum,
  TREE_NODE_EVENTS
} from '../const'
import { TreeNodeKeyType, IgnoreType } from '../types'

type AnyPropsArrayType = Array<{ [key: string]: any }>
type VModelType = TreeNodeKeyType | TreeNodeKeyType[]
interface INonReactiveData {
  store: TreeStore
  blockNodes: TreeNode[]
}

const storeEvents: Array<keyof IEventNames> = [
  'expand',
  'select',
  'unselect',
  'selected-change',
  'check',
  'uncheck',
  'checked-change',
  'set-data'
]
const EXCLUDED_TREE_NODE_EVENTS = ['node-drop', 'check', 'select', 'expand']

export default defineComponent({
  name: 'CTree',
  components: {
    CTreeNode,
    LoadingIcon
  },
  emits: ['update:modelValue', ...TREE_NODE_EVENTS, ...storeEvents],
  props: {
    /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
    modelValue: [String, Number, Array] as PropType<
      string | number | TreeNodeKeyType[]
    >,
    // modelValue: [
    //   String,
    //   Number,
    //   Array as PropType<TreeNodeKeyType[]>,
    // ],

    /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
    data: {
      type: Array as PropType<AnyPropsArrayType>,
      default: () => []
    },

    /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
    unloadDataList: {
      type: Array as PropType<AnyPropsArrayType>,
      default: () => []
    },

    /** 过滤已选时是否在列表后面展示未加载的已选节点 */
    showUnloadCheckedNodes: {
      type: Boolean,
      default: true
    },

    /** 数据为空时显示的文本 */
    emptyText: {
      type: String,
      default: '暂无数据'
    },

    /** 节点标题字段 */
    titleField: {
      type: String,
      default: 'title'
    },

    /** 节点唯一标识字段 */
    keyField: {
      type: String,
      default: 'id'
    },

    /** 多选模式下 value 分隔符 */
    separator: {
      type: String,
      default: ','
    },

    /** 是否可多选 */
    checkable: {
      type: Boolean,
      default: false
    },

    /** 是否可单选 */
    selectable: {
      type: Boolean,
      default: false
    },

    /** 是否可勾选被过滤节点 */
    filteredNodeCheckable: {
      type: Boolean,
      default: false
    },

    /** 父子节点是否关联 */
    cascade: {
      type: Boolean,
      default: true
    },

    /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
    enableLeafOnly: {
      type: Boolean,
      default: false
    },

    /** 是否禁用所有节点 */
    disableAll: {
      type: Boolean,
      default: false
    },

    /** 是否默认展开所有节点 */
    defaultExpandAll: {
      type: Boolean,
      default: false
    },

    /**
     * 默认展开的节点 key
     * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
     */
    defaultExpandedKeys: {
      type: Array as PropType<TreeNodeKeyType[]>,
      default: () => []
    },

    /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
    expandedKeys: {
      type: Array as PropType<TreeNodeKeyType[]>,
      default: () => []
    },

    /** 是否可拖拽 */
    draggable: {
      type: Boolean,
      default: false
    },

    /** 是否可放置 */
    droppable: {
      type: Boolean,
      default: false
    },

    /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
    beforeDropMethod: {
      type: Function as PropType<
        (
          dragKey: TreeNodeKeyType,
          dropKey: TreeNodeKeyType,
          hoverPart: dragHoverPartEnum
        ) => boolean
      >,
      default: () => () => true
    },

    /** 忽略模式 */
    ignoreMode: {
      type: String as PropType<IgnoreType>,
      default: ignoreEnum.none
    },

    /** 异步加载初始化时是否自动加载根节点 */
    autoLoad: {
      type: Boolean,
      default: true
    },

    /** 异步加载方法 */
    load: Function as PropType<
      (node: null | TreeNode, resolve: Function, reject: Function) => any
    >,

    /** 节点渲染 render 函数 */
    render: Function as PropType<(node: TreeNode) => VNode>,

    /** 节点过滤方法 */
    filterMethod: Function as PropType<FilterFunctionType>,

    /**
     * 过滤时是否展开所有可见节点
     * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
     * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
     */
    expandOnFilter: {
      type: Boolean,
      default: true
    },

    /** 点击已选中节点是否取消选中 */
    unselectOnClick: {
      type: Boolean,
      default: true
    },

    /** 是否显示 loading 图标 */
    loading: {
      type: Boolean,
      default: false
    },

    //#region Render nodes related props
    /** 根据节点最小高度计算数据总高度 */
    nodeMinHeight: {
      type: Number,
      default: 30
    },

    /** 子节点缩进 */
    nodeIndent: {
      type: Number,
      default: 20
    },

    /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
    renderNodeAmount: {
      type: Number,
      default: 100
    },

    /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
    bufferNodeAmount: {
      type: Number,
      default: 20
    },
    //#endregion Render nodes related props

    /** 节点根元素的 class ，传入函数以对每个节点定制 class */
    nodeClassName: {
      type: [
        String,
        Object,
        Array as () => Array<string | object>,
        Function as any as () => (
          node: TreeNode
        ) => string | object | Array<string | object>
      ]
    },

    /**
     * 使用 padding 代替 margin 来展示子节点缩进
     * 此 Prop 是为了方便样式定制，在下个大版本将全部使用 padding
     * @deprecated
     */
    // usePadding: {
    //   type: Boolean,
    //   default: false
    // }
  },
  setup(props, ctx) {
    const prefixCls = 'ctree-tree'
    const sameValue = (newVal: VModelType, valueCache: VModelType): boolean => {
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
    let unloadCheckedNodes = reactive([]) as TreeNode[]
    let renderNodes = ref([]) as Ref<TreeNode[]>
    const blockLength = ref(0)
    const blockAreaHeight = ref(0)
    const topSpaceHeight = ref(0)
    const bottomSpaceHeight = ref(0)
    const renderAmount = ref(0)
    const renderAmountCache = ref(0)
    const renderStart = ref(0)
    const renderStartCache = ref(0)
    const isRootLoading = ref(false)
    const valueCache = ref(
      Array.isArray(props.modelValue)
        ? props.modelValue.concat()
        : props.modelValue
    ) as Ref<VModelType>
    const debounceTimer = ref(undefined) as Ref<number | undefined>
    const scrollArea = ref()
    const iframe = ref<HTMLIFrameElement | undefined>()
    //computed
    const topSpaceStyles = computed(() => {
      return {
        height: `${topSpaceHeight.value}px`
      }
    })
    const bottomSpaceStyles = computed(() => {
      return {
        height: `${bottomSpaceHeight.value}px`
      }
    })
    const wrapperCls = computed(() => {
      return [`${prefixCls}__wrapper`]
    })
    const scrollAreaCls = computed(() => {
      return [`${prefixCls}__scroll-area`]
    })
    const blockAreaCls = computed(() => {
      return [`${prefixCls}__block-area`]
    })
    const emptyCls = computed(() => {
      return [`${prefixCls}__empty`]
    })
    const emptyTextDefaultCls = computed(() => {
      return [`${prefixCls}__empty-text_default`]
    })
    const loadingCls = computed(() => {
      return [`${prefixCls}__loading`]
    })
    const loadingWrapperCls = computed(() => {
      return [`${prefixCls}__loading-wrapper`]
    })
    const loadingIconCls = computed(() => {
      return [`${prefixCls}__loading-icon`]
    })
    const iframeCls = computed(() => {
      return [`${prefixCls}__iframe`]
    })
    const treeNodeListeners = TREE_NODE_EVENTS.reduce((prev, eventName) => {
      if (EXCLUDED_TREE_NODE_EVENTS.indexOf(eventName) < 0) {
        prev[eventName] = (...args: any[]) => {
          ctx.emit.apply(ctx, [eventName, ...args])
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
          expandOnFilter: props.expandOnFilter
        }),
        blockNodes: [] as TreeNode[]
      }
    }

    //watch
    let nonReactive = getInitialNonReactiveValues()

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
    // watch(
    //   () => ctx.attrs,
    //   () => {
    //     attachStoreEvents()
    //   }
    // )
    //methods
    //#region Public API
    /** 使用此方法重置树数据，可避免大量数据被 vue 监听 */
    function setData(data: AnyPropsArrayType): void {
      resetSpaceHeights()
      let checkableUnloadKeys: TreeNodeKeyType | TreeNodeKeyType[] | null = null
      let selectableUnloadKey: TreeNodeKeyType | null = null
      if (props.checkable) {
        if (Array.isArray(props.modelValue)) {
          checkableUnloadKeys = props.modelValue.concat()
        } else if (typeof props.modelValue === 'string') {
          checkableUnloadKeys =
            props.modelValue === ''
              ? []
              : props.modelValue.split(props.separator)
        }
      } else if (props.selectable && !Array.isArray(props.modelValue)) {
        selectableUnloadKey = props.modelValue as TreeNodeKeyType | null
      }
      nonReactive.store.setData(
        data,
        selectableUnloadKey,
        checkableUnloadKeys as TreeNodeKeyType[]
      )
      updateExpandedKeys()
    }
    function setChecked(key: TreeNodeKeyType, value: boolean): void {
      nonReactive.store.setChecked(key, value)
    }
    function setCheckedKeys(keys: TreeNodeKeyType[], value: boolean): void {
      nonReactive.store.setCheckedKeys(keys, value)
    }
    function checkAll(): void {
      nonReactive.store.checkAll()
    }
    function clearChecked(): void {
      nonReactive.store.clearChecked()
    }
    function setSelected(key: TreeNodeKeyType, value: boolean): void {
      nonReactive.store.setSelected(key, value)
    }
    function clearSelected(): void {
      nonReactive.store.clearSelected()
    }
    function setExpand(
      key: TreeNodeKeyType,
      value: boolean,
      expandParent: boolean = true
    ): void {
      nonReactive.store.setExpand(key, value, expandParent)
    }
    function setExpandKeys(keys: TreeNodeKeyType[], value: boolean): void {
      nonReactive.store.setExpandKeys(keys, value)
    }
    function setExpandAll(value: boolean): void {
      nonReactive.store.setExpandAll(value)
    }
    function getCheckedNodes(ignoreMode?: IgnoreType): TreeNode[] {
      ignoreMode = ignoreMode || props.ignoreMode
      return nonReactive.store.getCheckedNodes(ignoreMode)
    }
    function getCheckedKeys(ignoreMode?: IgnoreType): TreeNodeKeyType[] {
      ignoreMode = ignoreMode || props.ignoreMode
      return nonReactive.store.getCheckedKeys(ignoreMode)
    }
    function getIndeterminateNodes(): TreeNode[] {
      return nonReactive.store.getIndeterminateNodes()
    }
    function getSelectedNode(): TreeNode | null {
      return nonReactive.store.getSelectedNode()
    }
    function getSelectedKey(): TreeNodeKeyType | null {
      return nonReactive.store.getSelectedKey()
    }
    function getExpandNodes(): TreeNode[] {
      return nonReactive.store.getExpandNodes()
    }
    function getExpandKeys(): TreeNodeKeyType[] {
      return nonReactive.store.getExpandKeys()
    }
    function getCurrentVisibleNodes(): TreeNode[] {
      return nonReactive.store.flatData.filter(node => node._filterVisible)
    }
    function getNode(key: TreeNodeKeyType): TreeNode | null {
      return nonReactive.store.getNode(key)
    }
    /** 返回树形结构的节点数据 */
    function getTreeData(): TreeNode[] {
      return nonReactive.store.data
    }
    /** 返回扁平化后的节点数据 */
    function getFlatData(): TreeNode[] {
      return nonReactive.store.flatData
    }
    function getNodesCount(): number {
      return nonReactive.store.flatData.length
    }
    function insertBefore(
      insertedNode: TreeNodeKeyType | ITreeNodeOptions,
      referenceKey: TreeNodeKeyType
    ): TreeNode | null {
      return nonReactive.store.insertBefore(insertedNode, referenceKey)
    }
    function insertAfter(
      insertedNode: TreeNodeKeyType | ITreeNodeOptions,
      referenceKey: TreeNodeKeyType
    ): TreeNode | null {
      return nonReactive.store.insertAfter(insertedNode, referenceKey)
    }
    function append(
      insertedNode: TreeNodeKeyType | ITreeNodeOptions,
      parentKey: TreeNodeKeyType
    ): TreeNode | null {
      return nonReactive.store.append(insertedNode, parentKey)
    }
    function prepend(
      insertedNode: TreeNodeKeyType | ITreeNodeOptions,
      parentKey: TreeNodeKeyType
    ): TreeNode | null {
      return nonReactive.store.prepend(insertedNode, parentKey)
    }
    function remove(removedKey: TreeNodeKeyType): TreeNode | null {
      return nonReactive.store.remove(removedKey)
    }
    function filter(keyword: string, filterMethod?: FilterFunctionType): void {
      const defaultFilterMethod = (keyword: string, node: TreeNode) => {
        const title = node[props.titleField]
        if (title == null || !title.toString) return false
        return (
          (title.toString() as string)
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) > -1
        )
      }
      filterMethod = filterMethod || props.filterMethod || defaultFilterMethod
      nonReactive.store.filter(keyword, filterMethod)
    }
    /**
     * 展示已选节点
     */
    function showCheckedNodes(showUnloadCheckedNodes?: boolean): void {
      if (!props.checkable) return
      showUnloadCheckedNodes =
        showUnloadCheckedNodes == null
          ? props.showUnloadCheckedNodes
          : showUnloadCheckedNodes
      const checkedNodesCache = nonReactive.store.getCheckedNodes()
      nonReactive.store.filter('', (keyword, node) => node.checked)
      if (!showUnloadCheckedNodes) return
      const unloadKeys = nonReactive.store.getUnloadCheckedKeys()
      if (unloadKeys.length) {
        const unloadNodes: TreeNode[] = unloadKeys.map(key => {
          const queryList = props.unloadDataList.concat(checkedNodesCache)
          let title = key
          queryList.some(query => {
            if (
              query[props.keyField] === key &&
              query[props.titleField] != null
            ) {
              title = query[props.titleField]
              return true
            }
            return false
          })

          return new TreeNode(
            {
              [props.keyField]: key,
              [props.titleField]: title,
              checked: true,
              isLeaf: true
            },
            null,
            props.keyField,
            !!props.load
          )
        })
        unloadCheckedNodes = unloadNodes as TreeNode[]
        nonReactive.blockNodes.push(...unloadNodes)
        updateBlockData()
        updateRender()
      }
    }
    /**
     * 从远程加载根节点
     */
    function loadRootNodes(): Promise<void> {
      isRootLoading.value = true
      return new Promise((resolve, reject) => {
        if (props.load) props.load(null, resolve, reject)
      })
        .then(root => {
          if (Array.isArray(root)) {
            setData(root as AnyPropsArrayType)
          }
        })
        .catch(() => {})
        .then(() => {
          isRootLoading.value = false
        })
    }
    /**
     * 滚动到指定节点位置
     * @param key 要滚动的节点
     * @param verticalPosition 滚动的垂直位置，可选为 'top', 'center', 'bottom' 或距离容器可视顶部距离的数字，默认为 'top'
     */
    function scrollTo(
      key: TreeNodeKeyType,
      verticalPosition: VerticalPositionType | number = verticalPositionEnum.top
    ): void {
      const node = nonReactive.store.mapData[key]
      if (!node || !node.visible) return
      let index: number = -1
      for (let i = 0; i < blockLength.value; i++) {
        if (nonReactive.blockNodes[i][props.keyField] === key) {
          index = i
          break
        }
      }
      if (index === -1) return
      let scrollTop = index * props.nodeMinHeight
      if (verticalPosition === verticalPositionEnum.center) {
        const clientHeight = scrollArea.value.clientHeight
        scrollTop = scrollTop - (clientHeight - props.nodeMinHeight) / 2
      } else if (verticalPosition === verticalPositionEnum.bottom) {
        const clientHeight = scrollArea.value.clientHeight
        scrollTop = scrollTop - (clientHeight - props.nodeMinHeight)
      } else if (typeof verticalPosition === 'number') {
        scrollTop = scrollTop - verticalPosition
      }
      if (scrollArea.value) scrollArea.value.scrollTop = scrollTop
    }
    //#endregion Public API

    /** 更新展开的节点 */
    function updateExpandedKeys() {
      if (props.expandedKeys.length) {
        nonReactive.store.setExpandAll(false, false)
        nonReactive.store.setExpandKeys(props.expandedKeys, true)
      }
    }

    function updateUnloadStatus(): void {
      if (unloadCheckedNodes.length) {
        const unloadKeys = nonReactive.store.getUnloadCheckedKeys()
        unloadCheckedNodes.forEach(node => {
          node.checked = unloadKeys.indexOf(node[props.keyField]) > -1
        })
      }
    }

    //#region Handle node events
    function handleNodeCheck(node: TreeNode): void {
      if (!props.cascade && props.enableLeafOnly && !node.isLeaf) return
      nonReactive.store.setChecked(
        node[props.keyField],
        node.indeterminate ? true : !node.checked,
        true,
        true,
        true
      )
    }
    function handleNodeSelect(node: TreeNode): void {
      if (props.enableLeafOnly && !node.isLeaf) return
      nonReactive.store.setSelected(node[props.keyField], !node.selected)
    }
    function handleNodeExpand(node: TreeNode): void {
      nonReactive.store.setExpand(node[props.keyField], !node.expand)
    }
    function handleNodeDrop(
      data: TreeNode,
      e: DragEvent,
      hoverPart: dragHoverPartEnum
    ): void {
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
            ctx.emit('node-drop', data, e, hoverPart, getNode(targetKey))
          }
        } catch (err: any) {
          throw new Error(err)
        }
      }
    }
    //#endregion Handle node events

    /**
     * 触发多选 update:modelValue 事件
     */
    function emitCheckableInput(
      checkedNodes: TreeNode[],
      checkedKeys: TreeNodeKeyType[]
    ): void {
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
        ctx.emit('update:modelValue', emitValue)
      }
    }

    /**
     * 触发单选 update:modelValue 事件
     */
    function emitSelectableInput(
      selectedNode: TreeNode | null,
      selectedKey: TreeNodeKeyType | null
    ): void {
      if (props.selectable && !props.checkable) {
        // 单选
        const emitValue: TreeNodeKeyType = selectedKey ? selectedKey : ''
        valueCache.value = emitValue
        ctx.emit('update:modelValue', emitValue)
      }
    }

    /**
     * 转发 store 所触发的事件，通过 vue 组件触发事件可被其他组件监听
     */
    function attachStoreEvents(): void {
      storeEvents.forEach(eventName => {
        nonReactive.store.on(eventName, (...args: any[]) => {
          ctx.emit.apply(ctx, [eventName, ...args])
        })
      })
    }

    //#region Calculate nodes
    /**
     * 重置空白与滚动高度
     */
    function resetSpaceHeights(): void {
      topSpaceHeight.value = 0
      bottomSpaceHeight.value = 0
      if (scrollArea.value) scrollArea.value.scrollTop = 0
    }
    /**
     * 计算可见节点
     */
    function updateBlockNodes(): void {
      nonReactive.blockNodes = nonReactive.store.flatData.filter(
        node => node.visible
      )
      updateBlockData()
      updateRender()
    }
    /**
     * 更新 block 数据相关信息
     */
    function updateBlockData(): void {
      blockLength.value = nonReactive.blockNodes.length
      blockAreaHeight.value = props.nodeMinHeight * blockLength.value
    }
    /**
     * 计算渲染节点数量，并计算渲染节点
     */
    function updateRender(): void {
      updateRenderAmount()
      updateRenderNodes()
    }
    /**
     * 计算需要渲染的节点的数量，只要容器高度（clientHeight）不变，这个数量一般就不会变
     */
    function updateRenderAmount(): void {
      const clientHeight = scrollArea.value.clientHeight
      renderAmount.value = Math.max(
        props.renderNodeAmount,
        Math.ceil(clientHeight / props.nodeMinHeight) + props.bufferNodeAmount
      )
    }
    /**
     * 计算渲染的节点，基于 scrollTop 计算当前应该渲染哪些节点
     */
    function updateRenderNodes(isScroll: boolean = false): void {
      if (blockLength.value > renderAmount.value) {
        const scrollTop = scrollArea.value.scrollTop
        /** 当前滚动了多少节点 */
        const scrollNodeAmount = Math.floor(scrollTop / props.nodeMinHeight)
        renderStart.value =
          Math.floor(scrollNodeAmount / props.bufferNodeAmount) *
          props.bufferNodeAmount
      } else {
        renderStart.value = 0
      }
      if (
        isScroll &&
        renderAmountCache.value === renderAmount.value &&
        renderStartCache.value === renderStart.value
      )
        return
      renderNodes.value = nonReactive.blockNodes
        .slice(renderStart.value, renderStart.value + renderAmount.value)
        .map(blockNode => {
          return Object.assign({}, blockNode, {
            _parent: null,
            children: []
          })
        }) as TreeNode[]
      topSpaceHeight.value = renderStart.value * props.nodeMinHeight
      bottomSpaceHeight.value =
        blockAreaHeight.value -
        (topSpaceHeight.value + renderNodes.value.length * props.nodeMinHeight)
    }
    //#endregion Calculate nodes

    function handleTreeScroll(): void {
      if (debounceTimer.value) {
        window.cancelAnimationFrame(debounceTimer.value)
      }
      renderAmountCache.value = renderAmount.value
      renderStartCache.value = renderStart.value
      debounceTimer.value = window.requestAnimationFrame(
        updateRenderNodes.bind(null, true)
      )
      // props.updateRenderNodes(true)
    }
    const methods = {
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
      scrollTo,
      updateExpandedKeys,
      updateUnloadStatus,
      handleTreeScroll,
      handleNodeCheck,
      handleNodeSelect,
      handleNodeExpand,
      handleNodeDrop,
      emitCheckableInput,
      emitSelectableInput,
      // attachStoreEvents,
      resetSpaceHeights,
      updateBlockNodes,
      updateBlockData,
      updateRender,
      updateRenderAmount,
      updateRenderNodes,
      getNode
    }
    // ctx.expose({
    //   methods,
    //   titleField:props.titleField,
    //   nonReactive,
    //   setData,
    //   setChecked,
    //   setCheckedKeys,
    //   checkAll,
    //   clearChecked,
    //   setSelected,
    //   clearSelected,
    //   setExpand,
    //   setExpandKeys,
    //   setExpandAll,
    //   getCheckedNodes,
    //   getCheckedKeys,
    //   getIndeterminateNodes,
    //   getSelectedNode,
    //   getSelectedKey,
    //   getExpandNodes,
    //   getExpandKeys,
    //   getCurrentVisibleNodes,
    //   getTreeData,
    //   getFlatData,
    //   getNodesCount,
    //   insertBefore,
    //   insertAfter,
    //   append,
    //   prepend,
    //   remove,
    //   filter,
    //   showCheckedNodes,
    //   loadRootNodes,
    //   scrollTo,
    //   updateExpandedKeys,
    //   updateUnloadStatus,
    //   handleTreeScroll,
    //   handleNodeCheck,
    //   handleNodeSelect,
    //   handleNodeExpand,
    //   handleNodeDrop,
    //   emitCheckableInput,
    //   emitSelectableInput,
    //   attachStoreEvents,
    //   resetSpaceHeights,
    //   updateBlockNodes,
    //   updateBlockData,
    //   updateRender,
    //   updateRenderAmount,
    //   updateRenderNodes,
    //   getNode
    // })
    onMounted(() => {
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
      const $iframe = iframe.value
      if ($iframe?.contentWindow) {
        $iframe.contentWindow.addEventListener('resize', updateRender)
      }
    })

    onBeforeUnmount(() => {
      const $iframe = iframe.value
      if ($iframe?.contentWindow) {
        $iframe.contentWindow.removeEventListener('resize', updateRender)
      }
      // 卸载组件之前重置 nonReactive 中的数据，缓解 Vue 切换组件可能导致的内存无法释放问题
      nonReactive.store.disposeListeners()
      const newNonReactive = getInitialNonReactiveValues()
      nonReactive.store = newNonReactive.store
      nonReactive.blockNodes = newNonReactive.blockNodes
    })

    attachStoreEvents()
    return {
      nonReactive,
      /** 未加载选中的节点，展示已选时生成，其他情况下没用 */
      unloadCheckedNodes,

      /** 可见节点个数 */
      blockLength,

      /** 可见节点总高度 */
      blockAreaHeight,

      /** 顶部填充高度 */
      topSpaceHeight,

      /** 底部填充高度 */
      bottomSpaceHeight,

      /** 实际渲染节点个数 */
      renderAmount,

      /** renderAmount 缓存 */
      renderAmountCache,

      /** 渲染节点（实际渲染节点） */
      renderNodes,

      /** 渲染开始下标 */
      renderStart,

      /** renderStart 缓存 */
      renderStartCache,

      /** 是否正在载入根节点，组件内部调用 load 时会改变此值 */
      isRootLoading,

      /** 缓存的 value ，用于 value 变化时与之做比对 */
      valueCache,

      /** 防抖计时器 id */
      debounceTimer,
      topSpaceStyles,
      bottomSpaceStyles,
      wrapperCls,
      scrollAreaCls,
      blockAreaCls,
      emptyCls,
      emptyTextDefaultCls,
      loadingCls,
      loadingWrapperCls,
      loadingIconCls,
      iframeCls,
      treeNodeListeners,
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
      scrollTo,
      updateExpandedKeys,
      updateUnloadStatus,
      handleTreeScroll,
      handleNodeCheck,
      handleNodeSelect,
      handleNodeExpand,
      handleNodeDrop,
      emitCheckableInput,
      emitSelectableInput,
      attachStoreEvents,
      resetSpaceHeights,
      updateBlockNodes,
      updateBlockData,
      updateRender,
      updateRenderAmount,
      updateRenderNodes,
      getNode,
      scrollArea,
      iframe,
      methods
    }
  }
})
</script>
