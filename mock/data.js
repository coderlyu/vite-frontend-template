const _ = require('./utils/index')
const _d = require('./utils/d.json')

module.exports = {
  'GET /api/data/list': function (req, res) {
    const data = _d.data_list
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
    return _.generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
  'GET /api/data/news': function (req, res) {
    const data = _d.news
    const { limit = 10, page = 1 } = req.query
    const _data = []
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < 10; i ++) {
      let _item = data[Math.floor(Math.random() * 10)]
      _item = _.cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _item.num = Math.floor(Math.random() * 10000)
      _data.push(_item)
    }
    return _.generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
}