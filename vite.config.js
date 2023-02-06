import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [vue()],
  server:{
    open:true,
    hmr:true
  },
  build:{
    outDir:'dist',
    lib:{
      entry:resolve(__dirname,'src/index.ts')
    }
  },
  css:{
    preprocessorOptions:{
        less:{
        }
    }
  },
  // build:{
  //   rollupOptions:{
  //       input: {
  //           main:resolve(__dirname,'./examples/index.html'),
  //           docs:resolve(__dirname,'./docs/index.html'),
  //       }
  //   }
  // }
})