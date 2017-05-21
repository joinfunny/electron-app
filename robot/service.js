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
        // 如果实立保存失败，则退出，不在执行记录Redis
        if (!result.success) {
          return
        }
        return store.complaints.adds(complaints)
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
    return Promise.all([store.handle.push(handles), store.complaints.updates(handles, store.status.handled)])
  },
  /**
   * 向实立发送已经处理的通知
   * 处理完成后：
   * 1.更新投诉状态为completed
   * 2.删除投诉处理记录
   */
  handledComplaints: (handle, result) => {
    if (!result) {
      log.data('处理投诉订单失败', 1)
      store.handle.push([handle])
      return
    }
    log.info('//======向实立发送【投诉订单已处理】请求======//')
    return request.post({
      url: 'http://localhost:9092/api/test',
      json: true,
      body: handle
    })
      .then(function (result) {
        log.info('//======向实立发送【投诉订单已处理】请求已返回消息======//')
        log.info(JSON.stringify(result, null, 2))
        /* let complaints = handles.map(function (handle) {
          return {
            docmentNo: handle.docmentsNo
          }
        }) */
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
    request.post('http://localhost:9092/api/test', {
      json: true,
      body: {count: count}
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
