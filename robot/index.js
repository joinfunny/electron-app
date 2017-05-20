let Nightmare = require('nightmare')
let Runtime = require('../runtime')
let config = Runtime.App.AppConfig.robot.login
let log = Runtime.App.Log.helper

require('nightmare-iframe-manager')(Nightmare)

// 登录模拟
var loginPage = require('./pages/login')
// 投诉订单
var complaints = require('./pages/complaints')
// 异常订单
var exceptionOrder = require('./pages/exception-order')

var listener = require('./pages/complaints-listener')

var nightmare = Nightmare(config.nightmare)
  .on('did-finish-load', function () {
    log.info('did-finish-load')
    nightmare.url()
      .then(function (url) {
        if (url.indexOf('&g_ty=lk') > -1) {
          log.info('--------------------正在进入主页面----------------')
          log.info(url)
          complaints.run(nightmare)
          // exceptionOrder.run(nightmare)
          // listener.run(nightmare)
        }
      })
  })
  .on('console', function (type, msg) {
    console[type](msg)
  })

module.exports.run = function () {
  global.robot = this.nightmare
  nightmare
    .then(function () {
      return loginPage.run(nightmare)
    })
}
