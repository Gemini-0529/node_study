const express = require('express')

const app = express()

app.get('/login', (req, res) => {
  res.write('login')
  res.end()
})
app.get('/', (req, res)=>{
  // 直接发送内容，不用管content-type值
  res.send({
    name: 'z',
    id: 2
  })
})
// // 字符串匹配：？前面的字符可有可无，返回值一样
// app.get('/lists?', (req, res) => {
//   res.send('/lists or /list is ok!')
// })
// // 字符串匹配：()+ 括号里面的内容可写可不写
// app.get('/l(is)?t', (req, res) => {
//   res.send('/list or liabcdefgst is ok!')
// })
// // 字符串匹配：+前面的字符可以是1～无穷个
// app.get('/lists+', (req, res) => {
//   res.send('/lists or /listssssss is ok!')
// })
// // 字符串匹配：*可以是任意字符
// app.get('/li*st', (req, res) => {
//   res.send('/lisdkjfsodfjst')
// })
// // 字符串匹配：正则表达式
// app.get(/.*abc$/, (req, res) => {
//   res.send('可以匹配正则表达式的路由')
// })
// // 类似 vue 的动态路由参数
// app.get('/detail/:id', (req, res) => {
//   console.log(req);
//   res.send('动态参数')
// })

app.listen(3000, ()=> {
  console.log('express start');
})