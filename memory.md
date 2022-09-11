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
#### fs文件系统模块
##### 创建文件
```js
const fs = require('fs')
// 创建文件夹
fs.mkdir('./assets', err => {
  if(err) {
    console.log('文件创建失败->',err);
  }
})
// 修改文件名
fs.rename('./assets','public', err => {
  if(err) {
    console.log('修改文件名失败->', err);
  }
})
// 删除文件，
// 前提是删除的目标没有子文件，否则会报 ENOTEMPTY(目录不为空)
// 不能删自己
fs.rmdir('./assets', err => {
  if(err) {
    console.log('目录不存在或不为空',err);
  }
})
// 删除文件引用，不能删除文件夹
fs.unlink('./test/j.js', err => {
  if(err) {
    console.log('删除失败->',err);
  }
})
// 创建文件并写入内容（每次都会替换）
fs.writeFile('./images.txt','1.jpg\n\r2.png', err => {
  if(err) {
    console.log('写文件失败->', err);
  }
})
// 创建文件并追加内容
fs.appendFile('./test.txt','1.jpg\n\r2.png', err => {
  if(err) {
    console.log('写文件失败->', err);
  }
})
// 读取文件
fs.readFile('./images.txt', 'utf-8', (err, data)=>{
  if(!err) {
    // 如果在路径后面没有规定格式，则需要将buffer数据转成utf-8格式
    // console.log(data.toString("utf-8"));
    console.log(data);
  }
})
// 读取文件目录
fs.readdir('./assets',(err,data) => {
  if(!err) {
    console.log(data);
  }
})
// 读取文件详细信息
fs.stat('./assets/b',(err,data)=> {
  if(!err) {
    // 是否文件
    console.log(data.isFile());
    // 是否文件夹
    console.log(data.isDirectory());
  }
})

```
##### 同步删除目录
> 最好不用，因为node环境执行的js代码是服务器端代码，所以大部分在服务器运行期反复执行业务逻辑的代码必须使用异步代码，否则同步代码在执行期间，服务器将停止响应
```js
// async 解决删除目录，文件未删除，会阻塞后续处理，所以可以删除成功
fs.readdir('./assets', (err,data)=> {
  data.forEach(item => {
    fs.unlinkSync(`./assets/${item}`)
  })
  fs.rmdir('./assets', err=> {
    console.log(err);
  })
})
```
##### promise方案删除目录
```js
const fs = require('fs').promises

fs.readdir('./assets').then(async data => {
  let parr = []
  data.forEach(item => {
    parr.push(fs.unlink(`./assets/${item}`))
  })
  await Promise.all(parr)
  await fs.rmdir('./assets')
})
```
#### stream模块
读取文件流
```js
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
```
写入文件流
```js
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
```
流，分为三个部分（origin pipe target）,语法是origin.pipe(target)，让数据从origin流向了target
```js
const fs = require('fs')
const rs = fs.createReadStream('./test.txt','utf-8')
const ws = fs.createWriteStream('./test3.txt','utf-8')
// 复制粘贴大型文件流
rs.pipe(ws)
```
#### zlib 模块
##### gzip压缩文件
```js
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const rs = fs.createReadStream('./a.txt','utf-8')
const ws = fs.createWriteStream('./b.txt','utf-8')

rs.pipe(gzip).pipe(ws)
```
#### crypto
提供通用的加密哈希算法
> md5算法
```js
const crypto = require('crypto')
// 转成md5格式的hash算法
const hash = crypto.createHash('md5')// md5、sha1
hash.update('hello')

console.log(hash.digest('hex'));// 以16进制输出
```
> hmac算法，需要一个密钥，更加安全
```js
const crypto = require('crypto')

const hash = crypto.createHmac('sha1')

hash.update('hello')

console.log(hash.digest('hex'));
```
> aes算法
```js
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
```
#### 匹配路由、api
通过 **const url = new URL(req.url, "http://127.0.0.1").pathname**取到路由后，在路由表里匹配对应函数，res响应内容
#### mime插件
> 可以根据传入的后缀名，自动返回content-type
```js
const mime = require('mime')
mime.getType('.css')
```
#### express
> 基于 Node.js 平台，快速、开放、极简的web开发框架

