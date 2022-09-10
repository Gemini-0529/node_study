
function h(res,data,type) {
  res.writeHead(200, {
    "content-Type": "application/json;charset=utf-8"
  })
  if(type==='get') {
    res.write(data);
  }else {
    res.end(data)// 存在bug：post返回空白
  }
}
module.exports = {
  '/api/login': (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1")
    console.log(url.searchParams.get('uname'));
    if(url.searchParams.get('uname') && url.searchParams.get('pwd')) {
      h(res, '登录成功')
    }else {
      h(res, '登录失败')
    }
  },
  '/api/loginpost': (req, res) => {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', ()=> {
      // data = JSON.parse(data)
      console.log(data);
      // res.end(data)
      h(res, data,'post')
    })
  }
}