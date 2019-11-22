<template>
  <div :class="wrapperCls">
    <!-- 搜索、操作区域 -->
    <div :class="searchCls">
      <div
        v-if="showCheckAll && checkable"
        :class="checkAllWrapperCls"
      >
        <div
          :class="checkboxCls"
          @click="handleCheckAll"
        ></div>
      </div>
      <div :class="inputWrapperCls">
        <slot name="search-input">
          <input
            v-model="keyword"
            type="text"
            :class="inputCls"
            :placeholder="searchPlaceholder"
            :disabled="searchDisabled"
            @input="handleSearch"
          />
        </slot>
      </div>
      <div :class="actionWrapperCls">
        <span
          v-if="showCheckedButton && checkable"
          :class="checkedButtonCls"
          @click="handleShowChecked"
        >
          {{ checkedButtonText }}
        </span>
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- 树区域 -->
    <div :class="treeWrapperCls">
      <CTree
        ref="tree"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
        @input="updateCheckedCount"
        @set-data="handleSetData"
        @checked-change="updateCheckAllStatus"
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
      </CTree>
    </div>

    <!-- 底部信息 -->
    <div
      v-if="showFooter && checkable"
      :class="footerCls"
    >
      <slot name="footer">
        <span style="float: right">已选 {{ checkedCount }} 个</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import CTree from './Tree.vue'
import TreeStore, { TreeNode } from '../store'
import { API_METHODS, ApiType, TreeNodeKeyType } from '../const'

const prefixCls = 'ctree-tree-search'

const treeNodePrefixCls = 'ctree-tree-node'

type CTreeInstanceType = InstanceType<typeof CTree>
type CTreeApiMethodsType = { [key in ApiType]: CTreeInstanceType[key] }

// Vue 2.6 内部没改变的话可以这样获取 Vue.extend 中的 methods。Vue 版本有升级的话需要注意这个特性有没有改变
// 如果是对象的话可以直接 CTree.methods ，并且是安全的。
let ctreeMethods: CTreeApiMethodsType = ({} as CTreeApiMethodsType)
// 因为获取不到 CTree.methods 的类型，所以这边 methods 的类型不好写
const methods: { [key in keyof CTreeApiMethodsType]: CTreeApiMethodsType[key] } = (CTree as any).options.methods
for (let key in methods) {
  const keyCache: keyof CTreeApiMethodsType = (key as keyof CTreeApiMethodsType)
  if (API_METHODS.indexOf(keyCache) > -1) {
    // 躲避 TypeScript 类型推断错误
    const _methods = ctreeMethods as any
    _methods[keyCache] = function <T extends typeof ctreeMethods[typeof keyCache]>(...args: Parameters<T>): ReturnType<T> {
      return (methods as any)[keyCache].apply(((this as any).$refs.tree as CTreeInstanceType), args)
    }
  }
}

