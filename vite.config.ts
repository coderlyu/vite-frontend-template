import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const mockPlugin = require("vite-plugin-mockit")
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
        target: `http://localhost:3030`,
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
    mockPlugin({
      entry: "./mock/index.js",
      watchFiles: [],
      watchOptions: {},
      ignore: /_test/
    }),
    svgLoader()
  ]
})
