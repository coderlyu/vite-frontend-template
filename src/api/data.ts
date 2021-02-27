import request from '../plugins/axios'

export function getList() {
  return request({
    url: '/data/list',
    method: 'get'
  })
}
