export declare enum ignoreEnum {
    none = "none",
    parents = "parents",
    children = "children"
}
declare const enum apiEnum {
    'setData' = 0,
    'setChecked' = 1,
    'setCheckedKeys' = 2,
    'checkAll' = 3,
    'clearChecked' = 4,
    'setSelected' = 5,
    'clearSelected' = 6,
    'setExpand' = 7,
    'setExpandKeys' = 8,
    'setExpandAll' = 9,
    'getCheckedNodes' = 10,
    'getCheckedKeys' = 11,
    'getIndeterminateNodes' = 12,
    'getSelectedNode' = 13,
    'getSelectedKey' = 14,
    'getExpandNodes' = 15,
    'getExpandKeys' = 16,
    'getCurrentVisibleNodes' = 17,
    'getNode' = 18,
    'getTreeData' = 19,
    'getFlatData' = 20,
    'getNodesCount' = 21,
    'insertBefore' = 22,
    'insertAfter' = 23,
    'append' = 24,
    'prepend' = 25,
    'remove' = 26,
    'filter' = 27,
    'showCheckedNodes' = 28,
    'loadRootNodes' = 29,
    'scrollTo' = 30
}
export declare const API_METHODS: string[];
export type ApiType = keyof typeof apiEnum;
declare const enum treeSearchApiEnum {
    'clearKeyword' = 0,
    'getKeyword' = 1,
    'search' = 2
}
export declare const TREE_SEARCH_API_METHODS: string[];
export type TreeSearchApiType = keyof typeof treeSearchApiEnum;
export declare enum placementEnum {
    'bottom-start' = "bottom-start",
    'bottom-end' = "bottom-end",
    'bottom' = "bottom",
    'top-start' = "top-start",
    'top-end' = "top-end",
    'top' = "top"
}
export declare enum verticalPositionEnum {
    top = "top",
    center = "center",
    bottom = "bottom"
}
export type VerticalPositionType = keyof typeof verticalPositionEnum;
export declare enum dragHoverPartEnum {
    before = "before",
    body = "body",
    after = "after"
}
export declare const TREE_NODE_EVENTS: string[];
export {};
