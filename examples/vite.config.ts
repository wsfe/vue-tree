import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // root: __dirname,
    base: './',
    // resolve: {
    //   alias: {
    //     '@': resolve('src')
    //   }
    // },
    plugins: [vue()],
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    build: {
      outDir: 'docs'
    }
  }
})
