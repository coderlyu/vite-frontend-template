<template>
  <div class="profile-wrapper">
    <section class="top">
      <img src="../../assets/images/bg.jpg" alt="背景图片" class="bg-img" />
    </section>
    <section class="body">
      <section class="upload-wrapper">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </section>
      <ul class="info-wrapper">
        <li class="base-info">
          <section>
            <h4 class="label" v-if="!visibles[0]">
              {{ formData.nick }}
              <a href="#" @click="showItemEdit(0, $event, true, 'nick')">
                <i class="el-icon-edit"></i>
                修改
              </a>
            </h4>
            <h4 v-if="visibles[0]">用户名</h4>
            <div v-if="visibles[0]" class="edit-wrapper">
              <el-input
                v-model="formData.tempData"
                placeholder="请输入昵称"
              ></el-input>
              <section>
                <el-button
                  size="medium"
                  type="primary"
                  @click="saveItem(0, 'nick')"
                  >保 存</el-button
                >
                <el-button size="medium" @click="showItemEdit(0, $event)"
                  >取 消</el-button
                >
              </section>
            </div>
          </section>
          <a href="#" @click="goBack">
            返回主页
            <i class="el-icon-caret-right"></i>
          </a>
        </li>
        <li>
          <section>
            <h4 class="label" v-if="!visibles[1]">
              <span class="label-name">性别</span>
              {{ formData.sex ? formData.sex : '未知' }}
              <a href="#" @click="showItemEdit(1, $event, true, 'sex')">
                <i class="el-icon-edit"></i>
                修改
              </a>
            </h4>
            <h4 v-if="visibles[1]">性别</h4>
            <div v-if="visibles[1]" class="edit-wrapper">
              <el-radio-group v-model="formData.tempData">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
              <section>
                <el-button
                  size="medium"
                  type="primary"
                  @click="saveItem(1, 'sex')"
                  >保 存</el-button
                >
                <el-button size="medium" @click="showItemEdit(1, $event)"
                  >取 消</el-button
                >
              </section>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h4 class="label" v-if="!visibles[2]">
              <span class="label-name">一句话介绍</span>
              {{ formData.intro }}
              <a href="#" @click="showItemEdit(2, $event, true, 'intro')">
                <i class="el-icon-edit"></i>
                修改
              </a>
            </h4>
            <h4 v-if="visibles[2]">一句话介绍</h4>
            <div v-if="visibles[2]" class="edit-wrapper">
              <el-input
                v-model="formData.tempData"
                placeholder="请输入一句话介绍"
              ></el-input>
              <section>
                <el-button
                  size="medium"
                  type="primary"
                  @click="saveItem(2, 'intro')"
                  >保 存</el-button
                >
                <el-button size="medium" @click="showItemEdit(2, $event)"
                  >取 消</el-button
                >
              </section>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h4 class="label" v-if="!visibles[3]">
              <span class="label-name">所在行业</span>
              {{ formData.work }}
              <a href="#" @click="showItemEdit(3, $event, true, 'work')">
                <i class="el-icon-edit"></i>
                修改
              </a>
            </h4>
            <h4 v-if="visibles[3]">所在行业</h4>
            <div v-if="visibles[3]" class="edit-wrapper">
              <el-input
                v-model="formData.tempData"
                placeholder="请输入所在行业"
              ></el-input>
              <section>
                <el-button
                  size="medium"
                  type="primary"
                  @click="saveItem(3, 'work')"
                  >保 存</el-button
                >
                <el-button size="medium" @click="showItemEdit(3, $event)"
                  >取 消</el-button
                >
              </section>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h4 class="label" v-if="!visibles[4]">
              <span class="label-name">个人简介</span>
              {{ formData.mark }}
              <a href="#" @click="showItemEdit(4, $event, true, 'mark')">
                <i class="el-icon-edit"></i>
                修改
              </a>
            </h4>
            <h4 v-if="visibles[4]">个人简介</h4>
            <div v-if="visibles[4]" class="edit-wrapper">
              <el-input
                v-model="formData.tempData"
                placeholder="请输入个人简介"
              ></el-input>
              <section>
                <el-button
                  size="medium"
                  type="primary"
                  @click="saveItem(4, 'mark')"
                  >保 存</el-button
                >
                <el-button size="medium" @click="showItemEdit(4, $event)"
                  >取 消</el-button
                >
              </section>
            </div>
          </section>
        </li>
      </ul>
    </section>
  </div>
  <el-dialog
    v-model="confirmAvatarVisible"
    width="30%"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleConfirmClose"
  >
    <template #title>编辑头像</template>
    <section class="confim-content">
      <img :src="tempUrl" alt="头像" class="confirm-avatar" />
    </section>
    <template #footer>
      <el-button type="primary" block @click="confirmAvatar">保 存</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { useRouter } from 'vue-router'
