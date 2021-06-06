const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()

app.use(cors())
require('./router/index.js')(app)

app.listen(8089, (error) => {
  if (!error) {
    console.log('server is running at http://localhost:8089')
  }
})