export default (Vue as VueConstructor<Vue & {
  $refs: {
    tree: CTreeInstanceType,
  },
}>).extend({
  name: 'CTreeSearch',
  inheritAttrs: false,
  components: {
    CTree,
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    value: {},

    /** 搜索输入框的 placeholder */
    searchPlaceholder: {
      type: String,
      default: '搜索关键字',
    },

    /** 是否显示全选复选框 */
    showCheckAll: {
      type: Boolean,
      default: true,
    },

    /** 是否显示已选按钮 */
    showCheckedButton: {
      type: Boolean,
      default: true,
    },

    /** 已选按钮文字 */
    checkedButtonText: {
      type: String,
      default: '已选',
    },

    /** 是否显示底部信息 */
    showFooter: {
      type: Boolean,
      default: true,
    },

    //#region Search related
    /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
    searchMethod: Function as any as () => (keyword: string) => void | Promise<void>,

    /** 触发搜索的字符长度 */
    searchLength: {
      type: Number,
      default: 1,
    },

    /** 禁用搜索功能 */
    searchDisabled: {
      type: Boolean,
      default: false,
    },

    /** 是否远程搜索，传入 `searchMethod` 时无效 */
    searchRemote: {
      type: Boolean,
      default: false,
    },

    /** 搜索防抖时间，单位为毫秒 */
    searchDebounceTime: {
      type: Number,
      default: 300,
    },
    //#endregion Search related
  },
  data () {
    return {
      /** 全选复选框状态 */
      checkAllStatus: {
        /** 选中 */
        checked: false,
        /** 半选 */
        indeterminate: false,
        /** 禁用 */
        disabled: false,
      },

      /** 是否正在展示已选数据 */
      isShowingChecked: false,

      /** 搜索关键字 */
      keyword: '',

      /** 防抖计时器 id */
      debounceTimer: (undefined as number | undefined),

      /** 已选节点数 */
      checkedCount: 0,
    }
  },
  computed: {
    //#region Classes
    wrapperCls (): string[] {
      return [
        `${prefixCls}__wrapper`,
      ]
    },
    searchCls (): string[] {
      return [
        `${prefixCls}__search`,
      ]
    },
    checkAllWrapperCls (): string[] {
      return [
        `${prefixCls}__check-all-wrapper`,
      ]
    },
    checkboxCls (): Array<string | object> {
      return [
        `${prefixCls}__check-all`,
        `${treeNodePrefixCls}__checkbox`,
        {
          [`${treeNodePrefixCls}__checkbox_checked`]: this.checkAllStatus.checked,
          [`${treeNodePrefixCls}__checkbox_indeterminate`]: this.checkAllStatus.indeterminate,
          [`${treeNodePrefixCls}__checkbox_disabled`]: this.searchDisabled || this.checkAllStatus.disabled,
        },
      ]
    },
    inputWrapperCls (): string[] {
      return [
        `${prefixCls}__input-wrapper`,
      ]
    },
    inputCls (): Array<string | object> {
      return [
        `${prefixCls}__input`,
        {
          [`${prefixCls}__input_disabled`]: this.searchDisabled,
        },
      ]
    },
    actionWrapperCls (): string[] {
      return [
        `${prefixCls}__action-wrapper`,
      ]
    },
    checkedButtonCls (): Array<string | object> {
      return [
        `${prefixCls}__checked-button`,
        {
          [`${prefixCls}__checked-button_active`]: this.isShowingChecked,
        },
      ]
    },
    treeWrapperCls (): string[] {
      return [
        `${prefixCls}__tree-wrapper`,
      ]
    },
    footerCls (): string[] {
      return [
        `${prefixCls}__footer`,
      ]
    },
    //#endregion Classes
    checkable (): boolean {
      return ('checkable' in this.$attrs) && (this.$attrs.checkable as unknown) !== false
    },
  },
  methods: {
    /** CTree 中的方法 */
    ...ctreeMethods,

    //#region Public API
    /** 清空关键字 */
    clearKeyword (): void {
      this.keyword = ''
    },

    /** 获取搜索关键字 */
    getKeyword (): string {
      return this.keyword
    },

    /** 执行搜索 */
    search (keyword?: string): Promise<void> {
      let searchKeyword: string = keyword as string
      if (typeof keyword !== 'string') {
        searchKeyword = this.keyword
      }
      return new Promise((resolve, reject) => {
        clearTimeout(this.debounceTimer)
        this.debounceTimer = setTimeout(() => {
          if (searchKeyword.length > 0 && searchKeyword.length < this.searchLength) return
          this.isShowingChecked = false
          this.$emit('search', searchKeyword)
          if (typeof this.searchMethod === 'function') {
            const searchReturnValue: void | Promise<void> = this.searchMethod(searchKeyword)
            Promise.resolve(searchReturnValue).then(() => {
              this.updateCheckAllStatus()
              resolve()
            })
          } else {
            if (this.searchRemote) {
              // 远程搜索
              this.$refs.tree.loadRootNodes().then(() => {
                this.updateCheckAllStatus()
                resolve()
              })
            } else {
              // 本地搜索
              this.$refs.tree.filter(searchKeyword)
              this.updateCheckAllStatus()
              resolve()
            }
          }
        }, this.searchDebounceTime)
      })
    },
    //#endregion Public API

    //#region Event handlers
    /** 处理全选点击 */
    handleCheckAll (): void {
      if (this.searchDisabled || this.checkAllStatus.disabled) return

      const currentVisibleKeys = this.$refs.tree.getCurrentVisibleNodes().map((node) => node[this.$refs.tree.keyField])
      if (this.checkAllStatus.checked || this.checkAllStatus.indeterminate) {
        // 反选
        this.$refs.tree.setCheckedKeys(currentVisibleKeys, false)
      } else {
        // 全选
        this.$refs.tree.setCheckedKeys(currentVisibleKeys, true)
      }

      this.updateCheckAllStatus()
    },

    /** 处理搜索 */
    handleSearch (): void {
      this.search()
    },

    /** 处理已选点击 */
    handleShowChecked (): void {
      const execShowChecked = () => {
        // 处理展示已选操作
        this.isShowingChecked = !this.isShowingChecked
        if (this.isShowingChecked) {
          // 展示已选
          this.$refs.tree.showCheckedNodes()
        } else {
          // 恢复展示
          this.$refs.tree.filter(this.keyword, () => true)
        }

        this.updateCheckAllStatus()
      }

      if (this.keyword) {
        // 清空关键字
        this.clearKeyword()
        this.search().then(() => {
          execShowChecked()
        })
      } else {
        execShowChecked()
      }
    },

    /** 处理树数据更新 */
    handleSetData (): void {
      this.updateCheckedCount()
      this.updateCheckAllStatus()
    },
    //#endregion Event handlers

    /** 更新全选复选框状态 */
    updateCheckAllStatus (): void {
      const currentVisibleNodes = this.$refs.tree.getCurrentVisibleNodes()
      const length = currentVisibleNodes.length
      let hasChecked = false
      let hasUnchecked = false
      let isInterrupted = false
      for (let i = 0; i < length; i++) {
        const node = currentVisibleNodes[i]
        if (node.checked) {
          hasChecked = true
        } else {
          hasUnchecked = true
        }
        if ((hasChecked && hasUnchecked) || node.indeterminate) {
          isInterrupted = true
          this.checkAllStatus.checked = false
          this.checkAllStatus.indeterminate = true
          break
        }
      }
      if (!isInterrupted) {
        this.checkAllStatus.checked = hasChecked
        this.checkAllStatus.indeterminate = false
      }
    },

    updateCheckedCount (): void {
      this.checkedCount = this.$refs.tree.getCheckedKeys().length
    },
  },
  mounted () {
    if (this.checkable && !this.checkedCount) {
      this.handleSetData()
    }
  },
})
</script>
