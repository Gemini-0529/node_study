const http = require('http')
const server = http.createServer()
const url = require('url')

server.on('request',(req,res) => {
  const data = {id: 1,label: 'gemini'}
  const senddata = JSON.stringify(data)
  const {query} = url.parse(req.url, true)
  // 拿到前端传的参数，作为函数名
  const cbName = query.cb
  // 通过给前端返回一个函数，前端调用他解决跨域
  res.end(`${cbName}(${senddata})`)
})

server.listen(3000, () => {
  console.log('server success');
})