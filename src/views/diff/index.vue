<template>
  <div>
    <el-row class="au-card au-pd-16">
      <el-col>
        <au-code-diff />
      </el-col>
    </el-row>
    <!-- <el-row class="au-card au-pd-16">
      <el-col>
        <au-diff />
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import AuDiff from '../../components/au-diff.vue'
import AuCodeDiff from '../../components/au-code-diff.vue'
export default defineComponent({
  name: 'Diff',
  components: {
    AuDiff,
    AuCodeDiff
  },
  setup(prop, ctx) {},
})
</script>
