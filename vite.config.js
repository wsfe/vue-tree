import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd());
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
  server:{
    open:true,
    hmr:true
  },
  build:{
    outDir: env.VITE_OUTPUT_DIR || 'dist',
    lib:{
      entry:env.VITE_IS_BUILDING_DOCS?resolve(__dirname,'examples/main.js'):resolve(__dirname,'src/index.ts'),
      name:'@wsfe/ctree'
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
}})