<template>
  <div class="app">
    <div class="tab">
      <button
        v-for="tab in tabList"
        :key="tab"
        :class="{
          active: currentTab === tab
        }"
        @click="currentTab = tab"
      >{{ tab }}</button>
    </div>
    <div class="tab-panel">
      <component :is="currentTab"></component>
    </div>
  </div>
</template>

<script>
import Feature from './Feature'
import Performance from './Performance'
import Loading from './Loading'
import Search from './Search'
import SearchRemote from './SearchRemote'
import SearchRootRemote from './SearchRootRemote'
import Drop from './Drop'
import DropRemote from './DropRemote'
import Drag from './Drag'
import DropDataChange from './DropDataChange'
import InsertRenderTree from './InsertRenderTree'

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

export default {
  name: 'App',
  components,
  data () {
    const tabList = Object.keys(components)
    return {
      currentTab: tabList[0],
      tabList,
    }
  },
}
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
