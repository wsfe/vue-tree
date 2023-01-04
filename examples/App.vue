<template>
  <div class="app">
      1111111
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive} from 'vue'
export default defineComponent({
  components: {
  },
  setup(props) {
    return {
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
