const http = require('http')
const server = http.createServer()
const url = require('url')
const https = require('https')
// 处理 html结构
const cheerio = require('cheerio')

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
  const url = 'https://i.maoyan.com/'
  let data = ''
  https.get(url, res => {
    res.on('data', chunk=> {
      data += chunk
    })
    res.on('end',()=> {
      const list = handleHTML(data)
      cb(JSON.stringify(list))
    })
  })
}

function handleHTML(data) {
  const tree = cheerio.load(data)
  const movies = tree(".column.content")
  const arr = []
  movies.each((index, value)=> {
    arr.push({
      title: tree(value).find(".title").text(),
      grade: tree(value).find(".grade").text(),
      actor: tree(value).find(".actor").text(),
    })
  })
  return arr
}