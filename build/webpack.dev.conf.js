var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 热重启，此处没有使用hot-server，而只是使用了相应的hot-middware
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: "js/vendor.js"
    // }),
    // 热替换
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //html文件生成插件
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      //最终要生成的文件
      filename: 'index.html',
      //生成文件所依赖的静态模板
      template: 'index.html',
      //是否自动嵌入入口JS，参数可以是true/false/'body'/'head'
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
