const md5 = require('js-md5')
const querystring = require('querystring')

module.exports = {
  'POST /api/user/login': async function (req, res) {
    const body = await getPostData(req, res)
    const { username = '', password = '', sign = '' } = body || {}
    let newBody = JSON.parse(JSON.stringify(body))
    delete newBody.sign
    let sign_code = _sign(newBody)
    if (username === 'admin' && password === md5('admin') && sign_code === sign) {
      generateResponseData(res, '登录成功', [], 200, { token: md5('au真是个天才，哈哈哈') })
      return
    }
    generateResponseData(res, '用户信息有误', [], 500)
  },
  'GET /api/user/info': function (req, res) {
    return generateResponseData(res, '获取用户信息成功', { username: 'admin', sex: '男' })
  },
  'GET /api/home/level': function (req, res) {
    return generateResponseData(res, '获取用户等级成功', Math.floor(Math.random() * 5 + 1))
  },
  'GET /api/home/count': function (req, res) {
    const counts = [
      {
        id: 1,
        title: '昨日阅读总数',
        icon: 'iconyinzhangrenzheng',
        num: 120
      },
      {
        id: 2,
        title: '昨日赞同总数',
        icon: 'iconhaxi',
        num: 120
      },
      {
        id: 3,
        title: '昨日粉丝数',
        icon: 'iconliuzhuan',
        num: 120
      },
      {
        id: 4,
        title: '昨日活跃粉丝数',
        icon: 'iconqukuai',
        num: 120
      },
      {
        id: 5,
        title: '内容健康度',
        icon: 'iconsuyuan',
        num: '90分'
      },
      {
        id: 6,
        title: '昨日收益',
        icon: 'iconshujuku',
        num: '92,340.00'
      }
    ]
    return generateResponseData(res, '获取统计信息成功', counts)
  },
  'GET /api/home/notice': function (req, res) {
    let data = [
      {
        id: 1,
        tags: [
          {
            value: 1,
            label: 'HOT'
          },
          {
            value: 4,
            label: '置顶'
          }
        ],
        content: '【活动入口已开启】元宵猜灯谜、战胜小龙人一系列活动来袭，快来体验下',
        time: '2021/10/02'
      },
      {
        id: 2,
        tags: [
          {
            value: 1,
            label: 'HOT'
          },
          {
            value: 3,
            label: 'NEW'
          }
        ],
        content: '【创作大赛】创作大赛欢迎你的加入',
        time: '2020/03/19'
      },
      {
        id: 3,
        tags: [
          {
            value: 1,
            label: 'HOT'
          },
          {
            value: 2,
            label: 'NEW'
          }
        ],
        content: '【征文】发表文章即可',
        time: '2021/02/23'
      },
      {
        id: 4,
        tags: [
          {
            value: 2,
            label: 'TOP'
          }
        ],
        content: '【征文】发表文章即可',
        time: '2019/05/09'
      },
      {
        id: 5,
        tags: [
          {
            value: 5,
            label: 'HOT'
          }
        ],
        content: '【征文】发表文章即可',
        time: '2019/11/19'
      }
    ]
    const { limit = 10, page = 1 } = req.query
    const _data = []
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 5)]
      _item = cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    generateResponseData(res, '获取公告列表成功', _data, 200, { total })
  },
  'GET /api/data/list': function (req, res) {
    const data = [
      {
        id: 1,
        name: '品牌任务',
        title: '帖子-流行指南',
        imgUrl: 'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
        content: '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        link: '好的长文章应该怎么写？'
      },
      {
        id: 2,
        name: '最佳推手',
        title: '帖子-合理熬夜',
        imgUrl: 'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
        content: '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        link: '好的长文章应该怎么写？'
      },
      {
        id: 3,
        name: '每日上新',
        title: '热搜-如何写出别人无法维护的代码',
        imgUrl: 'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
        content: '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        link: '好的长文章应该怎么写？'
      },
      {
        id: 4,
        name: '每日上新',
        title: '问题-优秀的人自恋程度',
        imgUrl: 'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
        content: '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        link: '怎么能让别人注意到这里？'
      },
      {
        id: 5,
        name: '每日一问',
        title: '帖子-合格韭菜的自我修养',
        imgUrl: 'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
        content: '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        link: '如何安全下天台？'
      }
    ]
    const { limit = 10, page = 1 } = req.query
    const _data = []
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 5)]
      _item = cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
  'GET /api/about/actives': function (req, res) {
    const data = [
      {
        id: 1,
        imgUrl: 'https://pic3.zhimg.com/v2-03371b64a1da395c519938e65965ff61.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 19 日 - 2021 年 03 月 19 日'
      },
      {
        id: 2,
        imgUrl: 'https://pic4.zhimg.com/v2-f93156f6bd568c80d5e2d54833286550.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 08 日 - 2021 年 02 月 26 日'
      },
      {
        id: 3,
        imgUrl: 'https://pic2.zhimg.com/v2-37852e07af93ea1675d8cd50a699f4ff.jpg?source=8c23436a',
        url: '',
        time: '2021 年 01 月 18 日 - 2021 年 03 月 18 日'
      },
      {
        id: 4,
        imgUrl: 'https://pic4.zhimg.com/v2-400ebc21c25b0b7bb0740e6e25a7b1c5.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 05 日 - 2021 年 03 月 05 日'
      },
      {
        id: 5,
        imgUrl: 'https://pic2.zhimg.com/v2-ce896400cea15a93a05bc6b0188b668c.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 03 日 - 2021 年 03 月 03 日'
      },
      {
        id: 6,
        imgUrl: 'https://pic1.zhimg.com/v2-456a0f551ce75a8d5adab52e6413ab1d.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 07 日 - 2021 年 02 月 28 日'
      },
      {
        id: 7,
        imgUrl: 'https://pic4.zhimg.com/v2-a73ecc1ba6adedb07c21b85937560192.jpg?source=8c23436a',
        url: '',
        time: '2021 年 02 月 03 日 - 2021 年 02 月 23 日'
      },
    ]
    const _data = []
    const { limit = 10, page = 1 } = req.query
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 7)]
      _item = cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
  'GET /api/about/message': function (req, res) {
    const data = [
      {
        id: 1,
        label: '【系统通知】',
        title: '该系统将于今晚凌晨2点到5点进行升级维护',
        time: '2021-04-01 23:00:01'
      },
      {
        id: 2,
        label: '',
        title: '好友给你发来一条元宵祝福',
        time: '2021-04-01 23:00:01'
      },
      {
        id: 3,
        label: '【自动触发】',
        title: '你的文章被评为年度优秀作品',
        time: '2021-04-01 23:00:01'
      },
      {
        id: 4,
        label: '【科技】',
        title: 'xx炮轰安卓高抽成，称其对产业生态非常不利',
        time: '2021-04-01 23:00:01'
      },
      {
        id: 5,
        label: '【科技】',
        title: '旧代码获新生！AI 重写的应用程序可用于最新计算平台',
        time: '2021-04-01 23:00:01'
      },
      {
        id: 6,
        label: '【新闻】',
        title: '今天你打到车了吗？滴滴突然崩了，司机接不到人、乘客付不了钱',
        time: '2021-04-01 23:00:01'
      },
      {
        id: 7,
        label: '【新闻】',
        title: ' 技术写作技巧分享：我是如何从写作小白成长为多平台优秀作者的？',
        time: '2021-04-01 23:00:01'
      },
    ]
    const _data = []
    const { limit = 10, page = 1 } = req.query
    let len = Math.floor((Math.random() * limit + 1))
    let total = Math.floor((Math.random() * limit * 16 + 1));
    for(let i = 0; i < len; i ++) {
      let _item = data[Math.floor(Math.random() * 7)]
      _item = cloneData(_item)
      _item.id = Math.floor(Math.random() * 10000 + page * 1234)
      _data.push(_item)
    }
    return generateResponseData(res, '获取列表成功', _data, 200, { total })
  },
}

function _sign(data) {
  var newkey = Object.keys(data).sort()
  var newObj = {}
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = data[newkey[i]]
  }
  let signature = 'au'
  for (var j = 0; j < newkey.length; j++) {
    signature += newObj[newkey[j]]
  }
  var date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, '').replace(/\.[\d]{3}Z/, '')
  signature += date.substring(0, 10)
  signature += 'au'
  signature = md5(signature.toUpperCase())
  return signature
}
function generateResponseData (res, message = '', data = [], code = 200, args) {
  return res.json({
    error_code: code,
    data,
    message,
    ...args
  })
}

function getPostData (req, res) {
  return new Promise((resolve, reject) => {
    let post = '';
    req.on('data', function (chunk) {
      post += chunk;
    });
    req.on('error', function (chunk) {
      reject()
    });
    req.on('end', function () {
      post = querystring.parse(post);
      res.body = post
      resolve(post)
    });
  })
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}