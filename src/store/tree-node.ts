import { TreeNodeKeyType } from '../const'

interface IKeyOption {
  [key: string]: TreeNodeKeyType,
}

export interface ITreeNodeOptions extends IKeyOption {
  [key: string]: any,
}

const notAllowOverrideList: string[] = [
  '_level',
  '_filterVisible',
  '_parent',
  '_loading',
  '_loaded',
  '_remote',
  '_keyField',
  'children',
  'setChildren',
]

export default class TreeNode {
  //#region Properties

  [key: string]: any | TreeNodeKeyType

  /** 节点层级 */
  _level: number = 0

  /** 多选是否选中 */
  checked: boolean = false

  /** 单选是否选中 */
  selected: boolean = false

  /** 是否半选状态 */
  indeterminate: boolean = false

  /** 是否禁用 */
  disabled: boolean = false

  /** 是否展开 */
  expand: boolean = false

  /** 是否可见 */
  visible: boolean = true

  /** 过滤后是否可见，如果为 false 则在其他可见情况下也是不可见的 */
  _filterVisible: boolean = true

  /** 父节点 */
  _parent: null | TreeNode = null

  /** 子节点 */
  children: TreeNode[] = []

  /** 是否是子节点 */
  isLeaf: boolean = false

  /** 节点是否正在加载 */
  _loading: boolean = false

  /** 子节点是否已加载 */
  _loaded: boolean = false

  //#endregion Properties

  constructor (options: ITreeNodeOptions, parent: null | TreeNode = null, readonly _keyField: string = 'id', readonly _remote: boolean = false) {
    for (let option in options) {
      if (notAllowOverrideList.indexOf(option) === -1) {
        this[option] = options[option]
      }
    }

    if (this[_keyField] == null) {
      // 如果没有 id 字段，随机赋值一个
      this[_keyField] = Math.random().toString(36).substring(2)
    }

    this._parent = parent

    if (this._parent) {
      this._level = this._parent._level + 1
    }

    this.visible = this._parent === null || (this._parent.expand && this._parent.visible)

    if (Array.isArray(options.children)) {
      this.setChildren(options.children)
    }

    if (this.children.length) {
      this._loaded = true
    }

    if (!this._remote) {
      this.isLeaf = !this.children.length
    }
  }

  /**
   * 设置子节点
   * @param children 子节点数据数组
   */
  setChildren (children: ITreeNodeOptions[]): void {
    this.children = children.map((child) => {
      return new TreeNode(Object.assign({}, child), this, this._keyField, this._remote)
    })
  }
}
