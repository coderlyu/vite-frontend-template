<template>
  <el-tabs v-model="activeName" @tab-click="handleTabClick" style="margin-left: 8px;">
    <el-tab-pane name="unVisite">
      <template #label>未读消息(3)</template>
    </el-tab-pane>
    <el-tab-pane name="visited">
      <template #label>已读消息(2)</template>
    </el-tab-pane>
    <el-tab-pane name="recycle">
      <template #label>回收站(1)</template>
    </el-tab-pane>
  </el-tabs>
  <ul>
    <li class="au-flex au-flex-column-center" :class="isMobile ? 'au-mt-8' : ''" v-for="i in 40" :key="i">
      <p :class="isMobile ? 'au-text-line-two' : 'au-text-line-one'" @click="toNoticeDetail(i)">
        <span>【系统通知】</span>
        该系统将于今晚凌晨2点到5点进行升级维护
      </p>
      <small class="time">2021-04-01 23:00:01</small>
      <small class="operate" v-if="isMobile">
        <i v-if="activeName === 'unVisite'" class="el-icon-folder-checked icon-success" ></i>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-end" v-if="activeName === 'visited'">
          <i class="el-icon-delete" ></i>
        </el-tooltip>
        <i v-if="activeName === 'recycle'" class="el-icon-refresh-right icon-grey"></i>
        <i v-if="activeName === 'recycle'" class="el-icon-folder-delete"></i>
      </small>
      <small class="operate" v-else>
        <el-button v-if="activeName === 'unVisite'" size="small">标为已读</el-button>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-end" v-if="activeName === 'visited'">
          <el-button type="danger" size="small">删 除</el-button>
        </el-tooltip>
        <el-button v-if="activeName === 'recycle'" size="small">还 原</el-button>
        <el-button v-if="activeName === 'recycle'" type="danger" size="small">销 毁</el-button>
      </small>
    </li>
  </ul>
  <section class="au-text-end au-mt-32">
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
import { defineComponent, ref, computed } from 'vue'
import pagination from '../../components/au-pagination'
export default defineComponent({
  name: 'AuMessage',
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, ctx) {
    const activeName = ref('unVisite')
    const layout = computed(() => prop.isMobile ? 'prev, pager, next' : 'prev, pager, jumper, next')
    const handleTabClick = ({ props }) => {
      switch (props.name) {
        case 'unVisite':
          activeName.value = 'unVisite'
          break
        case 'visited':
          activeName.value = 'visited'
          break
        case 'recycle':
          activeName.value = 'recycle'
          break
      }
    }
    const toNoticeDetail = (i) => {
      console.log(i)
    }
    const fetchData = () => {
      console.log('请求数据')
    }
    return {
      layout,
      activeName,
      toNoticeDetail,
      handleTabClick,
      isMobile: prop.isMobile,
      ...pagination(ctx, fetchData, true)
    }
  },
})
</script>
<style lang="scss" scoped>
ul {
  li {
    position: relative;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
    height: 60px;
    font-size: 15px;
    border-bottom: 1px solid #efefef;
    p {
      flex: 1;
      border-bottom: 1px dashed transparent;
      padding-bottom: 4px;
      color: #ed546b;
      font-family: fantasy;
      cursor: pointer;
      transition: all .5s;
    }
    .time {
      position: inherit;
      width: 200px;
      color: #888;
      font-size: 12px;
      text-align: center;
    }
    .operate {
      max-width: 160px;
      min-width: 100px;
      text-align: center;
      color: #f00;
      cursor: pointer;
    }
    &:hover {
      .operate {
        color: #ed546b;
      }
    }
    &:hover {
      p {
        color: rgba(253, 100, 123, .5);
        border-bottom: 1px dashed rgb(237, 84, 107, .5);
      }
    }
  }
}
.icon-success {
  color: #67C23A;
}
.icon-grey {
  color: #a9a9a9;
}
@media screen and(max-width: 769px) {
  ul {
    li {
      height: 80px;
      .operate {
        max-width: 160px;
        min-width: 60px;
        & > i {
          font-size: 16px;
          margin-left: 16px;
        }
        & > i:nth-of-type(1) {
          margin-left: 0px;
        }
      }
      .time {
        width: 120px;
        top: -4px;
        right: 0;
        position: absolute;
      }
    }
  }
}

</style>
