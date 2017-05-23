var crypto = require('crypto')
let Runtime = require('../runtime/index')
let log = Runtime.App.Log.helper
let service = require('../robot/service')
var serviceConfig = Runtime.App.AppConfig.robot.service

function complaintmd5 (complaint) {
  var docmentsNo = decodeURI(complaint.docmentsNo)
  var agentOrderNo = decodeURI(complaint.agentOrderNo)
  var feedback = decodeURI(complaint.feedback)
  var phoneNo = decodeURI(complaint.phoneNo)
  var coustomerRequest = decodeURI(complaint.coustomerRequest)
  var type = ''// decodeURI(complaint.type)

  var source = docmentsNo + agentOrderNo + feedback + phoneNo + coustomerRequest + type + serviceConfig.md5
  const hash = crypto.createHash('md5')
  // 可任意多次调用update():
  hash.update(source)
  complaint.sign = hash.digest('hex')
  console.log(complaint)
  return complaint
}

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
      if (complaintmd5(handle).sign === handle.sign) {
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
