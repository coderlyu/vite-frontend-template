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
    <au-list :list="list" :pagination="pagination" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import AuList from './au-list.vue'
import Screen from '../../components/au-screen'
import pagination from '../../components/au-pagination'
import { getList } from '../../api/data'
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
      _pagination.clear()
      fetchData({})
    }
    let fetchData = ({ limit = 10, page = 1 }) => {
      getList({ limit, page }).then(({ error_code, message, data, total }) => {
        if (error_code === 200) {
          list.value = [].concat(data)
          _pagination.changeTotal(total)
        }
      })
    }
    let _pagination  = pagination(ctx, fetchData, true)
    return {
      isMobile,
      list,
      activeName,
      handleClick,
      pagination: _pagination
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