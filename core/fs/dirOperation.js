const fs = require('fs')

// fs.mkdir('./assets/index.js', err => {
//   if(err) {
//     console.log('文件创建失败->', err);
//   }
// })

// fs.rename('./public','test', err => {
//   if(err) {
//     console.log('修改文件名失败->', err);
//   }
// })

// fs.rmdir('./mkdir.js', err => {
//   if(err) {
//     console.log('目录不存在或不为空',err);
//   }
// })

// fs.unlink('./test', err => {
//   if(err) {
//     console.log('删除失败->',err);
//   }
// })

// fs.writeFile('./images.txt','1.jpg\n\r2.png', err => {
//   if(err) {
//     console.log('写文件失败->', err);
//   }
// })

// fs.appendFile('./test.txt','1.jpg\n\r2.png', err => {
//   if(err) {
//     console.log('写文件失败->', err);
//   }
// })

// fs.readFile('./images.txt', 'utf-8', (err, data)=>{
//   if(!err) {
//     // 如果在路径后面没有规定格式，则需要将buffer数据转成utf-8格式
//     // console.log(data.toString("utf-8"));
//     console.log(data);
//   }
// })

// fs.readdir('./assets',(err,data) => {
//   if(!err) {
//     console.log(data);
//   }
// })
// fs.stat('./assets/b',(err,data)=> {
//   if(!err) {
//     console.log(data.isFile());
//     console.log(data.isDirectory());
//   }
// })
