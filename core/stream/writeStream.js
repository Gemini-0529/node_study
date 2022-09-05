const fs = require('fs')
const ws = fs.createWriteStream('./test2.txt','utf-8')
const rs = fs.createReadStream('./test.txt','utf-8')
// 读取到文件流后，写入新文件
rs.on('data',chunk=>{
  ws.write(chunk)
})
rs.on('end',()=>{
  console.log('end---');
})
rs.on('error',err=>{
  console.log(err);
})