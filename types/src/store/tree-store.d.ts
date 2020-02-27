import TreeNode, { ITreeNodeOptions } from './tree-node';
import { TreeNodeKeyType, IgnoreType } from '../const';
interface ITreeStoreOptions {
    [key: string]: any;
    keyField: string;
    ignoreMode?: IgnoreType;
    filteredNodeCheckable?: boolean;
    cascade?: boolean;
    defaultExpandAll?: boolean;
    load?: Function;
    expandOnFilter?: boolean;
}
interface IMapData {
    [key: string]: TreeNode;
    [key: number]: TreeNode;
}
export interface IEventNames {
    'set-data': () => void;
    'visible-data-change': () => void;
    'render-data-change': () => void;
    'expand': NodeGeneralListenerType;
    'select': NodeGeneralListenerType;
    'unselect': NodeGeneralListenerType;
    'selected-change': (node: TreeNode | null, key: TreeNodeKeyType | null) => void;
    'check': NodeGeneralListenerType;
    'uncheck': NodeGeneralListenerType;
    'checked-change': (nodes: TreeNode[], keys: TreeNodeKeyType[]) => void;
}
declare type NodeGeneralListenerType = (node: TreeNode) => void;
export declare type ListenerType<T extends keyof IEventNames> = IEventNames[T];
export declare type FilterFunctionType = (keyword: string, node: TreeNode) => boolean;
export default class TreeStore {
    private readonly options;
    /** 树数据 */
    data: TreeNode[];
    /** 扁平化的树数据 */
    flatData: TreeNode[];
    /** 树数据 map */
    mapData: IMapData;
    /** 未加载但已选中的节点 key ，每次 flattenData 的时候进行检查，将加载的节点从此数组中剔除 */
    private unloadCheckedKeys;
    /** 未加载但选中的单选节点 key */
    private unloadSelectedKey;
    /** 当前单选选中节点 key */
    private currentSelectedKey;
    /** 事件 listeners */
    private listenersMap;
    constructor(options: ITreeStoreOptions);
    setData(data: ITreeNodeOptions[], selectableUnloadKey?: TreeNodeKeyType | null, checkableUnloadKeys?: TreeNodeKeyType[] | null): void;
    /**
     * 设置单个节点多选选中
     * @param key 设置的节点 key
     * @param value 是否选中
     * @param triggerEvent 是否触发事件
     * @param triggerDataChange 是否触发 `data-change` 事件以通知外部刷新视图
     * @param filtering 是否正在过滤，如果是，则考虑 `filteredNodeCheckable` Prop，用于判断是否是用户点击节点触发的勾选
     */
    setChecked(key: TreeNodeKeyType, value: boolean, triggerEvent?: boolean, triggerDataChange?: boolean, filtering?: boolean): void;
    /**
     * 设置单个未加载节点选中，不公开此 API
     */
    private setUnloadChecked;
    /**
     * 批量选中/取消多选选中节点
     * @param keys 选中的节点 key 数组
     * @param value 是否选中
     * @param triggerEvent 是否触发事件
     */
    setCheckedKeys(keys: TreeNodeKeyType[], value: boolean, triggerEvent?: boolean, triggerDataChange?: boolean): void;
    /**
     * 多选勾选全部节点
     * @param triggerEvent 是否触发事件
     * @param triggerDataChange 是否触发视图刷新
     */
    checkAll(triggerEvent?: boolean, triggerDataChange?: boolean): void;
    /**
     * 清除所有多选已选
     * @param triggerEvent 是否触发事件
     * @param triggerDataChange 是否触发视图刷新
     */
    clearChecked(triggerEvent?: boolean, triggerDataChange?: boolean): void;
    /**
     * 触发 checked-change 的快捷方法
     * @param triggerEvent 是否触发事件
     * @param triggerDataChange 是否触发视图刷新
     */
    private triggerCheckedChange;
    /**
     * 设置单选选中
     * @param key 选中节点 key
     * @param value 是否选中
     * @param triggerEvent 是否触发事件
     */
    setSelected(key: TreeNodeKeyType, value: boolean, triggerEvent?: boolean, triggerDataChange?: boolean): void;
    /**
     * 设置未加载单选选中节点，不公开此 API
     */
    private setUnloadSelected;
    /**
     * 清除当前单选选中
     * @param triggerEvent 是否触发事件
     * @param triggerDataChange 是否触发视图刷新
     */
    clearSelected(triggerEvent?: boolean, triggerDataChange?: boolean): void;
    /**
     * 设置节点展开
     * @param key 节点 key
     * @param value 是否展开
     * @param expandParent 展开节点时是否同时展开父节点
     * @param triggerEvent 是否触发事件
     * @param triggerDataChange 是否触发 `data-change` 事件以通知外部刷新视图
     */
    setExpand(key: TreeNodeKeyType, value: boolean, expandParent?: boolean, triggerEvent?: boolean, triggerDataChange?: boolean): void;
    /**
     * 批量设置节点展开/折叠
     * @param keys 展开的节点 key 数组
     * @param value 是否展开
     */
    setExpandKeys(keys: TreeNodeKeyType[], value: boolean, triggerDataChange?: boolean): void;
    setExpandAll(value: boolean, triggerDataChange?: boolean): void;
    /**
     * 获取多选选中节点
     * @param ignoreMode 忽略模式，可选择忽略父节点或子节点，默认值是 CTree 的 ignoreMode Prop
     */
    getCheckedNodes(ignoreMode?: "children" | "none" | "parents" | undefined): TreeNode[];
    /**
     * 获取多选选中的节点 key ，包括未加载的 key
     * @param ignoreMode 忽略模式，同 `getCheckedNodes`
     */
    getCheckedKeys(ignoreMode?: "children" | "none" | "parents" | undefined): TreeNodeKeyType[];
    /**
     * 获取多选半选状态节点
     */
    getIndeterminateNodes(): TreeNode[];
    /**
     * 获取当前单选选中节点
     */
    getSelectedNode(): TreeNode | null;
    /**
     * 获取当前单选选中节点 key ，有可能是未加载的选中项
     */
    getSelectedKey(): TreeNodeKeyType | null;
    /**
     * 获取未加载但多选选中的节点
     */
    getUnloadCheckedKeys(): TreeNodeKeyType[];
    /**
     * 获取展开节点
     */
    getExpandNodes(): TreeNode[];
    /**
     * 获取展开节点 keys
     */
    getExpandKeys(): TreeNodeKeyType[];
    /**
     * 根据节点 key  获取节点
     * @param key 节点 key
     */
    getNode(key: TreeNodeKeyType): TreeNode | null;
    insertBefore(insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null;
    insertAfter(insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode | null;
    append(insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null;
    prepend(insertedNode: TreeNodeKeyType | ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode | null;
    /**
     * 删除节点
     * @param removedKey 要删除的节点 key
     */
    remove(removedKey: TreeNodeKeyType, triggerDataChange?: boolean): TreeNode | null;
    private getInsertedNode;
    /**
     * 将一个节点插入 store 记录中
     * @param node 要插入的节点
     * @param parentNode 要插入节点的父节点
     * @param childIndex 如果有父节点，则需提供要插入的节点在同级节点中的顺序
     * @param flatIndex 在 flatData 中的索引
     * @param dataIndex 如果没有父节点，需要提供节点在 data 中的索引
     */
    private insertIntoStore;
    private updateMovingNodeStatus;
    /**
     * 过滤本地节点数据
     * @param keyword 过滤关键词
     * @param filterMethod 过滤方法
     */
    filter(keyword: string, filterMethod: FilterFunctionType): void;
    /**
     * 过滤未加载多选节点，对比最终勾选节点是否有变化并触发 checked-change 事件
     * @param keys 全量选中节点 key 数组，包括加载与未加载选中节点
     */
    private setUnloadCheckedKeys;
    /**
     * 过滤未加载单选选中节点，对比是否有变化并触发 selected-change 事件
     * @param key 节点 key
     */
    private setUnloadSelectedKey;
    /**
     * 保存扁平化的节点数据 `flatData` 与节点数据 Map `mapData`
     * @param nodes 树状节点数据
     * @param overrideSelected 是否根据数据设置 `selected`
     */
    private flattenData;
    /**
     * 向下勾选/取消勾选节点，包括自身
     * @param node 需要向下勾选的节点
     * @param value 勾选或取消勾选
     * @param filtering 是否正在过滤，如果是，则考虑 `filteredNodeCheckable` Prop
     */
    private checkNodeDownward;
    /**
     * 向上勾选/取消勾选父节点，不包括自身
     * @param node 需要勾选的节点
     */
    private checkNodeUpward;
    /**
     * 根据子节点的勾选状态更新当前父节点的勾选状态
     * @param node 需要勾选的节点
     */
    private checkParentNode;
    /**
     * 搜索节点在指定数组中的位置
     */
    private findIndex;
    on<T extends keyof IEventNames>(eventName: T, listener: ListenerType<T> | Array<ListenerType<T>>): void;
    off<T extends keyof IEventNames>(eventName: T, listener?: ListenerType<T>): void;
    emit<T extends keyof IEventNames>(eventName: T, ...args: Parameters<IEventNames[T]>): void;
}
export {};
