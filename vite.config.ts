import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
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
    server: {
      open:true,
      hmr:true
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: resolve(__dirname,'src/index.ts'),
        name:'Vtree',
        fileName: 'vue-tree'
      },
      rollupOptions: {
        output: {
          exports: 'named'
        }
      }
    }
  }
})