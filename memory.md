#### node遵循 commonJS规范
```javascript
// a.js
const count = 0
module.exports = count // 或module.exports = {count}

// index.js
const count = require('./a') // 或const {count} = require('./a')
```
#### npm
##### 初始化 package.json 文件
> npm init
##### npm install
> npm install xxx   ==> npm install xxx --save
##### 包名符号前缀
1. "^1.1.1" 锁定大版本号
2. "~1.1.1" 锁定大版本号和中版本号
3. "*" 安装最新版本