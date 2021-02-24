import { State, UserInfo } from './state';
import { ActionContext } from 'vuex'
import { SET_TOKEN, CLEAR_TOKEN, USER_LOGIN } from './types'

export default {
  setToken({ commit }: ActionContext<State, State>, token: string) {
    commit(SET_TOKEN, token)
  },
  clearToken({ commit }: ActionContext<State, State>) {
    commit(CLEAR_TOKEN)
  },
  login({ commit }: ActionContext<State, State>, user: UserInfo) {
    return new Promise((resolve, reject) => {
      if (user.username === 'admin' && user.password === 'admin') {
        commit(USER_LOGIN, user)
        commit(SET_TOKEN, btoa(user.username.repeat(3) + user.password.repeat(3)))
        resolve('登录成功')
      }
      reject('登录失败')
    })
  }
}
