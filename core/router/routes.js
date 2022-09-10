const fs = require('fs')
const path = require('path')
const mime = require('mime')
function h(res,path,status,ct='text/html') {
  res.writeHead(status, {
    "content-Type": `${ct};charset=utf-8`
  })
  res.write(fs.readFileSync(path));
}
function findStaticFile(req, res) {
  const url = new URL(req.url, 'http://127.0.0.1')
  // mac 可以使用，window存在反斜杠问题
  // const fileposition = `${__dirname}/static${url.pathname}`
  // 通用方法，获取文件的绝对路径
  const fileposition = path.join(__dirname, '/static', url.pathname)
  // 判断能否找见对应资源
  if(fs.existsSync(fileposition) && url.pathname !='/') {
    // res.write(fs.readFileSync(fileposition))
    // mime 可以获取文件类型的content-type
    const ct = mime.getType(fileposition.split('.').at(-1))
    h(res, fileposition, 200, ct)
    return true
  }else {
    return false
  }
  
}
module.exports = {
  '/home': (req, res) => {
    h(res, './static/home.html', 200)
  },
  '/login': (req, res) => {
    h(res, './static/login.html', 200)
  },
  '/404': (req, res) => {
    if(findStaticFile(req, res)){
      return
    }
    // res.writeHead(404, {
    //   "content-Type": "text/html;charset=utf-8"
    // })
    res.write('404')
  }
}