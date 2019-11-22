import Vue, { VueConstructor, CreateElement, VNode } from 'vue';
import { TreeNode } from '../store';
import { dragHoverPartEnum } from '../const';
declare const _default: import("vue/types/vue").ExtendedVue<Vue & {
    $refs: {
        nodeBody: HTMLDivElement;
    };
}, {
    /** 节点拖拽 dragover */
    dragoverBody: boolean;
    /** 节点前拖拽 dragover */
    dragoverBefore: boolean;
    /** 节点后拖拽 dragover */
    dragoverAfter: boolean;
}, {
    handleExpand(): void;
    handleCheck(): void;
    handleSelect(): void;
    handleDblclick(): void;
    handleRightClick(): void;
    /** 计算拖拽到节点的哪个部分 */
    getHoverPart(e: DragEvent): dragHoverPartEnum;
    /**
     * 重置 dragover 标志位
     * @param hoverPart 计算出的拖拽部分
     * @param isLeaveOrDrop 是否是 dragleave 或者 drop 事件，如果是则不再把标志位置为 true
     */
    resetDragoverFlags(hoverPart: dragHoverPartEnum, isLeaveOrDrop?: boolean): void;
    handleDragStart(e: DragEvent): void;
    handleDragEnter(e: DragEvent): void;
    handleDragOver(e: DragEvent): void;
    handleDragLeave(e: DragEvent): void;
    handleDrop(e: DragEvent): void;
}, {
    wrapperCls: (string | object)[];
    nodeBodyCls: (string | object)[];
    dropBeforeCls: (string | object)[];
    dropAfterCls: (string | object)[];
    squareCls: string[];
    expandCls: (string | object)[];
    loadingIconCls: string[];
    checkboxCls: (string | object)[];
    titleCls: (string | object)[];
    fullData: TreeNode;
    showCheckbox: boolean;
    renderFunction: ((h: CreateElement, data: TreeNode) => VNode) | null;
    renderComponent: VueConstructor<Vue>;
    dragListeners: object;
    dropListeners: object;
}, {
    data: TreeNode;
    titleField: string;
    keyField: string;
    render: (h: CreateElement, node: TreeNode) => VNode;
    checkable: boolean;
    selectable: boolean;
    unselectOnClick: boolean;
    disableAll: boolean;
    draggable: boolean;
    droppable: boolean;
}>;
export default _default;
