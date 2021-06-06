const mockjs = require('mockjs')
const md5 = require('js-md5')
const utils = require('../utils/index.js')

async function login(ctx) {
  const { username = '', password = '', sign = '' } = ctx.request.body
  let body = utils.cloneData(ctx.request.body)
  delete body.sign
  const sign_code = utils.sign(body)
  if (username === 'admin' && password === md5('admin') && sign_code === sign) {
    utils.errorHandle(ctx, 200, '登录成功', '', { token: md5('au真是个天才，哈哈哈') })
    return
  }
  utils.errorHandle(ctx, 30000, '用户信息有误')
}

async function info(ctx) {
  utils.errorHandle(ctx, 200, '获取用户信息成功', mockjs.mock({ username: mockjs.Random.name(), 'sex|1': ['男', '女', '未知'] }))
}

module.exports = {
  login,
  info
}