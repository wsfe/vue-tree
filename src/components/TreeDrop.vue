<template>
  <div :class="wrapperCls">
    <!-- 展示框 -->
    <div
      ref="reference"
      :class="referenceCls"
      @click="handleRefClick"
    >
      <slot v-bind="slotProps">
        <div :class="displayInputCls">
          <span :class="displayInputTextCls">
            <slot
              name="display"
               v-bind="slotProps"
            >
              {{ displayValue }}
            </slot>
          </span>
          <template v-if="!dropDisabled">
            <i :class="dropIconCls"></i>
            <slot
              v-if="clearable && showClearIcon"
              name="clear"
            >
              <i
                :class="clearIconCls"
                @click.stop="handleClear"
              ></i>
            </slot>
          </template>
        </div>
      </slot>
    </div>

    <!-- 下拉框 -->
    <transition name="ctree-dropdown">
      <div
        ref="dropdown"
        v-show="dropdownVisible"
        :class="dropdownCls"
        :style="{
          height: `${dropHeight}px`,
        }"
      >
        <CTreeSearch
          ref="treeSearch"
          :value="value"
          v-bind="$attrs"
          v-on="$listeners"
          @set-data="handleSetData"
          @checked-change="handleCheckedChange"
          @selected-change="handleSelectedChange"
        >
          <template
            v-for="(_, slot) in $scopedSlots"
            v-slot:[slot]="scope"
          >
            <slot
              :name="slot"
              v-bind="scope"
            ></slot>
          </template>
        </CTreeSearch>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import CTreeSearch from './TreeSearch.vue'
import { TreeNode } from '../store'
import {
  placementEnum,
  PlacementType,

  API_METHODS,
  ApiType,
  TREE_SEARCH_API_METHODS,
  TreeSearchApiType,
  TreeNodeKeyType,
} from '../const'

const prefixCls = 'ctree-tree-drop'

const treeSearchPrefixCls = 'ctree-tree-search'

type CombinedApiType = ApiType | TreeSearchApiType
type CTreeSearchInstanceType = InstanceType<typeof CTreeSearch>
type CTreeSearchApiMethodsType = { [key in CombinedApiType]: CTreeSearchInstanceType[key] }

// 注释同 TreeSearch
let ctreeSearchMethods: CTreeSearchApiMethodsType = ({} as CTreeSearchApiMethodsType)
let COMBINED_API_METHODS = API_METHODS.concat(TREE_SEARCH_API_METHODS)
const methods: { [key in keyof CTreeSearchApiMethodsType]: CTreeSearchApiMethodsType[key] } = (CTreeSearch as any).options.methods
for (let key in methods) {
  const keyCache: keyof CTreeSearchApiMethodsType = (key as keyof CTreeSearchApiMethodsType)
  if (COMBINED_API_METHODS.indexOf(keyCache) > -1) {
    // 躲避 TypeScript 类型推断错误
    const _methods = ctreeSearchMethods as any
    _methods[keyCache] = function <T extends typeof ctreeSearchMethods[typeof keyCache]>(...args: Parameters<T>): ReturnType<T> {
      return (methods as any)[keyCache].apply(((this as any).$refs.treeSearch as CTreeSearchInstanceType), args)
    }
  }
}

