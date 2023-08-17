import { VNode, PropType } from 'vue-demi';
import { TreeNode } from '../store';
import type { GetNodeFn } from '../types';
declare const _default: import("vue-demi").DefineComponent<{
    /** 节点数据，注意！！为了性能，不让 Vue 监听过多属性，这个 data 不是完整的 TreeNode ，不包括 _parent 和 children 属性 */
    data: PropType<TreeNode>;
    /** 节点标题字段 */
    titleField: {
        type: StringConstructor;
        default: string;
    };
    /** 节点唯一标识字段 */
    keyField: StringConstructor;
    /** 节点渲染 render 函数 */
    render: PropType<(node: TreeNode) => VNode>;
    /** 是否可多选 */
    checkable: BooleanConstructor;
    /** 是否可单选 */
    selectable: BooleanConstructor;
    /** 点击已选中节点是否取消选中 */
    unselectOnClick: BooleanConstructor;
    /** 是否禁用所有节点 */
    disableAll: BooleanConstructor;
    /** 是否可拖拽 */
    draggable: BooleanConstructor;
    /** 是否可放置 */
    droppable: BooleanConstructor;
    getNode: PropType<GetNodeFn>;
}, {
    /** 节点拖拽 dragover */
    dragoverBody: import("vue-demi").Ref<boolean>;
    /** 节点前拖拽 dragover */
    dragoverBefore: import("vue-demi").Ref<boolean>;
    /** 节点后拖拽 dragover */
    dragoverAfter: import("vue-demi").Ref<boolean>;
    wrapperCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean | undefined;
    })[]>;
    nodeBodyCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    dropBeforeCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    dropAfterCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    squareCls: import("vue-demi").ComputedRef<string[]>;
    expandCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean | undefined;
    })[]>;
    loadingIconCls: import("vue-demi").ComputedRef<string[]>;
    checkboxCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean | undefined;
    })[]>;
    titleCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean | undefined;
    })[]>;
    fullData: import("vue-demi").ComputedRef<any>;
    showCheckbox: import("vue-demi").ComputedRef<boolean>;
    renderFunction: any;
    renderComponent: import("vue-demi").ComputedRef<import("vue-demi").DefineComponent<{}, {}, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{}>>, {}>>;
    dragListeners: import("vue-demi").ComputedRef<{}>;
    dropListeners: import("vue-demi").ComputedRef<{}>;
    handleExpand: () => void;
    handleCheck: () => void;
    handleSelect: (e: MouseEvent) => void;
    handleDblclick: (e: MouseEvent) => void;
    handleRightClick: (e: MouseEvent) => void;
    nodeBody: import("vue-demi").Ref<any>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, string[], string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    /** 节点数据，注意！！为了性能，不让 Vue 监听过多属性，这个 data 不是完整的 TreeNode ，不包括 _parent 和 children 属性 */
    data: PropType<TreeNode>;
    /** 节点标题字段 */
    titleField: {
        type: StringConstructor;
        default: string;
    };
    /** 节点唯一标识字段 */
    keyField: StringConstructor;
    /** 节点渲染 render 函数 */
    render: PropType<(node: TreeNode) => VNode>;
    /** 是否可多选 */
    checkable: BooleanConstructor;
    /** 是否可单选 */
    selectable: BooleanConstructor;
    /** 点击已选中节点是否取消选中 */
    unselectOnClick: BooleanConstructor;
    /** 是否禁用所有节点 */
    disableAll: BooleanConstructor;
    /** 是否可拖拽 */
    draggable: BooleanConstructor;
    /** 是否可放置 */
    droppable: BooleanConstructor;
    getNode: PropType<GetNodeFn>;
}>> & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, {
    titleField: string;
    checkable: boolean;
    selectable: boolean;
    unselectOnClick: boolean;
    disableAll: boolean;
    draggable: boolean;
    droppable: boolean;
}>;
export default _default;
