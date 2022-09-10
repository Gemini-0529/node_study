const express = require('express')

const app = express()
// 路由后面的回调函数称为中间件，可以有多个中间件，通过调用 next() 进入下一个中间件
// 写法1，不优雅
app.get(
  '/login',
  (req, res, next) => {
    console.log('进入第一个中间件');
    if(true) {
      // 进入下一个中间件
      next()
    }else {
      res.send('验证失败')
    }
  },
  (req, res) => {
    res.send('验证通过，登录中...')
  }
)
// 写法2，完美
function cb1(req, res, next) {
  console.log('应用级别中间件');
  next()
}
app.use(cb1)
function cb2(req, res) {
  console.log('执行中间件2');
  res.send('loading...')
}
app.get('/home', [cb2])

app.listen(3000, () => {
  console.log('express start');
})