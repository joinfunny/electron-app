var Task = require('./Task')
var store = require('../store')
var moment = require('moment')

function dataClean () {
  var that = this
  return store.complaints
        .delete(that.type, that.startTime, that.endTime)
        .catch(function (err) {
          console.log(err)
        })
}

class DataCleanTask extends Task {
  constructor (type, unit, timeSpan) {
    super(type, unit, timeSpan, dataClean)
    this.statistics = dataClean
  }
}

// 两天清理一次数据
module.exports = new DataCleanTask('2', 'days', 2)
