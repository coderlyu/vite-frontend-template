const querystring = require('querystring')
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

module.exports = {
  sign,
  generateResponseData,
  getPostData,
  cloneData
}