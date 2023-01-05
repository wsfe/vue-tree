<template>
  <div :class="wrapperCls">
    <div :class="dropBeforeCls"></div>
    <div
      ref="nodeBody"
      :class="nodeBodyCls"
      v-on="dropListeners"
    >
      <!-- 展开按钮 -->
      <div :class="squareCls">
        <!-- 外层用于占位，icon 用于点击 -->
        <i
          v-show="!data.isLeaf && !data._loading"
          :class="expandCls"
          @click="handleExpand"
        ></i>
        <LoadingIcon
          v-if="data._loading"
          :class="loadingIconCls"
        />
      </div>

      <!-- 复选框 -->
      <div
        v-if="showCheckbox"
        :class="squareCls"
      >
        <div
          :class="checkboxCls"
          @click="handleCheck"
        ></div>
      </div>

      <!-- 标题 -->
      <div
        :class="titleCls"
        @click="handleSelect"
        @dblclick="handleDblclick"
        @contextmenu="handleRightClick"
        v-on="dragListeners"
        :draggable="draggable && !disableAll && !data.disabled"
      >
        <component
          v-if="renderFunction"
          :is="renderComponent"
        ></component>
        <template v-else>{{ data[titleField] }}</template>
      </div>
    </div>
    <div :class="dropAfterCls"></div>
  </div>
</template>

<script lang="ts">
import{VNode,defineComponent,ref,computed, ComputedRef,getCurrentInstance,h } from 'vue'
import { TreeNode } from '../store'
import LoadingIcon from './LoadingIcon.vue'
import { dragHoverPartEnum } from '../const'
import CTree from './Tree.vue'
import {
  TreeNodeKeyType
} from '../const'
const prefixCls = 'ctree-tree-node'

