const fs = require('fs')

const rs = fs.createReadStream('./test.txt','utf-8')
// 读取文件流
rs.on('data', chunk=> {
  console.log('接收数据流->',chunk);
})
// 读取结束
rs.on('end', ()=> {
  console.log('end');
})
rs.on('error',err=>{
  console.log(err);
})