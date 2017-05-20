var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.robot.complaints
var log = Runtime.App.Log.helper
var service = require('../service')
var store = require('../store')
var ComplaintDetail = require('./complaint-detail')

/**
 * 投诉订单处理后的监听
 * 1.将投诉订单
 */
module.exports = {
  run: (nm) => {
    setInterval(function () {
      log.info('//======投诉订单监听执行======//')
      store.handle.pop().then(function (handle) {
        handle = JSON.parse(handle[1])
        nm.cookies.get().then(function (cookies) {
          let link = {
            docmentsNo: handle.docmentsNo,
            url: 'http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseDetail&id=' + handle.docmentsNo
          }
          let complaintDetail = new ComplaintDetail(
            cookies,
            link,
            handle)
          complaintDetail.run()
        })
      })
    }, config.listener.tickTime)
  }

}
