<template>
  <div class="au-card au-box-shadow au-pd-16 au-mt-32 au-mr-16">
    <au-scroll />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import AuScroll from '../../components/au-scroll.vue'
export default defineComponent({
  name: 'Scroll',
  components: {
    AuScroll
  },
  setup(prop, ctx) {

  }
})
</script>