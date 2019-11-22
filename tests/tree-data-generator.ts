export interface ITreeNodeData {
  title?: string | number,
  id?: string | number,
  checked?: boolean,
  indeterminate?: boolean,
  selected?: boolean,
  disabled?: boolean,
  children?: ITreeNodeData[],
  [key: string]: any,
}

interface IGeneratorOptions {
  treeDepth?: number,
  nodesPerLevel?: number,
  sameIdTitle?: boolean,
  inOrder?: boolean,
  forceString?: boolean,
}

const genRandomStr = (): string => {
  return Math.random().toString(36).substring(2)
}

export default ({
  treeDepth = 5,
  nodesPerLevel,
  sameIdTitle = false,
  inOrder = false,
  forceString = false,
}: IGeneratorOptions = {}): { data: ITreeNodeData[], total: number } => {
  let data: ITreeNodeData[] = []
  let total = 0
  let orderCount = 0
  const genNodeData = (root: ITreeNodeData[], level: number = 0): void => {
    if (level >= treeDepth) return
    const len: number = nodesPerLevel ? nodesPerLevel : Math.floor(Math.random() * 100)
    for (let i: number = 0; i < len; i++) {
      let title = inOrder ? orderCount++ : genRandomStr()
      if (forceString) title = title.toString()
      const id = sameIdTitle ? title : genRandomStr()
      const node = {
        title,
        id,
        children: [],
      }
      root.push(node)
      total++
      genNodeData(node.children, level + 1)
    }
  }
  genNodeData(data)
  return {
    data,
    total,
  }
}
