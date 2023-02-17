import { placementEnum, ignoreEnum } from './const'

import { TreeNode } from './store'

export type PlacementType = keyof typeof placementEnum
//#endregion Placement

export type TreeNodeKeyType = string | number

export type GetNodeFn = (key: TreeNodeKeyType) => TreeNode | null

export type IgnoreType = keyof typeof ignoreEnum

export interface TreeDropSlotProps {
  /** 多选选中的节点 */
  checkedNodes: TreeNode[]
  /** 多选选中的节点 key */
  checkedKeys: TreeNodeKeyType[]
  /** 单选选中的节点 */
  selectedNode?: TreeNode

  /** 单选选中的节点 key */
  selectedKey?: TreeNodeKeyType
}
