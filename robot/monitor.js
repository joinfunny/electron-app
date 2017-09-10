/**
 * Monitor监控模块，轮询服务时间，指定间隔内服务运行时间没有变动则会触发邮件发送
 */
var Runtime = require('../runtime')
var log = Runtime.App.Log.helper
var email = require('../runtime/email')

function monitor (options) {
  this.options = Object.assign({}, options)
}

monitor.prototype.monit = function () {
  var that = this
  that.serviceMonitorTimer = setInterval(function () {
    if (!that.monitorTime) that.monitorTime = new Date()
    that.monitorTimeSpan = new Date() * 1 - that.monitorTime * 1
    if (that.monitorTimeSpan > that.options.tickTime) {
      log.warn(that.options.msg)
      email.send(that.options.title, that.options.msg, '<b>' + that.options.msg + '</b>')
      that.monitorTime = new Date()
      that.options.callback && that.options.callback()
    }
  }, that.options.tickTime)
}

monitor.prototype.update = function () {
  var that = this
  that.monitorTime = new Date()
  log.info('current monitor time :' + that.monitorTime)
  return that.monitorTime
}

monitor.prototype.dispose = function () {
  var that = this
  if (that.serviceMonitorTimer) {
    clearInterval(that.serviceMonitorTimer)
    that.serviceMonitorTimer = null
    that.monitorTime = null
  }
}

module.exports = monitor

