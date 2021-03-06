﻿let express = require('express')
let Runtime = require('./runtime')

// let wechat = require("./runtime/wechat")
global.AppStartTimestamp = new Date() * 1
var app = express()
// 注册Session/Cookie持久化存储
Runtime.SessionStore.use(app, Runtime.App.AppConfig)
// 视图解析
Runtime.ViewParser.use(app, Runtime.App.AppConfig)
Runtime.App.Log.use(app, Runtime.App.AppConfig)
let logger = Runtime.App.Log.helper

// 注册国际化
Runtime.Internationalization.use(app, Runtime.App.AppConfig)

Runtime.OrmMapping.use(Runtime.App.AppConfig)

// 全局跨域设置
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('X-Powered-By', 'RX Stream')
  next()
})

// 注册路由与服务
Runtime.Router.use(app, Runtime.App.AppConfig)

// 启用授权
// Runtime.Authorization.use(app)

// wechat(function(app,weixinRouter) {
// weixinRouter.onOauthSuccess(function(req, res, data){
//  res.render("oauth-success",data)
// })
// }, app, global.AppConfig)

// 404错误处理
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  var warning = '404 Not Found,originalUrl:' + req.originalUrl
  logger.warn(warning)
  err.status = 404
  next()
})

// 开发环境错误提示
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    logger.error(err.message)
    res.end('error:' + err + ',message:' + err.message)
    next()
  })
} else {
  // 生产环境错误提示
  app.use(function (err, req, res, next) {
    res.status(req.status || 500)
    logger.error(err)
    res.render('error', {
      message: err.message,
      error: {}
    })
    next()
  })
}

module.exports = app
