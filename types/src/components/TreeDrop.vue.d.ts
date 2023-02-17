import { PropType } from 'vue-demi';
import { TreeNode } from '../store';
import { placementEnum } from '../const';
import { TreeNodeKeyType } from '../types';
declare const _default: import("vue-demi").DefineComponent<{
    /** 兼容 Vue 2.5.16 bug */
    modelValue: PropType<string | number | TreeNodeKeyType[]>;
    /** 下拉内容高度 */
    dropHeight: {
        type: NumberConstructor;
        default: number;
    };
    /** 展示输入框 placeholder */
    dropPlaceholder: {
        type: StringConstructor;
    };
    /** 是否禁用 */
    dropDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 允许清空 */
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 下拉弹出框位置 */
    placement: {
        type: PropType<"top" | "bottom" | "bottom-start" | "bottom-end" | "top-start" | "top-end">;
        default: placementEnum;
    };
    /** 将下拉 DOM 转移到 body 中 */
    transfer: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 在下拉框容器上额外添加的 class */
    dropdownClassName: PropType<string | string[]>;
    /** 下拉框容器最小宽度，未指定则默认为展示输入框宽度 */
    dropdownMinWidth: {
        type: NumberConstructor;
    };
    /** 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条 */
    dropdownWidthFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    treeSearchValue: import("vue-demi").WritableComputedRef<string | number | TreeNodeKeyType[] | undefined>;
    dropdownVisible: import("vue-demi").Ref<boolean>;
    checkedCount: import("vue-demi").Ref<number>;
    selectedTitle: import("vue-demi").Ref<string>;
    slotProps: {
        checkedNodes: {
            [x: string]: any;
            _level: number;
            checked: boolean;
            selected: boolean;
            indeterminate: boolean;
            disabled: boolean;
            expand: boolean;
            visible: boolean;
            _filterVisible: boolean;
            _parent: any | null;
            children: any[];
            isLeaf: boolean;
            _loading: boolean;
            _loaded: boolean;
            readonly _keyField: string;
            readonly _remote: boolean;
            setChildren: (children: import("../store/tree-node").ITreeNodeOptions[]) => void;
        }[];
        checkedKeys: TreeNodeKeyType[];
        selectedNode?: {
            [x: string]: any;
            _level: number;
            checked: boolean;
            selected: boolean;
            indeterminate: boolean;
            disabled: boolean;
            expand: boolean;
            visible: boolean;
            _filterVisible: boolean;
            _parent: any | null;
            children: any[];
            isLeaf: boolean;
            _loading: boolean;
            _loaded: boolean;
            readonly _keyField: string;
            readonly _remote: boolean;
            setChildren: (children: import("../store/tree-node").ITreeNodeOptions[]) => void;
        } | undefined;
        selectedKey?: TreeNodeKeyType | undefined;
    };
    wrapperCls: import("vue-demi").ComputedRef<string[]>;
    referenceCls: import("vue-demi").ComputedRef<string[]>;
    displayInputCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    displayInputTextCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    dropIconCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    clearIconCls: import("vue-demi").ComputedRef<string[]>;
    dropdownCls: import("vue-demi").ComputedRef<(string | undefined)[]>;
    checkable: import("vue-demi").ComputedRef<boolean>;
    selectable: import("vue-demi").ComputedRef<boolean>;
    displayValue: import("vue-demi").ComputedRef<string>;
    showClearIcon: import("vue-demi").ComputedRef<boolean>;
    referenceRef: import("vue-demi").Ref<any>;
    dropdownRef: import("vue-demi").Ref<any>;
    treeSearchRef: import("vue-demi").Ref<any>;
    locateDropdown: () => void;
    handleRefClick: () => void;
    handleDocumentClick: (e: MouseEvent) => void;
    handleClear: () => void;
    handleCheckedChange: (nodes: TreeNode[], keys: TreeNodeKeyType[]) => void;
    handleSelectedChange: (node?: TreeNode, key?: TreeNodeKeyType) => void;
    handleSetData: () => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, ("checked-change" | "update:modelValue" | "clear" | "dropdown-visible-change")[], "checked-change" | "update:modelValue" | "clear" | "dropdown-visible-change", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    /** 兼容 Vue 2.5.16 bug */
    modelValue: PropType<string | number | TreeNodeKeyType[]>;
    /** 下拉内容高度 */
    dropHeight: {
        type: NumberConstructor;
        default: number;
    };
    /** 展示输入框 placeholder */
    dropPlaceholder: {
        type: StringConstructor;
    };
    /** 是否禁用 */
    dropDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 允许清空 */
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 下拉弹出框位置 */
    placement: {
        type: PropType<"top" | "bottom" | "bottom-start" | "bottom-end" | "top-start" | "top-end">;
        default: placementEnum;
    };
    /** 将下拉 DOM 转移到 body 中 */
    transfer: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 在下拉框容器上额外添加的 class */
    dropdownClassName: PropType<string | string[]>;
    /** 下拉框容器最小宽度，未指定则默认为展示输入框宽度 */
    dropdownMinWidth: {
        type: NumberConstructor;
    };
    /** 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条 */
    dropdownWidthFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onChecked-change"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onDropdown-visible-change"?: ((...args: any[]) => any) | undefined;
}, {
    dropHeight: number;
    dropDisabled: boolean;
    clearable: boolean;
    placement: "top" | "bottom" | "bottom-start" | "bottom-end" | "top-start" | "top-end";
    transfer: boolean;
    dropdownWidthFixed: boolean;
}>;
export default _default;
