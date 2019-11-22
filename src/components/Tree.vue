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
          v-for="(node, index) in renderNodes"
          :key="node[keyField]"
          :data="node"
          v-bind="$props"
          v-on="treeNodeListeners"
          :class="typeof nodeClassName === 'function' ? nodeClassName(node) : nodeClassName"
          :style="{
            minHeight: `${nodeMinHeight}px`,
            marginLeft: usePadding ? null : `${node._level * nodeIndent}px`,
            paddingLeft: usePadding ? `${node._level * nodeIndent}px` : null,
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
    <div
      v-show="!blockLength"
      :class="emptyCls"
    >
      <span :class="emptyTextDefaultCls">
        <slot name="empty">
          {{ emptyText }}
        </slot>
      </span>
    </div>
    <!-- 加载中 -->
    <div
      v-show="loading || isRootLoading"
      :class="loadingCls"
    >
      <div :class="loadingWrapperCls">
        <slot name="loading">
          <LoadingIcon :class="loadingIconCls"/>
        </slot>
      </div>
    </div>
    <!-- 监听容器 resize 用的 iframe -->
    <iframe
      ref="iframe"
      :class="iframeCls"
    ></iframe>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor, CreateElement, VNode } from 'vue'
import TreeStore, { TreeNode } from '../store'
import CTreeNode from './TreeNode.vue'
import LoadingIcon from './LoadingIcon.vue'
import { IEventNames, ListenerType, FilterFunctionType } from '../store/tree-store'
import { ITreeNodeOptions } from '../store/tree-node'
import {
  TreeNodeKeyType,
  ignoreEnum,
  IgnoreType,
  verticalPositionEnum,
  VerticalPositionType,
  dragHoverPartEnum,
} from '../const'

const prefixCls = 'ctree-tree'

const storeEvents: Array<keyof IEventNames> = [
  'expand',
  'select',
  'unselect',
  'selected-change',
  'check',
  'uncheck',
  'checked-change',
  'set-data',
]

const excludedEvents = [
  'node-drop',
]

type AnyPropsArrayType = Array<{ [key: string]: any }>
type VModelType = TreeNodeKeyType | TreeNodeKeyType[]

const sameValue = (newVal: VModelType, valueCache: VModelType): boolean => {
  if (Array.isArray(newVal) && Array.isArray(valueCache)) {
    if (newVal.length === valueCache.length && newVal.every((val) => (valueCache as TreeNodeKeyType[]).some((cache) => cache === val))) return true
  } else if (newVal === valueCache) return true
  return false
}

