<template>
  <div ref="refDiv"></div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import DiffMatchPatch from 'diff-match-patch'
// 引入全局实例
import CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/idea.css'

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'

//代码补全提示
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/xml-hint.js'

//代码版本差异比较
import 'codemirror/addon/merge/merge.js'
import 'codemirror/addon/merge/merge.css'

window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0
export default defineComponent({
  name: 'AuDiff',
  setup(prop, ctx) {
    const refDiv = ref('')
    const dmp = new DiffMatchPatch()
    const diff = dmp.diff_main(
      `
      <div></div>\n
    `,
      `
    <a>\n
      <div> name </div>\n
    </a>\n
    `
    )
    console.log(diff)
    onMounted(() => {
      let str = ''
      diff.forEach(([index, content]) => {
        if (index === 0) {
          str += content
        } else if (index === -1) {
          str += `<span class="sub-str">${content}</span>`
        } else {
          str += `<span class="add-str">${content}</span>`
        }
      })
      console.log(str)
      console.log(refDiv.value)
      // refDiv.value.innerHTML = str
      CodeMirror.MergeView(refDiv.value, {
        value:
          '/*以下为演示内容，请添加您自己的内容 ~_~ */\n' +
          '\n' +
          'html,\n' +
          'body {\n' +
          '  width: 100%;\n' +
          '  height: 100%;\n' +
          '  margin: 0;\n' +
          '  padding: 0;\n' +
          '  overflow: hidden;\n' +
          "  font-family: 'Fira Mono', helvetica, arial, sans-serif;\n" +
          '  font-weight: 400;\n' +
          '  font-size: 62.5%;\n' +
          '}\n' +
          '\n' +
          '#webgl-container {\n' +
          '  width: 100%;\n' +
          '  height: 100%;\n' +
          '  cursor: pointer;\n' +
          '}\n' +
          '\n' +
          '.loading {\n' +
          '  position: absolute;\n' +
          '  width: 100%;\n' +
          '  height: 100%;\n' +
          '  background-color: #000000;\n' +
          '  opacity: 1;\n' +
          '  -webkit-transition: opacity 1.2s ease-out;\n' +
          '  -o-transition: opacity 1.2s ease-out;\n' +
          '  transition: opacity 1.2s ease-out;\n' +
          '  pointer-events: none;\n' +
          '  z-index: 5;' +
          '}', //上次内容
        origLeft: null,
        orig:
          '.dialog-footwer {\n' +
          '  text-align: center;\n' +
          '  margin-top: 20px;\n' +
          '}\n' +
          '\n' +
          '.toggle_wrap {\n' +
          '  margin-bottom: 6px;\n' +
          '  height: auto;\n' +
          '  overflow-y: auto;\n' +
          '}\n' +
          '.toggle_wrap_card {\n' +
          '  padding: 0 10px 10px 10px;\n' +
          '}\n' +
          '\n' +
          '/deep/.el-button--success {\n' +
          '  background-color: transparent;\n' +
          '  border-color: #5bacff;\n' +
          '  color: #5bacff;\n' +
          '}\n' +
          '</style>', //本次内容
        lineNumbers: true, //显示行号
        smartIndent: true, //自动缩进是否开启\
        indentUnit: 2,
        mode: 'text/html',
        highlightDifferences: false,
        styleActiveLine: false,
        matchBrackets: false,
        connect: 'align',
        theme: '3024-night',
        readOnly: true, //只读 不可修改
      })
    })
    return {
      refDiv,
    }
  },
})
</script>
<style lang="scss" scoped>
:deep(.sub-str) {
  color: red;
}
:deep(.add-str) {
  color: green;
}
</style>
