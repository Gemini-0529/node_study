const Koa = require('koa')

const app = new Koa()

// 111 进入下一个中间件 222 delay1000 333 返回到第一个中间件 444
app.use((ctx, next)=>{
  console.log(111);
  next()
  console.log(444);
  ctx.body='对比 express 和 koa 之koa'
})
app.use((ctx,next) => {
  console.log(222);
  delay(1000)
  console.log(333);
})
function delay(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}
app.listen(3000)