<template>
  <div class="left-nav-wrapper">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @select="selectMenuItem"
    >
      <el-menu-item index="Home">
        <i class="el-icon-s-home"></i>
        <template #title>主页</template>
      </el-menu-item>
      <el-menu-item index="Data">
        <i class="el-icon-menu"></i>
        <template #title>数据</template>
      </el-menu-item>
      <el-menu-item index="About">
        <i class="el-icon-s-order"></i>
        <template #title>关于</template>
      </el-menu-item>
      <el-menu-item index="Profile">
        <i class="el-icon-user-solid"></i>
        <template #title>我的</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'LeftNav',
  setup(prop, ctx) {
    const route = useRoute()
    const router = useRouter()
    const defaultActive = computed(() => route.name)
    const selectMenuItem = (type) => {
      switch (type) {
        case 'Home':
          router.push({
            name: 'Home'
          })
          break
        case 'Data':
          router.push({
            name: 'Data'
          })
          break
        case 'About':
          router.push({
            name: 'About'
          })
          break
        case 'Profile':
          router.push({
            name: 'Profile'
          })
          break
      }
    }
    return {
      defaultActive,
      selectMenuItem
    }
  }
})
</script>
<style lang="scss" scoped>
.el-menu {
  max-width: 300px;
  background: #fff;
  border: none;
  flex: 1;
}
.left-nav-wrapper {
  padding-top: 32px;
  display: flex;
  justify-content: center;
}
</style>
