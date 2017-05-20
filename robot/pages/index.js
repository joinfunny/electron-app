/**
 * Index主页面
 */
var path = require('path')
var Moment = require('moment')
var complaints = require('./complaints')
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var exceptionOrderMonitor = require('./exception-order')
var complaintsListener = require('./complaints-listener')
module.exports = {
  nightmare: null,
  run: function (nightmare) {
    this.nightmare = nightmare
    return this.goto()
  },
  goto: function () {
    var that = this
    return that.nightmare
      .url()
      .then(function (url) {
        log.info('//========进入主页面,URL地址为：=========//')
        log.info(url)
        return that.nightmare
          .click('#nav>li:nth-child(6)>a')
          .wait(600)
          .click('#nav>li.actived>ul>li>a')
      })
      .then(function () {
        return that.nightmare
          .wait(5000)
          .screenshot(path.resolve('./snapshot/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png'))
          .wait(2000)
      })
      .then(function () {
        // 投诉
        complaints.run(that.nightmare)
        // 异常订单
        exceptionOrderMonitor.run(that.nightmare)
        // 监控投诉订单处理
        complaintsListener.run(that.nightmare)
      })
  }

}
