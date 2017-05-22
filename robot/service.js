var Runtime = require('../runtime')
var log = Runtime.App.Log.helper
var request = require('request-promise')

var promise = require('bluebird')
var crypto = require('crypto')
var store = require('./store')
var serviceConfig = Runtime.App.AppConfig.robot.service
promise.promisifyAll(request)

function complaintmd5 (complaint) {
  var docmentsNo = encodeURI(complaint.docmentsNo)
  var agentOrderNo = encodeURI(complaint.agentOrderNo)
  var feedback = encodeURI(complaint.feedback)
  var phoneNo = encodeURI(complaint.phoneNo)
  var coustomerRequest = encodeURI(complaint.coustomerRequest)
  var type = encodeURI(complaint.type)

  var source = docmentsNo + agentOrderNo + feedback + phoneNo + coustomerRequest + type + serviceConfig.md5
  const hash = crypto.createHash('md5')
  // 可任意多次调用update():
  hash.update(source)
  complaint.sign = hash.digest('hex')
  console.log(complaint)
  return complaint
}

function exceptionOrderCountmd5 (order) {
  var countTatol = encodeURI(order.countTatol)
  var source = countTatol + serviceConfig.md5
  const hash = crypto.createHash('md5')
  // 可任意多次调用update():
  hash.update(source)
  order.sign = hash.digest('hex')
  console.log(order)
  return order
}

module.exports = {
  pushComplaint: (complaint) => {
    return store.complaints.exists([complaint]).then(function (notExistsComplaints) {
      log.info(JSON.stringify(notExistsComplaints, null, 2))
      if (notExistsComplaints && notExistsComplaints.length > 0) {
        notExistsComplaints[0].type = 1
        return request.post({
          url: serviceConfig.host + serviceConfig.api.complaints,
          json: true,
          body: complaintmd5(notExistsComplaints[0])
        })
          .then(function (result) {
            log.info('//======向实立发送投诉订单请求已返回消息======//')
            log.info(JSON.stringify(result, null, 2))
            // 如果实立保存失败，则退出，不在执行记录Redis
            if (!result.success) {
              return
            }
            return store.complaints.adds(notExistsComplaints)
          })
          .catch(function (err) {
            if (err) {
              log.warn('//======向实立发送数据发生错误======//')
              log.warn(err)
            }
          })
      } else {
        return new Promise((resolve, reject) => {
          log.info('//============要添加到缓存中的原始订单：==================//')
          log.info(JSON.stringify(complaint, null, 2))
          log.info('//============排重后的投诉订单：==================//')
          log.info('//============排重后的投诉订单数组为空，本次没有发送任何数据到实立==================//')
          resolve()
        })
      }
    })
  },
  /**
   * 接收到Redis中进行存储
   * 1.接收handles到Redis
   * 2.更新status
   */
  handleComplaint: (handle) => {
    return Promise
      .all([store.handle.push([handle]), store.complaints.updates([handle], store.status.handled)])
      .then(function () {
        log.info('//////======接收到的投诉订单处理已加入缓存队列，等待处理=======//////')
      })
  },
  /**
   * 向实立发送已经处理的通知
   * 处理完成后：
   * 1.更新投诉状态为completed
   * 2.删除投诉处理记录
   */
  handledComplaint: (handle, result) => {
    if (!result) {
      log.data('处理投诉订单失败', 1)
      store.handle.push([handle])
      return
    }
    log.info('//======向实立发送【投诉订单已处理】请求======//')
    handle.type = 2
    return request.post({
      url: serviceConfig.host + serviceConfig.api.complaints,
      json: true,
      body: complaintmd5(handle)
    })
      .then(function (result) {
        log.info('//======向实立发送【投诉订单已处理】请求已返回消息======//')
        log.info(JSON.stringify(result, null, 2))

        // 如果实立返回失败，则将投诉信息再次加入队列。等待下次执行
        if (!result.success) {
          store.handle.push([handle])
          log.data('处理投诉订单失败', 1)
          return
        }
        log.data('处理投诉订单成功', 1)
        store.complaints.updates([handle], store.status.completed).then(function (success) {
          if (success) {
            log.info('//======Redis中【投诉订单状态】已更新为「completed」======//')
          } else {
            log.warn('//======发送的投诉订单记录Redis失败======//')
          }
        })
      })
      .catch(function (err) {
        log.error('//======向实立发送数据发生错误======//')
        log.error(err)
        log.warn('//======重新将投诉处理加入队列======//')
        store.handle.push([handle])
        log.data('处理投诉订单失败', 1)
      })
  },
  pushExceptionOrders: (count) => {
    request.post({
      url: serviceConfig.host + serviceConfig.api.exceptionorders,
      json: true,
      body: exceptionOrderCountmd5({countTatol: count})
    }).then(function (result) {
      if (result.success) {
        log.info('成功推送异常订单统计数')
        log.data('推送异常订单统计数', count)
      } else {
        log.warn('推送异常订单统计数失败')
      }
    })
      .catch(function (err) {
        if (err) {
          log.error('//======向实立推送异常订单统计数失败======//')
          log.error(err)
        }
      })
  }
}
