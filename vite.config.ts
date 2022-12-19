import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// vite.config.ts
export default defineConfig(()=>{
  return {
      plugins: [vue()],
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            nested: resolve(__dirname, 'src/nested/index.html'),
          },
        },
      },
  }
})
