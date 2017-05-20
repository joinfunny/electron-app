let Runtime = require('../runtime')
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

module.exports = {
  keys: keys,
  redis: redis,
  status: status,
  // 记录投诉订单
  complaints: {
    adds: (complaints) => {
      return this.updates(complaints, status.init)
    },
    updates: (complaints, state) => {
      let promise = redis.multi()
      complaints.forEach((complaint) => {
        promise.hset(keys.complaints, complaint.docmentsNo, state)
      })
      return promise.exec(function (err, result) {
        let actionResult = true
        if (err) {
          log.error(err)
        } else {
          result.forEach(function (rs, index) {
            if (actionResult && rs !== 1) {
              actionResult = false
            }
          })
        }
        return actionResult
      })
    },
    delete: (complaints) => {
      let promise = redis.multi()
      complaints.forEach((complaint) => {
        promise.hdel(keys.complaints, complaint.docmentsNo)
      })
      return promise.exec(function (err, result) {
        let actionResult = true
        if (err) {
          log.error(err)
        } else {
          log.info(JSON.stringify(result))
          result.forEach(function (rs, index) {
            if (actionResult && rs !== 1) {
              actionResult = false
            }
          })
        }
        return actionResult
      })
    },
    /**
     * 返回不存在的投诉数组
     */
    exists: (complaints) => {
      let promise = redis.multi()
      complaints.forEach((complaint) => {
        promise.hexists(keys.complaints, complaint.docmentsNo)
      })
      return promise.exec(function (err, results) {
        if (err) {
          log.error(err)
          return []
        } else {
          return results
        }
      }).then(function (results) {
        var notExists = []
        log.info(JSON.stringify(results))
        results.forEach(function (result, index) {
          if (result !== 1) {
            notExists.push(complaints[index])
          }
        })
        return notExists
      })
    }
  },
  handle: {
    push: (handles) => {
      var list = handles.map(function (handle) {
        return JSON.stringify(handle)
      })
      let promise = redis.pipeline().lpush(keys.handles, list)

      return promise.exec(function (err, result) {
        let actionResult = true
        if (err) {
          log.warn('//======投诉数据存储到队列【失败】======//')
          log.warn(err)
          actionResult = false
        } else {
          log.info('//======投诉数据存储到队列【成功】======//')
        }
        return actionResult
      })
    },
    pop: () => {
      return redis.pipeline().lpop(keys.handles).exec(function (err, result) {
        let actionResult = true
        if (err) {
          log.warn('//======投诉数据移除队列【失败】======//')
          log.warn(err)
          actionResult = false
        } else {
          log.info('//======投诉数据移除队列【成功】======//')
        }
        return actionResult
      })
    }
  }
}
