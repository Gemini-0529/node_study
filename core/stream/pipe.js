const fs = require('fs')
const rs = fs.createReadStream('./test.txt','utf-8')
const ws = fs.createWriteStream('./test3.txt','utf-8')
// 复制粘贴大型文件流
rs.pipe(ws)