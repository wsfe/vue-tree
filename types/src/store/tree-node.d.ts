import { TreeNodeKeyType } from '../const';
interface IKeyOption {
    [key: string]: TreeNodeKeyType;
}
export interface ITreeNodeOptions extends IKeyOption {
    [key: string]: any;
}
export default class TreeNode {
    readonly _keyField: string;
    readonly _remote: boolean;
    [key: string]: any | TreeNodeKeyType;
    /** 节点层级 */
    _level: number;
    /** 多选是否选中 */
    checked: boolean;
    /** 单选是否选中 */
    selected: boolean;
    /** 是否半选状态 */
    indeterminate: boolean;
    /** 是否禁用 */
    disabled: boolean;
    /** 是否展开 */
    expand: boolean;
    /** 是否可见 */
    visible: boolean;
    /** 过滤后是否可见，如果为 false 则在其他可见情况下也是不可见的 */
    _filterVisible: boolean;
    /** 父节点 */
    _parent: null | TreeNode;
    /** 子节点 */
    children: TreeNode[];
    /** 是否是子节点 */
    isLeaf: boolean;
    /** 节点是否正在加载 */
    _loading: boolean;
    /** 子节点是否已加载 */
    _loaded: boolean;
    constructor(options: ITreeNodeOptions, parent?: null | TreeNode, _keyField?: string, _remote?: boolean);
    /**
     * 设置子节点
     * @param children 子节点数据数组
     */
    setChildren(children: ITreeNodeOptions[]): void;
}
export {};
