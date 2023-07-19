# Vue-Tree 3.x

一款高性能 vue 虚拟树控件，支持搜索，定位，拖拽等。该控件是在公司业务的基础上不断打磨出来的，提供了十分丰富强大的 API，几乎能够满足你对树控件的所有需求。该控件同时支持 vue2 以及 vue3。

> 这是原先[ctree](https://github.com/wsfe/vue-tree/tree/2.x)的升级版本，同时支持 vue2 和 vue3。
> 新版改变了包的名称和部分 export 模块名称。

## 案例

[在线 demo](https://wsfe.github.io/vue-tree/)

## 安装

### yarn 安装方式

```bash
yarn add @wsfe/vue-tree
```

### npm 安装方式

```bash
npm install @wsfe/vue-tree
```

### 样式引入

直接引入 css

```less
@import '~@wsfe/vue-tree/style.css';
```

引入 less 以便于变量覆盖

```less
@import '~@wsfe/vue-tree/src/styles/index.less';
```

### 使用方式

```typescript
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import Vtree, { VTreeNode, VTreeSearch, VTreeDrop } from '@wsfe/vue-tree'
import '@wsfe/vue-tree/style.css'
```

# 接口文档

## VTree API

### VTree Props

| 属性                             | 说明                                                                                                          | 类型                                                                                                             | 默认值       |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- | :----------- |
| value                            | 选中的值，可用 v-model ；单选为字符串或数字，多选为 `separator` 分隔的字符串或数组，优先多选                  | `string \| number \| Array<string \| number>`                                                                    | 无           |
| data                             | 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替                                | `object[]`                                                                                                       | []           |
| unloadDataList                   | 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可                                           | `object[]`                                                                                                       | []           |
| showUnloadCheckedNodes           | 过滤已选时是否在列表后面展示未加载的已选节点                                                                  | `boolean`                                                                                                        | true         |
| emptyText                        | 数据为空时显示的文本                                                                                          | `string`                                                                                                         | '暂无数据'   |
| titleField                       | 节点标题字段                                                                                                  | `string`                                                                                                         | 'title'      |
| keyField                         | 节点唯一标识字段                                                                                              | `string`                                                                                                         | 'id'         |
| separator                        | 多选模式下 value 分隔符                                                                                       | `string`                                                                                                         | ','          |
| checkable                        | 是否可多选                                                                                                    | `boolean`                                                                                                        | false        |
| selectable                       | 是否可单选                                                                                                    | `boolean`                                                                                                        | false        |
| filteredNodeCheckable            | 是否可勾选被过滤节点                                                                                          | `boolean`                                                                                                        | false        |
| cascade                          | 父子节点是否关联                                                                                              | `boolean`                                                                                                        | true         |
| enableLeafOnly                   | 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效                                                      | `boolean`                                                                                                        | false        |
| disableAll                       | 是否禁用所有节点                                                                                              | `boolean`                                                                                                        | false        |
| defaultExpandAll                 | 是否默认展开所有节点                                                                                          | `boolean`                                                                                                        | false        |
| defaultExpandedKeys `Deprecated` | 默认展开的节点 key                                                                                            | `Array<string \| number>`                                                                                        | []           |
| expandedKeys `2.2.0`             | 展开的节点 key ，组件内部将会响应此 Prop 的变化                                                               | `Array<string \| number>`                                                                                        | []           |
| draggable                        | 是否可拖拽                                                                                                    | `boolean`                                                                                                        | false        |
| droppable                        | 是否可放置                                                                                                    | `boolean`                                                                                                        | false        |
| beforeDropMethod                 | 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置                                               | `(dragKey: string \| number, dropKey: string \| number, hoverPart: 'before' \| 'body' \| 'after') => boolean`    | `() => true` |
| ignoreMode                       | 忽略模式，指定 `getCheckedNodes`, `getCheckedKeys` 与 `v-model` 默认要忽略的部分                              | `'none' \| 'parents' \| 'children'`                                                                              | 'none'       |
| autoLoad                         | 异步加载初始化时是否自动加载根节点                                                                            | `boolean`                                                                                                        | true         |
| load                             | 异步加载方法                                                                                                  | `(node: null \| TreeNode, resolve: Function, reject: Function) => any`                                           | 无           |
| render                           | 节点渲染 render 函数                                                                                          | `(h: CreateElement, node: TreeNode) => VNode`                                                                    | 无           |
| filterMethod                     | 节点过滤方法                                                                                                  | `(keyword: string, node: TreeNode) => boolean`                                                                   | 无           |
| expandOnFilter `2.1.0`           | 过滤时是否展开所有可见节点                                                                                    | `boolean`                                                                                                        | true         |
| unselectOnClick `2.1.0`          | 点击已选中节点是否取消选中                                                                                    | `boolean`                                                                                                        | true         |
| loading                          | 是否显示 loading 图标                                                                                         | `boolean`                                                                                                        | false        |
| nodeClassName                    | 节点根元素的 class ，传入函数以对每个节点定制 class                                                           | `string \| object \| Array<string \| object> \| (node: TreeNode) => string \| object \| Array<string \| object>` | 无           |
| nodeMinHeight                    | 根据节点最小高度计算数据总高度                                                                                | `number`                                                                                                         | 30           |
| nodeIndent                       | 子节点缩进                                                                                                    | `number`                                                                                                         | 20           |
| renderNodeAmount                 | 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 | `number`                                                                                                         | 100          |
| bufferNodeAmount                 | 当滚动到视野外的节点个数大于此值时刷新渲染节点                                                                | `number`                                                                                                         | 20           |

### VTree Events

注：从 `2.0.8` 起，事件中返回的节点信息都是包括 `_parent` 与 `children` 的完整节点信息（拖拽事件的 `dataTransfer` 除外）。

| 事件名           | 说明                        | 返回值                                                                      |
| :--------------- | :-------------------------- | :-------------------------------------------------------------------------- |
| input            | 选中节点改变时触发          | 选中的节点                                                                  |
| expand           | 展开/折叠时触发             | 节点信息                                                                    |
| check            | 勾选时触发（多选）          | 被勾选的节点信息                                                            |
| uncheck          | 取消勾选时触发（多选）      | 被取消勾选的节点信息                                                        |
| checked-change   | 勾选/取消勾选时触发（多选） | 所有被勾选节点（数组）                                                      |
| select           | 选中时触发（单选）          | 被选中的节点信息                                                            |
| unselect         | 取消选中时触发（单选）      | 被取消选中的节点信息                                                        |
| selected-change  | 选中/取消选中时触发（单选） | 被选中节点                                                                  |
| click            | 点击节点时触发              | 节点信息                                                                    |
| node-dblclick    | 双击节点时触发              | 节点信息                                                                    |
| node-right-click | 右击节点时触发              | 节点信息                                                                    |
| node-dragstart   | 开始拖拽节点时触发          | 节点信息, 拖拽事件对象                                                      |
| node-dragenter   | dragenter 时触发            | 节点信息 , 拖拽事件对象, 事件触发的节点部位 `'before' \| 'body' \| 'after'` |
| node-dragover    | dragover 时触发             | 节点信息 , 拖拽事件对象, 事件触发的节点部位 `'before' \| 'body' \| 'after'` |
| node-dragleave   | dragleave 时触发            | 节点信息 , 拖拽事件对象, 事件触发的节点部位 `'before' \| 'body' \| 'after'` |
| node-drop        | 放置节点时触发              | 节点信息 , 拖拽事件对象, 事件触发的节点部位 `'before' \| 'body' \| 'after'` |

### VTree Methods

| 方法                   | 说明                                            | 参数                                                                                                                                                                                                | 返回值                            |
| :--------------------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| setData                | 使用此方法重置树数据，可避免大量数据被 vue 监听 | `data: object[]`: 同 data Prop                                                                                                                                                                      | `void`                            |
| setChecked             | 设置多选选中/取消选中                           | `key: string \| number`: 节点 key<br/>`value: boolean`: 是否选中                                                                                                                                    | `void`                            |
| setCheckedKeys         | 批量设置选中/取消选中                           | `keys: Array<string \| number>`: 节点 key<br/>`value: boolean`: 是否选中                                                                                                                            | `void`                            |
| checkAll               | 设置所有数据全选                                | 无                                                                                                                                                                                                  | `void`                            |
| clearChecked           | 清空选中                                        | 无                                                                                                                                                                                                  | `void`                            |
| setSelected            | 设置单选选中/取消选中                           | `key: string \| number`: 节点 key<br/>`value: boolean`: 是否选中                                                                                                                                    | `void`                            |
| setExpand              | 设置展开/折叠                                   | `key: string \| number`: 节点 key<br/>`value: boolean`: 是否展开<br/>`expandParent: boolean = true`: 如果是展开是否同时展开父节点 `2.0.6`                                                           | `void`                            |
| setExpandKeys          | 批量展开/折叠                                   | `keys: Array<string \| number>`: 节点 key<br/>`value: boolean`: 是否展开                                                                                                                            | `void`                            |
| setExpandAll           | 设置全部展开/折叠                               | `value: boolean`: 是否展开                                                                                                                                                                          | `void`                            |
| getCheckedNodes        | 获取多选选中节点                                | `ignoreMode: 'none' \| 'parents' \| 'children'`: 需要忽略的部分，默认为 ignoreMode Prop                                                                                                             | `TreeNode[]`                      |
| getCheckedKeys         | 获取多选选中节点 key                            | `ignoreMode: 'none' \| 'parents' \| 'children'`: 需要忽略的部分，默认为 ignoreMode Prop                                                                                                             | `Array<string \| number>`         |
| getIndeterminateNodes  | 获取半选状态的节点                              | 无                                                                                                                                                                                                  | `TreeNode[]`                      |
| getSelectedNode        | 获取单选选中节点                                | 无                                                                                                                                                                                                  | `TreeNode \| null`                |
| getSelectedKey         | 获取单选选中节点 key                            | 无                                                                                                                                                                                                  | `TreeNode \| null`                |
| getExpandNodes         | 获取展开的节点                                  | 无                                                                                                                                                                                                  | `TreeNode[]`                      |
| getExpandKeys          | 获取展开的节点 key                              | 无                                                                                                                                                                                                  | `TreeNode[]`                      |
| getCurrentVisibleNodes | 获取当前可见的节点                              | 无                                                                                                                                                                                                  | `TreeNode[]`                      |
| getNode                | 根据 key 获取节点                               | `key: string \| number`: 节点 key                                                                                                                                                                   | `TreeNode \| null`                |
| getTreeData            | 获取树形结构的节点数据                          | 无                                                                                                                                                                                                  | `TreeNode[]`                      |
| getFlatData            | 获取扁平化后的节点数据                          | 无                                                                                                                                                                                                  | `TreeNode[]`                      |
| getNodesCount          | 获取节点总数量                                  | 无                                                                                                                                                                                                  | `number`                          |
| insertBefore           | 在参照节点前插入一个节点                        | `insertedNode`: 节点 key 或者单个节点数据<br/>`referenceKey: string \| number`: 参照节点 key                                                                                                        | `TreeNode \| null` 返回插入的节点 |
| insertAfter            | 在参照节点后插入一个节点                        | `insertedNode`: 节点 key 或者单个节点数据<br/>`referenceKey: string \| number`: 参照节点 key                                                                                                        | `TreeNode \| null` 返回插入的节点 |
| append                 | 在父节点第一层子节点的末尾插入一个节点          | `insertedNode`: 节点 key 或者单个节点数据<br/>`parentKey: string \| number`: 父节点 key                                                                                                             | `TreeNode \| null` 返回插入的节点 |
| prepend                | 在父节点第一层子节点的开头插入一个节点          | `insertedNode`: 节点 key 或者单个节点数据<br/>`parentKey: string \| number`: 父节点 key                                                                                                             | `TreeNode \| null` 返回插入的节点 |
| remove                 | 删除节点                                        | `removedKey: string \| number`: 要删除的节点 key                                                                                                                                                    | `TreeNode \| null` 返回删除的节点 |
| filter                 | 过滤节点                                        | `keyword: string`: 过滤关键词<br/>`filterMethod: (keyword: string, node: TreeNode) => boolean`: 过滤方法，默认为 filterMethod Prop ，如果没有传 filterMethod Prop 则为搜索 title 字段的一个内置方法 | `void`                            |
| showCheckedNodes       | 展示已选节点                                    | `showUnloadCheckedNodes: boolean`: 是否显示未加载的选中节点，默认为 Prop 传入的值                                                                                                                   | `void`                            |
| loadRootNodes          | 从远程加载根节点                                | 无                                                                                                                                                                                                  | `Promise<void>`                   |
| scrollTo               | 滚动到指定节点位置                              | `key: string \| number`: 节点 key<br/>`verticalPosition: 'top' \| 'center' \| 'bottom' \| number`: 滚动的垂直位置                                                                                   | `void`                            |

### VTree Slots

| 名称    | 说明             |
| :------ | :--------------- |
| empty   | 暂无数据         |
| loading | 加载中显示的图标 |

### VTree Data Fields

注：以 '`_`' 开头的字段最好不要覆盖，以免影响内部处理逻辑

| 字段            | 说明                                                                            |
| :-------------- | :------------------------------------------------------------------------------ |
| id              | 默认以 'id' 作为 key 字段，也可以通过 `keyField` Prop 指定其他字段作为 key 字段 |
| title           | 默认显示的名称，可通过 `titleField` Prop 指定其他字段作为 title 字段            |
| checked         | 多选模式下是否勾选                                                              |
| selected        | 单选模式下是否选中                                                              |
| indeterminate   | 多选模式下是否半选状态                                                          |
| disabled        | 是否禁用                                                                        |
| expand          | 父节点有效，节点展开状态                                                        |
| visible         | 是否可见                                                                        |
| \_filterVisible | 过滤后是否可见，如果为 false 则在其他可见情况下也是不可见的                     |
| \_parent        | 父节点                                                                          |
| children        | 子节点数组                                                                      |
| isLeaf          | 标记节点是否为叶子节点                                                          |
| \_level         | 节点层级，默认从 0 开始                                                         |
| \_loading       | 节点是否正在加载                                                                |
| \_loaded        | 节点是否已经加载过，异步加载下有效                                              |

## VTreeSearch API

### VTreeSearch Props

注：可在 `VTreeSearch` 上直接使用 `VTree` 的所有 Props

| 属性                 | 说明                                                                               | 类型                                         | 默认值       |
| :------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------- | :----------- |
| searchPlaceholder    | 搜索输入框的 placeholder                                                           | `string`                                     | '搜索关键字' |
| showCheckAll         | 是否显示全选复选框                                                                 | `boolean`                                    | true         |
| showCheckedButton    | 是否显示已选按钮                                                                   | `boolean`                                    | true         |
| checkedButtonText    | 已选按钮文字                                                                       | `string`                                     | '已选'       |
| showFooter           | 是否显示底部信息                                                                   | `boolean`                                    | true         |
| searchMethod `2.0.2` | 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 | `(keyword: string) => void \| Promise<void>` | 无           |
| searchLength         | 触发搜索的字符长度                                                                 | `number`                                     | 1            |
| searchDisabled       | 禁用搜索功能                                                                       | `boolean`                                    | false        |
| searchRemote         | 是否远程搜索，传入 `searchMethod` 时无效                                           | `boolean`                                    | false        |
| searchDebounceTime   | 搜索防抖时间，单位为毫秒                                                           | `number`                                     | 300          |

### VTreeSearch Events

注：可在 `VTreeSearch` 上直接监听 `VTree` 的所有 Events

| 事件名 | 说明               | 返回值       |
| :----- | :----------------- | :----------- |
| search | 执行搜索操作时触发 | 搜索的关键字 |

### VTreeSearch Methods

注：可在 `VTreeSearch` 上直接调用 `VTree` 的所有 Methods

| 方法         | 说明           | 参数                                                     | 返回值          |
| :----------- | :------------- | :------------------------------------------------------- | :-------------- |
| clearKeyword | 清空关键字     | 无                                                       | `void`          |
| getKeyword   | 获取搜索关键字 | 无                                                       | `string`        |
| search       | 执行搜索       | `keyword: string`: 搜索的关键字，默认为内部 this.keyword | `Promise<void>` |

### VTreeSearch Slots

注：可在 `VTreeSearch` 上直接传入 `VTree` 的所有 Slots

| 名称         | 说明                                               |
| :----------- | :------------------------------------------------- |
| search-input | 搜索输入框，可通过此 slot 自行封装树搜索组件的行为 |
| actions      | 操作按钮，可在搜索输入框后加入更多操作按钮         |
| footer       | 底部信息                                           |

## VTreeDrop API

### VTreeDrop Props

注：可在 `VTreeDrop` 上直接使用 `VTree` 和 `VTreeSearch` 的所有 Props

| 属性                       | 说明                                                                             | 类型                                                                              | 默认值         |
| :------------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :------------- |
| dropHeight                 | 下拉内容高度                                                                     | `number`                                                                          | 300            |
| dropPlaceholder            | 展示输入框 placeholder                                                           | `string`                                                                          | 无             |
| dropDisabled               | 是否禁用                                                                         | `boolean`                                                                         | false          |
| clearable                  | 允许清空                                                                         | `boolean`                                                                         | false          |
| placement                  | 下拉弹出框位置，注意！！不支持自动识别方向                                       | `'bottom-start' \| 'bottom-end' \| 'bottom' \| 'top-start' \| 'top-end' \| 'top'` | 'bottom-start' |
| transfer                   | 将下拉 DOM 转移到 body 中                                                        | `boolean`                                                                         | false          |
| dropdownClassName          | 在下拉框容器上额外添加的 class                                                   | `string \| string[]`                                                              | 无             |
| dropdownMinWidth `2.0.1`   | 下拉框容器最小宽度，未指定则默认为展示输入框宽度。 适合 transfer 为 false 时使用 | `number`                                                                          | 无             |
| dropdownWidthFixed `2.0.5` | 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条               | `boolean`                                                                         | false          |

### VTreeDrop Events

注：可在 `VTreeDrop` 上直接监听 `VTree` 和 `VTreeSearch` 的所有 Events

| 事件名                  | 说明                   | 返回值         |
| :---------------------- | :--------------------- | :------------- |
| dropdown-visible-change | 下拉框出现或消失时触发 | 下拉框是否可见 |
| clear                   | 点击清空按钮时触发     | 无             |

### VTreeDrop Methods

注：可在 `VTreeDrop` 上直接调用 `VTree` 和 `VTreeSearch` 的所有 Methods

### VTreeDrop Slots

注：可在 `VTreeDrop` 上直接传入 `VTree` 和 `VTreeSearch` 的所有 Slots

| 名称    | 说明                                                 |
| :------ | :--------------------------------------------------- |
| 默认    | 展示输入框                                           |
| display | 展示输入框的展示文字，如果有默认 slot 则此 slot 无效 |
| clear   | 替换清空图标，如果有默认 slot 则此 slot 无效         |

默认 slot 与 display slot 的 Slot Props `2.3.0` ：

```typescript
/** 展示 slot 的 props */
slotProps: {
  /** 多选选中的节点 */
  checkedNodes: [] as TreeNode[],

  /** 多选选中的节点 key */
  checkedKeys: [] as Array<string | number>,

  /** 单选选中的节点 */
  selectedNode: null as TreeNode | null,

  /** 单选选中的节点 key */
  selectedKey: null as string | number | null,
},
```

**注意**： `checkedNodes` 与 `selectedNode` 只包含已加载的节点，如果设置了选中的值（比如设置了 `value` Prop），但没有设置树的数据，则这两个字段内容将为空；而 `checkedKeys` 与 `selectedKey` 则会包含未加载的选中节点 key 。
