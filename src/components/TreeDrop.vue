<template>
  <div :class="wrapperCls">
    <!-- 展示框 -->
    <div ref="reference" :class="referenceCls" @click="handleRefClick">
      <slot v-bind="slotProps">
        <div :class="displayInputCls">
          <span :class="displayInputTextCls">
            <slot name="display" v-bind="slotProps">
              {{ displayValue }}
            </slot>
          </span>
          <template v-if="!dropDisabled">
            <i :class="dropIconCls"></i>
            <slot v-if="clearable && showClearIcon" name="clear">
              <i :class="clearIconCls" @click.stop="handleClear"></i>
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
          height: `${dropHeight}px`
        }"
      >
        <CTreeSearch
          ref="treeSearch"
          :modelValue="modelValue"
          v-bind="$attrs"
          @set-data="handleSetData"
          @checked-change="handleCheckedChange"
          @selected-change="handleSelectedChange"
        >
          <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </CTreeSearch>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  nextTick,
  PropType
} from 'vue-demi'
import CTreeSearch from './TreeSearch.vue'
import { TreeNode } from '../store'
import { placementEnum } from '../const'
import { PlacementType, TreeNodeKeyType, TreeDropSlotProps } from '../types'

const prefixCls = 'ctree-tree-drop'

const treeSearchPrefixCls = 'ctree-tree-search'

// type CombinedApiType = ApiType | TreeSearchApiType
// type CTreeSearchInstanceType = InstanceType<typeof CTreeSearch>
// type CTreeSearchApiMethodsType = { [key in CombinedApiType]: CTreeSearchInstanceType[key] }

// // 注释同 TreeSearch
// let ctreeSearchMethods: CTreeSearchApiMethodsType = ({} as CTreeSearchApiMethodsType)
// let COMBINED_API_METHODS = API_METHODS.concat(TREE_SEARCH_API_METHODS)

