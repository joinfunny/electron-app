var Nightmare = require('nightmare')
var config = require('../runtime').App.AppConfig.robot.login

require('nightmare-iframe-manager')(Nightmare)

// 登录模拟
var loginPage = require('./pages/login')
// 投诉订单
var complaints = require('./pages/complaints')
// 异常订单
var exceptionOrder = require('./pages/exception-order')
console.log(nightmare)
var nightmare = Nightmare(config.nightmare)
  .on('did-finish-load', function () {
    console.log('did-finish-load')
    nightmare.url()
      .then(function (url) {
        if (url.indexOf('&g_ty=lk') > -1) {
          console.log('--------------------正在进入主页面----------------')
          console.log(url)
          complaints.run(nightmare)
          exceptionOrder.run(nightmare)
        }
      })
  })
  .on('console', function (type, msg) {
    console[type](msg)
  })

module.exports.run = function () {
  nightmare
    .then(function () {
      return loginPage.run(nightmare)
    })
}
