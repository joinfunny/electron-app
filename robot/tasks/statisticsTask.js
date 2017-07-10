var Task = require('./Task')
var store = require('../store')

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

        })
        .catch(function (err) {
          console.log(err)
        })
    })
    .catch(function (ex) {
      console.log(ex)
    })
  }
}

module.exports = StatisticsTask
