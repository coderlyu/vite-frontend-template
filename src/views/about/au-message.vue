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
    <li class="au-flex au-flex-column-center" v-for="i in 40" :key="i">
      <p @click="toNoticeDetail(i)">
        <span>【系统通知】</span>
        该系统将于今晚凌晨2点到5点进行升级维护
      </p>
      <small class="time">2021-04-01 23:00:01</small>
      <small class="operate">
        <el-button v-if="activeName === 'unVisite'" size="small">标为已读</el-button>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-end" v-if="activeName === 'visited'">
          <i class="el-icon-delete" ></i>
        </el-tooltip>
        <el-button v-if="activeName === 'recycle'" size="small">还 原</el-button>
        <el-button v-if="activeName === 'recycle'" type="danger" size="small">销 毁</el-button>
      </small>
    </li>
  </ul>
  <el-backtop target="#app" :bottom="50" />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'AuMessage',
  setup(prop, ctx) {
    const activeName = ref('unVisite')
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
    return {
      activeName,
      toNoticeDetail,
      handleTabClick
    }
  },
})
</script>
<style lang="scss" scoped>
ul {
  li {
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
    height: 60px;
    font-size: 15px;
    border-bottom: 1px solid #efefef;
    p {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px dashed transparent;
      padding-bottom: 4px;
      color: #ed546b;
      font-family: fantasy;
      cursor: pointer;
      transition: all .5s;
    }
    .time {
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
</style>
