import CTree from './components/Tree.vue'
import type { Ref } from 'vue'
import { API_METHODS } from './const'

type CTreeInstanceType = InstanceType<typeof CTree>
type CtreeInstanceKeyType = keyof CTreeInstanceType

// Vue 2.6 内部没改变的话可以这样获取 Vue.extend 中的 methods。Vue 版本有升级的话需要注意这个特性有没有改变
// 如果是对象的话可以直接 CTree.methods ，并且是安全的。
// let ctreeMethods: CTreeApiMethodsType = {} as CTreeApiMethodsType

export function getCtreeMethods<T>(treeRef: Ref<T>) {
  return API_METHODS.reduce((prev, cur) => {
    prev[cur] = function (...args: any[]) {
      return (treeRef.value[cur as keyof T] as Function).apply(
        treeRef.value,
        args
      )
    }
    return prev
  }, {} as Record<string, Function>)
}
