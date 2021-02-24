import { removelocalStorageToken, setlocalStorageToken } from '../utils/_ls'
import { State, UserInfo } from './state'
import { SET_TOKEN, CLEAR_TOKEN, USER_LOGIN } from './types'
export default {
  [SET_TOKEN](state: State, token: string) {
    state.token = token
    setlocalStorageToken(token)
  },
  [CLEAR_TOKEN](state: State) {
    state.token = ''
    removelocalStorageToken()
  },
  [USER_LOGIN](state: State, user: UserInfo) {
    state.userInfo = user
  }
}
