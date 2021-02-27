<template>
  <div>
    <el-timeline>
      <el-timeline-item  v-for="item in recordList" :key="item.id" :timestamp="item.date" placement="top">
        <el-card class="self-card">
          <p class="au-flex au-flex-column-center au-mt-16 title">
            <span class="au-in-block au-text-line-one name">{{ item.author }}</span>
            <small class="operation">{{ item.operation }}</small>
          </p>
          <p class="description">
            <span class="name">{{ item.author}}</span>
            操作于
            <small class="time">{{ item.date }} {{ item.time }}</small>
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <section class="au-text-end">
      <el-pagination
        :page-size="limit"
        :current-page="page"
        :pager-count="5"
        :layout="layout"
        :total="total"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
      />
    </section>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import pagination from '../../components/au-pagination'
import { getRecordList } from '../../api/about'
export default defineComponent({
  name: 'AuRecord',
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, ctx) {
    const layout = computed(() => prop.isMobile ? 'prev, pager, next' : 'prev, pager, jumper, next')
    const fetchData = ({ limit, page }) => {
      getRecordList({ limit, page }).then(({ data, total }) => {
        recordList.value = [].concat(data)
        _pagination.changeTotal(total)
      })
    }
    const _pagination = pagination(ctx, fetchData, true)
    const recordList = ref([])
    return {
      layout,
      ..._pagination,
      recordList
    }
  },
})
</script>
<style lang="scss" scoped>
.self-card {
  position: relative;
}
.title {
  .name {
    font-size: 18px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    width: 200px;
    font-weight: 600;
  }
  .operation {
    position: inherit;
    color: #e6a23c;
    margin-left: 16px;
    font-size: 16px;
  }
}
.description {
  text-indent: 2em;
  margin-top: 16px;
  margin-bottom: 32px;
  font-size: 14px;
  color: #899;
  .name {
    font-weight: 600;
  }
  .time {
    font-size: 13px;
  }
}
@media screen and (max-width: 769px) {
  .title {
    small.operation {
      position: absolute;
      right: 5%;
      top: 3%;
    }
  }
}
</style>
