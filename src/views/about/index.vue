<template>
  <el-tabs
    class="about"
    type="border-card"
    @tab-click="tabClick"
    v-model="avtiveTab"
  >
    <el-tab-pane name="message">
      <template #label>
        <span><i class="el-icon-date"></i> 消息中心</span>
      </template>
    </el-tab-pane>
    <el-tab-pane name="record">
      <template #label>
        <span><i class="el-icon-date"></i> 操作记录</span>
      </template>
    </el-tab-pane>
    <component :is="activeComponent" />
  </el-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue'
import AuMessage from './au-message.vue'
import AuRecord from './au-record.vue'
export default defineComponent({
  name: 'About',
  components: {
    AuMessage,
    AuRecord
  },
  setup(prop, ctx) {
    const tabClick = ({ props }) => {
      switch (props.name) {
        case 'message':
          activeComponent.value = 'AuMessage'
          break
        case 'record':
          activeComponent.value = 'AuRecord'
          break
      }
    }
    const avtiveTab = ref('message')
    const activeComponent = ref('AuMessage')
    return {
      tabClick,
      avtiveTab,
      activeComponent,
    }
  },
})
</script>
<style lang="scss" scoped>
.about {
  margin-top: 32px;
  margin-right: 16px;
}
</style>
