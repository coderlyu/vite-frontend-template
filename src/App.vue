<template>
  <router-view />
  <el-backtop target="#app" :bottom="50" />
</template>
<script>
import { defineComponent, provide, onMounted, onUnmounted } from 'vue'
import { getStore } from './store/index'
export default defineComponent({
  name: 'App',
  setup() {
    provide('Store',  getStore())
    const { store } = getStore()
    let timer = null
    const resize = (e) => {
      const width = document.documentElement.clientWidth || document.body.clientWidth
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        store.dispatch('updetaScreenWidth', width)
      }, 100)
    }
    onMounted(() => {
      if (timer) clearTimeout(timer)
      resize()
      window.addEventListener('resize', resize)
    })
    onUnmounted(() => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', resize)
    })
  }
})
</script>