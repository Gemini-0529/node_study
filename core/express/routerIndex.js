const express = require('express')
const app = express()
const router = require('./routerMiddle')
// 使用express内置的解析post请求参数的中间件
app.use(express.urlencoded({extended: false}))// uname=124&pwd=122
app.use(express.json())// {"uname":123,"pwd":234}
// 应用级别中间件
app.use((req, res, next)=>{
  console.log('验证token');
  next()
})
// 应用级别中间件
//匹配到 /api的会进入 其中的路由级别中间件
app.use('/api',router)

// 错误中间件，匹配不到路由就会进入
app.use((req, res)=> {
  // console.log(err);
  res.status(404).send('not found')
})

app.listen(3000, ()=> {
  console.log('router middle...');
})