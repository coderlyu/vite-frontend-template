import { State, UserInfo } from './state';
import { ActionContext } from 'vuex'
import { SET_TOKEN, CLEAR_TOKEN, USER_LOGIN, UPDATE_SCREEN_WIDTH, UPDATE_IS_MOBILE, UPDATE_TOGGLE_TYPE } from './types'

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
  },
  updetaScreenWidth({ commit }: ActionContext<State, State>, width: number) {
    if (width < 769) {
      commit(UPDATE_IS_MOBILE, true)
      commit(UPDATE_TOGGLE_TYPE, true)
    } else {
      commit(UPDATE_IS_MOBILE, false)
      commit(UPDATE_TOGGLE_TYPE, true)
    }
    commit(UPDATE_SCREEN_WIDTH, width)
  },
  updateToggleType({ commit }: ActionContext<State, State>, closed: number) {
    commit(UPDATE_TOGGLE_TYPE, closed)
  }
}
