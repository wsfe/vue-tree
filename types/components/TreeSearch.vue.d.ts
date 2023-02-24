import { Ref, PropType } from 'vue-demi';
import type { TreeNodeKeyType } from '../types';
declare const _default: import("vue-demi").DefineComponent<{
    /** 兼容 Vue 2.5.16 bug */
    modelValue: PropType<string | number | TreeNodeKeyType[]>;
    /** 搜索输入框的 placeholder */
    searchPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示全选复选框 */
    showCheckAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示已选按钮 */
    showCheckedButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 已选按钮文字 */
    checkedButtonText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示底部信息 */
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
    searchMethod: PropType<(keyword: string) => void | Promise<void>>;
    /** 触发搜索的字符长度 */
    searchLength: {
        type: NumberConstructor;
        default: number;
    };
    /** 禁用搜索功能 */
    searchDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否远程搜索，传入 `searchMethod` 时无效 */
    searchRemote: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 搜索防抖时间，单位为毫秒 */
    searchDebounceTime: {
        type: NumberConstructor;
        default: number;
    };
}, {
    treeModelValue: import("vue-demi").WritableComputedRef<string | number | TreeNodeKeyType[] | undefined>;
    setChecked: (a: any, b: any) => void;
    checkAllStatus: {
        checked: boolean;
        indeterminate: boolean;
        disabled: boolean;
    };
    isShowingChecked: Ref<boolean>;
    keyword: Ref<string>;
    debounceTimer: Ref<number | undefined>;
    checkedCount: Ref<number>;
    wrapperCls: import("vue-demi").ComputedRef<string[]>;
    searchCls: import("vue-demi").ComputedRef<string[]>;
    checkAllWrapperCls: import("vue-demi").ComputedRef<string[]>;
    checkboxCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    inputWrapperCls: import("vue-demi").ComputedRef<string[]>;
    inputCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    actionWrapperCls: import("vue-demi").ComputedRef<string[]>;
    checkedButtonCls: import("vue-demi").ComputedRef<(string | {
        [x: string]: boolean;
    })[]>;
    treeWrapperCls: import("vue-demi").ComputedRef<string[]>;
    footerCls: import("vue-demi").ComputedRef<string[]>;
    checkable: import("vue-demi").ComputedRef<boolean>;
    treeRef: Ref<any>;
    handleCheckAll: () => void;
    handleSearch: () => void;
    handleShowChecked: () => void;
    updateCheckedCount: () => void;
    handleSetData: () => void;
    updateCheckAllStatus: () => void;
    getKeyword: () => string;
    checkedChange: (value1: any, value2: any) => void;
    onSetData: () => void;
    clearKeyword: () => void;
    search: (keyword1?: string) => Promise<void>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, ("search" | "set-data" | "checked-change" | "update:modelValue")[], "search" | "set-data" | "checked-change" | "update:modelValue", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    /** 兼容 Vue 2.5.16 bug */
    modelValue: PropType<string | number | TreeNodeKeyType[]>;
    /** 搜索输入框的 placeholder */
    searchPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示全选复选框 */
    showCheckAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示已选按钮 */
    showCheckedButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 已选按钮文字 */
    checkedButtonText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示底部信息 */
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
    searchMethod: PropType<(keyword: string) => void | Promise<void>>;
    /** 触发搜索的字符长度 */
    searchLength: {
        type: NumberConstructor;
        default: number;
    };
    /** 禁用搜索功能 */
    searchDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否远程搜索，传入 `searchMethod` 时无效 */
    searchRemote: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 搜索防抖时间，单位为毫秒 */
    searchDebounceTime: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onSearch?: ((...args: any[]) => any) | undefined;
    "onSet-data"?: ((...args: any[]) => any) | undefined;
    "onChecked-change"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    searchPlaceholder: string;
    showCheckAll: boolean;
    showCheckedButton: boolean;
    checkedButtonText: string;
    showFooter: boolean;
    searchLength: number;
    searchDisabled: boolean;
    searchRemote: boolean;
    searchDebounceTime: number;
}>;
export default _default;
