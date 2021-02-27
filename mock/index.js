const userApi = require('./user')
const dataApi = require('./data.js')
const homeApi = require('./home')
const aboutApi = require('./about')
module.exports = {
  ...userApi,
  ...dataApi,
  ...homeApi,
  ...aboutApi
}