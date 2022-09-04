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

#### yarn
对比npm：速度快，yarn缓存了每个下载过的包，无需重复下载；可以并行下载；安全，yarn会通过算法校验每个安装包的完整性
```js
yarn init

// 下载包
yarn add package
yarn add package@版本号
yarn add package --dev

// 升级包
yarn upgrade package@版本号

// 卸载包
yarn remove package
```

#### node使用es模块化写法

node 默认使用 commonjs规范，用es写法需要在package.json中配置"type":"module"。最好还是遵循默认模式，避免包不兼容es写法
```js
// es导入方式的坑:需要加.js后缀
import { upperCase, count } from './core/exports_1.js'
```
#### http模块
用于创建服务器，响应数据
```js
const http = require('http')

const { resStatus, renderHtml } = require('./moduleFn')
// 创建服务器
const server = http.createServer()
// 开启服务器
server.on('request',(req,res) =>{
  // 定义响应头
  res.writeHead(resStatus(req.url), {"Content-Type":"text/html;charset=utf-8"})
  // 根据路由响应不同内容
  res.write(renderHtml(req.url))
  // 结束响应，不加会报响应延迟
  res.end()
  // 之后的语句不会执行
})

server.listen(3000,() => {
  console.log('server start');
})
```
#### 自动重启服务器
> npm i -g nodemon
启动服务器：nodemon 文件名

#### 解析url中的路由和参数
```js
const url = require('url')
//      /home    name=1                      参数解析成对象格式
const {pathname, query} = url.parse(req.url, true)
```
#### package.json 添加调试命令
> "dev":"nodemon core/http/createServer1.js"
#### querystring模块解析参数
```js
const querystring = require('querystring')
const params = "name:z&id=1"
const obj = querystring.parse(params)// {name:'z',id:1}
```
#### jsonp
服务器端
```js
const http = require('http')
const server = http.createServer()
const url = require('url')

server.on('request',(req,res) => {
  const data = {id: 1,label: 'gemini'}
  const senddata = JSON.stringify(data)
  const {query} = url.parse(req.url, true)
  // 拿到前端传的参数，作为函数名
  const cbName = query.cb
  // 通过给前端返回一个函数，前端调用他解决跨域
  res.end(`${cbName}(${senddata})`)
})

server.listen(3000, () => {
  console.log('server success');
})
```
浏览器端
```html
<body>
  <script>
    // 实现jsonp
    const script = document.createElement('script')
    const query = document.location.search
    script.src = `http://localhost:3000/home${query}`
    document.body.appendChild(script)
    // 通过调用后端返回的函数，解决跨域
    function getData(data) {
      console.log(data);
    }
  </script>
</body>
```
#### CORS解决跨域
服务器端
```js
const http = require('http')
const server = http.createServer()
const url = require('url')

server.on('request',(req,res) => {
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    // cors 头
    "access-control-allow-origin": "*"
  })
  const data = {id: 1,label: 'gemini'}
  const senddata = JSON.stringify(data)
  res.end(senddata)
})

server.listen(3000, () => {
  console.log('server success');
})
```
#### events模块
类似vue的事件总线，有on、emit、off等方法
```js
const Events = require('events')

const bus = new Events()
bus.on('mounted',data => {
  console.log('事件监听',data);
})

bus.emit('mounted', [1,2,3])
```