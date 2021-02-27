import request from '../plugins/axios'

export function getActiveList(params: unknown) {
  return request({
    url: '/about/actives',
    method: 'get',
    params
  })
}

export function getMessageList(params: unknown) {
  return request({
    url: '/about/message',
    method: 'get',
    params
  })
}
