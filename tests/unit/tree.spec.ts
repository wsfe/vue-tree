import { shallowMount, mount } from '@vue/test-utils'
import CTree from '../../src/components/Tree.vue'
import CTreeNode from '../../src/components/TreeNode.vue'
import treeDataGenerator, { ITreeNodeData } from '../tree-data-generator'
import TreeStore, { TreeNode } from '../../src/store'

//#region 通用方法

const genData = (extra: object = {}) => {
  return treeDataGenerator(Object.assign({
    treeDepth: 3,
    nodesPerLevel: 5,
    sameIdTitle: true,
  }, extra))
}

const flatten = (root: ITreeNodeData, result: ITreeNodeData[] = []): ITreeNodeData[] => {
  result.push(root)
  if (root.children && root.children.length) {
    root.children.forEach((child) => {
      flatten(child, result)
    })
  }
  return result
}

const asyncLoadData = (node: TreeNode | null, resolve: Function, reject: Function) => {
  setTimeout(() => {
    let result = []
    if (node === null) {
      result = genData({
        treeDepth: 1,
        nodesPerLevel: 5,
        sameIdTitle: true,
      }).data
    } else {
      result = genData({
        treeDepth: 1,
        nodesPerLevel: 2,
        sameIdTitle: true,
      }).data
    }
    resolve(result)
  }, 100)
}

//#endregion 通用方法

describe('树展示测试', () => {
  it('纯展示测试', () => {
    const data = genData().data
    const wrapper = shallowMount(CTree, {
      propsData: { data },
    })
    const vm = wrapper.vm

    expect((vm as any).nonReactive.store).toBeInstanceOf(TreeStore)
    expect((vm as any).nonReactive.store.flatData.length).toBe(155)
    expect((vm as any).nonReactive.blockNodes.length).toBe(5)
  })

  it('数据顺序正确性', () => {
    const data = genData({ inOrder: true }).data
    const wrapper = shallowMount(CTree, {
      propsData: { data },
    })
    const vm = wrapper.vm

    const length = (vm as any).nonReactive.store.flatData.length
    for (let i = 0; i < length; i++) {
      expect((vm as any).nonReactive.store.flatData[i].title).toBe(i)
    }
  })

  it('本地过滤', () => {
    const data = genData({ inOrder: true, forceString: true }).data
    const wrapper = shallowMount(CTree, {
      propsData: { data },
    })
    const vm: any = wrapper.vm

    vm.filter('126')

    expect((vm as any).nonReactive.blockNodes.length).toBe(3)

    vm.filter('', () => true)

    expect((vm as any).nonReactive.blockNodes.length).toBe((vm as any).nonReactive.store.flatData.length)
  })

  it('本地过滤 - 不展开节点', (done) => {
    const data = genData({ inOrder: true, forceString: true }).data
    const wrapper = mount(CTree, {
      propsData: {
        data,
        expandOnFilter: false,
      },
    })
    const vm: any = wrapper.vm

    vm.filter('126')

    expect((vm as any).nonReactive.blockNodes.length).toBe(1)

    vm.filter('', () => true)

    expect((vm as any).nonReactive.blockNodes.length).toBe(5)

    vm.$nextTick(() => {
      let $treeNodes = wrapper.findAll(CTreeNode)
      // 展开 124 节点
      $treeNodes.at(4).find('.ctree-tree-node__title').trigger('click')

      vm.filter('126')

      expect((vm as any).nonReactive.blockNodes.length).toBe(2)

      $treeNodes = wrapper.findAll(CTreeNode)
      // 展开搜索后的 125 节点
      $treeNodes.at(1).find('.ctree-tree-node__title').trigger('click')

      expect((vm as any).nonReactive.blockNodes.length).toBe(3)

      done()
    })
  })

  it('样式正确性', (done) => {
    const data = genData().data
    data[0].checked = true
    data[1].indeterminate = true
    data[2].selected = true
    data[3].disabled = true
    data[4].expand = true
    const wrapper = mount(CTree, {
      propsData: {
        data,
        checkable: true,
        selectable: true,
      },
    })
    const vm = wrapper.vm

    vm.$nextTick(() => {
      const $treeNodes = wrapper.findAll(CTreeNode)

      expect($treeNodes.at(0).contains('.ctree-tree-node__checkbox_checked')).toBe(true)
      expect($treeNodes.at(1).contains('.ctree-tree-node__checkbox_indeterminate')).toBe(true)
      expect($treeNodes.at(2).contains('.ctree-tree-node__title_selected')).toBe(true)
      expect($treeNodes.at(3).contains('.ctree-tree-node__checkbox_disabled')).toBe(true)
      expect($treeNodes.at(4).contains('.ctree-tree-node__expand_active')).toBe(true)

      done()
    })
  })
})

