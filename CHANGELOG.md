# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-CN/0.3.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/zh-CN/).

## [Unreleased]

## [2.3.0] - 2020-04-15

### Added

- `CTreeDrop` 默认与 display slot 新增 Slot Props

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [2.2.6] - 2019-12-12

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `CTreeDrop` 下拉框定位 `top`, `bottom` 不正确的问题

### Security

## [2.2.5] - 2019-12-11

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `CTreeDrop` 下拉框定位不正确的问题

### Security

## [2.2.4] - 2019-11-22

### Added

### Changed

- 修改 `package.json` 字段

### Deprecated

### Removed

### Fixed

### Security

## [2.2.2] - 2019-11-14

### Added

- 树子节点新增 `_is-leaf` class

### Changed

- 优化拖拽操作

### Deprecated

### Removed

### Fixed

### Security

## [2.2.1] - 2019-11-14

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `expandedKeys` 在重新设置 data 后无效的问题

### Security

## [2.2.0] - 2019-11-13

### Added

- `CTree` 新增 `expandedKeys` Prop 以响应展开节点变化
- `CTree` 新增 `nodeClassName` Prop 给每个节点添加自定义的 class

### Changed

- `CTree` `node-drop` 事件提到 `Tree.vue` 组件触发，且在拖拽成功后触发，因此触发频率相比以往会降低

### Deprecated

- `CTree` `defaultExpandedKeys` Prop 因为设计时不考虑其改变的情况，现已不推荐使用，将在下个大版本废弃，推荐改用 `expandedKeys`

### Removed

### Fixed

### Security

## [2.1.1] - 2019-11-11

### Added

- `CTree` `node-drop` 事件新增被拖拽节点参数

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [2.1.0] - 2019-11-06

### Added

- `CTree` 新增 `expandOnFilter` Prop 来决定过滤时是否展开所有可见节点
- `CTree` 新增 `unselectOnClick` Prop 可配置单选点击已选中节点时是否取消选中的行为

### Changed

- 取消运行时删除再定义 `nonReactive` 的行为，改为使用 TypeScript 类型断言来修复找不到 `nonReactive` 属性的报错
- 由于上述修改，测试用例不得不使用 `(vm as any).nonReactive` 来代替 `vm.$data.nonReactive`
- 以上两点修改对树组件使用者没有影响

### Deprecated

### Removed

### Fixed

### Security

## [2.0.20] - 2019-10-16

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `insertBefore`, `insertAfter` 方法逻辑错误

### Security

## [2.0.19] - 2019-10-15

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复执行插入方法时数据不正确的问题

### Security

## [2.0.18] - 2019-08-15

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `CTreeDrop` 单选点击清空时，未加载数据无法清空的问题

### Security

## [2.0.17] - 2019-08-04

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 2.0.16 版本导致 `CTreeDrop` 收起再展开数据显示不全的问题
- 修复 `CTreeDrop` 收起时会展开数据的问题

### Security

## [2.0.16] - 2019-07-30

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `CTreeDrop` 收起时会展开数据的问题

### Security

## [2.0.15] - 2019-06-14

### Added

### Changed

- `CTreeDrop` 收起时清空搜索关键字

### Deprecated

### Removed

### Fixed

### Security

## [2.0.14] - 2019-06-03

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `CTreeDrop` 挂载后设置新的数据，显示不刷新的问题

### Security

## [2.0.13] - 2019-05-30

### Added

### Changed

- `CTreeDrop` 设置 `clearable` 为 true 后，若没有 `checkable` 或 `selectable`，或没有选中的值，将不会出现清空按钮
- 增大展开节点图标点击热区，点不到展开图标？不存在的

### Deprecated

### Removed

### Fixed

- 修复过滤状态的树无法从外部清除被过滤节点的选中的问题

### Security

## [2.0.12] - 2019-05-27

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 value 是未加载单选节点时重置 value 不触发 selected-change 事件问题

### Security

## [2.0.11] - 2019-05-22

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复先设置 value 后设置 data 时， `CTreeSearch` 与 `CTreeDrop` 值不回显的问题

### Security

## [2.0.10] - 2019-05-22

### Added

### Changed

- 禁用 `CTreeDrop` 不显示右侧下拉箭头与清除按钮
- 缩小 `CTreeDrop` 搜索输入框上下间距
- 修改输入框 placeholder 颜色值为 `#c5c8ce`

