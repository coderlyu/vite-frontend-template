<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'
import AuProfilePc from './au-profile-pc.vue'
import AuProfileMobile from './au-profile-mobile.vue'
import Screen from '../../components/au-screen'
export default defineComponent({
  name: 'Profile',
  components: {
    AuProfilePc,
    AuProfileMobile
  },
  setup(prop, ctx) {
    const { isMobile } = Screen()
    const currentComponent = computed(() => {
      return isMobile.value ? AuProfileMobile : AuProfilePc
    })
    return {
      isMobile,
      currentComponent
    }
  }
})
</script>