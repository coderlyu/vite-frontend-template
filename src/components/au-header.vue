<template>
  <div class="au-bg-white top-header-wrapper">
    <section class="left-title">
      <i v-if="isMobile" class="toggle-icon au-ml-16" :class="toggleClass" @click="toggleClick"></i>
      <img v-if="!isMobile" src="../assets/logo.png" alt="logo" class="left-logo">
      <h1 @click="router.push('/')">{{ isMobile ? 'AU' : 'AU IS A PERSON' }}</h1>
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
import { defineComponent, inject, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Screen from './au-screen'
export default defineComponent({
  name: 'TopHeader',
  setup(prop, ctx) {
    const router = useRouter()
    const { store } = inject('Store')
    const commandClick = (type) => {
      const _c = {
        Home() {
          router.push({ name: 'Home' })
        },
        Data() {
          router.push({ name: 'Data' })
        },
        Setting() {
          console.log('Setting')
        },
        Logout() {
          store.dispatch('clearToken').then(() => {
            router.push({ path: '/login' })
          })
        }
      }
      typeof _c[type] === 'function' && _c[type]()
    }
    return {
     ...Screen(ctx),
      commandClick,
      router
    }
  },
})
</script>
<style lang="scss" scoped>
.top-header-wrapper {
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .left-title {
    display: flex;
    align-items: center;
    .toggle-icon {
      color: #409EFF;
      font-size: 25px;
      cursor: pointer;
    }
    .left-logo {
      height: 60px;
      margin-left: 32px;
    }
    h1 {
      font-family: fantasy;
      color: #409EFF;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 0.2em;
      margin-left: 1em;
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