describe('树单选测试', () => {
  it('通过数据选中', () => {
    const data = genData().data
    data[0].selected = true
    const wrapper = shallowMount(CTree, {
      propsData: {
        data,
        selectable: true,
      },
    })
    const vm = wrapper.vm

    expect(wrapper.emitted().input[0][0]).toBe(data[0].id)
  })

  it('通过 value 选中', () => {
    const data = genData().data
    data[1].selected = true
    const wrapper = shallowMount(CTree, {
      propsData: {
        value: data[0].id,
        data,
        selectable: true,
      },
    })
    const vm = wrapper.vm

    expect((vm as any).nonReactive.store.flatData[0].selected).toBe(true)
  })

  it('数据与 value 同时选中', () => {
    const data = genData().data
    const wrapper = shallowMount(CTree, {
      propsData: {
        value: data[0].id,
        data,
        selectable: true,
      },
    })
    const vm = wrapper.vm

    expect((vm as any).nonReactive.store.flatData[0].selected).toBe(true)
  })

  it('通过点击选中', (done) => {
    const data = genData().data
    const wrapper = mount(CTree, {
      propsData: {
        value: data[0].id,
        data,
        selectable: true,
      },
    })
    const vm = wrapper.vm

    vm.$nextTick(() => {
      const $treeNodes = wrapper.findAll(CTreeNode)

      expect((vm as any).nonReactive.store.data[0].selected).toBe(true)
      expect($treeNodes.at(0).contains('.ctree-tree-node__title_selected')).toBe(true)

      $treeNodes.at(2).find('.ctree-tree-node__title').trigger('click')

      expect((vm as any).nonReactive.store.data[0].selected).toBe(false)
      expect($treeNodes.at(0).contains('.ctree-tree-node__title_selected')).toBe(false)
      expect((vm as any).nonReactive.store.data[2].selected).toBe(true)
      expect($treeNodes.at(2).contains('.ctree-tree-node__title_selected')).toBe(true)

      done()
    })
  })
})

