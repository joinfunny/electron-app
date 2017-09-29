var Runtime = require('../runtime')
var utils = require('./utils')
var log = Runtime.App.Log.helper
var request = require('request-promise')
var crypto = require('crypto')
var store = require('./store')
var serviceConfig = Runtime.App.AppConfig.robot.service
// promise.promisifyAll(request)

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
            // json: true,
          form: utils.complaintmd5(notExistsComplaints[0])
        })
          .then(function (result) {
            log.info('//======向实立发送投诉订单请求已返回消息======//')
            log.info('返回消息为：“' + result + '”')
            if (process.env.NODE_ENV.indexOf('production') === -1) {
              result = 'ok'
            }
            // 如果实立保存失败，则退出，不在执行记录Redis
            if (result !== 'ok') {
              return Promise.resolve().then(function () {
                log.info('实立返回消息不正确')
                return false
              })
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
   */
  handleComplaint: (handle) => {
    return store.handle.push([handle])
      .then(function (result) {
        if (result) {
          log.info('//======接收到的投诉订单处理已加入缓存队列，等待处理=======//')
        } else {
          log.warn('//======接收到的投诉订单处理加入缓存队列失败，请重新发送=======//')
        }
      })
  },
  /**
   * 向实立发送已经处理的通知
   * 处理完成后：
   * 1.更新投诉状态为completed
   * 2.删除投诉处理记录
   * @param {Complaint} handle 待处理的投诉
   * @param {Boolean} result 处理结果
   * @return {Promise Object}
   */
  handledComplaint: (handle, result) => {
    if (!result) {
      log.info('处理投诉订单失败+1')
      return store.handle.push([handle])
    }
    log.info('//======向实立发送【投诉订单已处理】请求======//')
    handle.type = 2
    if (handle.coustomerRequest === '通用（新增）') {
      handle.coustomerRequest = '通用'
    }
    return request.post({
      url: serviceConfig.host + serviceConfig.api.complaints,
        // json: true,
      form: utils.complaintmd5(handle)
    })
      .then(function (result) {
        log.info('//======向实立发送【投诉订单已处理】请求已返回消息======//')
        log.info(result)
        if (process.env.NODE_ENV.indexOf('production') === -1) {
          result = 'ok'
        }
        // 如果实立返回失败，则将投诉信息再次加入队列。等待下次执行
        if (!result === 'ok') {
          store.handle.push([handle])
          log.warn('处理投诉订单失败+1')
          return
        }
        log.info('处理投诉订单成功+ 1')
        store.complaints.updates([handle]).then(function (success) {
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
        log.info('处理投诉订单失败+1')
      })
  },
  pushExceptionOrders: (count) => {
    request.post({
      url: serviceConfig.host + serviceConfig.api.exceptionorders,
        // json: true,
      form: exceptionOrderCountmd5({
        countTatol: count
      })
    }).then(function (result) {
      if (process.env.NODE_ENV.indexOf('production') === -1) {
        result = 'ok'
      }
      if (result === 'ok') {
        log.info('成功推送异常订单统计数')
        log.info('推送异常订单统计数+' + count)
        store.exceptionOrders.add({
          total: count
        })
      } else {
        log.warn('推送异常订单统计数失败')
        log.warn(result)
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
