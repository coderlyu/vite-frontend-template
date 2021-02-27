import request from '../plugins/axios'

export function getNoticelist() {
  return request({
    url: '/home/notice',
    method: 'get'
  })
}

export function getCountlist() {
  return request({
    url: '/home/count',
    method: 'get'
  })
}

export function getCurrentLevel() {
  return request({
    url: '/home/level',
    method: 'get'
  })
}