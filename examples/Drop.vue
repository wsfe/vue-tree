<template>
  <div>
    <div style="width: 200px;">
      <p>自定义展示 slot ：</p>
      <CTreeDrop
        v-model="value"
        :data="data"
        checkable
        clearable
        drop-placeholder="请选择"
        :placement="placement"
        :dropdown-min-width="300"
        dropdown-width-fixed
        @checked-change="handleCheckedChange"
      >
        <template v-slot:display="scope">
          <div
            style="width: 170px; text-overflow: ellipsis; overflow: hidden;"
          >{{ scope.checkedNodes.map((node) => node.title).join(',') }}</div>
        </template>
        <span slot="empty">slot 传进来的暂无数据</span>
      </CTreeDrop>
      {{ value }}
    </div>
    <div style="width: 200px;">
      <p>默认：</p>
      <CTreeDrop
        v-model="value"
        :data="data"
        checkable
        clearable
        drop-placeholder="请选择"
        :placement="placement"
        :dropdown-min-width="300"
        dropdown-width-fixed
        @checked-change="handleCheckedChange"
      >
        <span slot="empty">slot 传进来的暂无数据</span>
      </CTreeDrop>
      {{ value }}
    </div>
  </div>
</template>

<script>
import { CTreeDrop } from '../src'
import treeDataGenerator from '../tests/tree-data-generator'

const genData = (extra = {}) => {
  return treeDataGenerator(Object.assign({
    treeDepth: 3,
    nodesPerLevel: 5,
    sameIdTitle: true,
    inOrder: true,
    forceString: true,
  }, extra))
}

export default {
  name: 'Drop',
  components: {
    CTreeDrop,
  },
  data () {
    const data = genData().data
    // const data = [{
    //   id: '1',
    //   title: 'zzz',
    // }]
    // data[0].checked = true
    // data[2].checked = true
    // data[4].checked = true
    return {
      data,
      value: '2',
      placement: 'bottom-start',
    }
  },
  methods: {
    handleCheckedChange () {
      console.log('checked-change')
    },
  },
  // created () {
  //   setTimeout(() => {
  //     this.data = [
  //       {
  //         id: '2',
  //         title: 'xxcxxxx',
  //       }
  //     ]
  //   }, 3000)
  // },
}
</script>
