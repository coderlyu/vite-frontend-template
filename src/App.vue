<template>
  <router-view />
  <el-backtop target="#app" :bottom="isMobile ? 30 : 50" :right="isMobile ? 15 : 40"/>
</template>
<script>
import { defineComponent, provide, onMounted, onUnmounted, computed } from 'vue'
import { getStore } from './store/index'
export default defineComponent({
  name: 'App',
  setup() {
    provide('Store',  getStore())
    const { store } = getStore()
    const isMobile = computed(() => store.getters.isMobile)
    let timer = null
    const resize = (e) => {
      const width = document.documentElement.clientWidth || document.body.clientWidth
      if (timer) return
      timer = setTimeout(() => {
        store.dispatch('updetaScreenWidth', width)
        timer = null
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
    return {
      isMobile
    }
  }
})
</script>