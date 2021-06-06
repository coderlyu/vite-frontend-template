const mockjs = require('mockjs')
const utils = require('../utils/index.js')

async function levels(ctx) {
  utils.errorHandle(ctx, 200, '获取用户等级成功', mockjs.Random.natural(1, 5))
}

async function counts(ctx) {
  const data = mockjs.mock([
    {
      "id": 1,
      "title": "昨日阅读总数",
      "icon": "iconyinzhangrenzheng",
      "num": mockjs.Random.natural(1,1000)
    },
    {
      "id": 2,
      "title": "昨日赞同总数",
      "icon": "iconhaxi",
      "num": mockjs.Random.natural(1,1000)
    },
    {
      "id": 3,
      "title": "昨日粉丝数",
      "icon": "iconliuzhuan",
      "num": mockjs.Random.natural(1,1000)
    },
    {
      "id": 4,
      "title": "昨日活跃粉丝数",
      "icon": "iconqukuai",
      "num": mockjs.Random.natural(1,1000)
    },
    {
      "id": 5,
      "title": "内容健康度",
      "icon": "iconsuyuan",
      "num": "90分"
    },
    {
      "id": 6,
      "title": "昨日收益",
      "icon": "iconshujuku",
      "num": "92,340.00"
    }
  ])
  utils.errorHandle(ctx, 200, '获取统计信息成功', data)
}

async function notices(ctx) {
  const { limit = 10, page = 1 } = ctx.request.query
  const data = mockjs.mock({
    [`data|${limit}`]: [
      {
        "id|+1": 1,
        "tags": () => [
          {
            "value": 1,
            "label": "HOT"
          },
          {
            "value": 2,
            "label": "TOP"
          },
          {
            "value": 3,
            "label": "NEW"
          },
          {
            "value": 4,
            "label": "置顶"
          },
          {
            "value": 5,
            "label": "HOT"
          }
        ].splice(mockjs.Random.natural(0,4), mockjs.Random.natural(0,2)),
        "content|1": ["【活动入口已开启】元宵猜灯谜、战胜小龙人一系列活动来袭，快来体验下", '【创作大赛】创作大赛欢迎你的加入', '【征文】发表文章即可'],
        "time": () => mockjs.Random.date('yyyy/MM/dd')
      }
    ]
  })
  utils.errorHandle(ctx, 200, '获取公告列表成功', data.data, { total: 203 })
}

module.exports = {
  levels,
  counts,
  notices
}