export default defineComponent({
  name: 'CTreeDrop',
  inheritAttrs: false,
  emits: ['clear', 'checked-change', 'dropdown-visible-change'],
  components: {
    CTreeSearch
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    modelValue: [String, Number, Array] as PropType<
      string | number | TreeNodeKeyType[]
    >,

    /** 下拉内容高度 */
    dropHeight: {
      type: Number,
      default: 300
    },

    /** 展示输入框 placeholder */
    dropPlaceholder: {
      type: String
    },

    /** 是否禁用 */
    dropDisabled: {
      type: Boolean,
      default: false
    },

    /** 允许清空 */
    clearable: {
      type: Boolean,
      default: false
    },

    /** 下拉弹出框位置 */
    placement: {
      type: String as PropType<PlacementType>,
      default: placementEnum['bottom-start']
    },

    /** 将下拉 DOM 转移到 body 中 */
    transfer: {
      type: Boolean,
      default: false
    },

    /** 在下拉框容器上额外添加的 class */
    dropdownClassName: [String, Array] as PropType<string | string[]>,

    /** 下拉框容器最小宽度，未指定则默认为展示输入框宽度 */
    dropdownMinWidth: {
      type: Number
    },

    /** 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条 */
    dropdownWidthFixed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, emit }) {
    const dropdownVisible = ref(false)
    const checkedCount = ref(0)
    const selectedTitle = ref('')
    const slotProps = reactive<TreeDropSlotProps>({
      /** 多选选中的节点 */
      checkedNodes: [] as TreeNode[],

      /** 多选选中的节点 key */
      checkedKeys: [] as TreeNodeKeyType[],

      /** 单选选中的节点 */
      selectedNode: undefined,

      /** 单选选中的节点 key */
      selectedKey: undefined
    })

    const wrapperCls = computed(() => {
      return [`${prefixCls}__wrapper`]
    })
    const referenceCls = computed(() => {
      return [`${prefixCls}__reference`]
    })

    const displayInputCls = computed(() => {
      return [
        `${treeSearchPrefixCls}__input`,
        `${prefixCls}__display-input`,
        {
          [`${prefixCls}__display-input_focus`]: dropdownVisible.value,
          [`${treeSearchPrefixCls}__input_disabled`]: props.dropDisabled
        }
      ]
    })

    const displayInputTextCls = computed(() => {
      let showPlaceholder: boolean = false
      if (typeof props.dropPlaceholder === 'string') {
        if (checkable.value) showPlaceholder = checkedCount.value === 0
        else if (selectable.value) showPlaceholder = selectedTitle.value === ''
      }
      return [
        `${prefixCls}__display-input-text`,
        {
          [`${prefixCls}__display-input-placeholder`]: showPlaceholder
        }
      ]
    })

    const dropIconCls = computed(() => {
      return [
        `${prefixCls}__display-icon-drop`,
        {
          [`${prefixCls}__display-icon-drop_active`]: dropdownVisible.value
        }
      ]
    })

    const clearIconCls = computed(() => {
      return [`${prefixCls}__display-icon-clear`]
    })

    const dropdownCls = computed(() => {
      const extraClassName = Array.isArray(props.dropdownClassName)
        ? props.dropdownClassName
        : [props.dropdownClassName]
      return [`${prefixCls}__dropdown`, ...extraClassName]
    })
    const checkable = computed(() => {
      return 'checkable' in attrs && (attrs.checkable as unknown) !== false
    })
    const selectable = computed(() => {
      return 'selectable' in attrs && (attrs.selectable as unknown) !== false
    })
    const displayValue = computed(() => {
      if (checkable.value) {
        if (
          checkedCount.value === 0 &&
          typeof props.dropPlaceholder === 'string'
        )
          return props.dropPlaceholder
        return `已选 ${checkedCount.value} 个`
      } else if (selectable.value) {
        if (
          selectedTitle.value === '' &&
          typeof props.dropPlaceholder === 'string'
        )
          return props.dropPlaceholder
        return selectedTitle.value
      } else return props.dropPlaceholder || ''
    })
    const showClearIcon = computed(() => {
      if (checkable.value) return checkedCount.value !== 0
      else if (selectable.value) return selectedTitle.value !== ''
      return false
    })
    const reference = ref()
    const dropdown = ref()
    function locateDropdown(): void {
      const referenceRect = reference.value.getBoundingClientRect()
      const referenceWidth = referenceRect.width
      const referenceHeight = referenceRect.height

      // Set dropdown width
      const minWidth = `${
        typeof props.dropdownMinWidth === 'number'
          ? props.dropdownMinWidth
          : referenceWidth
      }px`
      dropdown.value.style.minWidth = minWidth
      dropdown.value.style.width = props.dropdownWidthFixed ? minWidth : 'auto'

      const dropdownRect = dropdown.value.getBoundingClientRect()
      const dropdownStyleDeclaration = window.getComputedStyle(dropdown.value)
      const dropdownMarginHorizontal =
        parseFloat(dropdownStyleDeclaration.marginLeft) +
        parseFloat(dropdownStyleDeclaration.marginRight)
      const dropdownMarginVertical =
        parseFloat(dropdownStyleDeclaration.marginTop) +
        parseFloat(dropdownStyleDeclaration.marginBottom)
      const dropdownWidth = dropdownRect.width + dropdownMarginHorizontal
      // 0.8 这个值写在 css 里，因为有动画，所以获取到的是 scaleY 变换后的值
      const dropdownHeight = dropdownRect.height / 0.8 + dropdownMarginVertical
      let top = 0
      let left = 0
      if (props.transfer) {
        top = -999
        left = -999
      }
      switch (props.placement) {
        case 'bottom-start':
          if (props.transfer) {
            top = window.pageYOffset + referenceRect.bottom
            left = window.pageXOffset + referenceRect.left
          } else {
            top = referenceHeight
          }
          break
        case 'bottom-end':
          if (props.transfer) {
            top = window.pageYOffset + referenceRect.bottom
            left = window.pageXOffset + referenceRect.right - dropdownWidth
          } else {
            top = referenceHeight
            left = referenceWidth - dropdownWidth
          }
          break
        case 'bottom':
          if (props.transfer) {
            top = window.pageYOffset + referenceRect.bottom
            left =
              window.pageXOffset +
              referenceRect.left +
              (referenceWidth - dropdownWidth) / 2
          } else {
            top = referenceHeight
            left = (referenceWidth - dropdownWidth) / 2
          }
          break
        case 'top-start':
          if (props.transfer) {
            top = window.pageYOffset + referenceRect.top - dropdownHeight
            left = window.pageXOffset + referenceRect.left
          } else {
            top = -dropdownHeight
          }
          break
        case 'top-end':
          if (props.transfer) {
            top = window.pageYOffset + referenceRect.top - dropdownHeight
            left = window.pageXOffset + referenceRect.right - dropdownWidth
          } else {
            top = -dropdownHeight
            left = referenceWidth - dropdownWidth
          }
          break
        case 'top':
          if (props.transfer) {
            top = window.pageYOffset + referenceRect.top - dropdownHeight
            left =
              window.pageXOffset +
              referenceRect.left +
              (referenceWidth - dropdownWidth) / 2
          } else {
            top = -dropdownHeight
            left = (referenceWidth - dropdownWidth) / 2
          }
          break
      }

      dropdown.value.style.top = `${top}px`
      dropdown.value.style.left = `${left}px`
    }

    //#region Event handlers
    function handleRefClick(): void {
      if (props.dropDisabled) return
      dropdownVisible.value = !dropdownVisible.value
    }
    function handleDocumentClick(e: MouseEvent): void {
      if (!reference.value && !dropdown.value && treeSearch.value) return
      if (
        !reference.value.contains(e.target as Node) &&
        !dropdown.value.contains(e.target as Node)
      ) {
        dropdownVisible.value = false
      }
    }
    const treeSearch = ref()
    function handleClear(): void {
      emit('clear')
      if (checkable.value) {
        treeSearch.value.clearChecked()
      } else if (selectable.value) {
        treeSearch.value.clearSelected()
      }
    }
    function handleCheckedChange(
      nodes: TreeNode[],
      keys: TreeNodeKeyType[]
    ): void {
      slotProps.checkedNodes = nodes
      slotProps.checkedKeys = keys
      checkedCount.value = keys.length
      emit('checked-change', nodes, keys)
    }
    function handleSelectedChange(
      node?: TreeNode,
      key?: TreeNodeKeyType
    ): void {
      debugger
      slotProps.selectedNode = node
      slotProps.selectedKey = key

      if (node) {
        const titleField = treeSearch.value.$refs.treeRef.methods.titleField
        selectedTitle.value = node[titleField]
      } else if (key) {
        selectedTitle.value = key as string
      } else {
        selectedTitle.value = ''
      }
      dropdownVisible.value = false
    }

    /** 处理树数据更新 */
    function handleSetData(): void {
      slotProps.checkedNodes =
        treeSearch.value.$refs.treeRef.methods.getCheckedNodes()
      slotProps.checkedKeys =
        treeSearch.value.$refs.treeRef.methods.getCheckedKeys()
      slotProps.selectedNode =
        treeSearch.value.$refs.treeRef.methods.getSelectedNode()
      slotProps.selectedKey =
        treeSearch.value.$refs.treeRef.methods.getSelectedKey()

      if (checkable.value) {
        checkedCount.value = slotProps.checkedKeys.length
      }
      if (selectable.value) {
        if (props.modelValue != null) {
          const node = treeSearch.value.getNode(
            props.modelValue as TreeNodeKeyType
          )
          if (node) {
            const titleField = treeSearch.value.$refs.treeRef.titleField
            selectedTitle.value = node[titleField]
          } else {
            selectedTitle.value = props.modelValue as any
          }
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      if (props.transfer) {
        document.body.appendChild(dropdown.value)
      }
      handleSetData()
    })
    watch(
      () => dropdownVisible.value,
      newVal => {
        emit('dropdown-visible-change', newVal)
        if (newVal) {
          nextTick(() => {
            locateDropdown()
          })
        } else {
          if (treeSearch.value.getKeyword()) {
            treeSearch.value.clearKeyword()
            treeSearch.value.search()
          }
        }
      }
    )
    //#endr
    return {
      dropdownVisible,
      checkedCount,
      selectedTitle,
      slotProps,
      wrapperCls,
      referenceCls,
      displayInputCls,
      displayInputTextCls,
      dropIconCls,
      clearIconCls,
      dropdownCls,
      checkable,
      selectable,
      displayValue,
      showClearIcon,
      reference,
      dropdown,
      treeSearch,
      locateDropdown,
      handleRefClick,
      handleDocumentClick,
      handleClear,
      handleCheckedChange,
      handleSelectedChange,
      handleSetData
    }
  }
})
</script>
