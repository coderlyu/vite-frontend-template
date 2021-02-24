<template>
  <div class="top-header-wrapper">
    <section class="left-title">
      <img src="../assets/images/study.png" alt="logo" class="left-logo">
      <h1>后台管理模板</h1>
    </section>
    <el-dropdown @command="commandClick">
      <span class="el-dropdown-link">
        <img src="../assets/images/profile.jpg" alt="profile" class="profile-avatar">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="Home">主页</el-dropdown-item>
          <el-dropdown-item command="Data">数据</el-dropdown-item>
          <el-dropdown-item command="Setting">设置</el-dropdown-item>
          <el-dropdown-item command="Logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../plugins/store'
export default defineComponent({
  name: 'TopHeader',
  setup(prop, ctx) {
    const router = useRouter()
    const store = useStore(key)
    const commandClick = (type) => {
      switch (type) {
        case 'Home':
          router.push({ name: 'Home' })
          break
        case 'Data':
          router.push({ name: 'Data' })
          break
        case 'Setting':
          console.log('Setting')
          break
        case 'Logout':
          store.dispatch('clearToken').then(() => {
            router.push('/')
          })
          break
      }
    }
    return {
      commandClick
    }
  },
})
</script>
<style lang="scss" scoped>
.top-header-wrapper {
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  .left-title {
    display: flex;
    align-items: center;
    .left-logo {
      height: 60px;
    }
    h1 {
      letter-spacing: 0.5em;
      margin-left: 1em;
      font-size: 25px;
    }
  }
  .el-dropdown-link {
    display: flex;
    line-height: 60px;
    height: 60px;
    align-items: center;
    cursor: pointer;
    .profile-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
