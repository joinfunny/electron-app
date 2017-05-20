var Runtime = require('../runtime')
var log = Runtime.App.Log.helper
var request = require('request-promise')

var promise = require('bluebird')
var store = require('./store')
promise.promisifyAll(request)

module.exports = {
  pushComplaints: (complaints) => {
    return request.post({
      url: 'http://localhost:9092/api/test',
      json: true,
      body: complaints
    })
      .then(function (result) {
        log.info('//======向实立发送投诉订单请求已返回消息======//')
        log.info(JSON.stringify(result, null, 2))
        return store.complaints.adds([complaints]).then(function (result) {
          if (result) {
            log.info('//======发送的投诉订单已经记录到Redis中======//')
          } else {
            log.warn('//======发送的投诉订单记录Redis失败======//')
          }
        })
      })
      .catch(function (err) {
        if (err) {
          log.warn('//======向实立发送数据发生错误======//')
          log.warn(err)
        }
      })
  },
  /**
   * 接收到Redis中进行存储
   * 1.接收handles到Redis
   * 2.更新status
   */
  handleComplaints: (handles) => {
    return Promise.all([store.handle.add(handles), store.complaints.updates(handles, store.status.handled)])
      .then(function (result) {
        log.info(result)
        return true
      })
  },
  /**
   * 向实立发送已经处理的通知
   * 处理完成后：
   * 1.更新投诉状态为completed
   * 2.删除投诉处理记录
   */
  handledComplaints: (handles) => {
    log.info('//======向实立发送【投诉订单已处理】请求======//')
    return request.post({
      url: 'http://localhost:9092/api/test',
      json: true,
      body: handles
    })
      .then(function (result) {
        log.info('//======向实立发送【投诉订单已处理】请求已返回消息======//')
        log.info(JSON.stringify(result, null, 2))
        /* let complaints = handles.map(function (handle) {
          return {
            docmentNo: handle.docmentsNo
          }
        }) */
        store.complaints.updates(handles, store.status.completed).then(function (success) {
          if (success) {
            log.info('//======Redis中【投诉订单状态】已更新为「completed」======//')
            // 缓存投诉订单状态
            store.handle.delete(handles).then(function (success) {
              if (success) {
                log.info('//======发送的投诉订单状态已经初始化到Redis中======//')
              } else {
                log.warn('//======发送的投诉订单状态Redis初始化失败======//')
              }
            })
          } else {
            log.warn('//======发送的投诉订单记录Redis失败======//')
          }
        })
      })
      .catch(function (err) {
        log.warn('//======向实立发送数据发生错误======//')
        log.warn(err)
      })
  }
}
