<template>
  <el-button @click="inCrement">count is: {{ count }}</el-button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store/index'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: (prop, ctx) => {
    const store = useStore(key)
    const count = computed(() => store.state.count)
    const inCrement = () => store.dispatch('increment', 1)
    return { count, inCrement }
  }
})
</script>

<style scoped>

</style>
