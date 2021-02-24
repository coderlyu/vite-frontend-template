<template>
  <el-container>
    <el-header>
      <top-header />
    </el-header>
    <el-row class="self-container">
      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
        <left-nav />
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="18" :xl="20">
        <router-view />
      </el-col>
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LeftNav from './left-nav.vue'
import TopHeader from './top-header.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    LeftNav,
    TopHeader
  },
})
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background: #fff;
}
.self-container {
  height: 100%;
}
</style>
