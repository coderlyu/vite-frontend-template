import { State } from './state'
export default {
  getToken(state: State) {
    return state.token
  },
  getUserInfo(state: State) {
    return state.userInfo
  },
  getScreenWidth(state: State) {
    return state.screenWidth
  },
  isMobile(state: State) {
    return state.isMobile
  },
  toggleClosed(state: State) {
    return state.toggleClosed
  }
}