const http = require('http')
const https = require('https')
const Events = require('events')

const server = http.createServer()
let bus = null

server.on('request', (req,res) => {
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    // cors 头
    "access-control-allow-origin": "*"
  })
  // 在监听请求内部创建bus实例，否则会重复监听自定义事件
  bus = new Events()
  bus.on('sendMovies', data => {
    res.end(data)
  })
  getData()
})

server.listen(3000,()=> {
  console.log('success');
})

function getData() {
  const url = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4'
  let data = ''
  https.get(url, res => {
    res.on('data', chunk=> {
      data += chunk
    })
    res.on('end',()=> {
      bus.emit('sendMovies',data)
    })
  })
}