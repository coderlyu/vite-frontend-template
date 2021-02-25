<template>
  <el-tabs
    class="au-mt-32"
    :class="isMobile ? '' : 'au-mr-16'"
    type="border-card"
    @tab-click="tabClick"
    v-model="avtiveTab"
  >
    <el-tab-pane name="produce">
      <template #label>
        <span><i class="el-icon-date"></i> 创作空间</span>
      </template>
    </el-tab-pane>
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
    <component :is="activeComponent" :isMobile="isMobile" />
  </el-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue'
import AuMessage from './au-message.vue'
import AuRecord from './au-record.vue'
import AuProduce from './au-produce.vue'
import Screen from '../../components/au-screen'
export default defineComponent({
  name: 'About',
  components: {
    AuMessage,
    AuRecord,
    AuProduce
  },
  setup(prop, ctx) {
    const { isMobile } = Screen(ctx)
    const tabClick = ({ props }) => {
      switch (props.name) {
        case 'produce':
          activeComponent.value = 'AuProduce'
          break
        case 'message':
          activeComponent.value = 'AuMessage'
          break
        case 'record':
          activeComponent.value = 'AuRecord'
          break
      }
    }
    const avtiveTab = ref('produce')
    const activeComponent = ref('AuProduce')
    return {
      tabClick,
      avtiveTab,
      activeComponent,
      isMobile
    }
  },
})
</script>
