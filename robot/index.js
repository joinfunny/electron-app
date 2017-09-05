let Nightmare = require('nightmare')
/* Nightmare.action('clearCache', (name, options, parent, win, renderer, done) => {
  parent.respondTo('clearCache', (done) => {
    console.log('clearCache')
    win.webContents.session.clearCache(done)
  })
  done()
},
  function (done) {
    this.child.call('clearCache', done)
  }) */
let Runtime = require('../runtime')
let config = Runtime.App.AppConfig.robot
let log = Runtime.App.Log.helper
var events = require('events')
require('nightmare-iframe-manager')(Nightmare)

// 登录模拟
var loginPage = require('./pages/login')
// 投诉订单
var Complaints = require('./pages/complaints')
// 认领投诉订单
var ComplaintsConfirmer = require('./pages/complaints-confirm')

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
      console.log('login-expired')
      that[target] = null
      that.run()
    })
  }
  init () {
    var that = this
    that.nightmare = Nightmare(config.login.nightmare)
  }
  run () {
    var that = this
    that.nightmare
      // .clearCache()
      .cookies
      .clearAll()
      .goto('http://chong.qq.com')
      .then(function () {
        that.nightmare
          .resetFrame()
          // .exists('#headLogin > a.func_nickname')
          .then(function (hasLogin) {
            // 登陆成功后进入主页面
            if (hasLogin) {} else {
              loginPage.run(that.nightmare, that.eventEmitter)
                .then(function () {
                  log.info('//--------------------正在进入主页面----------------//')
                  if (!that[process.env.NODE_SERVICE]) {
                    var Service = Main.services[process.env.NODE_SERVICE].service
                    that[process.env.NODE_SERVICE] = new Service(that.nightmare, that.eventEmitter)
                    that[process.env.NODE_SERVICE].run()
                  }
                })
            }
          })
          .catch(function (err) {
            log.error('服务启动过程中捕获到异常：')
            log.error(err)
          })
      })
      .catch(function (err) {
        log.error('启动登陆页面时捕获到异常：')
        log.error(err)
        return that.nightmare.resetFrame().then(function () {
          return that.run()
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
  robotCompliantsConfirmer: {
    type: 'robotCompliantsConfirm',
    service: ComplaintsConfirmer
  }
}

module.exports = new Main()
