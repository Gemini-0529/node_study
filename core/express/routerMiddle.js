const express = require('express')

const router = express.Router()
// 路由级别中间件
router.get('/home', (req, res) => {
  // res.send('路由级别中间件   home')
  res.render('home',{list: [11,22,33],code:'<b>这是代码片段</b>'})
})
router.get('/login', (req, res) => {
  console.log(req.query);
  // res.send('路由级别中间件   login')
  // 获取参数
  // res.send(req.query)
  // 返回views模板文件夹中的 login模板，可以携带数据过去
  // ejs文件内使用 <%=property%> 语法替换掉静态内容
  res.render('login',{message: ''})
})
// post请求参数
router.post('/loginpost', (req, res) => {
  // 获取post请求的参数，
  // 前提是在请求上方注册两种post发送参数的中间件 express.json()和express.urlencoded({extended: false})
  console.log(req.body);
  if(req.body.uname==='zwb' && req.body.pwd==='123456') {
    res.send({
      data: 1
    })
  }else {
    res.send({
      data: 0
    })
  }
  // res.send('路由级别中间件   login')
  // res.send(req.body)
})
// 服务端渲染login接口 /api/userlogin
router.post('/userlogin', (req, res) => {
  if(req.body.uname==='zz' && req.body.pwd==='123') {
    res.redirect('/api/home')
  }else {
    res.render('login', {message: '错误'})
  }
})

module.exports = router