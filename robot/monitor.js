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

monitor.prototype.dispose = function () {
  var that = this
  if (that.serviceMonitorTimer) {
    clearInterval(that.serviceMonitorTimer)
    that.serviceMonitorTimer = null
  }
}

module.exports = monitor

