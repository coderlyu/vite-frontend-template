<template>
  <div>
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
          <li class="au-flex au-flex-column-center au-flex-bt">
            <section class="au-flex au-flex-column-center">
              <span class="label">
                <span class="au-in-block label-name" :class="!visibles[0] ? 'nick-active' : ''"> {{ visibles[0] ? '用户名' : formData.nick }} </span>
                <a
                  v-if="!visibles[0]"
                  href="#"
                  @click="showItemEdit(0, $event, true, 'nick')"
                >
                  <i class="el-icon-edit"></i>
                  修改
                </a>
              </span>
              <au-input
                v-if="visibles[0]"
                v-bind:value="formData.nick"
                :config="configs.nick"
                @showItemEdit="showItemEdit(0)"
                @saveItem="saveItem($event, 0)"
              />
            </section>
            <a href="#" class="au-in-block au-text-center" @click="goBack">
              返回主页
              <i class="el-icon-caret-right"></i>
            </a>
          </li>
          <li class="au-flex au-flex-column-center" v-for="(item, index) in columns" :key="index">
            <span class="label">
              <span class="au-in-block label-name">{{ item.label }}</span>
              {{ visibles[index + 1] ? '' : (
                item.props === 'sex' ? (formData[item.props] ? formData[item.props] : '未知') :
                formData[item.props]
              ) }}
              <a v-if="!visibles[index + 1]" href="#" @click="showItemEdit(index + 1, $event, true, item.props)">
                <i class="el-icon-edit"></i>
                修改
              </a>
            </span>
            <au-input
              v-if="visibles[index + 1]"
              v-bind:value="formData[item.props]"
              class="edit-wrapper"
              :config="configs[item.props]"
              @showItemEdit="showItemEdit(index + 1)"
              @saveItem="saveItem($event, index + 1)"
            />
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
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { cloneDeep } from 'lodash'
import { useRouter } from 'vue-router'
import { uploadState } from './au-upload'
import AuInput from '../../components/au-input.vue'
import _config from './config'
export default defineComponent({
  name: 'ProfilePc',
  components: {
    AuInput,
  },
  setup(prop, ctx) {
    let _conf = _config({})
    const router = useRouter()
    const visibles = reactive(new Array(10).fill(false))
    const formData = reactive({
      nick: 'coderly',
      sex: '男',
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
      visibles.fill(false) // 关闭其它编辑框
      visibles[index] = flag
    }
    const saveItem = ({ prop, value }, index) => {
      visibles[index] = false
      formData[prop] = cloneDeep(value)
    }
    return {
      ...uploadState(ctx),
      visibles,
      formData,
      goBack,
      showItemEdit,
      saveItem,
      configs: _conf.config,
      columns: _conf.columns
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
        height: 120px;
        border-bottom: 1px solid #ebebeb;
        a {
          opacity: 0;
          color: #777;
          font-weight: 200;
          text-decoration: none;
        }
        & > a {
          opacity: 1;
          width: 100px;
        }
        .label {
          color: #adadad;
          .label-name {
            width: 100px;
            font-size: 16px;
            font-weight: 400;
            color: #000;
          }
          .nick-active {
            font-size: 20px;
            font-weight: 600;
            font-family: fantasy;
            color: #000;
          }
        }
        .edit-wrapper {
          flex: 1;
        }
        &:nth-of-type(1) {
          border-bottom: none;
        }
        &:hover {
          a {
            opacity: 1;
            color: #0fbcf9;
          }
          & > a {
            color: #777;
          }
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
.au-flex-bt {
  justify-content: space-between;
}

</style>
