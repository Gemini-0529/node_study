const fs = require('fs').promises
// fs.readFile('./assets/a.js','utf-8').then(data=>{
//   console.log(data);
// })

fs.readdir('./assets').then(async data => {
  let parr = []
  data.forEach(item => {
    parr.push(fs.unlink(`./assets/${item}`))
  })
  await Promise.all(parr)
  await fs.rmdir('./assets')
})