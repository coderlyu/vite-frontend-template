const _ = require('./utils/index')
const _d = require('./utils/d.json')

module.exports = {
  'GET /api/about/actives': function (req, res) {
    const data = _d.actives
    const _data = []
    const { limit = 10, page = 1 } = req.query
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 7)]
      _item = _.cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return _.generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
  'GET /api/about/messages': function (req, res) {
    const data = _d.messages
    const _data = []
    const { limit = 10, page = 1 } = req.query
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 7)]
      _item = _.cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return _.generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
  'GET /api/about/records': function (req, res) {
    const data = _d.records
    const _data = []
    const { limit = 10, page = 1 } = req.query
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 4)]
      _item = _.cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return _.generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
  'GET /api/about/test': function (req, res) {
    const data = _d.records
    const _data = []
    const { limit = 10, page = 1 } = req.query
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 4)]
      _item = _.cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return _.generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
}