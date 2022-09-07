const server = require('./server')
// 引入路由、api模块
const router = require('./routes')
const api = require('./api')
// 合并到server模块中同一匹配
server.use(router, api)
server.start()