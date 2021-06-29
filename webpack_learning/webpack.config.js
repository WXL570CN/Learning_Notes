const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const DptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = 'development';

module.exports = {
  // 入口
  entry: './src/js/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'main.js',
    // 输出路径
    // __dirname代表当前文件所在的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader的配置
  module: {
    rules: [
      {
        // 匹配哪些文件，正则
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // 提取css插件需要引入该loader，但同时也需要关闭style-loader
          // MiniCssExtractPlugin.loader,
          // 创建style标签，将js中的样式资源插入到head中
          'style-loader',
          // 会将css文件变成commonjs模块加载到js中 ，里面内容是样式字符串
          'css-loader',
          // 即执行顺序为 css-loader，再 style-loader
        ],
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'img',
        },
      },
      {
        // 处理 html中引入的图片，webpack5.x中不需要引入该 loader 也能处理html中的图片，
        // 这应该是webpack5.x解决了该问题
        test: /\.html/,
        loader: 'html-loader',
      },
      // {
      //   loader: 'postcss-loader',
      //   options: {
      //     postcssOptions:{
      //       ident: 'postcss',
      //       plugins: () => {
      //         require('postcss-preset-env')()
      //       }
      //     }
      //   }
      // },
      {
        exclude: /\.(html|js|css|less|png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // 将打包后js中的的css代码提取成单独的文件
    // new MiniCssExtractPlugin({
    //   filename: 'style/built.css'
    // }),
    // 压缩CSS
    // new DptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development',
  // mode: 'production',
  // 使用：npm i webpack-dev-server -D
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩，让代码体积更小，压缩更快
    compress: true,
    port: 3000,
    open: true,
  },
};
