import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  return {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [vue()],
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    build:{
      outDir: 'docs'
    }
  }
})