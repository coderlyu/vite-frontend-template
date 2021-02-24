<template>
  <el-steps direction="vertical">
    <el-step v-for="i in 10" :key="i">
      <template #title>
        <section class="title au-flex au-column-center">
          <span class="name au-in-block au-line-one">coderly</span>
          <small class="operation">修改密码</small>
        </section>
      </template>
      <template #description>
        <section class="description">
          <span class="name">coderly</span>
          操作于
          <small class="time">2018/4/12 20:46</small>
        </section>
      </template>
    </el-step>
  </el-steps>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AuRecord',
  setup(prop, ctx) {},
})
</script>
<style lang="scss" scoped>
.title {
  .name {
    font-size: 16px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    width: 100px;
    font-weight: 600;
  }
  .operation {
    margin-left: 16px;
    font-size: 15px;
  }
}
.description {
  margin-top: 16px;
  margin-bottom: 32px;
  font-size: 14px;
  .name {
    font-weight: 600;
    // color: #555;
  }
  .time {
    // color: #999;
    font-size: 13px;
  }
}
</style>
