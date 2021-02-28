const md5 = require('js-md5')
const _ = require('./utils/index')

module.exports = {
  'POST /api/user/login': async function (req, res) {
    const body = await _.getPostData(req, res)
    const { username = '', password = '', sign = '' } = body || {}
    let newBody = JSON.parse(JSON.stringify(body))
    delete newBody.sign
    let sign_code = _.sign(newBody)
    if (username === 'admin' && password === md5('admin') && sign_code === sign) {
      _.generateResponseData(res, '登录成功', [], 200, { token: md5('au真是个天才，哈哈哈') })
      return
    }
    _.generateResponseData(res, '用户信息有误', [], 500)
  },
  'GET /api/user/info': function (req, res) {
    return _.generateResponseData(res, '获取用户信息成功', { username: 'admin', sex: '男' })
  },
}
