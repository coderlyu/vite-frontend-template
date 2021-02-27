<template>
  <div>
    <el-row
      :gutter="16"
      class="au-mt-32 au-card"
      :class="isMobile ? 'au-pd-8' : 'au-pd-16'"
      :style="{ 'margin-right': isMobile ? '-8px' : '16px' }"
    >
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" class="au-mt-16">
        <h4 class="title">人群特征</h4>
        <div ref="pies" style="height: 300px" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" class="au-mt-16">
        <h4 class="title">曝光量</h4>
        <div ref="bars" style="height: 300px" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" class="au-mt-16">
        <h4 class="title">访问量</h4>
        <div ref="lines" style="height: 300px" />
      </el-col>
    </el-row>
    <el-row
      :gutter="16"
      class="au-card au-mt-16"
      :class="isMobile ? 'au-pd-8' : 'au-pd-16'"
      :style="{ 'margin-right': isMobile ? '-8px' : '16px' }"
    >
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <h4 class="au-mt-16 title">粉丝最新关注点</h4>
        <au-rank :list="news0" :isMobile="isMobile" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <h4 class="au-mt-16 title">热门关注</h4>
        <au-rank :list="news1" :isMobile="isMobile" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <h4 class="au-mt-16 title">群聊话题</h4>
        <au-rank :list="news2" :isMobile="isMobile" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import * as Echarts from 'echarts'
import _config from './chart-config'
import AuRank from './au-rank.vue'
import Screen from '../../components/au-screen'
import { getNewList } from '../../api/data'
export default defineComponent({
  name: 'Rank',
  components: {
    AuRank,
  },
  setup(prop, ctx) {
    const { isMobile } = Screen()
    const charts = reactive({
      pies: null,
      lines: null,
      bars: null,
      news0: [],
      news1: [],
      news2: [],
    })
    const fetchData = (i = 0) => {
      getNewList().then(({ data, error_code }) => {
        if (error_code === 200) {
          charts['news' + i] = data
        }
      })
    }
    onMounted(() => {
      Echarts.init(charts.pies).setOption(_config.pie())
      Echarts.init(charts.lines).setOption(_config.line())
      Echarts.init(charts.bars).setOption(_config.bar())
      fetchData(0)
      fetchData(1)
      fetchData(2)
    })
    return {
      isMobile,
      ...toRefs(charts),
    }
  },
})
</script>
<style lang="scss" scoped>
.title {
  font-family: cursive;
  color: #666;
  margin-bottom: 16px;
}
</style>
