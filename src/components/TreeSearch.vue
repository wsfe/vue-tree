<template>
  <div :class="wrapperCls">
    <!-- 搜索、操作区域 -->
    <div :class="searchCls">
      <div v-if="showCheckAll && checkable" :class="checkAllWrapperCls">
        <div :class="checkboxCls" @click="handleCheckAll"></div>
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
        ref="treeRef"
        v-bind="$attrs"
        v-model="treeModelValue"
        @set-data="isVue2 ? onSetDataV2 : onSetData"
        @checked-change="checkedChange"
      >
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
import {
  defineComponent,
  reactive,
  ref,
  Ref,
  computed,
  onMounted,
  PropType,
  isVue2,
nextTick
} from 'vue-demi'
import CTree from './Tree.vue'
import { ApiType } from '../const'
import type { TreeNodeKeyType } from '../types'
import { getCtreeMethods } from '../utils'

const prefixCls = 'ctree-tree-search'

const treeNodePrefixCls = 'ctree-tree-node'

export default defineComponent({
  name: 'CTreeSearch',
  inheritAttrs: false,
  emits: ['checked-change', 'search', 'set-data', 'update:modelValue'],
  components: {
    CTree
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    modelValue: [String, Number, Array] as PropType<
      string | number | TreeNodeKeyType[]
    >,

    /** 搜索输入框的 placeholder */
    searchPlaceholder: {
      type: String,
      default: '搜索关键字'
    },

    /** 是否显示全选复选框 */
    showCheckAll: {
      type: Boolean,
      default: true
    },

    /** 是否显示已选按钮 */
    showCheckedButton: {
      type: Boolean,
      default: true
    },

    /** 已选按钮文字 */
    checkedButtonText: {
      type: String,
      default: '已选'
    },

    /** 是否显示底部信息 */
    showFooter: {
      type: Boolean,
      default: true
    },

    //#region Search related
    /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
    searchMethod: Function as PropType<
      (keyword: string) => void | Promise<void>
    >,

    /** 触发搜索的字符长度 */
    searchLength: {
      type: Number,
      default: 1
    },

    /** 禁用搜索功能 */
    searchDisabled: {
      type: Boolean,
      default: false
    },

    /** 是否远程搜索，传入 `searchMethod` 时无效 */
    searchRemote: {
      type: Boolean,
      default: false
    },

    /** 搜索防抖时间，单位为毫秒 */
    searchDebounceTime: {
      type: Number,
      default: 300
    }
    //#endregion Search related
  },
  setup(props, { emit, attrs, expose }) {
    const checkAllStatus = reactive({
      checked: false,
      /** 半选 */
      indeterminate: false,
      /** 禁用 */
      disabled: false
    })
    const isShowingChecked = ref(false)
    const keyword = ref('')
    const debounceTimer: Ref<number | undefined> = ref(undefined)
    const checkedCount = ref(0)
    const treeRef = ref()
    let ctreeMethods: Record<string, Function> = getCtreeMethods(treeRef)

    const treeModelValue = computed({
      get: () => {
        return props.modelValue
      },
      set: newVal => {
        updateCheckedCount()
        emit('update:modelValue', newVal)
      }
    })
    const wrapperCls = computed(() => {
      return [`${prefixCls}__wrapper`]
    })
    const searchCls = computed(() => {
      return [`${prefixCls}__search`]
    })
    const checkAllWrapperCls = computed(() => {
      return [`${prefixCls}__check-all-wrapper`]
    })
    const checkboxCls = computed(() => {
      return [
        `${prefixCls}__check-all`,
        `${treeNodePrefixCls}__checkbox`,
        {
          [`${treeNodePrefixCls}__checkbox_checked`]: checkAllStatus.checked,
          [`${treeNodePrefixCls}__checkbox_indeterminate`]:
            checkAllStatus.indeterminate,
          [`${treeNodePrefixCls}__checkbox_disabled`]:
            props.searchDisabled || checkAllStatus.disabled
        }
      ]
    })
    const inputWrapperCls = computed(() => {
      return [`${prefixCls}__input-wrapper`]
    })
    const inputCls = computed(() => {
      return [
        `${prefixCls}__input`,
        {
          [`${prefixCls}__input_disabled`]: props.searchDisabled
        }
      ]
    })
    const actionWrapperCls = computed(() => {
      return [`${prefixCls}__action-wrapper`]
    })
    const checkedButtonCls = computed(() => {
      return [
        `${prefixCls}__checked-button`,
        {
          [`${prefixCls}__checked-button_active`]: isShowingChecked.value
        }
      ]
    })
    const treeWrapperCls = computed(() => {
      return [`${prefixCls}__tree-wrapper`]
    })
    const footerCls = computed(() => {
      return [`${prefixCls}__footer`]
    })
    const checkable = computed(() => {
      return 'checkable' in attrs && (attrs.checkable as unknown) !== false
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
          if (
            searchKeyword.length > 0 &&
            searchKeyword.length < props.searchLength
          )
            return
          isShowingChecked.value = false
          emit('search', searchKeyword)
          if (typeof props.searchMethod === 'function') {
            const searchReturnValue: void | Promise<void> =
              props.searchMethod(searchKeyword)
            Promise.resolve(searchReturnValue).then(() => {
              updateCheckAllStatus()
              resolve()
            })
          } else {
            if (props.searchRemote) {
              // 远程搜索
              treeRef.value.loadRootNodes().then(() => {
                updateCheckAllStatus()
                resolve()
              })
            } else {
              // 本地搜索
              treeRef.value.filter(searchKeyword)
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

      const currentVisibleKeys = treeRef.value
        .getCurrentVisibleNodes()
        .map((node: any) => node[treeRef.value.keyField])
      if (checkAllStatus.checked || checkAllStatus.indeterminate) {
        // 反选
        treeRef.value.setCheckedKeys(currentVisibleKeys, false)
      } else {
        // 全选
        treeRef.value.setCheckedKeys(currentVisibleKeys, true)
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
          treeRef.value.showCheckedNodes()
        } else {
          // 恢复展示
          treeRef.value.filter(keyword.value, () => true)
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
      const currentVisibleNodes = treeRef.value.getCurrentVisibleNodes()
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
      checkedCount.value = treeRef.value.getCheckedKeys().length
    }

    function checkedChange(value1: any, value2: any) {
      updateCheckAllStatus()
      emit('checked-change', value1, value2)
    }

    function onSetData() {
      emit('set-data')
      handleSetData()
    }

    function onSetDataV2() {
      nextTick(onSetData)
    }
    onMounted(() => {
      if (checkable.value && !checkedCount.value) {
        handleSetData()
      }
    })
    const setChecked = (a: any, b: any) => {
      treeRef.value.setChecked(a, b)
    }
    // expose({
    //   setChecked,
    //   handleCheckAll,
    //   handleSearch,
    //   handleShowChecked,
    //   updateCheckedCount,
    //   handleSetData,
    //   updateCheckAllStatus,
    //   getKeyword
    // })
    return {
      ...ctreeMethods,
      treeModelValue,
      setChecked,
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
      treeRef,
      handleCheckAll,
      handleSearch,
      handleShowChecked,
      updateCheckedCount,
      handleSetData,
      updateCheckAllStatus,
      getKeyword,
      checkedChange,
      onSetData,
      clearKeyword,
      search,
      isVue2,
      onSetDataV2
    }
  }
})
</script>
