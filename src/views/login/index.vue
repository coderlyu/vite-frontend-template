<template>
  <div class="login">
    <el-row style="height: 100%;" type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="15" :lg="10" :xl="8" style="position: relative;">
        <section class="login-wrapper au-bg-white au-card au-box-shadow">
          <h2 class="title">用户登录</h2>
          <el-form ref="form">
            <el-form-item>
              <section class="au-flex login-item">
                <label class="au-flex au-flex-row-center au-flex-column-center" for="username">
                  <i class="el-icon-user"></i>
                  <small>账号</small>
                </label>
                <input type="text" v-model="username" placeholder="请输入账号" id="username" autocomplete="off" />
              </section>
            </el-form-item>
            <el-form-item>
              <section class="au-flex login-item">
                <label class="au-flex au-flex-row-center au-flex-column-center" for="password">
                  <i class="el-icon-lock"></i>
                  <small>密码</small>
                </label>
                <input type="password" v-model="password" placeholder="请输入密码" id="password" autocomplete="off" />
              </section>
            </el-form-item>
            <el-form-item class="login-btns">
              <el-button type="primary" @click="onLogin">登 录</el-button>
              <el-button>注 册</el-button>
            </el-form-item>
            <p class="tips">账号：admin ,密码：admin</p>
          </el-form>
        </section>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, inject } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Login',
  setup(prop, ctx) {
    const { store } = inject('Store')
    const router = useRouter()
    const form = reactive({
      username: 'admin',
      password: 'admin',
    })
    const onLogin = async() => {
      store.dispatch('login', form).then((message) => {
        ElNotification({
          type: 'success',
          message: message
        })
        router.push({ name: 'Home' })
      }).catch((error) => {
        ElNotification({
          type: 'error',
          message: error
        })
      })
    }
    return {
      ...toRefs(form),
      onLogin,
    }
  },
})
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-wrapper {
    width: 80%;
    max-width: 400px;
    position: absolute;
    padding: 32px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 32px;
    }
    .login-item {
      padding: 4px 11px;
      border: 1px solid #409EFF;
      border-radius: 26px;
      transition: all .2s;
      &:focus-within {
        border: 1px solid transparent;
        box-shadow: 0 0px 15px 0px #409eff, 0 0px 12px 0 rgb(0 0 0 / 20%) inset;
      }
      label {
        cursor: pointer;
        width: 80px;
        color: rgb(64, 158, 255);
        i {
          font-size: 20px;
        }
        small {
          color: #999;
          font-size: 16px;
          letter-spacing: .1em;
          font-weight: 400;
          margin-left: 8px;
        }
      }
      input {
        flex: 1;
        border: none;
        font-size: 15px;
        color: #409EFF;
        font-weight: 600;
        letter-spacing: .1em;
        background: transparent;
        &::-webkit-input-placeholder {
          color: rgb(221, 221, 221);
          transition: all .2s;
        }
      }
      input:focus {
        outline: none;
        &::-webkit-input-placeholder {
          color: transparent;
        }
      }
    }
    .login-btns {
      :deep(.el-form-item__content) {
        display: flex;   
        flex-direction: column;
        .el-button {
          margin-left: 0px;
          margin-top: 16px;
        }
      }
    }
  }
}
.tips {
  font-size: 14px;
  color: #999;
  font-family: cursive;
  letter-spacing: 1px;
}
@media screen and (max-width: 769px) {
  .login {
    .login-wrapper {
      width: 95%;
    }
  }
}
</style>
