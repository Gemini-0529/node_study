const http = require('http')
const zlib = require('zlib')
const fs = require('fs')

const gzip = zlib.createGzip()
http.createServer((req,res)=>{
  const rs = fs.createReadStream('./a.txt','utf-8')
  res.writeHead(200, {
    "Content-Type": "application/x-javascript;charset=utf-8",
    "Content-Encoding":"gzip"// 主要
  })
  // 给前端返回压缩文件流
  rs.pipe(gzip).pipe(res)
}).listen(3000,()=>{

})