import Vue from 'vue';
import { TreeNode } from '../store';
import { TreeNodeKeyType } from '../const';
declare const _default: import("vue/types/vue").ExtendedVue<Vue & {
    $refs: {
        reference: HTMLDivElement;
        dropdown: HTMLDivElement;
        treeSearch: import("vue/types/vue").CombinedVueInstance<{
            checkAllStatus: {
                checked: boolean;
                indeterminate: boolean; /** 多选选中节点个数 */
                disabled: boolean; /** 单选选中节点名称 */
            };
            isShowingChecked: boolean;
            keyword: string;
            debounceTimer: number | undefined;
            checkedCount: number;
        } & {
            clearKeyword(): void;
            getKeyword(): string;
            search(keyword?: string | undefined): Promise<void>;
            handleCheckAll(): void;
            handleSearch(): void;
            handleShowChecked(): void;
            handleSetData(): void;
            updateCheckAllStatus(): void;
            updateCheckedCount(): void;
            setData: (data: {
                [key: string]: any;
            }[]) => void;
            setChecked: (key: TreeNodeKeyType, value: boolean) => void;
            setCheckedKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
            checkAll: () => void;
            clearChecked: () => void;
            setSelected: (key: TreeNodeKeyType, value: boolean) => void;
            clearSelected: () => void;
            setExpand: (key: TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
            setExpandKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
            setExpandAll: (value: boolean) => void;
            getCheckedNodes: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNode[];
            getCheckedKeys: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNodeKeyType[];
            getIndeterminateNodes: () => TreeNode[];
            getSelectedNode: () => TreeNode | null;
            getSelectedKey: () => string | number | null;
            getExpandNodes: () => TreeNode[];
            getExpandKeys: () => TreeNodeKeyType[];
            getCurrentVisibleNodes: () => TreeNode[];
            getNode: (key: TreeNodeKeyType) => TreeNode | null;
            getTreeData: () => TreeNode[];
            getFlatData: () => TreeNode[];
            getNodesCount: () => number;
            insertBefore: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
            insertAfter: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
            append: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
            prepend: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
            remove: (removedKey: TreeNodeKeyType) => TreeNode | null;
            filter: (keyword: string, filterMethod?: import("../store/tree-store").FilterFunctionType | undefined) => void;
            showCheckedNodes: (showUnloadCheckedNodes?: boolean | undefined) => void;
            loadRootNodes: () => Promise<void>;
            scrollTo: (key: TreeNodeKeyType, verticalPosition?: number | "top" | "center" | "bottom") => void;
        } & {
            wrapperCls: string[];
            searchCls: string[];
            checkAllWrapperCls: string[];
            checkboxCls: (string | object)[];
            inputWrapperCls: string[];
            inputCls: (string | object)[];
            actionWrapperCls: string[];
            checkedButtonCls: (string | object)[];
            treeWrapperCls: string[];
            footerCls: string[];
            checkable: boolean;
        } & {
            value: unknown;
            searchPlaceholder: string;
            showCheckAll: boolean;
            showCheckedButton: boolean;
            checkedButtonText: string;
            showFooter: boolean;
            searchMethod: (keyword: string) => void | Promise<void>;
            searchLength: number;
            searchDisabled: boolean;
            searchRemote: boolean;
            searchDebounceTime: number;
        } & Vue & {
            $refs: {
                tree: import("vue/types/vue").CombinedVueInstance<{
                    unloadCheckedNodes: TreeNode[];
                    blockLength: number;
                    blockAreaHeight: number;
                    topSpaceHeight: number;
                    bottomSpaceHeight: number;
                    renderAmount: number;
                    renderAmountCache: number;
                    renderNodes: TreeNode[];
                    renderStart: number;
                    renderStartCache: number;
                    isRootLoading: boolean;
                    valueCache: string | number | TreeNodeKeyType[];
                    debounceTimer: number | undefined;
                } & {
                    setData(data: {
                        [key: string]: any;
                    }[]): void;
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
                    getTreeData(): TreeNode[];
                    getFlatData(): TreeNode[];
                    getNodesCount(): number;
                    insertBefore(insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null;
                    insertAfter(insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null;
                    append(insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null;
                    prepend(insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null;
                    remove(removedKey: TreeNodeKeyType): TreeNode | null;
                    filter(keyword: string, filterMethod?: import("../store/tree-store").FilterFunctionType | undefined): void;
                    showCheckedNodes(showUnloadCheckedNodes?: boolean | undefined): void;
                    loadRootNodes(): Promise<void>;
                    scrollTo(key: TreeNodeKeyType, verticalPosition?: number | "top" | "center" | "bottom"): void;
                    updateExpandedKeys(): void;
                    updateUnloadStatus(): void;
                    handleNodeCheck(node: TreeNode): void;
                    handleNodeSelect(node: TreeNode): void;
                    handleNodeExpand(node: TreeNode): void;
                    handleNodeDrop(data: TreeNode, e: DragEvent, hoverPart: import("../const").dragHoverPartEnum): void;
                    emitCheckableInput(checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]): void;
                    emitSelectableInput(selectedNode: TreeNode | null, selectedKey: string | number | null): void;
                    attachStoreEvents(): void;
                    resetSpaceHeights(): void;
                    updateBlockNodes(): void;
                    updateBlockData(): void;
                    updateRender(): void;
                    updateRenderAmount(): void;
                    updateRenderNodes(isScroll?: boolean): void;
                    handleTreeScroll(): void;
                } & {
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
                } & {
                    value: string | number | TreeNodeKeyType[];
                    data: {
                        [key: string]: any;
                    }[];
                    unloadDataList: {
                        [key: string]: any;
                    }[];
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
                    beforeDropMethod: (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: import("../const").dragHoverPartEnum) => boolean;
                    ignoreMode: "none" | "parents" | "children";
                    autoLoad: boolean;
                    load: (node: TreeNode | null, resolve: Function, reject: Function) => any;
                    render: (h: import("vue").CreateElement, node: TreeNode) => import("vue").VNode;
                    filterMethod: import("../store/tree-store").FilterFunctionType;
                    expandOnFilter: boolean;
                    unselectOnClick: boolean;
                    loading: boolean;
                    nodeMinHeight: number;
                    nodeIndent: number;
                    renderNodeAmount: number;
                    bufferNodeAmount: number;
                    nodeClassName: any;
                    usePadding: boolean;
                } & Vue & {
                    $refs: {
                        scrollArea: HTMLDivElement;
                        iframe: HTMLIFrameElement;
                    };
                    nonReactive: {
                        store: import("../store").default;
                        blockNodes: TreeNode[];
                    };
                }, object, object, object, Record<never, any>>;
            };
        }, object, object, object, Record<never, any>>;
    };
}, {
    /** 下拉框是否可见 */
    dropdownVisible: boolean;
    /** 多选选中节点个数 */
    checkedCount: number;
    /** 单选选中节点名称 */
    selectedTitle: TreeNodeKeyType;
}, {
    /** 定位下拉框 */
    locateDropdown(): void;
    handleRefClick(): void;
    handleDocumentClick(e: MouseEvent): void;
    handleClear(): void;
    handleCheckedChange(nodes: TreeNode[], keys: TreeNodeKeyType[]): void;
    handleSelectedChange(node: TreeNode | null, key: string | number | null): void;
    /** 处理树数据更新 */
    handleSetData(): void;
    setData: (data: {
        [key: string]: any;
    }[]) => void;
    setChecked: (key: TreeNodeKeyType, value: boolean) => void;
    setCheckedKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
    checkAll: () => void;
    clearChecked: () => void;
    setSelected: (key: TreeNodeKeyType, value: boolean) => void;
    clearSelected: () => void;
    setExpand: (key: TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
    setExpandKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
    setExpandAll: (value: boolean) => void;
    getCheckedNodes: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNode[];
    getCheckedKeys: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNodeKeyType[];
    getIndeterminateNodes: () => TreeNode[];
    getSelectedNode: () => TreeNode | null;
    getSelectedKey: () => string | number | null;
    getExpandNodes: () => TreeNode[];
    getExpandKeys: () => TreeNodeKeyType[];
    getCurrentVisibleNodes: () => TreeNode[];
    getNode: (key: TreeNodeKeyType) => TreeNode | null;
    getTreeData: () => TreeNode[];
    getFlatData: () => TreeNode[];
    getNodesCount: () => number;
    insertBefore: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
    insertAfter: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
    append: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
    prepend: (insertedNode: string | number | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
    remove: (removedKey: TreeNodeKeyType) => TreeNode | null;
    filter: (keyword: string, filterMethod?: import("../store/tree-store").FilterFunctionType | undefined) => void;
    showCheckedNodes: (showUnloadCheckedNodes?: boolean | undefined) => void;
    loadRootNodes: () => Promise<void>;
    scrollTo: (key: TreeNodeKeyType, verticalPosition?: number | "top" | "center" | "bottom") => void;
    clearKeyword: () => void;
    getKeyword: () => string;
    search: (keyword?: string | undefined) => Promise<void>;
}, {
    wrapperCls: string[];
    referenceCls: string[];
    displayInputCls: (string | object)[];
    displayInputTextCls: (string | object)[];
    dropIconCls: (string | object)[];
    clearIconCls: string[];
    dropdownCls: string[];
    checkable: boolean;
    selectable: boolean;
    displayValue: TreeNodeKeyType;
    showClearIcon: boolean;
}, {
    value: unknown;
    dropHeight: number;
    dropPlaceholder: string;
    dropDisabled: boolean;
    clearable: boolean;
    placement: "top" | "bottom" | "bottom-start" | "bottom-end" | "top-start" | "top-end";
    transfer: boolean;
    dropdownClassName: string | string[];
    dropdownMinWidth: number;
    dropdownWidthFixed: boolean;
}>;
export default _default;
