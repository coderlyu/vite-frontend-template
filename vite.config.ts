import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const mockPlugin = require("vite-plugin-mockit")
import svgLoader from 'vite-svg-loader'
import styleImport from 'vite-plugin-style-import' // element-ui 样式按需加载

export default defineConfig({
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
