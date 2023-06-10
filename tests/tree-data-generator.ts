import { faker } from '@faker-js/faker'

export interface ITreeNodeData {
  title?: string | number
  id?: string | number
  checked?: boolean
  indeterminate?: boolean
  selected?: boolean
  disabled?: boolean
  children?: ITreeNodeData[]
  [key: string]: any
}

interface IGeneratorOptions {
  treeDepth?: number
  nodesPerLevel?: number
  sameIdTitle?: boolean
  inOrder?: boolean
  forceString?: boolean
  useNanoID?: boolean
}

const genRandomStr = ({ index, useNanoID }: { index?: number; useNanoID?: boolean }): string => {
  if (useNanoID) {
    return faker.string.nanoid()
  }
  const randomStr = faker.person.lastName()
  return index == null ? randomStr : `${randomStr} - (${index})`
}

export default ({
  treeDepth = 5,
  nodesPerLevel,
  sameIdTitle = false,
  inOrder = false,
  forceString = false,
  useNanoID = false,
}: IGeneratorOptions = {}): { data: ITreeNodeData[]; total: number } => {
  let data: ITreeNodeData[] = []
  let total = 0
  let orderCount = 0
  const genNodeData = (root: ITreeNodeData[], level: number = 0): void => {
    if (level >= treeDepth) return
    const len: number = nodesPerLevel
      ? nodesPerLevel
      : Math.floor(Math.random() * 100)
    for (let i: number = 0; i < len; i++) {
      let title = inOrder ? orderCount : genRandomStr({ index: orderCount })
      if (forceString) title = title.toString()
      const id = sameIdTitle ? title : genRandomStr({ index: orderCount, useNanoID })
      const node = {
        title,
        id,
        children: []
      }
      root.push(node)
      total++
      orderCount++
      genNodeData(node.children, level + 1)
    }
  }
  genNodeData(data)
  return {
    data,
    total
  }
}
