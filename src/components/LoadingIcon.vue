<template>
  <svg viewBox="0 0 50 50">
    <circle
      class="ctree-loading-icon__circle"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke-width="5"
      stroke-miterlimit="10"
    ></circle>
  </svg>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

export default Vue.extend({
  name: 'CLoadingIcon',
})
</script>
