const express = require('express')
const app = express()
const router = require('./routerMiddle')
// 使用express内置的解析post请求参数的中间件
app.use(express.urlencoded({extended: false}))// uname=124&pwd=122
app.use(express.json())// {"uname":123,"pwd":234}
// 托管静态资源的中间件，会在static文件夹中找请求的文件
// http://localhost:3000/index.html
app.use(express.static('static'))
// 或加资源路径，指定文件夹下的资源
// http://localhost:3000/public/index.html
app.use('/public',express.static('public'))
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