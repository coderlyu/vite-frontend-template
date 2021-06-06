import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  root: process.cwd(),
  server: {
    open: false,
    port: 3030,
    strictPort: true,
    proxy: {
      '/au': {
        target: `http://localhost:8888`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/au/, '')
      }
    }
  },
  publicDir: 'public',
  logLevel: 'error',
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }]
    }),
    svgLoader()
  ]
})
