<template>
  <div>
    <el-input v-if="config.type === 'input'" v-model="selfVal" :placeholder="config.placeholder || ''"></el-input>
    <el-radio-group v-else-if="config.type === 'radio'" v-model="selfVal">
      <el-radio v-for="radio in config.options" :key="radio.value" :label="radio.value">{{ radio.label }}</el-radio>
    </el-radio-group>
    <section class="au-mt-8">
      <el-button size="medium" type="primary" @click="saveItem"
        >保 存</el-button
      >
      <el-button size="medium" @click="showItemEdit"
        >取 消</el-button
      >
    </section>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'AuInput',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String || Number || Array || Object || Boolean,
      require: true
    }
  },
  setup(prop, ctx) {
    const selfVal = ref('')
    selfVal.value = prop.value
    const saveItem = () => {
      ctx.emit('saveItem', {
        prop: prop.config.props,
        value: selfVal.value
      })
    }
    const showItemEdit = () => {
      ctx.emit('showItemEdit', {
        value: selfVal.value,
        prop: prop.config.props
      })
    }
    return {
      selfVal,
      saveItem,
      showItemEdit
    }
  },
})
</script>
