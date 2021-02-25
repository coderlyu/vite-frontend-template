<template>
  <div class="au-mt-32">
    <section class="au-card au-flex au-pd-16 avatar-wrapper">
      <img src="../../assets/images/profile.jpg" alt="头像" class="avatar">
      <div class="au-flex au-ml-16 au-overflow-hidden avatar-right">
        <span class="au-text-line-one">coderly</span>
        <a href="javascript: void(0);" class="au-text-center">返回主页<i class="el-icon-arrow-right"></i></a>
      </div>
    </section>
    <ul class="au-mt-32">
      <li class="au-card au-mt-8 au-flex au-flex-column-center" @click="toEdit(1)">
        <p class="au-text-line-one">
          <span class="au-in-block au-mr-16 au-text-end label">性别</span>
          {{ formData.sex ? formData.sex : '未知' }}
        </p>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li class="au-card au-mt-8 au-flex au-flex-column-center" @click="toEdit(2)">
        <p class="au-text-line-one">
          <span class="au-in-block au-mr-16 au-text-end label">一句话介绍</span>
          {{ formData.intro }}
        </p>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li class="au-card au-mt-8 au-flex au-flex-column-center" @click="toEdit(3)">
        <p class="au-text-line-one">
          <span class="au-in-block au-mr-16 au-text-end label">所在行业</span>
          {{ formData.work }}
        </p>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li class="au-card au-mt-8 au-flex au-flex-column-center" @click="toEdit(4)">
        <p class="au-text-line-one">
          <span class="au-in-block au-mr-16 au-text-end label">个人简介</span>
          {{ formData.mark }}
        </p>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, reactive  } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'ProfileMobile',
  setup(prop, ctx) {
    const formData = reactive({
      nick: 'coderly',
      sex: '',
      intro: '变秃了也变强了',
      work: '互联网',
      mark: '代码是写给人看的，顺便在机器上运行',
      tempData: '',
    })
    const toEdit = (index) => {
      ElMessage('敬请期待' + index)
    }
    return {
      formData,
      toEdit
    }
  }
})
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  .avatar {
    width: 80px;
    height: 80px;
    box-shadow: 0 0 8px 0px #409eff;
  }
  .avatar-right {
    flex: 1;
    span {
      padding-top: 16px;
      font-weight: 600;
      font-size: 20px;
      color: #666;
      font-family: fantasy;
      flex: 1;
    }
    a {
      font-size: 15px;
      color: #409eff;
      text-decoration: none;
      width: 100px;
    }
  }
}
ul {
  padding: 16px 0;
  li {
    cursor: pointer;
    height: 50px;
    p:nth-of-type(1) {
      flex: 1;
      color: #888;
      font-size: 14px;
      .label {
        font-weight: 600;
        color: #333;
        width: 95px;
      }
    }
    i {
      font-size: 20px;
      color: #b5b5b5;
    }
  }
}
</style>