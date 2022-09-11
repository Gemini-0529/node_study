const express = require('express')

const app = express()

app.use((req, res, next)=>{
  console.log(111);
  next()
  console.log(333);
  res.send('对比 express 和 koa 之express')
})
app.use((req, res) => {
  console.log(222);
})

app.listen(3000)