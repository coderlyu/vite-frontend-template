import request from '../plugins/axios'

export function getList(params: unknown) {
  return request({
    url: '/data/list',
    method: 'get',
    params
  })
}

export function getNewList(params: unknown) {
  return request({
    url: '/data/news',
    method: 'get',
    params
  })
}
