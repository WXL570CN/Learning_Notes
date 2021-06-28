const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

process.env.NODE_ENV = 'production'

const commonCssLoader = [
  // 提取css为单独文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader,]
      },
      {
        test: /\.scss$/,
        use: [
          ...commonCssLoader,
          'sass-loader'
        ]
      },
      // 当一种文件同时被多个 loader 处理时，需要声明 loader 的执行顺序
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options:{
          presets: [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: {version: 3},
              target: {
                chrome: '60',
                firefox: '50'
              }
            }
          ]
        }
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8*1024,
          name: '[hash:10].[ext]',
          ouputPath: 'imgs',
          esModule: false,
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options:{
          ouputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin(),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production'
}