### Deprecated

### Removed

### Fixed

- 修复禁用下拉框可以点击清除的问题

### Security

## [2.0.9] - 2019-05-15

### Added

### Changed

- 不级联搜索父节点现在子节点也会出现在结果中

### Deprecated

### Removed

### Fixed

- 修复单选搜索父节点无法显示子节点的问题

### Security

## [2.0.8] - 2019-05-14

### Added

### Changed

- `CTree` 事件传出带 `_parent` 与 `children` 的完整节点信息
- 节点 `render` 传入带 `_parent` 与 `children` 的完整节点信息参数

### Deprecated

### Removed

### Fixed

- 修复树数据设置单选时无法取消选中的问题

### Security

## [2.0.7] - 2019-04-18

### Added

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `setExpandAll` 在异步加载的情况下会无限载入的问题
- 修复 data 变化时单选选中值异常，有值但界面上不选中的问题

### Security

## [2.0.6] - 2019-04-16

### Added

- `setExpand` 新增 `expandParent` 参数，设置为 true 可同时展开父节点，默认为 true

### Changed

### Deprecated

### Removed

### Fixed

- 修复 `setExpandKeys` 第二个参数无效的问题
- 修复 `filter` 方法过滤函数参数在传入 filterMethod Prop 的情况下无法覆盖的问题

### Security

## [2.0.5] - 2019-04-15

### Added

- CTreeDrop 新增 `dropdownWidthFixed` Prop 以阻止下拉框宽度自适应

### Changed

### Deprecated

### Removed

### Fixed

- 修复标题换行导致的样式问题
- 修复点击子节点会触发 expand 事件的问题

### Security

## [2.0.4] - 2019-04-11

### Added

- scroll 事件监听器加上 `.passive` 修饰符

### Changed

### Deprecated

### Removed

### Fixed

- 修复 CTreeSearch 初始化未更新全选复选框

### Security

## [2.0.3] - 2019-04-10

### Added

### Changed

- 非级联过滤不根据父节点过滤情况判断
- filter 不使用递归

### Deprecated

### Removed

### Fixed

- 修复 CTreeDrop 初始展示文字不准确
- 修复 CTree value 改变会触发两次 `checked-change` 事件的问题

### Security

## [2.0.2] - 2019-04-08

### Added

- CTreeSearch 新增 `searchMethod` 自定义搜索方法

### Changed

- CTreeSearch `searchRemote` Prop 在传入 `searchMethod` 时无效

### Deprecated

### Removed

### Fixed

- 修复 CTreeDrop 展示框文字垂直不居中

### Security

## [2.0.1] - 2019-04-08

### Added

- CTreeDrop 新增 `dropdownMinWidth` Prop 可指定下拉框最小宽度

### Changed

### Deprecated

### Removed

### Fixed

- 兼容 Vue 2.5.16 `v-model` 与 `$attrs` 问题
- 修复指定 titleField 失效的问题

### Security

## [2.0.0] - 2019-04-04

Warning: 2.x 进行了重构，与 1.x 的内部逻辑、行为表现以及 API 都有较大的差异，本更新日志可能无法将所有差异都列全。

### Added

功能上新增：

- 支持单选与多选并存
- 丰富获取节点数据 API
- 新增节点增删 API
- 新增节点拖拽功能
- 树搜索新增全选复选框

CTree Props:

- 新增 `unloadDataList` Prop
- 新增 `showUnloadCheckedNodes` Prop
- 新增 `filteredNodeCheckable` Prop
- 新增 `defaultExpandAll` Prop
- 新增 `defaultExpandedKeys` Prop
- 新增 `draggable`, `droppable`, `beforeDropMethod` Props，支持拖拽
- 新增 `autoLoad` Prop 控制异步时是否自动加载根节点
- 新增 `nodeMinHeight`, `nodeIndent`, `renderNodeAmount`, `bufferNodeAmount` Props 控制节点渲染

CTree Events:

- 新增 `expand` 事件
- 新增 `click`, `node-dblclick`, `node-right-click` 节点点击事件
- 新增 `node-dragstart`, `node-dragenter`, `node-dragover`, `node-dragleave`, `node-drop` 节点拖拽事件

CTree Methods:

