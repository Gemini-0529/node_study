const http = require('http')

http.createServer((req,res) =>{
  // 定义响应头
  res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
  res.write(
    `
      <html>
        <p>你好！</p>
      </html>
    `
  )
  // 结束响应，不加会报响应延迟
  res.end()
  // 之后的语句不会执行
}).listen(3000,() => {
  console.log('server start');
})