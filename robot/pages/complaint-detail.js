var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaints
var service = require('../service')

class ComplaintDetail {
  constructor (nm, link, eventEmitter, handle) {
    var that = this
    that.rootNightmare = nm
    that.link = link
    that.handle = handle
    that.eventEmitter = eventEmitter
    that.nightmare = new Nightmare(config.nightmare)
      .on('console', function (type, msg) {
        log[type]('evaluate log :' + msg)
      })
  }

  run () {
    let that = this
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.nightmare
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto('http://chong.qq.com/pc/seller/index.html#/csList')
          .then(function () {
            that.doHandle()
          })
          .catch(function (err) {
            log.error('投诉订单处理时捕获到异常：')
            log.error(err)
          })
      })
      .catch(function (err) {
        log.error('获取Cookie时捕获到异常：')
        log.error(err)
      })
  }
  doHandle () {
    var that = this
    that.nightmare
      .evaluate(function (link, handle, env) {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: 'get',
            url: link.url,
            dataType: 'json',
            success: function (data) {
              console.log(data)
              if (data.retCode === 0) {
                resolve(data.retMsg)
              }
            },
            error: function (data) {
              console.log('error', data)
              resolve(data.retMsg)
            },
            complete: function (data) {
              console.log('complete', data)
              resolve(data.data)
            }
          })
        })
      }, that.link, that.handle, process.env.NODE_ENV)
      .then(function (data) {
        service.handledComplaint(that.handle, true).then(function () {
          log.info(that.handle)
          log.info('//======【投诉订单处理监控】请求发生异常，窗口已关闭======//')
        })
        that.nightmare.end().then(function () {
          that.dispose()
        })
      })
      .catch(ex => {
        service.handledComplaint(that.handle, false).then(function () {
          log.info(that.handle)
          log.info('//======【投诉订单处理监控】请求发生异常，窗口已关闭======//')
        })
        that.nightmare.end().then(function () {
          that.dispose()
        })
      })
  }
  dispose () {
    var that = this
    that.cookies = null
    that.nightmare = null
  }
}

module.exports = ComplaintDetail