export default defineComponent({
  name:'CTreeNode',
  emits:['expand','check','click','select','node-dblclick','node-right-click','node-dragstart','node-dragenter','node-dragover','node-dragleave','node-drop'],
  components: {
    LoadingIcon,
  },
  props: {
    /** 节点数据，注意！！为了性能，不让 Vue 监听过多属性，这个 data 不是完整的 TreeNode ，不包括 _parent 和 children 属性 */
    data: Object as () => TreeNode,

    /** 节点标题字段 */
    titleField: String,

    /** 节点唯一标识字段 */
    keyField: String,

    /** 节点渲染 render 函数 */
    render: Function as any as () => (h: Function, node: TreeNode) => VNode,

    /** 是否可多选 */
    checkable: Boolean,

    /** 是否可单选 */
    selectable: Boolean,

    /** 点击已选中节点是否取消选中 */
    unselectOnClick: Boolean,

    /** 是否禁用所有节点 */
    disableAll: Boolean,

    /** 是否可拖拽 */
    draggable: Boolean,

    /** 是否可放置 */
    droppable: Boolean,
    getNode: Function
  },
  setup(props,{emit}){
    const dragoverBody = ref(false)
    const dragoverBefore = ref(false)
    const dragoverAfter = ref(false)
    const data = props.data as TreeNode
    const keyField = props.keyField as string
    const getNode = props.getNode as Function
    const titleField = props.titleField as string
    const wrapperCls = computed(()=>{
      return [
        `${prefixCls}__wrapper`,
        {
          [`${prefixCls}__wrapper_is-leaf`]: data.isLeaf,
        },
      ]
    }) 
    const nodeBodyCls = computed(()=>{
      return [
        `${prefixCls}__node-body`,
        {
          [`${prefixCls}__drop_active`]: dragoverBody.value,
        },
      ]
    }) 
    const dropBeforeCls = computed(()=>{
      return [
        `${prefixCls}__drop`,
        {
          [`${prefixCls}__drop_active`]: dragoverBefore.value,
        },
      ]
    }) 
    const dropAfterCls = computed(()=>{
      return [
        `${prefixCls}__drop`,
        {
          [`${prefixCls}__drop_active`]: dragoverAfter.value,
        },
      ]
    }) 
    const squareCls = computed(()=>{
      return [
        `${prefixCls}__square`,
      ]
    }) 
    const expandCls = computed(()=>{
      return [
        `${prefixCls}__expand`,
        {
          [`${prefixCls}__expand_active`]: data.expand,
        },
      ]
    }) 
    const loadingIconCls = computed(()=>{
      return [
        `${prefixCls}__loading-icon`,
      ]
    }) 
    const checkboxCls = computed(()=>{
      return [
        `${prefixCls}__checkbox`,
        {
          [`${prefixCls}__checkbox_checked`]: data.checked,
          [`${prefixCls}__checkbox_indeterminate`]: data.indeterminate,
          [`${prefixCls}__checkbox_disabled`]: props.disableAll || data.disabled,
        },
      ]
    }) 
    const titleCls = computed(()=>{
      return [
        `${prefixCls}__title`,
        {
          [`${prefixCls}__title_selected`]: data.selected,
          [`${prefixCls}__title_disabled`]: props.disableAll || data.disabled,
        },
      ]
    }) 
    const fullData = computed(()=>{
      return getNode(data[keyField]) || ({} as TreeNode)
    }) 
    const showCheckbox = computed(()=>{
      return props.checkable
    }) 
    const renderFunction = computed(()=>{
      return data.render || props.render || null
    })
    const renderComponent = computed(()=>{
      return defineComponent({
        name: 'Render',
        functional: true,
        render(){
          if (typeof renderFunction !== 'function') return h('div')
          return renderFunction(h, fullData) 
        } ,
      })
    })
    const dragListeners = computed(()=>{
      let result = {}
      if (props.draggable && !props.disableAll && !data.disabled) {
        result = {
          dragstart: handleDragStart,
        }
      }
      return result
    })
    const dropListeners = computed(()=>{
      let result = {}
      if (props.droppable) {
        result = {
          dragenter: handleDragEnter.bind(getCurrentInstance()),
          dragover: handleDragOver.bind(getCurrentInstance()),
          dragleave: handleDragLeave.bind(getCurrentInstance()),
          drop: handleDrop.bind(getCurrentInstance()),
        }
      }
      return result
    })

    function handleExpand (): void {
      if (data.isLeaf) return
      emit('expand', fullData)
    }

    function handleCheck (): void {
      if (props.disableAll || data.disabled || !props.checkable) return
      emit('check', fullData)
    }

    function handleSelect (): void {
      emit('click', fullData)
      if (props.selectable) {
        if (props.disableAll || data.disabled) return
        if (data.selected && ! props.unselectOnClick) return
        emit('select', fullData)
      } else if (props.checkable) {
        handleCheck()
      } else {
        handleExpand()
      }
    }

    function handleDblclick (): void {
      emit('node-dblclick', fullData)
    }

    function handleRightClick (): void {
      emit('node-right-click', fullData)
    }

    //#region Drag handlers
    /** 计算拖拽到节点的哪个部分 */
    const nodeBody = ref()
    function getHoverPart (e: DragEvent) {
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
    function resetDragoverFlags (hoverPart: dragHoverPartEnum, isLeaveOrDrop = false) {
      dragoverBefore.value = false
      dragoverBody.value = false
      dragoverAfter.value = false
      if (!isLeaveOrDrop) {
        if (hoverPart === dragHoverPartEnum.before) dragoverBefore.value = true
        else if (hoverPart === dragHoverPartEnum.body) dragoverBody.value = true
        else if (hoverPart === dragHoverPartEnum.after) dragoverAfter.value = true
      }
    }

    function handleDragStart (e: DragEvent): void {
      if (e.dataTransfer) {
        e.dataTransfer.setData('node', JSON.stringify(data))
      }
      if (data.expand) handleExpand()
      emit('node-dragstart', fullData, e)
    }

    function handleDragEnter (e: DragEvent): void {
      e.preventDefault()
      const hoverPart = getHoverPart(e)
      resetDragoverFlags(hoverPart)
      emit('node-dragenter', fullData, e, hoverPart)
    }

    function handleDragOver (e: DragEvent): void {
      e.preventDefault()
      const hoverPart = getHoverPart(e)
      resetDragoverFlags(hoverPart)
      emit('node-dragover', fullData, e, hoverPart)
    }

    function handleDragLeave (e: DragEvent): void {
      const hoverPart = getHoverPart(e)
      resetDragoverFlags(hoverPart, true)
      emit('node-dragleave', fullData, e, hoverPart)
    }

    function handleDrop (e: DragEvent): void {
      const hoverPart = getHoverPart(e)
      resetDragoverFlags(hoverPart, true)
      emit('node-drop', fullData, e, hoverPart)
    }

    return {
      /** 节点拖拽 dragover */
      dragoverBody,
      /** 节点前拖拽 dragover */
      dragoverBefore,
      /** 节点后拖拽 dragover */
      dragoverAfter,
      wrapperCls,
      nodeBodyCls,
      dropBeforeCls,
      dropAfterCls,
      squareCls,
      expandCls,
      loadingIconCls,
      checkboxCls,
      titleCls,
      fullData,
      showCheckbox,
      renderFunction,
      renderComponent,
      dragListeners,
      dropListeners,
      data,
      titleField,
      handleExpand,
      handleCheck,
      handleSelect,
      handleDblclick,
      handleRightClick,
      nodeBody
    }
  }
})
</script>
