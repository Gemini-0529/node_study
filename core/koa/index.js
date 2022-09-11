const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // ctx.response.body = '<h1>hello world</h1>' 或可以省略 response
  ctx.body = {id:1}
})
app.listen(3000)