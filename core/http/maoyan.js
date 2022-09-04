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

function getData(cb) {
  const url = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4'
  let data = ''
  https.get(url, res => {
    res.on('data', chunk=> {
      data += chunk
    })
    res.on('end',()=> {
      console.log('获取数据-》',data);
      cb(JSON.stringify(data))
    })
  })
}