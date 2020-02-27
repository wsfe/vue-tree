# 界面结构

节点：从左到右分别为 `展开图标`, `复选框`, `标题`

```
> 口 title
```

其中展开图标与复选框等宽，分别占用一个正方形位置（宽高相等），并且垂直居中。

展开图标位置如果是父节点则显示图标，非父节点则不显示图标但有占位。

复选框在非多选状态下不显示且不占位。

整个节点宽度需大于等于三个正方形宽度，高度需大于等于一个正方形宽度。

整棵树：

```
  口 parent-1
> 口 parent-2
     口 child  
```

子节点在父节点下方，且相对父节点向后推移一个正方形宽度的距离。

整棵树宽高由外层容器控制

需要设置一个高度，以实现大量数据的高性能展示。

（* 如果不设置高度，可以考虑以屏幕高度为最大高度）

树整体结构解析：

最外层可滚动部分：ScollArea

内层为 Block 包括：TopSpace, RenderArea, BottomSpace

# 功能

### 普通树结构 `CTree` 组件

#### 树查看

- 可查看展示树结构
- 父节点可展开

#### 树单选

- 点击未选中节点则选中该节点
- 点击选中节点则取消选中该节点

#### 树多选

- 树标题前面有复选框
- 点击复选框或者标题可选中该节点
- 再次点击则取消选中
- 选中父节点则下属子节点均选中（反之均取消选中）
- 可选父子是否关联，不关联则上一条无效

#### 节点功能

- 如果是父节点，最前面有展开图标
- 多选模式下展开图标后面为复选框
- 再后面为节点标题，开发者可自定义标题内容
- 单选选中状态下标题背景高亮
- 多选选中状态下复选框为勾选状态
- 可禁用节点，禁用时复选框、标题均不可点击
- 节点可拖拽

# 思路

考虑到性能以及数据量问题，组件需要尽可能减少递归、搜索次数、DOM复杂度等。大致上是用空间去换取时间，但在内存占用上也要有所控制，尽可能避免 Vue 监听不必要的数据。

大方向：

- DOM 数量以及深度限制
- DOM 扁平化
- 数据扁平化

第一条其实就是 clusterize 的思想，只渲染看得见的几条数据，上下用空白元素填充，在数据量大的情况下可以有效减少 DOM 的数量，减少页面卡顿的可能。 DOM 深度的限制则需要对树节点的设计进行优化，尽可能保持简洁，删除不必要的动画、类、样式，减少重绘。

后两者实际上是相辅相成的，在数据上实现了扁平化，DOM 自然也会使用扁平化的结构

# 数据结构

外部传入的数据就是一棵树的数据结构，这点基本上无法改变，除非特殊要求传入扁平化后的数据。

首先要对传入的树结构进行拍平。

在这个过程中需要引入 `level` 字段标明每个节点的层级关系，使用 `parent`, `children` 字段存储每个节点的上下层级关系。

同时最好建立一个 hash 表，以唯一的 id 作为键值，可快速定位某个节点。

如果是进行树搜索，可考虑以其他结构存储一份数据，加快搜索速度。（或许会比较占用空间，可让开发者决定是否建立这份数据。）

# 数据流

1.

外部修改 -> CTree -> TreeStore (-> TreeNode) -> (事件等)通知 CTree -> CTreeNode 视图改变

2.

CTreeNode -> CTree -> TreeStore (-> TreeNode) -> (事件等)通知 CTree -> CTreeNode 视图改变

# 选中实现流程

初始化时，首先执行 `new TreeNode` ，待所有节点都实例化后，进行拍平。

1. 拍平期间，进行数据上的勾选，例如对 `checked: true` 的节点执行 `setChecked` 操作
2. 由于数据源勾选数据与 `value` 勾选的数据不一定是一致的，因此在拍平结束后，针对 `value` 的数据进行勾选
3. 勾选完 `value` 后，将数据源的勾选与 `value` 的勾选合并，通过 `input` 事件传出去同步 `value` 的值
4. 设置数据源时与初始化无异，也是执行前三个步骤
5. `value` 改变时，也可能导致最终选中的 key 不一致（因为开发者可能设置了 ignoreMode，或者勾选的是个父节点），因此也需要触发 `input` 事件

# value 与 data 改变逻辑

## 多选

1. 一开始进来时， value 的值全都当做未加载的选中节点，在执行拍平数据后（data 未改变时不执行拍平），遍历 value 数据，将树数据中存在的节点 checked 置为 true
2. 因为树数据上也可能存在初始就是 checked true 的节点（初始化情况），或者选中的节点与父子节点有级联选中关系（value 改变情况），因此触发一次自定义的 `checked-change` 事件通知 CTree 把最终勾选的结果通过 input 事件同步到 value
3. value 改变时，先清空当前选中的节点（包括加载与未加载的选中节点），然后重新把 value 的值设置为未加载的选中节点，重复1、2步骤
4. data 改变时，重复1、2步骤

## 单选

1. 与多选一样，一开始进来时， value 值当做未加载的选中节点，数据初始化、拍平后，将此节点设置为 selected true ，树数据上设置的 selected true 会被 value 覆盖
2. 因为单选的 value 有的话一定只有一个，因此不需要触发 input 事件去同步 value 的值
3. value 改变时，执行选中 value 的值（如果树数据中存在，则直接执行选中，不存在则记录为未加载的选中节点）
4. data 改变时，重复1、2步骤
5. 注意：后续异步加载的子节点即使有 selected true 也不会再次覆盖 value 的值，除非 value 没有值

# 树增删 API

```typescript
interface IInsertRemoveAPI {
  insertBefore(insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode
  insertAfter(insertedNode: TreeNodeKeyType | ITreeNodeOptions, referenceKey: TreeNodeKeyType): TreeNode
  append(newNodeData: ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode
  prepend(newNodeData: ITreeNodeOptions, parentKey: TreeNodeKeyType): TreeNode
  remove(removedKey: TreeNodeKeyType): void
}
```

## 节点拖拽设计

### 节点 DOM 结构

在原来的节点前后加上两个 div 用于接收 drop 事件

这样，一个节点总体上就被分为三部分

-节点前
-节点本体
-节点后

### 过程中涉及的变化

层级：需要更新节点以及其所有子节点的 _level
父节点：需要给 children 属性添加/删除相应节点
多选：更新节点后保持被移动节点状态，调用 checkNodeUpward 更新新的父节点状态
单选： 没有变化

### 步骤(用户拖动了节点并 drop)：

1. 判断 dropzone 节点 drop 的位置是节点前后还是节点本体
2. 如果是节点前后，则相应调用 `insertBefore`, `insertAfter`
3. 如果是节点本体，则调用 `prepend`

### insertBefore insertAfter

步骤：

1. 声明变量存储原节点
2. 从 `flatData`, `mapData` 和 父节点的 `children` 中移除原节点，包括其子节点
3. 更新被移除处父节点的 `isLeaf` 和 `expand`
4. 更新被移除处父节点的选中状态
5. 更新原节点的 `_parent`
6. 更新原节点的 `_level` ，包括其子节点
7. 将原节点放置于新的位置(`flatData`, `mapData` 和 父节点的 `children`)
8. 更新新位置节点其父节点的 `isLeaf` ，并 setExpand 父节点
9. 更新新位置节点其父节点的选中状态

其中，2、3、4 步骤为 `remove` API 的内容，5-9 为 `insertIntoStore` API 的内容，但 `insertIntoStore` API 不打算公开
