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
    that.eventEmitter = new events.EventEmitter()
    that.init()
    that.eventEmitter.on('login-expired', function (target) {
      target = null
      that.run()
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
              if (config.complaints.run) {
                if (!that.complaints) {
                  that.complaints = new Complaints(that.nightmare, that.eventEmitter)
                }
                that.complaints.run()
              }
              if (config.exceptionOrder.run) {
                if (!that.exceptionOrder) {
                  that.exceptionOrder = new ExceptionOrder(that.nightmare, that.eventEmitter)
                }
                that.exceptionOrder.run()
              }

              if (config.complaintListener.run) {
                if (!that.complaintListener) {
                  that.complaintListener = new ComplaintListener(that.nightmare, that.eventEmitter)
                }
                that.complaintListener.run()
              }
            }
          })
      })
      .on('console', function (type, msg) {
        console[type](msg)
      })
  }
  run () {
    var that = this
    this.nightmare
    .then(function () {
      return loginPage.run(that.nightmare, that.eventEmitter)
    })
  }
}

module.exports = new Main()
