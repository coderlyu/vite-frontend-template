<template>
  <el-container>
    <el-header>
      <top-header />
    </el-header>
    <el-row :gutter="16" class="self-container">
      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4" class="hidden-xs-only" style="position: relative">
        <left-nav :style="navComputedStyle" />
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="18" :xl="20" style="margin-bottom: 16px;">
        <transition name="fade">
          <router-view />
        </transition>
        <!-- ↑↑↑ 下面这句可以解决控制台警告信息，但是过渡动画会出现问题 ↑↑↑ -->
        <!-- <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view> -->
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
import { defineComponent, ComputedRef, onMounted, computed, ref, onUnmounted } from 'vue'
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
    const scrollTop = ref(0)
    const doc = ref(null)
    const navComputedStyle = computed(() => {
      let _style = {
        position: 'absolute',
        width: '100%',
        left: '50%',
        top: `${scrollTop.value}px`,
        transform: `translateX(-50%)`
      }
      return _style
    })
    const computeScroll =  (e: any) => {
      scrollTop.value = e.target.scrollTop
    }
    onMounted(() => {
      let _dc = document.getElementById('app')
      if (_dc) {
        doc.value = _dc 
        doc.value?.addEventListener('scroll', computeScroll)
      }
    })
    onUnmounted(() => {
      if (doc.value) {
        doc.value!.removeEventListener('scroll', computeScroll)
      }
    })
    return {
      navComputedStyle,
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

.fade-enter-from {
  transform: translateY(50px);
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-enter-to {
  transform: translateY(0);
}

.fade-leave-from {
  transform: translateY(0);
}
.fade-leave-active {
  transition: all .3s ease;
}
.fade-leave-to {
  transform: translateY(50px);
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
