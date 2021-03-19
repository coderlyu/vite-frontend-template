<template>
  <div
    class="wrapper"
    ref="wrapper"
    @touchstart.prevent="onStart"
    @touchmove.prevent="onMove"
    @touchend.prevent="onEnd"
    @touchcancel.prevent="onEnd"
    @mousedown.prevent="onStart"
    @mousemove.prevent="onMove"
    @mouseup.prevent="onEnd"
    @mousecancel.prevent="onEnd"
    @mouseleave.prevent="onEnd"
    @transitionend="onTransitionEnd"
  >
    <ul class="list" ref="scroller" :style="scrollerStyle">
      <li class="list-item" v-for="item in 100" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from 'vue'
export default defineComponent({
  name: 'AuScroll',
  setup(prop, ctx) {
    const wrapper = ref(null)
    const scroller = ref(null)
    const scroll = reactive({
      minY: 0,
      maxY: 0,
      wrapperHeight: 0,
      offsetY: 0,
      duration: 0,
      bezier: 'linear',
      startY: 0,
      pointY: 0,
      startTime: 0, // 惯性滑动范围内的 startTime
      momentumStartY: 0, // 惯性滑动范围内的 startY
      momentumTimeThreshold: 300, // 惯性滑动的启动 时间阈值
      momentumYThreshold: 15, // 惯性滑动的启动 距离阈值
      isStarted: false, // start锁
    })
    const scrollerStyle = computed(() => {
      return {
        transform: `translate3d(0, ${scroll.offsetY}px, 0)`,
        'transition-duration': `${scroll.duration}ms`,
        'transition-timing-function': scroll.bezier,
      }
    })
    onMounted(() => {
      nextTick(() => {
        const { height: wrapperHeight } = wrapper.value.getBoundingClientRect()
        const { height: scrollHeight } = scroller.value.getBoundingClientRect()
        scroll.wrapperHeight = wrapperHeight
        scroll.minY = wrapperHeight - scrollHeight
      })
    })
    const onStart = (e) => {
      const point = e.touches ? e.touches[0] : e
      scroll.isStarted = true
      scroll.duration = 0
      stop()
      scroll.pointY = point.pageY
      scroll.momentumStartY = scroll.startY = scroll.offsetY
      scroll.startTime = new Date().getTime()
    }
    const onMove = (e) => {
      if (!scroll.isStarted) return
      const point = e.touches ? e.touches[0] : e
      const deltaY = point.pageY - scroll.pointY
      // 浮点数坐标会影响渲染速度
      let offsetY = Math.round(scroll.startY + deltaY)
      // 超出边界时增加阻力
      if (offsetY < scroll.minY || offsetY > scroll.maxY) {
        offsetY = Math.round(scroll.startY + deltaY / 3)
      }
      scroll.offsetY = offsetY
      const now = new Date().getTime()
      // 记录在触发惯性滑动条件下的偏移值和时间
      if (now - scroll.startTime > scroll.momentumTimeThreshold) {
        scroll.momentumStartY = scroll.offsetY
        scroll.startTime = now
      }
    }
    const onEnd = (e) => {
      if (!scroll.isStarted) return
      scroll.isStarted = false
      if (isNeedReset()) return
      const absDeltaY = Math.abs(scroll.offsetY - scroll.momentumStartY)
      const duration = new Date().getTime() - scroll.startTime
      // 启动惯性滑动
      if (
        duration < scroll.momentumTimeThreshold &&
        absDeltaY > scroll.momentumYThreshold
      ) {
        let moment = momentum(scroll.offsetY, scroll.momentumStartY, duration)
        scroll.offsetY = Math.round(moment.destination)
        scroll.duration = moment.duration
        scroll.bezier = moment.bezier
      }
    }
    const momentum = (current, start, duration) => {
      const durationMap = {
        noBounce: 2500,
        weekBounce: 800,
        strongBounce: 400,
      }
      const bezierMap = {
        noBounce: 'cubic-bezier(.17, .89, .45, 1)',
        weekBounce: 'cubic-bezier(.25, .46, .45, .94)',
        strongBounce: 'cubic-bezier(.25, .46, .45, .94)',
      }
      let type = 'noBounce'
      // 惯性滑动加速度
      const deceleration = 0.003
      // 回弹阻力
      const bounceRate = 10
      // 强弱回弹的分割值
      const bounceThreshold = 300
      // 回弹的最大限度
      const maxOverflowY = scroll.wrapperHeight / 6
      let overflowY

      const distance = current - start
      const speed = (2 * Math.abs(distance)) / duration
      let destination =
        current + (speed / deceleration) * (distance < 0 ? -1 : 1)
      if (destination < scroll.minY) {
        overflowY = scroll.minY - destination
        type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
        destination = Math.max(
          scroll.minY - maxOverflowY,
          scroll.minY - overflowY / bounceRate
        )
      } else if (destination > scroll.maxY) {
        overflowY = destination - scroll.maxY
        type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
        destination = Math.min(
          scroll.maxY + maxOverflowY,
          scroll.maxY + overflowY / bounceRate
        )
      }

      return {
        destination,
        duration: durationMap[type],
        bezier: bezierMap[type],
      }
    }
    const onTransitionEnd = () => {
      isNeedReset()
    }
    const isNeedReset = () => {
      // 超出边界时需要重置位置
      let offsetY
      if (scroll.offsetY < scroll.minY) {
        offsetY = scroll.minY
      } else if (scroll.offsetY > scroll.maxY) {
        offsetY = scroll.maxY
      }
      if (typeof offsetY !== 'undefined') {
        scroll.offsetY = offsetY
        scroll.duration = 500
        scroll.bezier = 'cubic-bezier(.165, .84, .44, 1)'
        return true
      }
      return false
    }
    const stop = () => {
      // 获取当前 translate 的位置
      const matrix = window
        .getComputedStyle(scroller.value)
        .getPropertyValue('transform')
      scroll.offsetY = Math.round(+matrix.split(')')[0].split(', ')[5])
    }
    return {
      wrapper,
      scroller,
      scrollerStyle,
      ...toRefs(scroll),
      onStart,
      onMove,
      onEnd,
      onTransitionEnd,
      stop,
    }
  },
})
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}

.wrapper {
  height: 80%;
  max-height: 500px;
  overflow: hidden;
}

.list {
  background-color: #fff7f7;
}

.list-item {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  border-bottom: 1px dashed #e0e0e0;
}
</style>
