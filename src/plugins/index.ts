import { router } from './router'
import { store, key } from './store'
import ElementUI from './element-ui'
import { App } from 'vue'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
export default {
  install(vue: App) {
    vue.use(router)
    vue.use(store, key)
    vue.use(ElementUI)
    locale.use(lang) // 设置 element-plus 中文，暂时没法起作用，原因待研究
  }
}