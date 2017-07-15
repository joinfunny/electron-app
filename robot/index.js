let Nightmare = require('nightmare')
let Runtime = require('../runtime')
let config = Runtime.App.AppConfig.robot
let log = Runtime.App.Log.helper
var events = require('events')
require('nightmare-iframe-manager')(Nightmare)

// 登录模拟
var loginPage = require('./pages/login')
// 投诉订单
var Complaints = require('./pages/complaints')
// 异常订单
var ExceptionOrder = require('./pages/exception-order')

var ComplaintListener = require('./pages/complaints-listener')

class Main {
  constructor () {
    var that = this
    that.nightmare = null
    that.complaints = null
    that.exceptionOrder = null
    that.complaintListener = null
    that.timer = null
    that.timerCount = 0
    that.eventEmitter = new events.EventEmitter()
    that.init()
    that.eventEmitter.on('login-expired', function (target) {
      that[target] = null
      if (!that.reloading) {
        that.reloading = true
        that.run()
      }
    })
  }
  init () {
    var that = this
    this.nightmare = Nightmare(config.login.nightmare)
      .on('did-finish-load', function () {
        that.nightmare.resetFrame().url()
          .then(function (url) {
            if (url.indexOf('&g_ty=lk') > -1) {
              log.info('//--------------------正在进入主页面----------------//')
              log.info(url)
              var timerMaxCount = 20
              var timerTick = 1000
              // 20秒内轮询可能漏掉的已经关掉的服务
              if (that.timer) return
              that.timer = setInterval(function () {
                if (!that[process.env.NODE_SERVICE]) {
                  var Service = Main.services[process.env.NODE_SERVICE].service
                  that[process.env.NODE_SERVICE] = new Service(that.nightmare, that.eventEmitter)
                  that[process.env.NODE_SERVICE].run()
                }
                that.timerCount++
                if (that.timerCount >= timerMaxCount) {
                  clearInterval(that.timer)
                  that.timer = null
                  that.timerCount = 0
                  log.info('///-------重置加载中标记-------///')
                  that.reloading = false
                  return
                }
              }, timerTick)
            } else if (url.indexOf('php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
              loginPage.run(that.nightmare, that.eventEmitter)
            }
          })
          .catch(function (err) {
            log.error('服务启动过程中捕获到异常：')
            log.error(err)
          })
      })
      .on('console', function (type, msg) {
        console[type](msg)
      })
  }
  run () {
    var that = this
    that.nightmare
      .cookies
      .clearAll()
      .then(function () {
        that.nightmare.goto('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login')
          .run(function () {

          })
      })
  }

}

Main.services = {
  robotComplaintsCollector: {
    type: 'robotComplaintsCollector',
    service: Complaints
  },
  robotComplaintsHandler: {
    type: 'robotComplaintsHandler',
    service: ComplaintListener
  },
  robotExceptionListener: {
    type: 'robotExceptionListener',
    service: ExceptionOrder
  }
}

module.exports = new Main()
