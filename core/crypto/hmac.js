const crypto = require('crypto')

const hash = crypto.createHmac('sha1')

hash.update('hello')

console.log(hash.digest('hex'));