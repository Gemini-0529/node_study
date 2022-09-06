const crypto = require('crypto')

// 加密          
function encrypt(key, iv, data) {
                                  // 加密算法       16字节的密钥
  const dep = crypto.createCipheriv('aes-128-cbc', key, iv)
              // 加密的数据，二进制加密，输出16进制
  return dep.update(data, 'binary', 'hex') + dep.final('hex')
}

// 解密
function decrypt(key, iv, crypted) {
  // buffer对象转成二进制
  const data = Buffer.from(crypted, 'hex').toString('binary')
  const dep = crypto.createDecipheriv('aes-128-cbc', key, iv)
  return dep.update(data, 'binary', 'utf8') + dep.final('utf8')
}
// 测试加密算法
const key = 'abcdefghijklmnop'
const iv = 'bbcdefghijklmnop'
const enres = encrypt(key, iv, 'hello')// 加密
const deres = decrypt(key, iv, enres)// 解密
console.log('加密->',enres);
console.log('解密->',deres);