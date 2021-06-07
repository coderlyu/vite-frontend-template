
import { merge } from 'lodash'
import baseConfig from './base.conf.js'

const devConfig = {
  mode: 'development',
  logLevel: 'error',
  clearScreen: false, // 不会清空上一次控制台打印信息
  server: {
    host: '127.0.0.1',
    open: true,
    port: 3030,
    strictPort: true, // 若端口已被占用则会直接退出，而不是尝试下一个可用端口
    force: true, // 强制使依赖预构建
    proxy: {
      '/au': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/au/, '')
      }
    }
  }
}
export default function devConfigFunc() {
  return merge(devConfig, baseConfig)
}