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
      <el-submenu index="Census">
        <template #title>
          <i class="el-icon-menu"></i>
          数据统计
        </template>
        <el-menu-item index="Rank">
          <i class="el-icon-pie-chart"></i>
          <template #title>最新排名</template>
        </el-menu-item>
        <el-menu-item index="Data">
          <i class="el-icon-postcard"></i>
          <template #title>实时信息</template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="CodeDiff">
        <i class="el-icon-s-order"></i>
        <template #title>文本差异</template>
      </el-menu-item>
      <el-menu-item index="ListScroll">
        <i class="el-icon-s-order"></i>
        <template #title>滚动回弹</template>
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
      router.push({
        name: type
      })
    }
    return {
      defaultActive,
      selectMenuItem
    }
  }
})
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  li {
    border-left: 3px solid transparent;
    i {
      display: inline-block;
      text-align: left;
      width: 40px;
    }
  }
  :deep(li.is-active.el-menu-item) {
    background: #f2f8ff;
    border-left: 3px solid #409EFF;
  }
}
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
