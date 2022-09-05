const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const rs = fs.createReadStream('./a.txt','utf-8')
const ws = fs.createWriteStream('./b.txt','utf-8')

rs.pipe(gzip).pipe(ws)