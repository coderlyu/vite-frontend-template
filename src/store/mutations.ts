import { removelocalStorageToken, setlocalStorageToken } from '../utils/_ls'
import { State, UserInfo } from './state'
import { SET_TOKEN, CLEAR_TOKEN, USER_LOGIN, UPDATE_IS_MOBILE, UPDATE_SCREEN_WIDTH, UPDATE_TOGGLE_TYPE } from './types'
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
  },
  [UPDATE_SCREEN_WIDTH](state: State, width: number) {
    state.screenWidth = width
  },
  [UPDATE_IS_MOBILE](state: State, isMobile: boolean) {
    state.isMobile = isMobile
  },
  [UPDATE_TOGGLE_TYPE](state: State, closed: boolean) {
    state.toggleClosed = closed
  }
}
