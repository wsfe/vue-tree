<template>
  <div :class="wrapperCls">
    <!-- 搜索、操作区域 -->
    <div :class="searchCls">
      <div v-if="showCheckAll && checkable" :class="checkAllWrapperCls">
        <div :class="checkboxCls" @click="handleCheckAll"></div>
      </div>
      <div :class="inputWrapperCls">
        <slot name="search-input">
          <input v-model="keyword" type="text" :class="inputCls" :placeholder="searchPlaceholder"
            :disabled="searchDisabled" @input="handleSearch" />
        </slot>
      </div>
      <div :class="actionWrapperCls">
        <span v-if="showCheckedButton && checkable" :class="checkedButtonCls" @click="handleShowChecked">
          {{ checkedButtonText }}
        </span>
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- 树区域 -->
    <div :class="treeWrapperCls">
      <CTree ref="tree" v-bind="$attrs" :modelValue="modelValue" :input="updateCheckedCount" :set-data="setData"
        :checked-change="checkedChange">
        <template v-for="(_, slot) in $slots" :name="slot" v-slot="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </CTree>
    </div>

    <!-- 底部信息 -->
    <div v-if="showFooter && checkable" :class="footerCls">
      <slot name="footer">
        <span style="float: right">已选 {{ checkedCount }} 个</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, computed, onMounted } from 'vue-demi'
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

