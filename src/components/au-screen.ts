import { SetupContext, computed, ComputedRef } from 'vue'
import { getStore } from '../store/index'

export default function screen(ctx?: SetupContext, callback?: (m: ComputedRef, c: ComputedRef) => string) {
  const { store } = getStore()
  const isMobile = computed(() => store.getters.isMobile)
  const closed = computed(() => store.getters.toggleClosed)
  const toggleClick = () => {
    store.dispatch('updateToggleType', !closed.value)
  }
  let toggleClass = computed(() => {
    if(typeof callback === 'function') return callback(isMobile, closed)
    else if (!isMobile.value) return ''
    else return closed.value ? 'el-icon-s-unfold' : 'el-icon-s-fold'
  })
  
  return {
    isMobile,
    closed,
    toggleClick,
    toggleClass
  }
}