var Task = require('./Task')
var store = require('../store')
var moment = require('moment')

class StatisticsTask extends Task {
  constructor (type, unit, timeSpan) {
    super(type, unit, timeSpan)
    console.log('统计任务已启动...')
  }
  promiseFunc () {
    var that = this
    return store.complaints
    .get(that.type, that.startTime, that.endTime)
    .then(function (complaints) {
      var count = complaints.length
      return store.reportCount
        .add({
          startTime: new Date(that.startTime),
          endTime: new Date(that.endTime),
          type: that.type,
          count: count
        })
        .then(function () {
          return store.logs.update({
            type: 'task-data-statistics',
            dateInfo: new Date(that.endTime)
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    })
    .catch(function (ex) {
      console.log(ex)
    })
  }
  initStartTimePromise () {
    var that = this
      /**
       * 获取要统计的时间区间
       */
    if (!that.startTime && !that.lock) {
      return store.logs.get('task-data-statistics')
      .then(function (items) {
        if (items.length > 0) {
          return new Promise(function () {
            that.startTime = moment(items[0]).format('YYYY-MM-DD HH:mm:ss')
          })
        } else {
          return store.complaints
            .first(that.type)
            .then(function (result) {
              if (!result) {
                that.startTime = moment('2017-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')
              } else {
                that.startTime = moment(result.createdAt).format('YYYY-MM-DD HH:mm:ss')
              }
            })
        }
      })
    } else {
      return new Promise(function (resolve) { resolve() })
    }
  }
}

module.exports = StatisticsTask
