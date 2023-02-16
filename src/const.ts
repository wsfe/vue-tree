//#region ignoreMode
export enum ignoreEnum {
  none = 'none',
  parents = 'parents',
  children = 'children'
}
//#endregion ignoreMode

//#region API
// Tree API
// 方便获取 TypeScript 类型，写成枚举，但是为了打包体积减小，定义为 const ，并重新声明一个 JavaScript 数组
const enum apiEnum {
  'setData',
  'setChecked',
  'setCheckedKeys',
  'checkAll',
  'clearChecked',
  'setSelected',
  'clearSelected',
  'setExpand',
  'setExpandKeys',
  'setExpandAll',
  'getCheckedNodes',
  'getCheckedKeys',
  'getIndeterminateNodes',
  'getSelectedNode',
  'getSelectedKey',
  'getExpandNodes',
  'getExpandKeys',
  'getCurrentVisibleNodes',
  'getNode',
  'getTreeData',
  'getFlatData',
  'getNodesCount',
  'insertBefore',
  'insertAfter',
  'append',
  'prepend',
  'remove',
  'filter',
  'showCheckedNodes',
  'loadRootNodes',
  'scrollTo'
}

export const API_METHODS = [
  'setData',
  'setChecked',
  'setCheckedKeys',
  'checkAll',
  'clearChecked',
  'setSelected',
  'clearSelected',
  'setExpand',
  'setExpandKeys',
  'setExpandAll',
  'getCheckedNodes',
  'getCheckedKeys',
  'getIndeterminateNodes',
  'getSelectedNode',
  'getSelectedKey',
  'getExpandNodes',
  'getExpandKeys',
  'getCurrentVisibleNodes',
  'getNode',
  'getTreeData',
  'getFlatData',
  'getNodesCount',
  'insertBefore',
  'insertAfter',
  'append',
  'prepend',
  'remove',
  'filter',
  'showCheckedNodes',
  'loadRootNodes',
  'scrollTo'
]

export type ApiType = keyof typeof apiEnum

// TreeSearch API
const enum treeSearchApiEnum {
  'clearKeyword',
  'getKeyword',
  'search'
}

export const TREE_SEARCH_API_METHODS = ['clearKeyword', 'getKeyword', 'search']

export type TreeSearchApiType = keyof typeof treeSearchApiEnum

export enum placementEnum {
  'bottom-start' = 'bottom-start',
  'bottom-end' = 'bottom-end',
  'bottom' = 'bottom',
  'top-start' = 'top-start',
  'top-end' = 'top-end',
  'top' = 'top'
}

//#region Scroll position
export enum verticalPositionEnum {
  top = 'top',
  center = 'center',
  bottom = 'bottom'
}

export type VerticalPositionType = keyof typeof verticalPositionEnum
//#endregion Scroll position

//#region Drag
export enum dragHoverPartEnum {
  before = 'before',
  body = 'body',
  after = 'after'
}
//#endregion Drag
