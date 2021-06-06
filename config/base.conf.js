
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import styleImport from 'vite-plugin-style-import'
const path = require('path')

export default {
  root: process.cwd(),
  publicDir: 'public',
  logLevel: 'error',
  envDir: process.cwd(),
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      'views': path.resolve(process.cwd(), 'src/views'),
    }
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer')]
    },
     // 引入全局 scss
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/assets/css/global.scss';"
      }
    }
  },
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
}