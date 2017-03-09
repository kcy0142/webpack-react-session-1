const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


//시작
const glob_entries = require('webpack-glob-entries')
let entries1 = {}
entries1=glob_entries('./src/*/index.js');
console.log('entries1 ==> ', entries1);
//끝

//시작
const glob_entries1 = require('webpack-entries');
let entries2 = {}
entries2=glob_entries1('./src/*/index.js',true);
console.log('entries2 ==> ', entries2)
//끝



const glob = require('glob')
let entries = {}
let dirnames = {}
const entryTarget = glob.sync('./src/*/index.js')

for (var i in entryTarget) {
  const entry = entryTarget[i]
  const dirname = path.dirname(entry)

  const name = dirname.replace(/\.\/src\/(.*)/, '$1')
  console.log(`entry -> ${name}`)
  entries[name] = entry
  dirnames[name] = dirname.replace(/\.\/src\/(.*)/, '$1')
}

console.log('entries ==> ', entries)
console.log('dirnames ==> ', dirnames)

let htmlWebpackPlugins = []

for (let key in entries) {
  htmlWebpackPlugins.push(htmlWebpackPlugins,
    new HtmlWebpackPlugin({
      chunks: [ key ],
      filename: './' + key + '.html',
      // template: './src/' + dirnames[key] + '/index.html'
      template: './src/index.html'
    })
  )
}

console.log('HtmlWebpackPlugin ==> ', htmlWebpackPlugins)

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    publicPath: '',
    filename: '[name].js'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: './[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html'
    })

  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: path.join(__dirname, 'src'),
        use: 'file-loader?name=[hash].[ext]&publicPath=/images/&outputPath=images/'
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    port: 8008,
    host: '0.0.0.0',
    contentBase: './dist'
  }
}