- 新增 `setData` 方法设置树数据
- 新增 `checkAll`, `clearChecked` 方法进行多选全部勾选、全部取消操作
- 新增 `setExpandKeys`
- 新增 `getCheckedKeys`, `getSelectedKey`, `getExpandNodes`, `getExpandKeys`, `getCurrentVisibleNodes`, `getNode`, `getTreeData`, `getFlatData`, `getNodesCount` 方法获取相应的节点数据
- 新增 `insertBefore`, `insertAfter`, `append`, `prepend`, `remove` 方法操作节点增加与删除
- 新增 `showCheckedNodes` 方法展示已选节点
- 新增 `scrollTo` 方法设置滚动到指定节点

CTree Slots:

- 新增 `empty` Slot 自定义暂无数据 DOM
- 新增 `loading` Slot 自定义加载图标

CTree Data Fields:

- 新增 `_filterVisible` 表示是否过滤后可见
- 新增 `_parent` 指向父节点
- 新增 `_loading` 表示节点是否正在加载

CTreeSearch Props:

- 新增 `showCheckAll`, `showCheckedButton`, `checkedButtonText` Props
- 新增 `searchRemote` Prop 远程搜索
- 新增 `searchDebounceTime` Prop 指定搜索防抖时间

CTreeSearch Methods:

- 新增 `clearKeyword` 方法清空关键字
- 新增 `search` 方法手动执行搜索

CTreeSearch Slots:

- 新增 `search-input` 自定义搜索输入框
- 新增 `actions` 添加操作按钮
- 新增 `footer` 自定义底部信息

CTreeDrop Props:

- 新增 `dropHeight` Prop 控制下拉内容高度
- 新增 `dropDisabled` Prop 控制是否禁用
- 新增 `placement` Prop 控制下拉框弹出位置
- 新增 `transfer` Prop 实现将下拉框 DOM 移动到 body 中
- 新增 `dropdownClassName` Prop 给下拉框添加 class

CTreeDrop Slots:

- 新增默认 Slot 自定义展示输入框
- 新增 `clear` Slot 自定义清空图标

### Changed

CTree Props:

- `value` 不再接收对象类型的值，改为只接收单个 key 或字符串或 key 数组
- `filterMethod` 参数固定为 2 个
- `selectMode` 改为 `checkable` 和 `selectable` ，支持单选与多选并存
- `disabled` 更名为 `disableAll`
- `expand` 更名为 `defaultExpandAll`

CTree Events:

- 目前事件所触发出来的数据均为 TreeNode 类型数据，请不要在外部直接修改（除了点击和拖拽不是完整的节点数据）

CTree Methods:

- `getCheckedNodes` 方法参数变为 1 个，同时不再返回未加载的节点，可以用 `getCheckedKeys` 获取全量选中的 key
- `loadRootNodes` 不再接收参数，需要清空选中请直接清空 `value`
- `setChecked` 方法只接收 2 个参数

CTree Data Fields:

- `level` 更名为 `_level`

CTreeSearch Props:

- `placeholder` 更名为 `searchPlaceholder`
- `searchInputDisabled` 更名为 `searchDisabled`

CTreeSearch Methods:

- `getValidSearchKeyword` 更名为 `getKeyword` ，同时不再保证是有效的搜索关键字，而是返回当前搜索输入框内 v-model 绑定的值

CTreeDrop Props:

- `displayPlaceholder` 更名为 `dropPlaceholder`
- `allowClear` 更名为 `clearable`

### Deprecated

### Removed

功能移除:

- 移除 CTreeDrop 展示动画，展示框统一展示为 `已选 x 个`

CTree Props:

- 移除 `uncheckUnloadedMethod`
- 移除 `selectMode`

CTree Methods:

- 移除 `getInitChecked` 方法
- 移除 `setCheckedNodes` 方法

CTreeSearch Props:

- 移除 `value` ，可正常使用 v-model ，请放心
- 移除 `width`
- 移除 `treeHeight`
- 移除 `showActionBar`
- 移除 `showSearchInput`
- 移除 `ignoreMode`
- 移除 `showTreeBorder`

CTreeDrop Props:

- 移除 `value` ，可正常使用 v-model ，请放心
- 移除 `displayWidth`
- 移除 `displayHeight`
- 移除 `treeHeight`

### Fixed

### Security
