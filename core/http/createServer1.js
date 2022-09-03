const http = require('http')
const url = require('url')// 提取url路由、参数
const query = require('querystring')

const { resStatus, renderHtml } = require('./moduleFn')
// 创建服务器
const server = http.createServer()
// 开启服务器
server.on('request',(req,res) =>{
  const {pathname:href, query} = url.parse(req.url, true)
  console.log('请求路径：',href, '请求参数：',query);
  // 定义响应头
  res.writeHead(resStatus(href), {"Content-Type":"text/html;charset=utf-8"})
  // 根据路由响应不同内容
  res.write(renderHtml(href))
  // 结束响应，不加会报响应延迟
  res.end()
  // 之后的语句不会执行
})

server.listen(3000,() => {
  console.log('server start');
})