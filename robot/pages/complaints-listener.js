var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.robot.complaintListener
var log = Runtime.App.Log.helper
var service = require('../service')
var store = require('../store')
var ComplaintDetail = require('./complaint-detail')

class ComplaintListener {
  constructor (nm, eventEmitter) {
    var that = this
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    that.eventEmitter.on('detail-login-expired', function (target) {
      target = null
      that.eventEmitter.emit('login-expired', that)
    })
  }
  run () {
    var that = this
    setInterval(function () {
      log.info('handles', '//======投诉订单监听执行======//')
      store.handle.pop().then(function (handle) {
        if (!handle) {
          log.warn('handles', '队列中没有需要处理的投诉订单')
          return
        }

        let link = {
          docmentsNo: handle.docmentsNo,
          url: 'http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseDetail&id=' + handle.docmentsNo
        }
        let complaintDetail = new ComplaintDetail(
            that.rootNightmare,
            link,
            that.eventEmitter,
            handle)

        complaintDetail.run()
      })
    }, config.worker.tickTime)
  }
}

/**
 * 投诉订单处理后的监听
 * 1.将投诉订单
 */
module.exports = ComplaintListener