export default (Vue as VueConstructor<Vue & {
  $refs: {
    scrollArea: HTMLDivElement,
    iframe: HTMLIFrameElement,
  },
  /** 非响应数据，不会被 Vue 监听 */
  nonReactive: {
    /** Tree Store */
    store: TreeStore,

    /** block 节点（所有可见节点） */
    blockNodes: TreeNode[],
  },
}>).extend({
  name: 'CTree',
  components: {
    CTreeNode,
    LoadingIcon,
  },
  props: {
    /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
    value: [
      String,
      Number,
      Array as () => TreeNodeKeyType[],
    ],

    /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
    data: {
      type: Array as () => AnyPropsArrayType,
      default: () => [],
    },

    /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
    unloadDataList: {
      type: Array as () => AnyPropsArrayType,
      default: () => [],
    },

    /** 过滤已选时是否在列表后面展示未加载的已选节点 */
    showUnloadCheckedNodes: {
      type: Boolean,
      default: true,
    },

    /** 数据为空时显示的文本 */
    emptyText: {
      type: String,
      default: '暂无数据',
    },

    /** 节点标题字段 */
    titleField: {
      type: String,
      default: 'title',
    },

    /** 节点唯一标识字段 */
    keyField: {
      type: String,
      default: 'id',
    },

    /** 多选模式下 value 分隔符 */
    separator: {
      type: String,
      default: ',',
    },

    /** 是否可多选 */
    checkable: {
      type: Boolean,
      default: false,
    },

    /** 是否可单选 */
    selectable: {
      type: Boolean,
      default: false,
    },

    /** 是否可勾选被过滤节点 */
    filteredNodeCheckable: {
      type: Boolean,
      default: false,
    },

    /** 父子节点是否关联 */
    cascade: {
      type: Boolean,
      default: true,
    },

    /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
    enableLeafOnly: {
      type: Boolean,
      default: false,
    },

    /** 是否禁用所有节点 */
    disableAll: {
      type: Boolean,
      default: false,
    },

    /** 是否默认展开所有节点 */
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },

    /**
     * 默认展开的节点 key
     * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
     */
    defaultExpandedKeys: {
      type: Array as () => TreeNodeKeyType[],
      default: () => [],
    },

    /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
    expandedKeys: {
      type: Array as () => TreeNodeKeyType[],
      default: () => [],
    },

    /** 是否可拖拽 */
    draggable: {
      type: Boolean,
      default: false,
    },

    /** 是否可放置 */
    droppable: {
      type: Boolean,
      default: false,
    },

    /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
    beforeDropMethod: {
      type: Function as any as () => (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean,
      default: () => () => true,
    },

    /** 忽略模式 */
    ignoreMode: {
      type: String as () => IgnoreType,
      default: ignoreEnum.none,
    },

    /** 异步加载初始化时是否自动加载根节点 */
    autoLoad: {
      type: Boolean,
      default: true,
    },

    /** 异步加载方法 */
    load: Function as any as () => (node: null | TreeNode, resolve: Function, reject: Function) => any,

    /** 节点渲染 render 函数 */
    render: Function as any as () => (h: CreateElement, node: TreeNode) => VNode,

    /** 节点过滤方法 */
    filterMethod: Function as any as () => FilterFunctionType,

    /**
     * 过滤时是否展开所有可见节点
     * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
     * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
     */
    expandOnFilter: {
      type: Boolean,
      default: true,
    },

    /** 点击已选中节点是否取消选中 */
    unselectOnClick: {
      type: Boolean,
      default: true,
    },

    /** 是否显示 loading 图标 */
    loading: {
      type: Boolean,
      default: false,
    },

    //#region Render nodes related props
    /** 根据节点最小高度计算数据总高度 */
    nodeMinHeight: {
      type: Number,
      default: 30,
    },

    /** 子节点缩进 */
    nodeIndent: {
      type: Number,
      default: 20,
    },

    /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
    renderNodeAmount: {
      type: Number,
      default: 100,
    },

    /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
    bufferNodeAmount: {
      type: Number,
      default: 20,
    },
    //#endregion Render nodes related props

    /** 节点根元素的 class ，传入函数以对每个节点定制 class */
    nodeClassName: {
      type: [
        String,
        Object,
        Array as () => Array<string | object>,
        Function as any as () => (node: TreeNode) => string | object | Array<string | object>,
      ],
    },

    /**
     * 使用 padding 代替 margin 来展示子节点缩进
     * 此 Prop 是为了方便样式定制，在下个大版本将全部使用 padding
     * @deprecated
     */
    usePadding: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const valueCache = Array.isArray(this.value) ? this.value.concat() : this.value
    return {
      /** 未加载选中的节点，展示已选时生成，其他情况下没用 */
      unloadCheckedNodes: ([] as TreeNode[]),

      /** 可见节点个数 */
      blockLength: 0,

      /** 可见节点总高度 */
      blockAreaHeight: 0,

      /** 顶部填充高度 */
      topSpaceHeight: 0,

      /** 底部填充高度 */
      bottomSpaceHeight: 0,

      /** 实际渲染节点个数 */
      renderAmount: 0,

      /** renderAmount 缓存 */
      renderAmountCache: 0,

      /** 渲染节点（实际渲染节点） */
      renderNodes: ([] as TreeNode[]),

      /** 渲染开始下标 */
      renderStart: 0,

      /** renderStart 缓存 */
      renderStartCache: 0,

      /** 是否正在载入根节点，组件内部调用 load 时会改变此值 */
      isRootLoading: false,

      /** 缓存的 value ，用于 value 变化时与之做比对 */
      valueCache: (valueCache as VModelType),

      /** 防抖计时器 id */
      debounceTimer: (undefined as number | undefined),
    }
  },
  computed: {
    //#region Styles
    topSpaceStyles (): object {
      return {
        height: `${this.topSpaceHeight}px`,
      }
    },
    bottomSpaceStyles (): object {
      return {
        height: `${this.bottomSpaceHeight}px`,
      }
    },
    //#endregion Styles

    //#region Classes
    wrapperCls (): string[] {
      return [
        `${prefixCls}__wrapper`,
      ]
    },
    scrollAreaCls (): string[] {
      return [
        `${prefixCls}__scroll-area`,
      ]
    },
    blockAreaCls (): string[] {
      return [
        `${prefixCls}__block-area`,
      ]
    },
    emptyCls (): string[] {
      return [
        `${prefixCls}__empty`,
      ]
    },
    emptyTextDefaultCls (): string[] {
      return [
        `${prefixCls}__empty-text_default`,
      ]
    },
    loadingCls (): string[] {
      return [
        `${prefixCls}__loading`,
      ]
    },
    loadingWrapperCls (): string[] {
      return [
        `${prefixCls}__loading-wrapper`,
      ]
    },
    loadingIconCls (): string[] {
      return [
        `${prefixCls}__loading-icon`,
      ]
    },
    iframeCls (): string[] {
      return [
        `${prefixCls}__iframe`,
      ]
    },
    //#endregion Classes

    /**
     * 不属于 store 触发事件的 listeners 都挂到树节点组件上
     * 排除 node-drop
     */
    treeNodeListeners (): object {
      let result: { [key: string]: any } = {}
      for (let event in this.$listeners) {
        if (storeEvents.indexOf(event as keyof IEventNames) === -1 && excludedEvents.indexOf(event) === -1) {
          result[event] = this.$listeners[event]
        }
      }
      return result
    },
  },
  methods: {
    //#region Public API
    /** 使用此方法重置树数据，可避免大量数据被 vue 监听 */
    setData (data: AnyPropsArrayType): void {
      this.resetSpaceHeights()
      let checkableUnloadKeys: TreeNodeKeyType | TreeNodeKeyType[] | null = null
      let selectableUnloadKey: TreeNodeKeyType | null = null
      if (this.checkable) {
        if (Array.isArray(this.value)) {
          checkableUnloadKeys = this.value.concat()
        } else if (typeof this.value === 'string') {
          checkableUnloadKeys = this.value === '' ? [] : this.value.split(this.separator)
        }
      } else if (this.selectable && !Array.isArray(this.value)) {
        selectableUnloadKey = this.value
      }
      this.nonReactive.store.setData(data, selectableUnloadKey, checkableUnloadKeys as TreeNodeKeyType[])
      this.updateExpandedKeys()
    },
    setChecked (key: TreeNodeKeyType, value: boolean): void {
      this.nonReactive.store.setChecked(key, value)
    },
    setCheckedKeys (keys: TreeNodeKeyType[], value: boolean): void {
      this.nonReactive.store.setCheckedKeys(keys, value)
    },
    checkAll (): void {
      this.nonReactive.store.checkAll()
    },
    clearChecked (): void {
      this.nonReactive.store.clearChecked()
    },
    setSelected (key: TreeNodeKeyType, value: boolean): void {
      this.nonReactive.store.setSelected(key, value)
    },
    clearSelected (): void {
      this.nonReactive.store.clearSelected()
    },
    setExpand (key: TreeNodeKeyType, value: boolean, expandParent: boolean = true): void {
      this.nonReactive.store.setExpand(key, value, expandParent)
    },
    setExpandKeys (keys: TreeNodeKeyType[], value: boolean): void {
      this.nonReactive.store.setExpandKeys(keys, value)
    },
    setExpandAll (value: boolean): void {
      this.nonReactive.store.setExpandAll(value)
    },
    getCheckedNodes (ignoreMode?: IgnoreType): TreeNode[] {
      ignoreMode = ignoreMode || this.ignoreMode
      return this.nonReactive.store.getCheckedNodes(ignoreMode)
    },
    getCheckedKeys (ignoreMode?: IgnoreType): TreeNodeKeyType[] {
      ignoreMode = ignoreMode || this.ignoreMode
      return this.nonReactive.store.getCheckedKeys(ignoreMode)
    },
    getIndeterminateNodes (): TreeNode[] {
      return this.nonReactive.store.getIndeterminateNodes()
    },
    getSelectedNode (): TreeNode | null {
      return this.nonReactive.store.getSelectedNode()
    },
    getSelectedKey (): TreeNodeKeyType | null {
      return this.nonReactive.store.getSelectedKey()
    },
    getExpandNodes (): TreeNode[] {
      return this.nonReactive.store.getExpandNodes()
    },
    getExpandKeys (): TreeNodeKeyType[] {
      return this.nonReactive.store.getExpandKeys()
    },
    getCurrentVisibleNodes (): TreeNode[] {
      return this.nonReactive.store.flatData.filter((node) => node._filterVisible)
    },
    getNode (key: TreeNodeKeyType): TreeNode | null {
      return this.nonReactive.store.getNode(key)
    },
    /** 返回树形结构的节点数据 */
    getTreeData (): TreeNode[] {
      return this.nonReactive.store.data
    },
    /** 返回扁平化后的节点数据 */
    getFlatData (): TreeNode[] {
      return this.nonReactive.store.flatData
    },
    getNodesCount (): number {
      return this.nonReactive.store.flatData.length
    },
    insertBefore (insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null {
      return this.nonReactive.store.insertBefore(insertedNode, referenceKey)
    },
    insertAfter (insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null {
      return this.nonReactive.store.insertAfter(insertedNode, referenceKey)
    },
    append (insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null {
      return this.nonReactive.store.append(insertedNode, parentKey)
    },
    prepend (insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null {
      return this.nonReactive.store.prepend(insertedNode, parentKey)
    },
    remove (removedKey: TreeNodeKeyType): TreeNode | null {
      return this.nonReactive.store.remove(removedKey)
    },
    filter (
      keyword: string,
      filterMethod?: FilterFunctionType,
    ): void {
      const defaultFilterMethod = (keyword: string, node: TreeNode) => {
        const title = node[this.titleField]
        if (title == null || !title.toString) return false
        return (title.toString() as string).toLowerCase().indexOf(keyword.toLowerCase()) > -1
      }
      filterMethod = filterMethod || this.filterMethod || defaultFilterMethod
      this.nonReactive.store.filter(keyword, filterMethod)
    },
    /**
     * 展示已选节点
     */
    showCheckedNodes (showUnloadCheckedNodes?: boolean): void {
      if (!this.checkable) return
      showUnloadCheckedNodes = showUnloadCheckedNodes == null ? this.showUnloadCheckedNodes : showUnloadCheckedNodes
      const checkedNodesCache = this.nonReactive.store.getCheckedNodes()
      this.nonReactive.store.filter('', (keyword, node) => node.checked)
      if (!showUnloadCheckedNodes) return
      const unloadKeys = this.nonReactive.store.getUnloadCheckedKeys()
      if (unloadKeys.length) {
        const unloadNodes: TreeNode[] = unloadKeys.map((key) => {
          const queryList = this.unloadDataList.concat(checkedNodesCache)
          let title = key
          queryList.some((query) => {
            if (query[this.keyField] === key && query[this.titleField] != null) {
              title = query[this.titleField]
              return true
            }
            return false
          })

          return new TreeNode({
            [this.keyField]: key,
            [this.titleField]: title,
            checked: true,
            isLeaf: true,
          }, null, this.keyField, !!this.load)
        })
        this.unloadCheckedNodes = unloadNodes
        this.nonReactive.blockNodes.push(...unloadNodes)
        this.updateBlockData()
        this.updateRender()
      }
    },
    /**
     * 从远程加载根节点
     */
    loadRootNodes (): Promise<void> {
      this.isRootLoading = true
      return new Promise((resolve, reject) => {
        this.load(null, resolve, reject)
      }).then((root) => {
        if (Array.isArray(root)) {
          this.setData(root as AnyPropsArrayType)
        }
      }).catch(() => {}).then(() => {
        this.isRootLoading = false
      })
    },
    /**
     * 滚动到指定节点位置
     * @param key 要滚动的节点
     * @param verticalPosition 滚动的垂直位置，可选为 'top', 'center', 'bottom' 或距离容器可视顶部距离的数字，默认为 'top'
     */
    scrollTo (key: TreeNodeKeyType, verticalPosition: VerticalPositionType | number = verticalPositionEnum.top): void {
      const node = this.nonReactive.store.mapData[key]
      if (!node || !node.visible) return
      let index: number = -1
      for (let i = 0; i < this.blockLength; i++) {
        if (this.nonReactive.blockNodes[i][this.keyField] === key) {
          index = i
          break
        }
      }
      if (index === -1) return
      let scrollTop = index * this.nodeMinHeight
      if (verticalPosition === verticalPositionEnum.center) {
        const clientHeight = this.$refs.scrollArea.clientHeight
        scrollTop = scrollTop - (clientHeight - this.nodeMinHeight) / 2
      } else if (verticalPosition === verticalPositionEnum.bottom) {
        const clientHeight = this.$refs.scrollArea.clientHeight
        scrollTop = scrollTop - (clientHeight - this.nodeMinHeight)
      } else if (typeof verticalPosition === 'number') {
        scrollTop = scrollTop - verticalPosition
      }
      this.$refs.scrollArea.scrollTop = scrollTop
    },
    //#endregion Public API

    /** 更新展开的节点 */
    updateExpandedKeys () {
      if (this.expandedKeys.length) {
        this.nonReactive.store.setExpandAll(false, false)
        this.nonReactive.store.setExpandKeys(this.expandedKeys, true)
      }
    },

    updateUnloadStatus (): void {
      if (this.unloadCheckedNodes.length) {
        const unloadKeys = this.nonReactive.store.getUnloadCheckedKeys()
        this.unloadCheckedNodes.forEach((node) => {
          node.checked = unloadKeys.indexOf(node[this.keyField]) > -1
        })
      }
    },

    //#region Handle node events
    handleNodeCheck (node: TreeNode): void {
      if (!this.cascade && this.enableLeafOnly && !node.isLeaf) return
      this.nonReactive.store.setChecked(node[this.keyField], node.indeterminate ? false : !node.checked, true, true, true)
    },
    handleNodeSelect (node: TreeNode): void {
      if (this.enableLeafOnly && !node.isLeaf) return
      this.nonReactive.store.setSelected(node[this.keyField], !node.selected)
    },
    handleNodeExpand (node: TreeNode): void {
      this.nonReactive.store.setExpand(node[this.keyField], !node.expand)
    },
    handleNodeDrop (data: TreeNode, e: DragEvent, hoverPart: dragHoverPartEnum): void {
      if (!this.droppable) return
      if (e.dataTransfer) {
        try {
          const targetNodeData = JSON.parse(e.dataTransfer.getData('node'))
          const targetKey = targetNodeData[this.keyField]
          const referenceKey = data[this.keyField]
          const shouldDrop: boolean = this.beforeDropMethod(targetKey, referenceKey, hoverPart)
          if (shouldDrop) {
            if (targetKey === referenceKey) return
            if (hoverPart === dragHoverPartEnum.before) this.nonReactive.store.insertBefore(targetKey, referenceKey)
            // 如果是拖拽到父节点，并且父节点是展开的，则不管 hoverPart 是不是 after 都拖入为子节点
            else if (hoverPart === dragHoverPartEnum.body || (!data.isLeaf && data.expand)) this.nonReactive.store.prepend(targetKey, referenceKey)
            else if (hoverPart === dragHoverPartEnum.after) this.nonReactive.store.insertAfter(targetKey, referenceKey)
            this.$emit('node-drop', data, e, hoverPart, this.getNode(targetKey))
          }
        } catch (err) {
          throw new Error(err)
        }
      }
    },
    //#endregion Handle node events

    /**
     * 触发多选 input 事件
     */
    emitCheckableInput (checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]): void {
      if (this.checkable) {
        // 多选
        let emitValue: TreeNodeKeyType[] | string = checkedKeys
        if (!Array.isArray(this.value)) {
          emitValue = emitValue.join(this.separator)
        }
        if (Array.isArray(emitValue)) {
          this.valueCache = emitValue.concat()
        } else {
          this.valueCache = emitValue
        }
        this.$emit('input', emitValue)
      }
    },

    /**
     * 触发单选 input 事件
     */
    emitSelectableInput (selectedNode: TreeNode | null, selectedKey: TreeNodeKeyType | null): void {
      if (this.selectable && !this.checkable) {
        // 单选
        const emitValue: TreeNodeKeyType = selectedKey ? selectedKey : ''
        this.valueCache = emitValue
        this.$emit('input', emitValue)
      }
    },

    /**
     * 转发 store 所触发的事件，通过 vue 组件触发事件可被其他组件监听
     */
    attachStoreEvents (): void {
      for (let event in this.$listeners) {
        if (storeEvents.indexOf(event as keyof IEventNames) > -1) {
          const e: keyof IEventNames = event as keyof IEventNames
          this.nonReactive.store.on(e, this.$listeners[event] as ListenerType<typeof e> | Array<ListenerType<typeof e>>)
        }
      }
    },

    //#region Calculate nodes
    /**
     * 重置空白与滚动高度
     */
    resetSpaceHeights (): void {
      this.topSpaceHeight = 0
      this.bottomSpaceHeight = 0
      this.$refs.scrollArea.scrollTop = 0
    },
    /**
     * 计算可见节点
     */
    updateBlockNodes (): void {
      this.nonReactive.blockNodes = this.nonReactive.store.flatData.filter((node) => node.visible)
      this.updateBlockData()
      this.updateRender()
    },
    /**
     * 更新 block 数据相关信息
     */
    updateBlockData (): void {
      this.blockLength = this.nonReactive.blockNodes.length
      this.blockAreaHeight = this.nodeMinHeight * this.blockLength
    },
    /**
     * 计算渲染节点数量，并计算渲染节点
     */
    updateRender (): void {
      this.updateRenderAmount()
      this.updateRenderNodes()
    },
    /**
     * 计算需要渲染的节点的数量，只要容器高度（clientHeight）不变，这个数量一般就不会变
     */
    updateRenderAmount (): void {
      const clientHeight = this.$refs.scrollArea.clientHeight
      this.renderAmount = Math.max(this.renderNodeAmount, Math.ceil(clientHeight / this.nodeMinHeight) + this.bufferNodeAmount)
    },
    /**
     * 计算渲染的节点，基于 scrollTop 计算当前应该渲染哪些节点
     */
    updateRenderNodes (isScroll: boolean = false): void {
      if (this.blockLength > this.renderAmount) {
        const scrollTop = this.$refs.scrollArea.scrollTop
        /** 当前滚动了多少节点 */
        const scrollNodeAmount = Math.floor(scrollTop / this.nodeMinHeight)
        this.renderStart = Math.floor(scrollNodeAmount / this.bufferNodeAmount) * this.bufferNodeAmount
      } else {
        this.renderStart = 0
      }
      if (isScroll && this.renderAmountCache === this.renderAmount && this.renderStartCache === this.renderStart) return
      this.renderNodes = this.nonReactive.blockNodes.slice(this.renderStart, this.renderStart + this.renderAmount).map((blockNode) => {
        return Object.assign({}, blockNode, {
          _parent: null,
          children: [],
        })
      })
      this.topSpaceHeight = this.renderStart * this.nodeMinHeight
      this.bottomSpaceHeight = this.blockAreaHeight - (this.topSpaceHeight + this.renderNodes.length * this.nodeMinHeight)
    },
    //#endregion Calculate nodes

    handleTreeScroll (): void {
      if (this.debounceTimer) {
        window.cancelAnimationFrame(this.debounceTimer)
      }
      this.renderAmountCache = this.renderAmount
      this.renderStartCache = this.renderStart
      this.debounceTimer = window.requestAnimationFrame(this.updateRenderNodes.bind(this, true))
      // this.updateRenderNodes(true)
    },
  },
  created () {
    // Initial non-reactive
    const { keyField, ignoreMode, filteredNodeCheckable, cascade, defaultExpandAll, load, expandOnFilter } = this
    this.nonReactive = {
      store: new TreeStore({
        keyField,
        ignoreMode,
        filteredNodeCheckable,
        cascade,
        defaultExpandAll,
        load,
        expandOnFilter,
      }),
      blockNodes: [],
    }

    this.nonReactive.store.on('visible-data-change', this.updateBlockNodes)
    this.nonReactive.store.on('render-data-change', this.updateRender)
    this.nonReactive.store.on('checked-change', (checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]) => {
      this.emitCheckableInput(checkedNodes, checkedKeys)
      this.updateUnloadStatus()
    })
    this.nonReactive.store.on('selected-change', this.emitSelectableInput)
    this.attachStoreEvents()
  },
  mounted () {
    if (this.data.length) {
      this.setData(this.data)
      if (this.defaultExpandedKeys.length) {
        this.nonReactive.store.setExpandKeys(this.defaultExpandedKeys, true)
      }
    } else if (typeof this.load === 'function' && this.autoLoad) {
      // Load root data from remote
      this.loadRootNodes()
    }

    const $iframe: HTMLIFrameElement = this.$refs.iframe
    if ($iframe.contentWindow) {
      $iframe.contentWindow.addEventListener('resize', this.updateRender)
    }
  },
  beforeDestroy () {
    const $iframe: HTMLIFrameElement = this.$refs.iframe
    if ($iframe.contentWindow) {
      $iframe.contentWindow.removeEventListener('resize', this.updateRender)
    }
  },
  watch: {
    value (newVal: VModelType) {
      if (this.checkable) {
        // 检查是否由 input 事件触发
        if (sameValue(newVal, this.valueCache)) return

        // 多选
        let checkedKeys: TreeNodeKeyType[] = []
        if (Array.isArray(newVal)) {
          checkedKeys = newVal.concat()
        } else if (typeof newVal === 'string') {
          checkedKeys = newVal === '' ? [] : (newVal as string).split(this.separator)
        }
        this.nonReactive.store.clearChecked(false, false)
        this.nonReactive.store.setCheckedKeys(checkedKeys, true)
      } else if (this.selectable) {
        // 检查是否由 input 事件触发
        if (newVal === this.valueCache) return

        // 单选
        const currentSelected = this.nonReactive.store.getSelectedKey()
        if (newVal !== '' && newVal != null) {
          this.nonReactive.store.setSelected(newVal as TreeNodeKeyType, true)
        } else if ((newVal === '' || newVal == null) && currentSelected) {
          this.nonReactive.store.setSelected(currentSelected, false)
        }
      }
    },
    data: {
      deep: true,
      handler (newData: AnyPropsArrayType) {
        this.setData(newData)
      },
    },
    expandedKeys () {
      this.updateExpandedKeys()
    },
    $listeners () {
      this.attachStoreEvents()
    },
  },
})
</script>
