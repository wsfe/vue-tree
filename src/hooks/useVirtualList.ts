import { ref } from "vue"
import { TreeNode } from ".."
import { INonReactiveData, TreeNodeKeyType } from "../types"
import { VerticalPositionType, verticalPositionEnum } from "../constants"
import { TreeProps } from "../components/Tree.vue"

type IUseVirtualListProps = Required<Pick<TreeProps, 
  'renderNodeAmount' |
  'nodeMinHeight' |
  'bufferNodeAmount' |
  'keyField'
>>

export const useVirtualList = (nonReactive: INonReactiveData, props: IUseVirtualListProps) => {
  const scrollArea = ref()
  const renderNodes = ref<TreeNode[]>([])
  const blockLength = ref(0)
  const blockAreaHeight = ref(0)
  const topSpaceHeight = ref(0)
  const bottomSpaceHeight = ref(0)
  const renderAmount = ref(0)
  const renderAmountCache = ref(0)
  const renderStart = ref(0)
  const renderStartCache = ref(0)
  const debounceTimer = ref<number | undefined>(undefined)

  /**
   * 重置空白与滚动高度
   */
  const resetSpaceHeights = (): void => {
    topSpaceHeight.value = 0
    bottomSpaceHeight.value = 0
    if (scrollArea.value) scrollArea.value.scrollTop = 0
  }

  /**
   * 计算需要渲染的节点的数量，只要容器高度（clientHeight）不变，这个数量一般就不会变
   */
  const updateRenderAmount = (): void => {
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
    // 添加边界检查,防止无效更新
    if (blockLength.value === 0) return;

    if (blockLength.value > renderAmount.value) {
      const scrollTop = scrollArea.value.scrollTop
      const maxScrollTop = blockAreaHeight.value - scrollArea.value.clientHeight

      // 添加滚动到底部的判断
      if (scrollTop >= maxScrollTop) {
        renderStart.value = Math.max(0, blockLength.value - renderAmount.value)
      } else {
        const scrollNodeAmount = Math.floor(scrollTop / props.nodeMinHeight)
        renderStart.value = Math.floor(scrollNodeAmount / props.bufferNodeAmount) * props.bufferNodeAmount
      }
    } else {
      renderStart.value = 0
    }

    // 避免不必要的更新
    if (
      isScroll &&
      renderAmountCache.value === renderAmount.value &&
      renderStartCache.value === renderStart.value
    ) {
      return
    }

    renderNodes.value = nonReactive.blockNodes
      .slice(renderStart.value, renderStart.value + renderAmount.value)
      .map((blockNode: TreeNode) => {
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

  /**
   * 计算渲染节点数量，并计算渲染节点
   */
  const updateRender = (): void => {
    updateRenderAmount()
    updateRenderNodes()
  }

  /**
   * 计算可见节点
   */
  const updateBlockNodes = (): void => {
    nonReactive.blockNodes = nonReactive.store.flatData.filter(
      node => node.visible
    )
    updateBlockData()
    updateRender()
  }

  /**
   * 更新 block 数据相关信息
   */
  const updateBlockData = (): void => {
    blockLength.value = nonReactive.blockNodes.length
    blockAreaHeight.value = props.nodeMinHeight * blockLength.value
  }

  //#endregion Calculate nodes
  const isThrottled = ref(false)

  function handleTreeScroll(): void {
    if (debounceTimer.value) {
      window.cancelAnimationFrame(debounceTimer.value)
    }

    // 添加节流
    if (!isThrottled.value) {
      isThrottled.value = true

      renderAmountCache.value = renderAmount.value
      renderStartCache.value = renderStart.value

      debounceTimer.value = window.requestAnimationFrame(() => {
        updateRenderNodes(true)

        // 重置节流状态
        setTimeout(() => {
          isThrottled.value = false
        }, 16) // 约60fps
      })
    }
  }

  /**
   * 滚动到指定节点位置
   * @param key 要滚动的节点
   * @param verticalPosition 滚动的垂直位置，可选为 'top', 'center', 'bottom' 或距离容器可视顶部距离的数字，默认为 'top'
   */
  const scrollTo = (
    key: TreeNodeKeyType,
    verticalPosition: VerticalPositionType | number = verticalPositionEnum.top
  ): void => {
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

  return {
    scrollArea,
    renderNodes,
    blockLength,
    blockAreaHeight,
    topSpaceHeight,
    bottomSpaceHeight,
    renderAmount,
    renderAmountCache,
    renderStart,
    renderStartCache,
    resetSpaceHeights,
    updateRenderAmount,
    updateRenderNodes,
    updateRender,
    updateBlockNodes,
    updateBlockData,
    handleTreeScroll,
    scrollTo,
  }
}
