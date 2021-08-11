<template>
  <ul>
    <li class="au-flex au-flex-column-center au-pd-16" v-for="item in noticeList" :key="item.id">
      <p class="au-text-line-one" @click="toDetail">
        {{ item.content }}
        <el-tag v-for="(tag, i) in item.tags" :type="tags[tag.value - 1]" :key="i" class="au-ml-8">{{ tag.label }}</el-tag>
      </p>
      <small class="au-in-block time">{{ item.time }}</small>
    </li>
  </ul>
  <section class="au-text-end au-mt-16">
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
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import pagination from '../../components/au-pagination'
import { getNoticelist } from '../../api/home'
export default defineComponent({
  name: 'NoticeList',
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, ctx) {
    const layout = computed(() => prop.isMobile ? 'prev, pager, next' : 'prev, pager, jumper, next')
    const noticeList = ref([])
    const tags = ref([
      'default',
      'success',
      'info',
      'warning',
      'danger'
    ])
    const fetchData = ({ limit = 10, page = 1 }) => {
      getNoticelist({ limit, page }).then(({ error_code, message, data, total }) => {
        if (error_code === 200) {
          noticeList.value = data
          _pagination.changeTotal(total)
        } else {
          ElMessage.error(message)
        }
      })
    }
    const toDetail = () => {
      ElMessage('敬请期待')
    }
    const _pagination = pagination(ctx, fetchData, true)
    return {
      layout,
      ..._pagination,
      noticeList,
      tags,
      toDetail
    }
  }
})
</script>
<style lang="scss" scoped>
ul {
  li {
    border-bottom: 1px dashed #eaeaea;
    position: relative;
    p {
      flex: 1;
      font-size: 15px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #999;
        text-decoration: underline #999;
      }
    }
    .time {
      position: inherit;
      font-size: 12px;
      color: #888;
      width: 100px;
      text-align: center;
    }
  }
}
@media screen and(max-width: 769px) {
  ul {
    li {
      .time {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>