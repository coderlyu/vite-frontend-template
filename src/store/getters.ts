import { State } from './state'
export default {
  getToken(state: State) {
    return state.token
  },
  getUserInfo(state: State) {
    return state.userInfo
  }
}