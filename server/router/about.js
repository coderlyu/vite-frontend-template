const mockjs = require('mockjs')
const utils = require('../utils/index.js')

async function actives(ctx) {
  const { limit = 10, page = 1 } = ctx.request.query
  const data = mockjs.mock({
    [`data|${limit}`]: [
      {
        "id|+1": 1,
        "imgUrl|1": [
          "https://pic3.zhimg.com/v2-03371b64a1da395c519938e65965ff61.jpg?source=8c23436a",
          "https://pic4.zhimg.com/v2-f93156f6bd568c80d5e2d54833286550.jpg?source=8c23436a",
          "https://pic2.zhimg.com/v2-37852e07af93ea1675d8cd50a699f4ff.jpg?source=8c23436a",
          "https://pic4.zhimg.com/v2-400ebc21c25b0b7bb0740e6e25a7b1c5.jpg?source=8c23436a",
          "https://pic2.zhimg.com/v2-ce896400cea15a93a05bc6b0188b668c.jpg?source=8c23436a",
          "https://pic1.zhimg.com/v2-456a0f551ce75a8d5adab52e6413ab1d.jpg?source=8c23436a",
          "https://pic4.zhimg.com/v2-a73ecc1ba6adedb07c21b85937560192.jpg?source=8c23436a",
        ],
        "url": "",
        "time": () =>`${mockjs.Random.date('yyyy 年 MM 月 dd 日')} - ${mockjs.Random.date('yyyy 年 MM 月 dd 日')}`
      }
    ]
  })
  utils.errorHandle(ctx, 200, '获取公告列表成功', data.data, { total: 88 })
}

async function messages(ctx) {
  const { limit = 10, page = 1 } = ctx.request.query
  const data = mockjs.mock({
    [`data|${limit}`]: [
      {
        "id|+1": 1,
        "label|1": ["【系统通知】", '', '【自动触发】', '【科技】', '【新闻】'],
        "title|1": ["该系统将于今晚凌晨2点到5点进行升级维护", '好友给你发来一条元宵祝福', '你的文章被评为年度优秀作品', 'xx炮轰安卓高抽成，称其对产业生态非常不利', '旧代码获新生！AI 重写的应用程序可用于最新计算平台', '今天你打到车了吗？滴滴突然崩了，司机接不到人、乘客付不了钱', '技术写作技巧分享：我是如何从写作小白成长为多平台优秀作者的？'],
        "time": () => mockjs.Random.date('yyyy-MM-dd HH:mm:ss')
      }
    ]
  })
  utils.errorHandle(ctx, 200, '获取列表成功', data.data, { total: 120 })
}

async function records(ctx) {
  const { limit = 10, page = 1 } = ctx.request.query
  const data = mockjs.mock({
    [`data|${limit}`]: [
      {
        "id|+1": 1,
        "date": () => mockjs.Random.date('yyyy/MM/dd'),
        "time": () => mockjs.Random.date('HH:mm:ss'),
        "author|1": ["coderly", '立方体转移工程师', '空间物质转移监督员', '黑白黄的猫'],
        "operation|1": ["修改密码", '添加系统管理员', '发布作品', '删除管理员']
      }
    ]
  })
  utils.errorHandle(ctx, 200, '获取列表成功', data.data, { total: 120 })
}

module.exports = {
  actives,
  messages,
  records
}