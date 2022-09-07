const fs = require('fs')
function h(res,path,status) {
  res.writeHead(status, {
    "content-Type": "text/html;charset=utf-8"
  })
  res.write(fs.readFileSync(path));
}
module.exports = {
  '/home': res => {
    h(res, './static/home.html', 200)
  },
  '/login': res => {
    h(res, './static/login.html', 200)
  },
  '/404': res => {
    res.writeHead(404, {
      "content-Type": "text/html;charset=utf-8"
    })
    res.write('404')
  }
}