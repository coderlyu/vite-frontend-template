import baseConfig from './base.conf.js'
import { merge } from 'lodash'
const packJson = require('../package.json')
const execSync = require('child_process').execSync // 同步子进程
let date = new Date(execSync('git show -s --format=%cd').toString())
let ref = execSync('git show -s --format=%D').toString().trim()
let hash = execSync('git show -s --format=%H').toString().trim()

/** 格式化 - 日期 */
function formatDate(t) {
  let year = t.getFullYear()
  let month = t.getMonth()
  let day = t.getDate()
  let h = t.getHours()
  let m = t.getMinutes()
  let s = t.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return `${year}-${month}-${day} ${h}:${m}:${s}`
}
/** 格式化 - 当前分支信息 */
function currentRef(str) {
  let fs = str.split(',')
  let s = fs.filter((s) => s.indexOf('->') !== -1)[0]
  return s.slice(s.indexOf('->') + 2)
}

let messages = '/*' + Buffer.from(`ref: ${currentRef(ref)}, date: ${formatDate(date)}, hash: ${hash}, project: -name- ${packJson.name} -v- ${packJson.version}`).toString('base64') + '*/'

const prodConfig = {
  mode: 'production',
  logLevel: 'info',
  build: {
    target: 'modules',
    polyfillDynamicImport: true, // 自动注入 动态导入 polyfill
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 8192, // 小于 8kb 的导入或引用资源将内联为 base64 编码
    cssCodeSplit: false, // 在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入
    sourcemap: false, // 构建后是否生成 source map 文件
    rollupOptions: {
      output: {
        banner: messages,
        manualChunks: {
          lodash: ['lodash'],
          echarts: ['echarts'],
          axios: ['axios']
        }
      }
    },
    minify: 'terser',
    chunkSizeWarningLimit: 800, // chunk 大小警告的限制
  }
}

export default function prodConfigFunc() {
  return merge(prodConfig, baseConfig)
}