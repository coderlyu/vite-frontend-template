import request, { PromiseLoginName } from '../plugins/axios'
import md5 from 'js-md5'
export function login(data: { password: string, username: string }){
  let password = md5(data.password)
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      ...data,
      password
    }
  })
}

export function info() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}