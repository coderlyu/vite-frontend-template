const mockjs = require('mockjs')
const utils = require('../utils/index.js')

async function list(ctx) {
  const { limit = 10, page = 1 } = ctx.request.body

  const data = mockjs.mock({
    [`data|${limit}`]: [
      {
        'id|+1': 1,
        'name|1': ['品牌任务', '最佳推手', '每日上新', '每日一问'],
        'title|1': ['帖子-流行指南', '帖子-合理熬夜', '热搜-如何写出别人无法维护的代码', '问题-优秀的人自恋程度', '帖子-合格韭菜的自我修养'],
        'imgUrl': 'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
        'content': '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        'link|1': ['好的长文章应该怎么写？', '怎么能让别人注意到这里？']
      }
    ]
  })
  utils.errorHandle(ctx, 200, '登录成功', data.data, { total: 68 })
}

async function news(ctx) {
  const { limit = 10, page = 1 } = ctx.request.body
  const data = mockjs.mock({
    [`data|${limit}`]: [
      {
        'id|+1': 1,
        'title|1': ['秋季外套', '冬季毛衣', '牛仔裤', '今年流行的毛衣短款', '早春人气爆棚卫衣', '春季宝藏新品外套', '学生党开学必备连衣裙', '不沾杯口红拒绝尴尬', '干饭人必学偷懒菜', '驱魔司带你一起梦长安'],
        'num': () =>　mockjs.Random.natural(1,1000)
      }
    ]
  })
  utils.errorHandle(ctx, 200, '登录成功', data.data)
}

module.exports = {
  list,
  news
}