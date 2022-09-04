const http = require('http')
const server = http.createServer()
const url = require('url')

server.on('request',(req,res) => {
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    // cors 头
    "access-control-allow-origin": "*"
  })
  const data = {id: 1,label: 'gemini'}
  const senddata = JSON.stringify(data)
  res.end(senddata)
})

server.listen(3000, () => {
  console.log('server success');
})