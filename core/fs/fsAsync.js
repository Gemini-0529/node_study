const fs = require('fs')
// 同步解决删除有子目录的目录文件
fs.readdir('./assets', (err,data)=> {
  data.forEach(item => {
    fs.unlinkSync(`./assets/${item}`)
  })
  fs.rmdir('./assets', err=> {
    console.log(err);
  })
})