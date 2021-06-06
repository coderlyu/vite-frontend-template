const KoaRouter = require('koa-router')
const KoaBody = require('koa-body') // post解析参数并支持附件上传

const user = require('./user.js')
const data = require('./data.js')
const home = require('./home.js')
const about = require('./about.js')
const router = new KoaRouter()

/** user */
router.get('/api/user/info', user.info)
      .post('/api/user/login', user.login)

/** data */

router.get('/api/data/list', data.list)
      .get('/api/data/news', data.news)

/** home */

router.get('/api/home/levels', home.levels)
      .get('/api/home/counts', home.counts)
      .get('/api/home/notices', home.notices)

/** about */

router.get('/api/about/actives', about.actives)
      .get('/api/about/messages', about.messages)
      .get('/api/about/records', about.records)

module.exports = function useRoutes(app) {
  app.use(KoaBody({
    multipart: true, // 支持文件上传
  }))
  app.use(router.routes())
  app.use(router.allowedMethods())
}