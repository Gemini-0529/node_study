const express = require('express')

const router = express.Router()
// 路由级别中间件
router.get('/home', (req, res) => {
  res.send('路由级别中间件   home')
})
router.get('/login', (req, res) => {
  console.log(req.query);
  // res.send('路由级别中间件   login')
  // 获取参数
  res.send(req.query)
})
// post请求参数
router.post('/loginpost', (req, res) => {
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

module.exports = router