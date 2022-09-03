// 首字母大写
function upperCase(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1)
}
const count = 0
// commonjs导出方式，在package.json中设置"type":"module"即可用es方式
module.exports = {
  count,
  upperCase
}
// es模块导出方式
// export {
//   upperCase,
//   count
// }