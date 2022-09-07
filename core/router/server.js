const http = require("http");
const fs = require("fs");
// const router = require("./routes");
// const api = require("./api");
const router = {};
function use(...obj) {
  Object.assign(router, ...obj);
}
function start() {
  http
    .createServer((req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      console.log(url.pathname);
      try {
        // 匹配到路由、api
        router[url.pathname](res);
      } catch (err) {
        // 未匹配到路由、api
        console.log(err);
        router["/404"](res);
      }
      res.end();
    })
    .listen(3000, () => {});
}
exports.use = use;
exports.start = start;
