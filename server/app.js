const Koa = require('koa')
const app = new Koa()

require('./router/index.js')(app)

app.listen(8888, (error) => {
  if (!error) {
    console.log('server is running at http://localhost:8888')
  }
})