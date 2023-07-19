import { defineConfig, UserConfig } from 'vite'
// import vue2 from '@vitejs/plugin-vue2'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve, join } from 'path'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  return {
    resolve: {
      alias: {
        '@': resolve('../../src')
      }
    },
    plugins: [createVuePlugin()],
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    server: {
      open:true,
      hmr:true
    },
    build: {
      lib: {
        entry: resolve(__dirname,'../../src/index.ts'),
        name:'Vtree',
        fileName: 'vue-tree'
      },
      rollupOptions: {
        external: ['vue', 'vue-demi'],
        output: {
          dir: join(__dirname, '../../dist/v2'),
          exports: 'named',
          globals: {
            vue: 'Vue',
            'vue-demi': 'VueDemi'
          }
        }
      }
    }
  }
})