var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.robot.complaintListener
var log = Runtime.App.Log.helper
var store = require('../store')
var ComplaintDetail = require('./complaint-detail')

class ComplaintListener {
  constructor (nm, eventEmitter) {
    var that = this
    that.instanceId = new Date() * 1
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    that.eventEmitter.once('detail-login-expired', that.onDetailLoginExpired.bind(that))
  }
  onDetailLoginExpired (target) {
    var that = this
    var instanceId = target.instanceId
    if (instanceId === that.instanceId) {
      target = null
      if (that.timer) {
        clearInterval(that.timer)
        that.timer = null
      }
      log.info('//======监听到投诉处理页面用户登录过期，已关闭======//')
      that.eventEmitter.emit('login-expired', process.env.NODE_SERVICE)
    } else {
      log.info('//======上一会话中的登陆失败触发，再次注册登陆失败事件======//')
      that.eventEmitter.once('detail-login-expired', that.onDetailLoginExpired.bind(that))
    }
  }
  run () {
    var that = this

    that.timer = setInterval(function () {
      store.handle.pop().then(function (handle) {
        if (!handle) {
          return
        }

        let link = {
          docmentsNo: handle.docmentsNo,
          url: `http://chong.qq.com/php/index.php?d=provider&c=main&dc=kf_data&a=getKfList&kfType=&orderType=&emergency=&orderDesc=&orderState=&personal=&searchStartTime=&searchEndTime=&searchIsp=&searchProvince=&searchSellerUin=&searchOrderId=${handle.docmentsNo}&searchDealId=&searchMobile=`
        }

        let complaintDetail = new ComplaintDetail(
            that.rootNightmare,
            link,
            that.eventEmitter,
            handle, that.instanceId)

        complaintDetail.run()
      })
      .catch(function (err) {
        log.error('【监听器】打开投诉处理页面过程中发生异常：')
        log.error(err)
      })
    }, config.worker.tickTime)
  }
}

/**
 * 投诉订单处理后的监听
 * 1.将投诉订单
 */
module.exports = ComplaintListener
