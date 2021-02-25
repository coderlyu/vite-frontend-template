<template>
  <router-view />
  <el-backtop target="#app" :bottom="50" />
</template>
<script>
import { defineComponent, provide } from 'vue'
import { getStore } from './store/index'
export default defineComponent({
  name: 'App',
  setup() {
    provide('Store', getStore())
  }
})
</script>