const crypto = require('crypto')
// 转成md5格式
const hash = crypto.createHash('md5')
hash.update('hello')

console.log(hash.digest('hex'));