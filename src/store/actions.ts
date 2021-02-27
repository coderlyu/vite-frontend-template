import { State, UserInfo } from './state';
import { ActionContext } from 'vuex'
import { login } from '../api/login'
import { SET_TOKEN, CLEAR_TOKEN, USER_LOGIN, UPDATE_SCREEN_WIDTH, UPDATE_IS_MOBILE, UPDATE_TOGGLE_TYPE } from './types'
import { PromiseLoginName } from '../plugins/axios'
export default {
  setToken({ commit }: ActionContext<State, State>, token: string) {
    commit(SET_TOKEN, token)
  },
  clearToken({ commit }: ActionContext<State, State>) {
    commit(CLEAR_TOKEN)
  },
  login({ commit }: ActionContext<State, State>, { username, password }: UserInfo) {
    return new Promise((resolve, reject) => {
      let _query = {
        username: username.trim(), password: password.trim()
      }
      login(_query).then((res) => {
        const { error_code, message, token } = res as unknown as PromiseLoginName
        if (error_code === 200) {
          commit(USER_LOGIN, _query)
          commit(SET_TOKEN, token)
          resolve(message)
        } else {
          reject(message)
        }
      }).catch((error: unknown) => {
        reject(error)
      })
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
