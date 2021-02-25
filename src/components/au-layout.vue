<template>
  <el-container>
    <el-header>
      <top-header />
    </el-header>
    <el-row class="self-container">
      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" class="hidden-xs-only">
        <left-nav />
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="18" :xl="20" style="margin-bottom: 16px;">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-col>
    </el-row>
  </el-container>
  <template v-if="isMobile">
    <div class="au-bg-white mobile-nav" :class="toggleClass">
      <left-nav />
    </div>
    <div v-if="isMobile && !closed" class="mobile-mark" @click="toggleClick" />
  </template>
</template>
<script lang="ts">
import { defineComponent, ComputedRef } from 'vue'
import LeftNav from './au-nav.vue'
import TopHeader from './au-header.vue'
import Screen from './au-screen'
export default defineComponent({
  name: 'Layout',
  components: {
    LeftNav,
    TopHeader
  },
  setup(props, ctx) {
    const toggleClass = (isMobile: ComputedRef, closed: ComputedRef) => {
      if (!isMobile.value) return ''
      else return closed.value ? 'self-opend' : 'self-closed'
    }
    return {
      ...Screen(ctx, toggleClass)
    }
  }
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
.mobile-nav {
  position: fixed;
  width: 200px;
  top: 0;
  left: -210px;
  bottom: 0;
  z-index: 10000;
}
.mobile-mark {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, .4);
}
.self-closed {
  animation: closedToOpen .5s forwards;
}
.self-opend {
  animation: openToClosed .5s forwards;
}

.fade-enter-active {
  transition: all .3s ease;
  transform: translateY(0);
}
.fade-leave-active {
  transition: all .3s ease;
  transform: translateY(50px);
}

.fade-enter-from{
  transform: translateY(50px);
}
.fade-leave-to {
  transform: translateY(0);
}

@keyframes closedToOpen {
  0% {
    left: -210px;
  }
  100% {
    left: 0px;
  }
}
@keyframes openToClosed {
  0% {
    left: 0px;
  }
  100% {
    left: -210px;
  }
}
</style>
