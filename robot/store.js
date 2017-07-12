let Runtime = require('../runtime')
let Utils = Runtime.App.Utils
let orm = Runtime.OrmMapping
let log = Runtime.App.Log.helper
let Redis = require('ioredis')
let redis = new Redis()

let keys = {
  complaints: 'complaints',
  handles: 'handles'
}

let status = {
  // 客户已接收到投诉订单
  init: 'init',
  // 我们接收到投诉订单已经处理
  handled: 'handled',
  completed: 'completed'
}

var complaints = {
  /**
   * 添加投诉订单，使用CreateEach
   */
  adds: (items) => {
    return orm.models.complaints
      .createEach(items)
      .then(function () {
        log.info('抓取到投诉订单+' + items.length)
      }).catch(function (err) {
        log.error(err)
      })
  },
  /**
   * 更新投诉订单
   * state目前没有必要传递，没有任何处理
   */
  updates: (items, state) => {
    let docmentsNos = items.map(function (complaint) {
      return complaint.docmentsNo
    })
    return orm.models.complaints.findByDocmentsNoIn(docmentsNos)
      .then(function (result) {
        var thePromise = (items, item) => {
          return new Promise(function (resolve, reject) {
            var index = Utils._.findIndex(items, function (it) {
              return it.docmentsNo === item.docmentsNo
            })
            var it = items[index]
            item.type = it.type
            item.coustomerRequest = it.coustomerRequest
            item.save(function (err) {
              if (err) {
                log.error(err)
                reject(err)
              } else {
                resolve(true)
              }
            })
          })
        }
        var promises = []
        result.forEach(function (item) {
          promises.push(thePromise(items, item))
        })
        return Promise.all(promises).then(function (result) {
          return result.reduce((pre, cur) => pre && cur, true)
        }).catch(function (err) {
          log.error(err)
        })
      })
      .catch(function (err) {
        if (err) {
          log.error(err)
        }
      })
  },
  /**
   * 删除指定的投诉订单
   */
  delete: (type, startTime, endTime) => {
    var condition = {
      type: type
    }
    var typeName = ''

    if (type === '1') {
      typeName = '投诉订单'
      condition['createdAt'] = {
        '>': new Date(startTime),
        '<': new Date(endTime)
      }
    } else if (type === '2') {
      typeName = '处理订单'
      condition['updatedAt'] = {
        '>': new Date(startTime),
        '<': new Date(endTime)
      }
    }
    return orm.models.complaints.destroy(condition).then(function (items) {
      log.info(`类型：${typeName}，开始时间：${startTime}，结束时间：${endTime}，共删除${items.length}条投诉订单`)
      return items
    }).catch(function (err) {
      log.warn('删除投诉订单过程中捕获到错误')
      log.error(err)
    })
  },
  /**
   * 返回不存在的投诉数组
   */
  exists: (complaints) => {
    let docmentsNos = complaints.map(function (complaint) {
      return complaint.docmentsNo
    })
    return orm.models.complaints.findByDocmentsNoIn(docmentsNos)
      .then(function (results) {
        var ids = results.map(function (result, index) {
          return result.docmentsNo
        })
        var notExists = Utils._.filter(complaints, function (item) {
          return ids.indexOf(item.docmentsNo) === -1
        })
        if (notExists && notExists.length > 0) {
          log.info('经比对，最终得到【' + notExists.length + '】条新的投诉订单')
        } else {
          log.info('经比对，没有发现新的投诉订单')
        }
        return notExists
      })
      .catch(function (err) {
        log.error(err)
      })
  },
  get: (type, startTime, endTime) => {
    let condition = {}

    if (type === '1') {
      condition['createdAt'] = {
        '>=': new Date(startTime),
        '<': new Date(endTime)
      }
    } else if (type === '2') {
      condition['updatedAt'] = {
        '>=': new Date(startTime),
        '<': new Date(endTime)
      }
    }

    condition.type = type

    return orm.models.complaints
    .find(condition)
    .then(function (results) {
      log.info(`开始时间：${startTime} ，结束时间：${endTime}，获取到【${results.length}】条投诉订单`)
      return results || []
    })
    .catch(function (err) {
      log.warn('查询投诉订单过程中捕获到错误')
      log.error(err)
    })
  },
  first: (type) => {
    var condition = {}
    if (type === '1') {
      condition['sort'] = 'createdAt'
    } else if (type === '2') {
      condition['sort'] = 'updatedAt'
    }
    return orm.models.complaints
    .find(condition)
    .limit(1)
    .then(function (result) {
      return result.length > 0 ? result[0] : null
    })
    .catch(function (err) {
      console.log(err)
    })
  }
}

let handle = {
  /**
   * 添加一个或多个投诉处理信息
   * @param {Array} handles 需要Push到Redis列表中的数据
   * @return {Promise(Boolean)} 返回Promise对象，对象中的对象为操作Redis的状态
   */
  push: (handles) => {
    var list = handles.map(function (handle) {
      return JSON.stringify(handle)
    })
    let promise = redis.pipeline().lpush(keys.handles, list)

    return promise.exec(function (err, result) {
      if (err) {
        log.warn('//======投诉数据存储到队列【失败】======//')
        log.warn(err)
      } else {
        log.info('//======投诉数据存储到队列【成功】======//')
      }
    })
      .then(function (result) {
        if (!result[0][0] && result[0][1] > 0) {
          return true
        }
        log.info('//======存储处理数据到队列失败======//')
        return false
      })
  },
  /**
   * 取出当前队列中的第一条投诉处理记录
   * @return 返回投诉处理队列的第一条记录
   */
  pop: () => {
    return redis
      .pipeline()
      .lpop(keys.handles)
      .exec()
      .then(function (result) {
        var returnValue = null
        // log.info('//======投诉数据移除检索【成功】======//')
        log.info(result)
        returnValue = JSON.parse(result[0][1])
        return returnValue
      })
  }
}

let exceptionOrders = {
  add: (item) => {
    orm.models.exceptionorders
      .create(item)
      .then(function () {
        log.info('保存异常订单数量+' + item.total)
      }).catch(function (err) {
        log.error(err)
      })
  }
}

let reportCount = {
  add: (item) => {
    return orm.models.reportcount
      .create(item)
      .then(function () {
        log.info('保存投诉订单统计+1')
        return true
      }).catch(function (err) {
        log.error(err)
      })
  }
}

let logs = {
  add: (item) => {
    return orm.models.logs
      .create(item)
      .then(function (result) {
        log.info('保存操作日志+1')
        return result
      }).catch(function (err) {
        log.error(err)
      })
  },
  update: (item) => {
    return orm.models.logs
    .update({type: item.type}, item)
    .then(function (result) {
      log.info('更新日志+1')
      return result
    })
  },
  /**
   * 根据日志类型获取日志
   */
  get: (type) => {
    return orm.models.logs.find({type: type}).then(function (items) {
      log.info('获取到日志数量：' + items.length)
      return items
    })
  }
}

module.exports = {
  keys: keys,
  redis: redis,
  status: status,
  // 记录投诉订单
  complaints: complaints,
  handle: handle,
  exceptionOrders: exceptionOrders,
  reportCount: reportCount,
  logs: logs
}
