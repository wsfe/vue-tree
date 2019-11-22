export interface ITreeNodeData {
    title?: string | number;
    id?: string | number;
    checked?: boolean;
    indeterminate?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children?: ITreeNodeData[];
    [key: string]: any;
}
interface IGeneratorOptions {
    treeDepth?: number;
    nodesPerLevel?: number;
    sameIdTitle?: boolean;
    inOrder?: boolean;
    forceString?: boolean;
}
declare const _default: ({ treeDepth, nodesPerLevel, sameIdTitle, inOrder, forceString, }?: IGeneratorOptions) => {
    data: ITreeNodeData[];
    total: number;
};
export default _default;
