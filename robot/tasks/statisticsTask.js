var Task = require('./Task')
var store = require('../store')

function statistics () {
  var that = this
  return store.complaints
    .get(that.type, that.startTime, that.endTime)
    .then(function (complaints) {
      var count = complaints.length
      return store.reportCount
        .add({
          startTime: that.startTime,
          endTime: that.endTime,
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

class StatisticsTask extends Task {
  constructor (type, unit, timeSpan) {
    super(type, unit, timeSpan)
    this.statistics = statistics
  }
}

module.exports = StatisticsTask
