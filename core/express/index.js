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

app.listen(3000, ()=> {
  console.log('express start');
})