export default defineComponent({
  name: 'CTreeSearch',
  inheritAttrs: false,
  emits:['checked-change','search','set-Data'],
  expose: ['handleCheckAll'],
  components: {
    CTree,
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    modelValue: [
      String,
      Number,
      Array as () => TreeNodeKeyType[],
    ],

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
  setup(props, { emit, attrs,expose }) {
    const checkAllStatus = reactive({
      checked: false,
      /** 半选 */
      indeterminate: false,
      /** 禁用 */
      disabled: false,
    })
    const isShowingChecked = ref(false)
    const keyword = ref('')
    const debounceTimer: Ref<number | undefined> = ref(undefined)
    const checkedCount = ref(0)
    const tree = ref()
    const wrapperCls = computed(() => {
      return [
        `${prefixCls}__wrapper`,
      ]
    })
    const searchCls = computed(() => {
      return [
        `${prefixCls}__search`,
      ]
    })
    const checkAllWrapperCls = computed(() => {
      return [
        `${prefixCls}__check-all-wrapper`,
      ]
    })
    const checkboxCls = computed(() => {
      return [
        `${prefixCls}__check-all`,
        `${treeNodePrefixCls}__checkbox`,
        {
          [`${treeNodePrefixCls}__checkbox_checked`]: checkAllStatus.checked,
          [`${treeNodePrefixCls}__checkbox_indeterminate`]: checkAllStatus.indeterminate,
          [`${treeNodePrefixCls}__checkbox_disabled`]: props.searchDisabled || checkAllStatus.disabled,
        },
      ]
    })
    const inputWrapperCls = computed(() => {
      return [
        `${prefixCls}__input-wrapper`,
      ]
    })
    const inputCls = computed(() => {
      return [
        `${prefixCls}__input`,
        {
          [`${prefixCls}__input_disabled`]: props.searchDisabled,
        },
      ]
    })
    const actionWrapperCls = computed(() => {
      return [
        `${prefixCls}__action-wrapper`,
      ]
    })
    const checkedButtonCls = computed(() => {
      return [
        `${prefixCls}__checked-button`,
        {
          [`${prefixCls}__checked-button_active`]: isShowingChecked.value,
        },
      ]
    })
    const treeWrapperCls = computed(() => {
      return [
        `${prefixCls}__tree-wrapper`,
      ]
    })
    const footerCls = computed(() => {
      return [
        `${prefixCls}__footer`,
      ]
    })
    const checkable = computed(() => {
      return ('checkable' in attrs) && (attrs.checkable as unknown) !== false
    })

    function clearKeyword(): void {
      keyword.value = ''
    }

    /** 获取搜索关键字 */
    function getKeyword(): string {
      return keyword.value
    }

    /** 执行搜索 */
    function search(keyword1?: string): Promise<void> {
      let searchKeyword: string = keyword1 as string
      if (typeof keyword1 !== 'string') {
        searchKeyword = keyword.value
      }
      return new Promise((resolve, reject) => {
        clearTimeout(debounceTimer.value)
        debounceTimer.value = setTimeout(() => {
          if (searchKeyword.length > 0 && searchKeyword.length < props.searchLength) return
          isShowingChecked.value = false
          emit('search', searchKeyword)
          if (typeof props.searchMethod === 'function') {
            const searchReturnValue: void | Promise<void> = props.searchMethod(searchKeyword)
            Promise.resolve(searchReturnValue).then(() => {
              updateCheckAllStatus()
              resolve()
            })
          } else {
            if (props.searchRemote) {
              // 远程搜索
              tree.value.methods.loadRootNodes().then(() => {
                updateCheckAllStatus()
                resolve()
              })
            } else {
              // 本地搜索
              tree.value.methods.filter(searchKeyword)
              updateCheckAllStatus()
              resolve()
            }
          }
        }, props.searchDebounceTime)
      })
    }
    //#endregion Public API

    //#region Event handlers
    /** 处理全选点击 */
    function handleCheckAll(): void {
      if (props.searchDisabled || checkAllStatus.disabled) return

      const currentVisibleKeys = tree.value.methods.getCurrentVisibleNodes().map((node: any) => node[tree.value.methods.keyField])
      if (checkAllStatus.checked || checkAllStatus.indeterminate) {
        // 反选
        tree.value.methods.setCheckedKeys(currentVisibleKeys, false)
      } else {
        // 全选
        tree.value.methods.setCheckedKeys(currentVisibleKeys, true)
      }

      updateCheckAllStatus()
    }

    /** 处理搜索 */
    function handleSearch(): void {
      search()
    }

    /** 处理已选点击 */
    function handleShowChecked(): void {
      const execShowChecked = () => {
        // 处理展示已选操作
        isShowingChecked.value = !isShowingChecked.value
        if (isShowingChecked.value) {
          // 展示已选
          tree.value.methods.showCheckedNodes()
        } else {
          // 恢复展示
          tree.value.methods.filter(keyword.value, () => true)
        }

        updateCheckAllStatus()
      }

      if (keyword.value) {
        // 清空关键字
        clearKeyword()
        search().then(() => {
          execShowChecked()
        })
      } else {
        execShowChecked()
      }
    }

    /** 处理树数据更新 */
    function handleSetData(): void {
      updateCheckedCount()
      updateCheckAllStatus()
    }
    //#endregion Event handlers

    /** 更新全选复选框状态 */
    function updateCheckAllStatus(): void {
      const currentVisibleNodes = tree.value.methods.getCurrentVisibleNodes()
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
          checkAllStatus.checked = false
          checkAllStatus.indeterminate = true
          break
        }
      }
      if (!isInterrupted) {
        checkAllStatus.checked = hasChecked
        checkAllStatus.indeterminate = false
      }
    }

    function updateCheckedCount(): void {
      checkedCount.value = tree.value.methods.getCheckedKeys().length
    }

    function checkedChange(value1:any,value2:any){
      updateCheckAllStatus()
      emit('checked-change',value1,value2)
    }

    function setData(){
      emit('set-Data')
      handleSetData()
    }
    onMounted(() => {
      // 因为获取不到 CTree.methods 的类型，所以这边 methods 的类型不好写
      const methods: { [key in keyof CTreeApiMethodsType]: CTreeApiMethodsType[key] } = tree.value.methods
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
      if (checkable.value && !checkedCount.value) {
        handleSetData()
      }
    })
    expose({
      handleCheckAll,
      handleSearch,
      handleShowChecked,
      updateCheckedCount,
      handleSetData,
      updateCheckAllStatus,
      getKeyword
    })
    return {
      checkAllStatus,
      isShowingChecked,
      keyword,
      debounceTimer,
      checkedCount,
      wrapperCls,
      searchCls,
      checkAllWrapperCls,
      checkboxCls,
      inputWrapperCls,
      inputCls,
      actionWrapperCls,
      checkedButtonCls,
      treeWrapperCls,
      footerCls,
      checkable,
      tree,
      handleCheckAll,
      handleSearch,
      handleShowChecked,
      updateCheckedCount,
      handleSetData,
      updateCheckAllStatus,
      getKeyword,
      checkedChange,
      setData
    }
  }
})
</script>
