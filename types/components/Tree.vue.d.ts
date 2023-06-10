import { VNode, Ref, PropType } from 'vue-demi';
import TreeStore, { TreeNode } from '../store';
import { FilterFunctionType } from '../store/tree-store';
import { ITreeNodeOptions } from '../store/tree-node';
import { ignoreEnum, VerticalPositionType, dragHoverPartEnum } from '../const';
import { TreeNodeKeyType, IgnoreType } from '../types';
type AnyPropsArrayType = Array<{
    [key: string]: any;
}>;
type VModelType = TreeNodeKeyType | TreeNodeKeyType[];
interface INonReactiveData {
    store: TreeStore;
    blockNodes: TreeNode[];
}
declare const _default: import("vue-demi").DefineComponent<{
    /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
    modelValue: PropType<string | number | TreeNodeKeyType[]>;
    /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
    data: {
        type: PropType<AnyPropsArrayType>;
        default: () => never[];
    };
    /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
    unloadDataList: {
        type: PropType<AnyPropsArrayType>;
        default: () => never[];
    };
    /** 过滤已选时是否在列表后面展示未加载的已选节点 */
    showUnloadCheckedNodes: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 数据为空时显示的文本 */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    /** 节点标题字段 */
    titleField: {
        type: StringConstructor;
        default: string;
    };
    /** 节点唯一标识字段 */
    keyField: {
        type: StringConstructor;
        default: string;
    };
    /** 多选模式下 value 分隔符 */
    separator: {
        type: StringConstructor;
        default: string;
    };
    /** 是否可多选 */
    checkable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可单选 */
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可勾选被过滤节点 */
    filteredNodeCheckable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 父子节点是否关联 */
    cascade: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
    enableLeafOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否禁用所有节点 */
    disableAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否默认展开所有节点 */
    defaultExpandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 默认展开的节点 key
     * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
     */
    defaultExpandedKeys: {
        type: PropType<TreeNodeKeyType[]>;
        default: () => never[];
    };
    /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
    expandedKeys: {
        type: PropType<TreeNodeKeyType[]>;
        default: () => never[];
    };
    /** 是否可拖拽 */
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可放置 */
    droppable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
    beforeDropMethod: {
        type: PropType<(dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean>;
        default: () => () => true;
    };
    /** 忽略模式 */
    ignoreMode: {
        type: PropType<"none" | "children" | "parents">;
        default: ignoreEnum;
    };
    /** 异步加载初始化时是否自动加载根节点 */
    autoLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 异步加载方法 */
    load: PropType<(node: null | TreeNode, resolve: Function, reject: Function) => any>;
    /** 节点渲染 render 函数 */
    render: PropType<(node: TreeNode) => VNode>;
    /** 节点过滤方法 */
    filterMethod: PropType<FilterFunctionType>;
    /**
     * 过滤时是否展开所有可见节点
     * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
     * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
     */
    expandOnFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 点击已选中节点是否取消选中 */
    unselectOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示 loading 图标 */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 根据节点最小高度计算数据总高度 */
    nodeMinHeight: {
        type: NumberConstructor;
        default: number;
    };
    /** 子节点缩进 */
    nodeIndent: {
        type: NumberConstructor;
        default: number;
    };
    /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
    renderNodeAmount: {
        type: NumberConstructor;
        default: number;
    };
    /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
    bufferNodeAmount: {
        type: NumberConstructor;
        default: number;
    };
    /** 节点根元素的 class ，传入函数以对每个节点定制 class */
    nodeClassName: {
        type: (ObjectConstructor | StringConstructor | (() => Array<string | object>) | (() => (node: TreeNode) => string | object | Array<string | object>))[];
    };
    /**
     * 使用 padding 代替 margin 来展示子节点缩进
     * 此 Prop 是为了方便样式定制，在下个大版本将全部使用 padding
     * @deprecated
     */
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    nonReactive: INonReactiveData;
    /** 未加载选中的节点，展示已选时生成，其他情况下没用 */
    unloadCheckedNodes: TreeNode[];
    /** 可见节点个数 */
    blockLength: Ref<number>;
    /** 可见节点总高度 */
    blockAreaHeight: Ref<number>;
    /** 顶部填充高度 */
    topSpaceHeight: Ref<number>;
    /** 底部填充高度 */
    bottomSpaceHeight: Ref<number>;
    /** 实际渲染节点个数 */
    renderAmount: Ref<number>;
    /** renderAmount 缓存 */
    renderAmountCache: Ref<number>;
    /** 渲染节点（实际渲染节点） */
    renderNodes: Ref<TreeNode[]>;
    /** 渲染开始下标 */
    renderStart: Ref<number>;
    /** renderStart 缓存 */
    renderStartCache: Ref<number>;
    /** 是否正在载入根节点，组件内部调用 load 时会改变此值 */
    isRootLoading: Ref<boolean>;
    /** 缓存的 value ，用于 value 变化时与之做比对 */
    valueCache: Ref<VModelType>;
    /** 防抖计时器 id */
    debounceTimer: Ref<number | undefined>;
    topSpaceStyles: import("vue-demi").ComputedRef<{
        height: string;
    }>;
    bottomSpaceStyles: import("vue-demi").ComputedRef<{
        height: string;
    }>;
    wrapperCls: import("vue-demi").ComputedRef<string[]>;
    scrollAreaCls: import("vue-demi").ComputedRef<string[]>;
    blockAreaCls: import("vue-demi").ComputedRef<string[]>;
    emptyCls: import("vue-demi").ComputedRef<string[]>;
    emptyTextDefaultCls: import("vue-demi").ComputedRef<string[]>;
    loadingCls: import("vue-demi").ComputedRef<string[]>;
    loadingWrapperCls: import("vue-demi").ComputedRef<string[]>;
    loadingIconCls: import("vue-demi").ComputedRef<string[]>;
    iframeCls: import("vue-demi").ComputedRef<string[]>;
    treeNodeListeners: Record<string, Function>;
    setData: (data: AnyPropsArrayType) => void;
    setChecked: (key: TreeNodeKeyType, value: boolean) => void;
    setCheckedKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
    checkAll: () => void;
    clearChecked: () => void;
    setSelected: (key: TreeNodeKeyType, value: boolean) => void;
    clearSelected: () => void;
    setExpand: (key: TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
    setExpandKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
    setExpandAll: (value: boolean) => void;
    getCheckedNodes: (ignoreMode?: IgnoreType) => TreeNode[];
    getCheckedKeys: (ignoreMode?: IgnoreType) => TreeNodeKeyType[];
    getIndeterminateNodes: () => TreeNode[];
    getSelectedNode: () => TreeNode | null;
    getSelectedKey: () => TreeNodeKeyType | null;
    getExpandNodes: () => TreeNode[];
    getExpandKeys: () => TreeNodeKeyType[];
    getCurrentVisibleNodes: () => TreeNode[];
    getTreeData: () => TreeNode[];
    getFlatData: () => TreeNode[];
    getNodesCount: () => number;
    insertBefore: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
    insertAfter: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
    append: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
    prepend: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
    remove: (removedKey: TreeNodeKeyType) => TreeNode | null;
    filter: (keyword: string, filterMethod?: FilterFunctionType) => void;
    showCheckedNodes: (showUnloadCheckedNodes?: boolean) => void;
    loadRootNodes: () => Promise<void>;
    scrollTo: (key: TreeNodeKeyType, verticalPosition?: VerticalPositionType | number) => void;
    updateExpandedKeys: () => void;
    updateUnloadStatus: () => void;
    handleTreeScroll: () => void;
    handleNodeCheck: (node: TreeNode) => void;
    handleNodeSelect: (node: TreeNode) => void;
    handleNodeExpand: (node: TreeNode) => void;
    handleNodeDrop: (data: TreeNode, e: DragEvent, hoverPart: dragHoverPartEnum) => void;
    emitCheckableInput: (checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]) => void;
    emitSelectableInput: (selectedNode: TreeNode | null, selectedKey: TreeNodeKeyType | null) => void;
    attachStoreEvents: () => void;
    resetSpaceHeights: () => void;
    updateBlockNodes: () => void;
    updateBlockData: () => void;
    updateRender: () => void;
    updateRenderAmount: () => void;
    updateRenderNodes: (isScroll?: boolean) => void;
    getNode: (key: TreeNodeKeyType) => TreeNode | null;
    scrollArea: Ref<any>;
    iframe: Ref<HTMLIFrameElement | undefined>;
    methods: {
        setData: (data: AnyPropsArrayType) => void;
        setChecked: (key: TreeNodeKeyType, value: boolean) => void;
        setCheckedKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
        checkAll: () => void;
        clearChecked: () => void;
        setSelected: (key: TreeNodeKeyType, value: boolean) => void;
        clearSelected: () => void;
        setExpand: (key: TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
        setExpandKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
        setExpandAll: (value: boolean) => void;
        getCheckedNodes: (ignoreMode?: IgnoreType) => TreeNode[];
        getCheckedKeys: (ignoreMode?: IgnoreType) => TreeNodeKeyType[];
        getIndeterminateNodes: () => TreeNode[];
        getSelectedNode: () => TreeNode | null;
        getSelectedKey: () => TreeNodeKeyType | null;
        getExpandNodes: () => TreeNode[];
        getExpandKeys: () => TreeNodeKeyType[];
        getCurrentVisibleNodes: () => TreeNode[];
        getTreeData: () => TreeNode[];
        getFlatData: () => TreeNode[];
        getNodesCount: () => number;
        insertBefore: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
        insertAfter: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
        append: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
        prepend: (insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
        remove: (removedKey: TreeNodeKeyType) => TreeNode | null;
        filter: (keyword: string, filterMethod?: FilterFunctionType) => void;
        showCheckedNodes: (showUnloadCheckedNodes?: boolean) => void;
        loadRootNodes: () => Promise<void>;
        scrollTo: (key: TreeNodeKeyType, verticalPosition?: VerticalPositionType | number) => void;
        updateExpandedKeys: () => void;
        updateUnloadStatus: () => void;
        handleTreeScroll: () => void;
        handleNodeCheck: (node: TreeNode) => void;
        handleNodeSelect: (node: TreeNode) => void;
        handleNodeExpand: (node: TreeNode) => void;
        handleNodeDrop: (data: TreeNode, e: DragEvent, hoverPart: dragHoverPartEnum) => void;
        emitCheckableInput: (checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]) => void;
        emitSelectableInput: (selectedNode: TreeNode | null, selectedKey: TreeNodeKeyType | null) => void;
        resetSpaceHeights: () => void;
        updateBlockNodes: () => void;
        updateBlockData: () => void;
        updateRender: () => void;
        updateRenderAmount: () => void;
        updateRenderNodes: (isScroll?: boolean) => void;
        getNode: (key: TreeNodeKeyType) => TreeNode | null;
    };
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, string[], string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
    modelValue: PropType<string | number | TreeNodeKeyType[]>;
    /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
    data: {
        type: PropType<AnyPropsArrayType>;
        default: () => never[];
    };
    /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
    unloadDataList: {
        type: PropType<AnyPropsArrayType>;
        default: () => never[];
    };
    /** 过滤已选时是否在列表后面展示未加载的已选节点 */
    showUnloadCheckedNodes: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 数据为空时显示的文本 */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    /** 节点标题字段 */
    titleField: {
        type: StringConstructor;
        default: string;
    };
    /** 节点唯一标识字段 */
    keyField: {
        type: StringConstructor;
        default: string;
    };
    /** 多选模式下 value 分隔符 */
    separator: {
        type: StringConstructor;
        default: string;
    };
    /** 是否可多选 */
    checkable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可单选 */
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可勾选被过滤节点 */
    filteredNodeCheckable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 父子节点是否关联 */
    cascade: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
    enableLeafOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否禁用所有节点 */
    disableAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否默认展开所有节点 */
    defaultExpandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 默认展开的节点 key
     * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
     */
    defaultExpandedKeys: {
        type: PropType<TreeNodeKeyType[]>;
        default: () => never[];
    };
    /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
    expandedKeys: {
        type: PropType<TreeNodeKeyType[]>;
        default: () => never[];
    };
    /** 是否可拖拽 */
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否可放置 */
    droppable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
    beforeDropMethod: {
        type: PropType<(dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean>;
        default: () => () => true;
    };
    /** 忽略模式 */
    ignoreMode: {
        type: PropType<"none" | "children" | "parents">;
        default: ignoreEnum;
    };
    /** 异步加载初始化时是否自动加载根节点 */
    autoLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 异步加载方法 */
    load: PropType<(node: null | TreeNode, resolve: Function, reject: Function) => any>;
    /** 节点渲染 render 函数 */
    render: PropType<(node: TreeNode) => VNode>;
    /** 节点过滤方法 */
    filterMethod: PropType<FilterFunctionType>;
    /**
     * 过滤时是否展开所有可见节点
     * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
     * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
     */
    expandOnFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 点击已选中节点是否取消选中 */
    unselectOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示 loading 图标 */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 根据节点最小高度计算数据总高度 */
    nodeMinHeight: {
        type: NumberConstructor;
        default: number;
    };
    /** 子节点缩进 */
    nodeIndent: {
        type: NumberConstructor;
        default: number;
    };
    /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
    renderNodeAmount: {
        type: NumberConstructor;
        default: number;
    };
    /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
    bufferNodeAmount: {
        type: NumberConstructor;
        default: number;
    };
    /** 节点根元素的 class ，传入函数以对每个节点定制 class */
    nodeClassName: {
        type: (ObjectConstructor | StringConstructor | (() => Array<string | object>) | (() => (node: TreeNode) => string | object | Array<string | object>))[];
    };
    /**
     * 使用 padding 代替 margin 来展示子节点缩进
     * 此 Prop 是为了方便样式定制，在下个大版本将全部使用 padding
     * @deprecated
     */
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, {
    data: AnyPropsArrayType;
    keyField: string;
    ignoreMode: "none" | "children" | "parents";
    filteredNodeCheckable: boolean;
    cascade: boolean;
    defaultExpandAll: boolean;
    expandOnFilter: boolean;
    titleField: string;
    checkable: boolean;
    selectable: boolean;
    unselectOnClick: boolean;
    disableAll: boolean;
    draggable: boolean;
    droppable: boolean;
    unloadDataList: AnyPropsArrayType;
    showUnloadCheckedNodes: boolean;
    emptyText: string;
    separator: string;
    enableLeafOnly: boolean;
    defaultExpandedKeys: TreeNodeKeyType[];
    expandedKeys: TreeNodeKeyType[];
    beforeDropMethod: (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean;
    autoLoad: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
    usePadding: boolean;
}>;
export default _default;
