<template>
  <router-view />
  <el-backtop target="#app" :bottom="50" />
</template>
<script>
import { defineComponent, provide } from 'vue'
import Layout from './components/Layout.vue'
import { getStore } from './store/index'
export default defineComponent({
  components: {
    Layout
  },
  setup() {
    provide('Store', getStore())
  }
})
</script>