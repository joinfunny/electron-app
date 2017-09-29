let Runtime = require('../runtime/index')
let log = Runtime.App.Log.helper
let service = require('../robot/service')
let utils = require('../robot/utils')
module.exports = {
  /**
   * 处理投诉--提供给实立的接口
   */
  // 接收
  '/api/complaint/handling': {
    method: 'post',
    callback: function (req, res, callback) {
      let handle = req.body
      log.info('//======接受到实立传输的已处理投诉订单=======//')
      log.info(handle)
      var requests = {
        '充值已到账（月初）': 1,
        '充值已到账（月中）': 2,
        '充值部分到账': 3,
        '充值失败（重新充值）': 4,
        '充值失败（可退款）': 5,
        '充错号码（不可退款）': 6,
        '通用（新增）': 7
      }
      if (handle.coustomerRequest === '通用') {
        handle.coustomerRequest = '通用（新增）'
      }
      if (handle.coustomerRequest && requests[handle.coustomerRequest] !== undefined) {
        if (utils.complaintmd5(handle).sign === handle.sign) {
          service.handleComplaint(handle)
        .then(function () {
          callback({
            success: true
          })
        })
        } else {
          callback({
            success: false,
            msg: '签名失效'
          })
        }
      } else {
        callback({
          success: false,
          msg: '没有当前投诉处理类型'
        })
      }
    }
  },
  // 接收投诉订单和投诉处理--实立提供的接口
  '/api/complaints_getMessage': {
    method: 'post',
    mock: false,
    callback: function (req, res, callback) {
      callback({
        success: true,
        data: req.body
      })
    }
  },
  // 接收异常订单统计数--实立需要提供的接口
  '/api/complaints_getCount': {
    method: 'post',
    mock: false,
    callback: function (req, res, callback) {
      callback({
        success: true,
        data: req.body
      })
    }
  }
}
