import { getlocalStorageToken } from "../utils/_ls"
export interface State {
  token: string,
  userInfo: UserInfo,
  [props: string]: any
}

export interface UserInfo {
  username: string,
  password: string,
  [props: string]: any
}

export function state() {
  return {
    token: getlocalStorageToken() || '',
    userInfo: {
      username: '',
      password: ''
    }
  }
}