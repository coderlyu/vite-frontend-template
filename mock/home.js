const _ = require('./utils/index')
const _d = require('./utils/d.json')

module.exports = {
  'GET /api/home/levels': function (req, res) {
    return _.generateResponseData(res, '获取用户等级成功', Math.floor(Math.random() * 5 + 1))
  },
  'GET /api/home/counts': function (req, res) {
    const counts = _d.counts
    return _.generateResponseData(res, '获取统计信息成功', counts)
  },
  'GET /api/home/notices': function (req, res) {
    let data = _d.notices
    const { limit = 10, page = 1 } = req.query
    const _data = []
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 5)]
      _item = _.cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    _.generateResponseData(res, '获取公告列表成功', _data, 200, { total })
  },
}