```js
> npm install express

const express = require('express')

const app = express()
app.get('/', (req, res) => {
  // res.write('hello')
  // res.end()
  // 可以简写为：
  res.send('hello')
})

app.listen(3000, () => {
  console.log('server start...')
})
```
##### 匹配路由
```js
// 字符串匹配：？前面的字符可有可无，返回值一样
app.get('/lists?', (req, res) => {
  res.send('/lists or /list is ok!')
})
// 字符串匹配：()+ 括号里面的内容可写可不写
app.get('/l(is)?t', (req, res) => {
  res.send('/list or liabcdefgst is ok!')
})
// 字符串匹配：+前面的字符可以是1～无穷个
app.get('/lists+', (req, res) => {
  res.send('/lists or /listssssss is ok!')
})
// 字符串匹配：*可以是任意字符
app.get('/li*st', (req, res) => {
  res.send('/lisdkjfsodfjst')
})
// 字符串匹配：正则表达式
app.get(/.*abc$/, (req, res) => {
  res.send('可以匹配正则表达式的路由')
})
// 类似 vue 的动态路由参数
app.get('/detail/:id', (req, res) => {
  console.log(req);
  res.send('动态参数')
})
```
##### 中间件
```js
app.get('/home',回调函数=》中间件)
```
如果需要每个接口都校验token，需要使用应用级别中间件
```js
> app.use(路由，中间件)没有路由，则之后所有路由都会进入中间件，写了路由，跟app.get('/home',cb1)一样的效果
app.use(cb1)
function cb1(req, res, next) {
  console.log('应用级别中间件');
  next()
}
// 之后的所有路由都会进入cb1中间件
function cb2(req, res) {
  console.log('执行中间件2');
  res.send('loading...')
}
app.get('/home', [cb2])
```
##### 路由级别中间件
> 使用 express.Router() 创建的路由对象是路由中间件
```js
const express = require('express')

const router = express.Router()
// 路由级别中间件
router.get('/home', (req, res) => {
  res.send('路由级别中间件   home')
})
router.get('/login', (req, res) => {
  res.send('路由级别中间件   login')
})

module.exports = router

//index.js

// 应用级别中间件
//匹配到 /api的会进入 其中的路由级别中间件
app.use('/api',router)
```

##### 错误中间件
```js
// 其他路由，应用中间件。。。

// 注册错误中间件，写在最后
app.use((req, res) => {
  // res.send 默认的状态玛是200 ，需要重写status
  res.status(404).send('not found')
})
```
##### 获取请求参数
```js
// 使用express内置的解析post请求参数的中间件
app.use(express.urlencoded({extended: false}))// uname=124&pwd=122
app.use(express.json())// {"uname":123,"pwd":234}
```
##### 托管静态资源
```js
// 托管静态资源的中间件，会在static文件夹中找请求的文件
// http://localhost:3000/index.html
app.use(express.static('static'))
// 或加资源路径，指定文件夹下的资源
// http://localhost:3000/public/index.html
app.use('/public',express.static('public'))
```
##### 服务端渲染
前端做好静态页面，动态效果。提供给后端，后端用真实数据替换掉假数据，生成 html传给前端
###### 常用命令
1. res.render('模板名称', {携带数据})
2. res.redirect('路由')
###### 配置模板
```js
// 配置模板引擎
> npm i ejs
// 模板存放的文件夹，路径
app.set('views',"./views")
// 引擎
app.set('view engine', 'ejs')

// 匹配到login路由，在views中找到对应模板返回给前端
router.get('/login', (req, res) => {
  // 返回views模板文件夹中的 login模板，可以携带数据过去
  // ejs文件内使用 <%=property%> 语法替换掉静态内容
  res.render('login',{title: 'node项目'})
})
```
###### ejs文件使用数据库返回的数据
> <%= 变量名 %>     类似vue {{list}}

> <% 条件表达式 %>

> <%- 代码片段%>   解析传入的代码片段字符串 code:'<b>这是代码片段</b>'

>  <%# 这里面放注释文字，用户不会看到%>

```js
// home.ejs
<ul>
    <%for(let i=0;i<list.length;i++){ %>
      <li><%= list[i]%></li>
    <%}%>
  </ul>
```