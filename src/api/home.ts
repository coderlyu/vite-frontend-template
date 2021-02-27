import request from '../plugins/axios'

export function getNoticelist() {
  return request({
    url: '/home/notices',
    method: 'get'
  })
}

export function getCountlist() {
  return request({
    url: '/home/counts',
    method: 'get'
  })
}

export function getCurrentLevel() {
  return request({
    url: '/home/levels',
    method: 'get'
  })
}