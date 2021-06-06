const md5 = require('js-md5')
const querystring = require('querystring')
const loggers = require('../log.js')
const { koaLogger } = loggers
/**
 * 
 * @param {加盐数据} data 
 * @returns 
 */
function sign(data) {
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

function errorHandle(ctx, code, message = '', data = '', options = {}) {
  if (code === 200) {
    ctx.body = {
      error_code: code,
      data,
      message,
      ...options
    };
  } else if (message && message.message) {
    ctx.body = {
      error_code: code,
      data,
      message: message.message,
      ...options
    };
  } else {
    ctx.body = {
      error_code: code,
      data,
      message,
      ...options
    }
  }
  code != 200 && koaLogger.error(`错误码：${code}，数据：${JSON.stringify(data)}，错误信息：${JSON.stringify(message)}`)
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

module.exports = {
  sign,
  errorHandle,
  cloneData
}