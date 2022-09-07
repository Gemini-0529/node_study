
function h(res,data) {
  res.writeHead(200, {
    "content-Type": "application/json;charset=utf-8"
  })
  res.write(data);
}
module.exports = {
  '/api/login': res => {
    h(res,'{status:1}')
  }
}