// 开发环境
// webpack ./src/index.js -o ./build --mode=development
// 生产环境（打包后的代码是压缩的）
// webpack ./src/index.js -o ./build --mode=production

// webpack能处理js/json，但不能处理css/img等
// 将ES6等代码编译成浏览器能识别的代码
import '../styles/index.css'
import '../styles/index.less'
import '../styles/iconfont.css'

function hello(str = 'hello'){
  console.log(str)
}

function hi(str = 'hi'){
  console.log(str)
}

hello()
hi(1)