describe('树多选测试', () => {
  it('通过数据选中', () => {
    const data = genData().data
    data[0].checked = true
    data[2].checked = true
    data[4].checked = true
    let value: Array<string | number> = []
    const wrapper = shallowMount(CTree, {
      propsData: {
        value,
        data,
        checkable: true,
      },
      listeners: {
        input: (emitValue: Array<string | number>) => {
          value = emitValue

          let expectedCheck = flatten(data[0]).concat(flatten(data[2]).concat(flatten(data[4]))).map((d) => d.id)
          expectedCheck = [...new Set(expectedCheck)]

          expect(value.length).toBe(expectedCheck.length)
          expect(value).toEqual(expect.arrayContaining(expectedCheck))
          expect(expectedCheck.length).toBeGreaterThan(1)
        },
      },
    })

    expect(wrapper.emitted().input.length).toBe(1)
  })

  it('通过 value 选中', () => {
    const data = genData().data
    let value: Array<string | number> = [data[0].id as string]
    const wrapper = shallowMount(CTree, {
      propsData: {
        value,
        data,
        checkable: true,
      },
      listeners: {
        input: (emitValue: Array<string | number>) => {
          value = emitValue

          let expectedCheck = flatten(data[0]).map((d) => d.id)
          expectedCheck = [...new Set(expectedCheck)]

          expect(value.length).toBe(expectedCheck.length)
          expect(value).toEqual(expect.arrayContaining(expectedCheck))
          expect(expectedCheck.length).toBeGreaterThan(1)
        },
      },
    })
    expect(wrapper.emitted().input.length).toBe(1)
  })

  it('数据与 value 同时选中', () => {
    const data = genData().data
    data[1].checked = true
    data[2].checked = true
    let value: Array<string | number> = [data[0].id as string]
    const wrapper = shallowMount(CTree, {
      propsData: {
        value,
        data,
        checkable: true,
      },
      listeners: {
        input: (emitValue: Array<string | number>) => {
          value = emitValue

          let expectedCheck = flatten(data[0]).concat(flatten(data[1]).concat(flatten(data[2]))).map((d) => d.id)
          expectedCheck = [...new Set(expectedCheck)]

          expect(value.length).toBe(expectedCheck.length)
          expect(value).toEqual(expect.arrayContaining(expectedCheck))
          expect(expectedCheck.length).toBeGreaterThan(3)
        },
      },
    })
    expect(wrapper.emitted().input.length).toBe(1)
  })

  it('通过点击选中', (done) => {
    const data = genData().data
    data[1].checked = true
    let value: Array<string | number> = [data[0].id as string]
    const wrapper = mount(CTree, {
      propsData: {
        value,
        data,
        checkable: true,
      },
      listeners: {
        input: (emitValue: Array<string | number>) => {
          value = emitValue
        },
      },
    })
    const vm = wrapper.vm

    vm.$nextTick(() => {
      const $treeNodes = wrapper.findAll(CTreeNode)

      expect((vm as any).nonReactive.store.data[0].checked).toBe(true)
      expect($treeNodes.at(0).contains('.ctree-tree-node__checkbox_checked')).toBe(true)

      $treeNodes.at(2).find('.ctree-tree-node__title').trigger('click')

      expect((vm as any).nonReactive.store.data[2].checked).toBe(true)
      expect($treeNodes.at(2).contains('.ctree-tree-node__checkbox_checked')).toBe(true)

      let expectedCheck = flatten(data[0]).concat(flatten(data[1]).concat(flatten(data[2]))).map((d) => d.id)
      expectedCheck = [...new Set(expectedCheck)]

      expect(value.length).toBe(expectedCheck.length)
      expect(value).toEqual(expect.arrayContaining(expectedCheck))
      expect(expectedCheck.length).toBeGreaterThan(2)

      done()
    })
  })

  it('单选与多选并存', (done) => {
    const data = genData().data
    data[0].checked = true
    data[0].selected = true
    let value: Array<string | number> = [data[0].id as string]
    const wrapper = mount(CTree, {
      propsData: {
        value,
        data,
        checkable: true,
        selectable: true,
      },
      listeners: {
        input: (emitValue: Array<string | number>) => {
          value = emitValue
        },
      },
    })
    const vm = wrapper.vm

    vm.$nextTick(() => {
      const $treeNodes = wrapper.findAll(CTreeNode)

      $treeNodes.at(1).find('.ctree-tree-node__checkbox').trigger('click')
      $treeNodes.at(1).find('.ctree-tree-node__title').trigger('click')

      // Checked nodes
      let expectedCheck = flatten(data[0]).concat(flatten(data[1])).map((d) => d.id)
      expectedCheck = [...new Set(expectedCheck)]

      expect(value.length).toBe(expectedCheck.length)
      expect(value).toEqual(expect.arrayContaining(expectedCheck))
      expect(expectedCheck.length).toBeGreaterThan(2)

      // Selected node
      expect((vm as any).getSelectedKey()).toBe(data[1].id)

      done()
    })

    expect(wrapper.emitted().input.length).toBe(1)
  })
})