import { uploadState } from './au-upload'
export default defineComponent({
  name: 'Profile',
  setup(prop, ctx) {
    const router = useRouter()
    const visibles = reactive(new Array(10).fill(false))
    const formData = reactive({
      nick: 'coderly',
      sex: '',
      intro: '变秃了也变强了',
      work: '互联网',
      mark: '代码是写给人看的，顺便在机器上运行',
      tempData: '',
    })
    const goBack = (e) => {
      e.preventDefault()
      router.push({ name: 'Home' })
    }
    const showItemEdit = (index, e, flag = false, type) => {
      e.preventDefault()
      visibles.fill(false) // 关闭其它编辑框
      if (flag) {
        formData.tempData = cloneDeep(formData[type])
      }
      visibles[index] = flag
    }
    const saveItem = (index, type) => {
      visibles[index] = false
      formData[type] = cloneDeep(formData.tempData)
    }
    return {
      ...uploadState(ctx),
      visibles,
      formData,
      goBack,
      showItemEdit,
      saveItem,
    }
  },
})
</script>
<style lang="scss" scoped>
.profile-wrapper {
  margin-top: 32px;
  margin-right: 16px;
  background: #fff;
  .top {
    height: 200px;
    overflow: hidden;
    .bg-img {
      width: 100%;
    }
  }
  .body {
    position: relative;
    background: #fff;
    .upload-wrapper {
      position: absolute;
      z-index: 1;
      transform: translate(10%, -20%);
      width: 200px;
      margin-right: 32px;
      .avatar-uploader {
        display: flex;
        justify-content: center;
        align-items: center;
        :deep(.el-upload) {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        :deep(.el-upload:hover) {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
          position: relative;
        }
      }
    }
    .info-wrapper {
      margin-left: 250px;
      li {
        display: flex;
        align-items: center;
        height: 120px;
        border-bottom: 1px solid #ebebeb;
        &:nth-of-type(1) {
          border-bottom: none;
        }
        a {
          color: #777;
          font-weight: 200;
          text-decoration: none;
          &:hover {
            color: #409eff;
          }
        }
        .edit-wrapper {
          display: flex;
          width: 300px;
          overflow: hidden;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: 32px;
          section {
            margin-top: 8px;
          }
        }
        & > section {
          display: flex;
          align-items: center;
        }
        .label {
          display: inline-block;
          font-size: 16px;
          font-weight: 400;
          color: #666;
          .label-name {
            display: inline-block;
            width: 100px;
            font-size: 16px;
            font-weight: 400;
            color: #000;
          }
          a {
            font-size: 16px;
            color: #0fbcf9;
            opacity: 0;
            font-weight: 600;
            transition: all 0.35s;
            &:hover {
              color: #0fbcf9;
            }
          }
          &:hover {
            a {
              opacity: 1;
              color: #0fbcf9;
            }
          }
        }
      }
      .base-info {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        height: 100px;
        .label {
          font-size: 30px;
          color: #000;
          font-weight: 600;
        }
        a {
          margin-right: 16px;
        }
      }
    }
  }
}
.confim-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  .confirm-avatar {
    width: 200px;
    height: 200px;
  }
}
</style>
