const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: './src/js/index.js',
  // 输出
  output:{
    // 输出文件名
    filename: 'main.js',
    // 输出路径
    // __dirname代表当前文件所在的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module:{
    rules: [
      {
        // 匹配哪些文件，正则
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // 创建style标签，将js中的样式资源插入到head中
          'style-loader',
          // 会将css文件变成commonjs模块加载到js中 ，里面内容是样式字符串
          'css-loader'
          // 即执行顺序为 css-loader，再 style-loader
        ]
      },
      {
        test: /\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'img'
        }
      },
      {
        exclude: /\.(html|js|css|less|png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        options:{
          outputPath: 'media'
        }
      }
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  mode: 'development',
  // mode: 'production',
  // 使用：npm i webpack-dev-server -D
  devServer:{
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩，让代码体积更小，压缩更快
    compress: true,
    port: 3000,
    open: true
  }
}