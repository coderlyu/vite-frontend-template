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
      layout="prev, pager, jumper, next"
      :total="total"
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
    />
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pagination from '../../components/au-pagination'
export default defineComponent({
  name: 'NoticeList',
  setup(props, ctx) {
    const noticeList = ref([
      {
        id: 1,
        tags: [
          {
            value: 1,
            label: 'HOT'
          },
          {
            value: 2,
            label: 'NEW'
          }
        ],
        content: '【活动入口已开启】活动入口已开启活动入口已开启活动入口已开启',
        time: '2021/10/02'
      },
      {
        id: 2,
        tags: [
          {
            value: 1,
            label: 'HOT'
          },
          {
            value: 3,
            label: '置顶'
          }
        ],
        content: '【创作大赛】创作大赛欢迎你的加入',
        time: '2021/10/02'
      },
      {
        id: 3,
        tags: [
          {
            value: 1,
            label: 'HOT'
          },
          {
            value: 2,
            label: 'NEW'
          }
        ],
        content: '【活动入口已开启】活动入口已开启活动入口已开启活动入口已开启',
        time: '2021/10/02'
      }
    ])
    const tags = ref([
      'default',
      'success',
      'info',
      'warning',
      'danger'
    ])
    const fetchData = () => {
      console.log('发送请求数据')
    }
    const toDetail = () => {
      ElMessage('敬请期待')
    }
    return {
      ...pagination(ctx, fetchData, true),
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
      font-size: 12px;
      color: #888;
      width: 100px;
      text-align: center;
    }
  }
}
</style>