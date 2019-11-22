import { shallowMount, mount } from '@vue/test-utils'
import CTreeSearch from '../../src/components/TreeSearch.vue'
import CTree from '../../src/components/Tree.vue'
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

describe('树搜索测试', () => {
  it('本地搜索', (done) => {
    const data = genData({ inOrder: true }).data
    const wrapper = mount(CTreeSearch, {
      propsData: { data },
    })
    const vm = wrapper.vm
    const tree = wrapper.find(CTree).vm

    const input = wrapper.find('.ctree-tree-search__input')
    const inputElement = input.element as HTMLInputElement
    inputElement.value = '30'
    input.trigger('input')

    setTimeout(() => {
      vm.$nextTick(() => {
        expect((tree as any).nonReactive.store.flatData.filter((node: TreeNode) => node.visible).map((node: TreeNode) => node.id))
        .toEqual([0, 25, 30, 124, 125, 130])

        inputElement.value = ''
        input.trigger('input')

        setTimeout(() => {
          vm.$nextTick(() => {
            expect((tree as any).nonReactive.store.flatData.filter((node: TreeNode) => node.visible).map((node: TreeNode) => node.id))
            .toEqual((tree as any).nonReactive.store.flatData.map((node: TreeNode) => node.id))

            done()
          })
        }, 300)
      })
    }, 300)

  })
})

describe('树远程搜索增强测试包', () => {
  it('远程搜索', (done) => {
    const times = [3, 2, 5]
    let index = 0
    const load = (node: TreeNode | null, resolve: Function, reject: Function) => {
      setTimeout(() => {
        const data = genData({ inOrder: true, forceString: true, nodesPerLevel: times[index] }).data
        resolve(data)
      }, 10)
    }
    const wrapper = mount(CTreeSearch, {
      propsData: {
        load,
        searchRemote: true,
        checkable: true,
        value: ['93', '124'],
      },
      listeners: {
        input: (emitValue: Array<string | number>) => {
          wrapper.setProps({ value: emitValue })
        },
      },
    })
    const vm = wrapper.vm
    const treeWrapper = wrapper.find(CTree)

    const input = wrapper.find('.ctree-tree-search__input')
    const inputElement = input.element as HTMLInputElement
    inputElement.value = '30'

    const initValue = [ '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152', '153', '154' ]

    setTimeout(() => {
      vm.$nextTick(() => {
        // index = 0
        expect(treeWrapper.props('value')).toEqual(['93', '124'])

        index = 1

        input.trigger('input')

        setTimeout(() => {
          vm.$nextTick(() => {
            expect(treeWrapper.props('value')).toEqual(['93', '124'])

            setTimeout(() => {
              const vmOfAny = vm as any

              vmOfAny.setChecked('4', true)

              vm.$nextTick(() => {
                expect(treeWrapper.props('value')).toEqual(['4', '5', '6', '93', '124'])

                index = 2

                input.trigger('input')

                setTimeout(() => {
                  vm.$nextTick(() => {
                    // 5
                    expect(treeWrapper.props('value')).toEqual(['4', '5', '6'].concat(initValue))

                    done()
                  })
                }, 340)
              })
            }, 50)
          })
        }, 320)
      })
    }, 15)
  })
})
