<template>
  <div class="au-card au-mt-32" :class="isMobile ? '' : 'au-mr-16 au-pd-16'">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <span class="self-tab-title">
            <i class="el-icon-postcard"></i>
            好物推荐
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span class="self-tab-title">
            <i class="el-icon-folder-opened"></i>
            月度最佳
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="three">
        <template #label>
          <span class="self-tab-title">
            <i class="el-icon-present"></i>
            粉丝
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="four">
        <template #label>
          <span class="self-tab-title">
            <i class="el-icon-set-up"></i>
            流量
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <au-list :list="list" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import AuList from './au-list.vue'
import Screen from '../../components/au-screen'
export default defineComponent({
  name: 'Data',
  components: {
    AuList
  },
  setup(props, ctx) {
    const activeName = ref('first')
    const list = ref([])
    const { isMobile } = Screen()
    const handleClick = ({ props }) => {
      activeName.value = props.name
    }
    return {
      isMobile,
      list,
      activeName,
      handleClick
    }
  }
})
</script>
<style lang="scss" scoped>
.self-tab-title {
  font-size: 16px;
  color: #777;
  i {
    color: #409EFF;
    font-size: 20px;
  }
}
// :deep(.is-active) {
//   .self-tab-title {
//     color: #0057ad;
//   }
// }
</style>