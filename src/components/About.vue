<template>
  <h2>nihao</h2>
  <h1>{{ msg }}</h1>
  
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'About',
  setup: (prop, ctx) => {
    const msg = ref('hello world')
    return {
      msg
    }
  }
})
</script>