export default (Vue as VueConstructor<Vue & {
  $refs: {
    reference: HTMLDivElement,
    dropdown: HTMLDivElement,
    treeSearch: CTreeSearchInstanceType,
  },
}>).extend({
  name: 'CTreeDrop',
  inheritAttrs: false,
  components: {
    CTreeSearch,
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    value: {},

    /** 下拉内容高度 */
    dropHeight: {
      type: Number,
      default: 300,
    },

    /** 展示输入框 placeholder */
    dropPlaceholder: {
      type: String,
    },

    /** 是否禁用 */
    dropDisabled: {
      type: Boolean,
      default: false,
    },

    /** 允许清空 */
    clearable: {
      type: Boolean,
      default: false,
    },

    /** 下拉弹出框位置 */
    placement: {
      type: String as () => PlacementType,
      default: placementEnum['bottom-start'],
    },

    /** 将下拉 DOM 转移到 body 中 */
    transfer: {
      type: Boolean,
      default: false,
    },

    /** 在下拉框容器上额外添加的 class */
    dropdownClassName: {
      type: [String, Array as () => string[]],
    },

    /** 下拉框容器最小宽度，未指定则默认为展示输入框宽度 */
    dropdownMinWidth: {
      type: Number,
    },

    /** 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条 */
    dropdownWidthFixed: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      /** 下拉框是否可见 */
      dropdownVisible: false,

      /** 多选选中节点个数 */
      checkedCount: 0,

      /** 单选选中节点名称 */
      selectedTitle: ('' as TreeNodeKeyType),

      /** 展示 slot 的 props */
      slotProps: {
        /** 多选选中的节点 */
        checkedNodes: [] as TreeNode[],

        /** 多选选中的节点 key */
        checkedKeys: [] as TreeNodeKeyType[],

        /** 单选选中的节点 */
        selectedNode: null as TreeNode | null,

        /** 单选选中的节点 key */
        selectedKey: null as TreeNodeKeyType | null,
      },
    }
  },
  computed: {
    //#region Classes
    wrapperCls (): string[] {
      return [
        `${prefixCls}__wrapper`,
      ]
    },
    referenceCls (): string[] {
      return [
        `${prefixCls}__reference`,
      ]
    },
    displayInputCls (): Array<string | object> {
      return [
        `${treeSearchPrefixCls}__input`,
        `${prefixCls}__display-input`,
        {
          [`${prefixCls}__display-input_focus`]: this.dropdownVisible,
          [`${treeSearchPrefixCls}__input_disabled`]: this.dropDisabled,
        },
      ]
    },
    displayInputTextCls (): Array<string | object> {
      let showPlaceholder: boolean = false
      if (typeof this.dropPlaceholder === 'string') {
        if (this.checkable) showPlaceholder = this.checkedCount === 0
        else if (this.selectable) showPlaceholder = this.selectedTitle === ''
      }
      return [
        `${prefixCls}__display-input-text`,
        {
          [`${prefixCls}__display-input-placeholder`]: showPlaceholder,
        },
      ]
    },
    dropIconCls (): Array<string | object> {
      return [
        `${prefixCls}__display-icon-drop`,
        {
          [`${prefixCls}__display-icon-drop_active`]: this.dropdownVisible,
        },
      ]
    },
    clearIconCls (): string[] {
      return [
        `${prefixCls}__display-icon-clear`,
      ]
    },
    dropdownCls (): string[] {
      const extraClassName = Array.isArray(this.dropdownClassName) ? this.dropdownClassName : [this.dropdownClassName]
      return [
        `${prefixCls}__dropdown`,
        ...extraClassName,
      ]
    },
    //#endregion Classes
    checkable (): boolean {
      return ('checkable' in this.$attrs) && (this.$attrs.checkable as unknown) !== false
    },
    selectable (): boolean {
      return ('selectable' in this.$attrs) && (this.$attrs.selectable as unknown) !== false
    },
    displayValue (): string | TreeNodeKeyType {
      if (this.checkable) {
        if (this.checkedCount === 0 && typeof this.dropPlaceholder === 'string') return this.dropPlaceholder
        return `已选 ${this.checkedCount} 个`
      } else if (this.selectable) {
        if (this.selectedTitle === '' && typeof this.dropPlaceholder === 'string') return this.dropPlaceholder
        return this.selectedTitle
      } else return this.dropPlaceholder || ''
    },
    showClearIcon (): boolean {
      if (this.checkable) return this.checkedCount !== 0
      else if (this.selectable) return this.selectedTitle !== ''
      return false
    },
  },
  methods: {
    /** CTreeSearch 和 CTree 中的方法 */
    ...ctreeSearchMethods,

    /** 定位下拉框 */
    locateDropdown (): void {
      const referenceRect = this.$refs.reference.getBoundingClientRect()
      const referenceWidth = referenceRect.width
      const referenceHeight = referenceRect.height

      // Set dropdown width
      const minWidth = `${typeof this.dropdownMinWidth === 'number' ? this.dropdownMinWidth : referenceWidth}px`
      this.$refs.dropdown.style.minWidth = minWidth
      this.$refs.dropdown.style.width = this.dropdownWidthFixed ? minWidth : 'auto'

      const dropdownRect = this.$refs.dropdown.getBoundingClientRect()
      const dropdownStyleDeclaration = window.getComputedStyle(this.$refs.dropdown)
      const dropdownMarginHorizontal = parseFloat(dropdownStyleDeclaration.marginLeft) + parseFloat(dropdownStyleDeclaration.marginRight)
      const dropdownMarginVertical = parseFloat(dropdownStyleDeclaration.marginTop) + parseFloat(dropdownStyleDeclaration.marginBottom)
      const dropdownWidth = dropdownRect.width + dropdownMarginHorizontal
      // 0.8 这个值写在 css 里，因为有动画，所以获取到的是 scaleY 变换后的值
      const dropdownHeight = dropdownRect.height / 0.8 + dropdownMarginVertical
      let top = 0
      let left = 0
      if (this.transfer) {
        top = -999
        left = -999
      }
      switch (this.placement) {
        case 'bottom-start':
          if (this.transfer) {
            top = window.pageYOffset + referenceRect.bottom
            left = window.pageXOffset + referenceRect.left
          } else {
            top = referenceHeight
          }
          break
        case 'bottom-end':
          if (this.transfer) {
            top = window.pageYOffset + referenceRect.bottom
            left = window.pageXOffset + referenceRect.right - dropdownWidth
          } else {
            top = referenceHeight
            left = referenceWidth - dropdownWidth
          }
          break
        case 'bottom':
          if (this.transfer) {
            top = window.pageYOffset + referenceRect.bottom
            left = window.pageXOffset + referenceRect.left + (referenceWidth - dropdownWidth) / 2
          } else {
            top = referenceHeight
            left = (referenceWidth - dropdownWidth) / 2
          }
          break
        case 'top-start':
          if (this.transfer) {
            top = window.pageYOffset + referenceRect.top - dropdownHeight
            left = window.pageXOffset + referenceRect.left
          } else {
            top = -dropdownHeight
          }
          break
        case 'top-end':
          if (this.transfer) {
            top = window.pageYOffset + referenceRect.top - dropdownHeight
            left = window.pageXOffset + referenceRect.right - dropdownWidth
          } else {
            top = -dropdownHeight
            left = referenceWidth - dropdownWidth
          }
          break
        case 'top':
          if (this.transfer) {
            top = window.pageYOffset + referenceRect.top - dropdownHeight
            left = window.pageXOffset + referenceRect.left + (referenceWidth - dropdownWidth) / 2
          } else {
            top = -dropdownHeight
            left = (referenceWidth - dropdownWidth) / 2
          }
          break
      }

      this.$refs.dropdown.style.top = `${top}px`
      this.$refs.dropdown.style.left = `${left}px`
    },

    //#region Event handlers
    handleRefClick (): void {
      if (this.dropDisabled) return
      this.dropdownVisible = !this.dropdownVisible
    },
    handleDocumentClick (e: MouseEvent): void {
      if (!this.$refs) return
      if (!this.$refs.reference.contains(e.target as Node) && !this.$refs.dropdown.contains(e.target as Node)) {
        this.dropdownVisible = false
      }
    },
    handleClear (): void {
      this.$emit('clear')
      if (this.checkable) {
        this.clearChecked()
      } else if (this.selectable) {
        this.clearSelected()
      }
    },
    handleCheckedChange (nodes: TreeNode[], keys: TreeNodeKeyType[]): void {
      this.slotProps.checkedNodes = nodes
      this.slotProps.checkedKeys = keys
      this.checkedCount = keys.length
    },
    handleSelectedChange (node: TreeNode | null, key: TreeNodeKeyType | null): void {
      this.slotProps.selectedNode = node
      this.slotProps.selectedKey = key

      if (node) {
        const titleField = this.$refs.treeSearch.$refs.tree.titleField
        this.selectedTitle = node[titleField]
      } else if (key) {
        this.selectedTitle = key
      } else {
        this.selectedTitle = ''
      }
      this.dropdownVisible = false
    },

    /** 处理树数据更新 */
    handleSetData (): void {
      this.slotProps.checkedNodes = this.getCheckedNodes()
      this.slotProps.checkedKeys = this.getCheckedKeys()
      this.slotProps.selectedNode = this.getSelectedNode()
      this.slotProps.selectedKey = this.getSelectedKey()

      if (this.checkable) {
        this.checkedCount = this.slotProps.checkedKeys.length
      }
      if (this.selectable) {
        if (this.value != null) {
          const node = this.getNode(this.value as TreeNodeKeyType)
          if (node) {
            const titleField = this.$refs.treeSearch.$refs.tree.titleField
            this.selectedTitle = node[titleField]
          } else {
            this.selectedTitle = this.value as TreeNodeKeyType
          }
        }
      }
    },
    //#endregion Event handlers
  },
  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
    if (this.transfer) {
      document.body.appendChild(this.$refs.dropdown)
    }
    this.handleSetData()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDocumentClick)
    this.$refs.dropdown.remove()
  },
  watch: {
    dropdownVisible (newVal: boolean) {
      this.$emit('dropdown-visible-change', newVal)
      if (newVal) {
        this.$nextTick(() => {
          this.locateDropdown()
        })
      } else {
        if (this.$refs.treeSearch.getKeyword()) {
          this.$refs.treeSearch.clearKeyword()
          this.$refs.treeSearch.search()
        }
      }
    },
  },
})
</script>
