<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="旧文件">
      <input
        type="file"
        name="file-old"
        id="file-old"
        @change="fileChange(0, $event)"
      />
    </el-form-item>
    <el-form-item label="新文件">
      <input
        type="file"
        name="file-new"
        id="file-new"
        @change="fileChange(1, $event)"
      />
    </el-form-item>
  </el-form>
  <div ref="root" />
</template>
<script>
import { defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import * as diff from 'diff'
import * as Diff2Html from 'diff2html'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css'
import 'diff2html/bundles/css/diff2html.min.css'
export default defineComponent({
  name: 'AuCodeDiff',
  setup(prop, ctx) {
    const root = ref(null)
    const diffHtml = ref('')
    const oldVal = ref('')
    const newVal = ref('')
    const form = reactive({
      name: '',
    })
    onMounted(() => {
      if (root.value) {
        root.value.innerHTML = diffHtml.value
      }
    })
    const fileChange = (type, e) => {
      let url = e.target.files[0]
      const reader = new FileReader()
      reader.onload = function (ev) {
        let result = ev.target.result
        console.log(type)
        type ? (newVal.value = result) : (oldVal.value = result)
      }
      reader.readAsText(url)
    }
    watchEffect(() => {
      if (oldVal.value && newVal.value) {
        console.log('asdf')
        let tempStr = diff.createPatch('index.html', oldVal.value, newVal.value)
        diffHtml.value = Diff2Html.html(tempStr, {
          drawFileList: true,
          matching: 'lines',
          outputFormat: 'side-by-side',
        })
        root.value.innerHTML = diffHtml.value
      }
    })
    return {
      root,
      fileChange,
      form,
    }
  },
})
</script>
