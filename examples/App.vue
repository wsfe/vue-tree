<template>
  <div class="app">
    <div class="tab">
      <button v-for="tab in tabList" :key="tab" :class="{
        active: currentTab === tab
      }" @click="currentTab = tab">{{ tab }}</button>
    </div>
    <div class="tab-panel">
      <component :is="currentTab"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue-demi'
import Drag from './Drag.vue'

import Loading from './Loading.vue'
import Search from './Search.vue'
import Drop from './Drop.vue'
import DropDataChange from './DropDataChange.vue'
import Feature from './Feature.vue'
import Performance from './Performance.vue'
import InsertRenderTree from './InsertRenderTree.vue'


export default defineComponent({
  components: {
    Loading,
    Search,
    Drop,
    Drag,
    // DropDataChange,
    Feature,
    Performance,
    InsertRenderTree
  },
  setup(props) {
    const components = {
      Feature,
      Performance,
      Loading,
      Search,
      // SearchRemote,
      // SearchRootRemote,
      Drop,
      // DropRemote,
      Drag,
      // DropDataChange,
      InsertRenderTree,
    }
    const tabList = reactive(Object.keys(components)) as any[]
    const currentTab = ref(tabList[0])
    return {
      tabList,
      currentTab
    }
  }
})
</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .tab {
    height: 90px;
    padding: 10px 50px;
    border-bottom: 1px solid lightgray;

    button {
      cursor: pointer;
      width: 100px;
      height: 38px;
      margin-right: 30px;
      margin-bottom: 10px;
      border-radius: 5px;
      background: lightcyan;

      &:focus {
        outline: none;
      }
    }

    .active {
      background: lightblue;
    }
  }

  .tab-panel {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
