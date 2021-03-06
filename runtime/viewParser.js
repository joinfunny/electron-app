/**
 * @author jiangfeng
 * @summary express视图解析
 */
let bodyParser = require('body-parser')
let compression = require('compression')
let favicon = require('serve-favicon')
let path = require('path')
let express = require('express')
let ejs = require('./ejs')
let rootPath = process.cwd()

exports.use = function (app, appConfig) {
  // 启用gzip压缩
  app.use(compression())
  // 指定静态目录
  app.use(express.static(path.join(rootPath, appConfig.app.staticSrc)))
  // 指定favicon.ico请求对应的文件
  app.use(favicon(path.join(rootPath, appConfig.app.staticSrc, 'favicon.ico')))

  // 指定视图层渲染根路径
  app.set('views', path.join(rootPath, appConfig.app.renderView))
  // 指定视图引擎
  app.engine('.html', ejs)
  app.set('view engine', 'html')

  // body解析
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
}
