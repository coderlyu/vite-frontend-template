import dev from './dev.conf.js'
import prod from './prod.conf.js'
export default (({ mode }) => {
  if (mode === 'development') {
    return dev()
  } else {
    console.info('当前模式为：', mode)
    return prod()
  }
})