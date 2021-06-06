const log4js = require('log4js')
const path = require('path')

const config = {
  appenders: {
    default: {
      type: 'dateFile',
      keepFileExt: true,
      filename: path.resolve(__dirname, './log/default.log')
    },
    koaRoute: {
      type: 'dateFile',
      keepFileExt: true,
      filename: path.resolve(__dirname, './log/koaRoute.log')
    },
    success: {
      type: 'dateFile',
      keepFileExt: true,
      filename: path.resolve(__dirname, './log/success.log')
    }
  },
  categories: {
    default: { appenders: ['default'], level: 'debug' },
    koaRoute: { appenders: ['koaRoute'], level: 'info' },
    success: { appenders: ['success'], level: 'all' }
  }
}

log4js.configure(config)
const koaLogger = log4js.getLogger('koaRoute')
const logger = log4js.getLogger()
const successLogger = log4js.getLogger('success')

module.exports = {
  koaLogger,
  logger,
  successLogger
}