describe('树远程测试', () => {
  it('远程加载根数据', (done) => {
    const wrapper = shallowMount(CTree, {
      propsData: {
        load: asyncLoadData,
      },
    })
    const vm = wrapper.vm

    setTimeout(() => {
      expect((vm as any).nonReactive.store.flatData.length).toBe(5)
      expect((vm as any).nonReactive.blockNodes.length).toBe(5)

      done()
    }, 200)
  })

  it('远程加载节点数据', (done) => {
    const wrapper = mount(CTree, {
      propsData: {
        load: asyncLoadData,
      },
    })
    const vm = wrapper.vm

    setTimeout(() => {
      expect((vm as any).nonReactive.store.flatData.length).toBe(5)
      expect((vm as any).nonReactive.blockNodes.length).toBe(5)

      const $treeNodes = wrapper.findAll(CTreeNode)

      $treeNodes.at(0).find('.ctree-tree-node__expand').trigger('click')

      setTimeout(() => {
        expect((vm as any).nonReactive.store.flatData.length).toBe(7)
        expect((vm as any).nonReactive.blockNodes.length).toBe(7)
        expect((vm as any).nonReactive.store.flatData[0].children.length).toBe(2)
        expect((vm as any).nonReactive.store.flatData[3].children.length).toBe(0)

        done()
      }, 200)
    }, 200)
  })
})

describe('节点拖拽测试', () => {
  it('拖拽数据正确性', (done) => {
    const data = genData({ inOrder: true }).data
    const wrapper = mount(CTree, {
      propsData: {
        data,
        draggable: true,
        droppable: true,
        defaultExpandAll: true,
      },
    })
    const vm = wrapper.vm

    vm.$nextTick(() => {
      let $treeNodes = wrapper.findAll(CTreeNode)

      const dataTransfer = {
        data: '',
        setData (format: string, data: string) { this.data = data },
        getData (format: string) { return this.data },
      }

      /**
       * 因为在 jest 里不方便获取 getBoundingClientRect (取到的值全是 0 )，所以这边基本上都用 insertAfter 的方式测试，无法插入为子节点
       */

      expect((vm as any).nonReactive.store.flatData[0].children[0].children.map((node: TreeNode) => node.id)).toEqual([2, 3, 4, 5, 6])

      // insertAfter
      $treeNodes.at(2).find('.ctree-tree-node__title').trigger('dragstart', { dataTransfer })
      $treeNodes.at(3).find('.ctree-tree-node__node-body').trigger('drop', { dataTransfer, clientY: 25 })

      expect((vm as any).nonReactive.store.flatData[0].children[0].children.map((node: TreeNode) => node.id)).toEqual([3, 2, 4, 5, 6])

      // insertAfter
      $treeNodes = wrapper.findAll(CTreeNode)
      $treeNodes.at(2).find('.ctree-tree-node__title').trigger('dragstart', { dataTransfer })
      $treeNodes.at(4).find('.ctree-tree-node__node-body').trigger('drop', { dataTransfer, clientY: 25 })

      expect((vm as any).nonReactive.store.flatData[0].children[0].children.map((node: TreeNode) => node.id)).toEqual([2, 4, 3, 5, 6])

      // insertBefore
      $treeNodes = wrapper.findAll(CTreeNode)
      $treeNodes.at(2).find('.ctree-tree-node__title').trigger('dragstart', { dataTransfer })
      $treeNodes.at(4).find('.ctree-tree-node__node-body').trigger('drop', { dataTransfer, clientY: 0 })

      expect((vm as any).nonReactive.store.flatData[0].children[0].children.map((node: TreeNode) => node.id)).toEqual([4, 2, 3, 5, 6])
      expect((vm as any).nonReactive.store.flatData[0].children[0].children[1].id).toBe(2)
      expect((vm as any).nonReactive.store.flatData[0].children[0].children[1].children.length).toBe(0)

      done()
    })
  })
})
