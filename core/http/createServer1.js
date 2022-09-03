const http = require('http')

const { resStatus, renderHtml } = require('./moduleFn')
// 创建服务器
const server = http.createServer()
// 开启服务器
server.on('request',(req,res) =>{
  // 定义响应头
  res.writeHead(resStatus(req.url), {"Content-Type":"text/html;charset=utf-8"})
  // 根据路由响应不同内容
  res.write(renderHtml(req.url))
  // 结束响应，不加会报响应延迟
  res.end()
  // 之后的语句不会执行
})

server.listen(3000,() => {
  console.log('server start');
})