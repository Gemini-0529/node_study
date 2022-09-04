const http = require('http')
const server = http.createServer()
const url = require('url')
const https = require('https')

server.on('request',(req,res) => {
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    // cors 头
    "access-control-allow-origin": "*"
  })
  getData(data=>{
    res.end(data)
  })
})

server.listen(3000, () => {
  console.log('server success');
})
// 测试发送 post请求获取小米有品数据
function getData(cb) {
  const url = 'https://m.xiaomiyoupin.com/mtop/market/search/placeHolder'
  let data = ''
  const options = {
    hostname: 'm.xiaomiyoupin.com',
    port: '443',
    path: '/mtop/market/search/placeHolder',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  }
  const req = https.request(options, res => {
    res.on('data', chunk => {
      data += chunk
    })
    res.on('end',()=> {
      cb(data)
    })
  })
  req.write(JSON.stringify([{},{"baseParam":{"ypClient":1}}]))
  req.end()
}