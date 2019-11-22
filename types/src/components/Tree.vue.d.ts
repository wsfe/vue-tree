import Vue, { CreateElement, VNode } from 'vue';
import TreeStore, { TreeNode } from '../store';
import { FilterFunctionType } from '../store/tree-store';
import { ITreeNodeOptions } from '../store/tree-node';
import { TreeNodeKeyType, dragHoverPartEnum } from '../const';
declare type AnyPropsArrayType = Array<{
    [key: string]: any;
}>;
declare type VModelType = TreeNodeKeyType | TreeNodeKeyType[];
declare const _default: import("vue/types/vue").ExtendedVue<Vue & {
    $refs: {
        scrollArea: HTMLDivElement;
        iframe: HTMLIFrameElement;
    };
    /** 非响应数据，不会被 Vue 监听 */
    nonReactive: {
        /** Tree Store */
        store: TreeStore;
        /** block 节点（所有可见节点） */
        blockNodes: TreeNode[];
    };
}, {
    /** 未加载选中的节点，展示已选时生成，其他情况下没用 */
    unloadCheckedNodes: TreeNode[];
    /** 可见节点个数 */
    blockLength: number;
    /** 可见节点总高度 */
    blockAreaHeight: number;
    /** 顶部填充高度 */
    topSpaceHeight: number;
    /** 底部填充高度 */
    bottomSpaceHeight: number;
    /** 实际渲染节点个数 */
    renderAmount: number;
    /** renderAmount 缓存 */
    renderAmountCache: number;
    /** 渲染节点（实际渲染节点） */
    renderNodes: TreeNode[];
    /** 渲染开始下标 */
    renderStart: number;
    /** renderStart 缓存 */
    renderStartCache: number;
    /** 是否正在载入根节点，组件内部调用 load 时会改变此值 */
    isRootLoading: boolean;
    /** 缓存的 value ，用于 value 变化时与之做比对 */
    valueCache: VModelType;
    /** 防抖计时器 id */
    debounceTimer: number | undefined;
}, {
    /** 使用此方法重置树数据，可避免大量数据被 vue 监听 */
    setData(data: AnyPropsArrayType): void;
    setChecked(key: TreeNodeKeyType, value: boolean): void;
    setCheckedKeys(keys: TreeNodeKeyType[], value: boolean): void;
    checkAll(): void;
    clearChecked(): void;
    setSelected(key: TreeNodeKeyType, value: boolean): void;
    clearSelected(): void;
    setExpand(key: TreeNodeKeyType, value: boolean, expandParent?: boolean): void;
    setExpandKeys(keys: TreeNodeKeyType[], value: boolean): void;
    setExpandAll(value: boolean): void;
    getCheckedNodes(ignoreMode?: "none" | "parents" | "children" | undefined): TreeNode[];
    getCheckedKeys(ignoreMode?: "none" | "parents" | "children" | undefined): TreeNodeKeyType[];
    getIndeterminateNodes(): TreeNode[];
    getSelectedNode(): TreeNode | null;
    getSelectedKey(): string | number | null;
    getExpandNodes(): TreeNode[];
    getExpandKeys(): TreeNodeKeyType[];
    getCurrentVisibleNodes(): TreeNode[];
    getNode(key: TreeNodeKeyType): TreeNode | null;
    /** 返回树形结构的节点数据 */
    getTreeData(): TreeNode[];
    /** 返回扁平化后的节点数据 */
    getFlatData(): TreeNode[];
    getNodesCount(): number;
    insertBefore(insertedNode: string | number | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null;
    insertAfter(insertedNode: string | number | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null;
    append(insertedNode: string | number | ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null;
    prepend(insertedNode: string | number | ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null;
    remove(removedKey: TreeNodeKeyType): TreeNode | null;
    filter(keyword: string, filterMethod?: FilterFunctionType | undefined): void;
    /**
     * 展示已选节点
     */
    showCheckedNodes(showUnloadCheckedNodes?: boolean | undefined): void;
    /**
     * 从远程加载根节点
     */
    loadRootNodes(): Promise<void>;
    /**
     * 滚动到指定节点位置
     * @param key 要滚动的节点
     * @param verticalPosition 滚动的垂直位置，可选为 'top', 'center', 'bottom' 或距离容器可视顶部距离的数字，默认为 'top'
     */
    scrollTo(key: TreeNodeKeyType, verticalPosition?: number | "top" | "center" | "bottom"): void;
    /** 更新展开的节点 */
    updateExpandedKeys(): void;
    updateUnloadStatus(): void;
    handleNodeCheck(node: TreeNode): void;
    handleNodeSelect(node: TreeNode): void;
    handleNodeExpand(node: TreeNode): void;
    handleNodeDrop(data: TreeNode, e: DragEvent, hoverPart: dragHoverPartEnum): void;
    /**
     * 触发多选 input 事件
     */
    emitCheckableInput(checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]): void;
    /**
     * 触发单选 input 事件
     */
    emitSelectableInput(selectedNode: TreeNode | null, selectedKey: string | number | null): void;
    /**
     * 转发 store 所触发的事件，通过 vue 组件触发事件可被其他组件监听
     */
    attachStoreEvents(): void;
    /**
     * 重置空白与滚动高度
     */
    resetSpaceHeights(): void;
    /**
     * 计算可见节点
     */
    updateBlockNodes(): void;
    /**
     * 更新 block 数据相关信息
     */
    updateBlockData(): void;
    /**
     * 计算渲染节点数量，并计算渲染节点
     */
    updateRender(): void;
    /**
     * 计算需要渲染的节点的数量，只要容器高度（clientHeight）不变，这个数量一般就不会变
     */
    updateRenderAmount(): void;
    /**
     * 计算渲染的节点，基于 scrollTop 计算当前应该渲染哪些节点
     */
    updateRenderNodes(isScroll?: boolean): void;
    handleTreeScroll(): void;
}, {
    topSpaceStyles: object;
    bottomSpaceStyles: object;
    wrapperCls: string[];
    scrollAreaCls: string[];
    blockAreaCls: string[];
    emptyCls: string[];
    emptyTextDefaultCls: string[];
    loadingCls: string[];
    loadingWrapperCls: string[];
    loadingIconCls: string[];
    iframeCls: string[];
    treeNodeListeners: object;
}, {
    value: string | number | TreeNodeKeyType[];
    data: AnyPropsArrayType;
    unloadDataList: AnyPropsArrayType;
    showUnloadCheckedNodes: boolean;
    emptyText: string;
    titleField: string;
    keyField: string;
    separator: string;
    checkable: boolean;
    selectable: boolean;
    filteredNodeCheckable: boolean;
    cascade: boolean;
    enableLeafOnly: boolean;
    disableAll: boolean;
    defaultExpandAll: boolean;
    defaultExpandedKeys: TreeNodeKeyType[];
    expandedKeys: TreeNodeKeyType[];
    draggable: boolean;
    droppable: boolean;
    beforeDropMethod: (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean;
    ignoreMode: "none" | "parents" | "children";
    autoLoad: boolean;
    load: (node: TreeNode | null, resolve: Function, reject: Function) => any;
    render: (h: CreateElement, node: TreeNode) => VNode;
    filterMethod: FilterFunctionType;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
    nodeClassName: any;
    usePadding: boolean;
}>;
export default _default;
