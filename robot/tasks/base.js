var store = require('../store')
var moment = require('moment')
function baseTask (type) {
  var task = {
    timeTick: 1000 * 60,
    run: function () {
      var that = this
      if (!that.startTime && !that.lock) {
        store.complaints.first(type).then(function (result) {
          if (!result) {
            that.startTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm') + ':00'
            that.endTime = moment(that.startTime).add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss')
            return
          }
          that.startTime = moment(result.createdAt).format('YYYY-MM-DD HH:mm') + ':00'
          that.endTime = moment(that.startTime).add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss')
        })
        return
      }

      that.lock = true

      store.complaints
        .get(type, that.startTime, that.endTime)
        .then(function (complaints) {
          var count = complaints.length
          var promises = []
          var addReportCount = store.reportCount
            .add({
              startTime: that.startTime,
              endTime: that.endTime,
              type: type,
              count: count
            })
            .catch(function (err) {
              console.log(err)
            })

          promises.push(addReportCount)

          var curTime = moment()
          var startTime = moment(that.startTime)
          // 只有在7天以前的数据才会删除
          if (count > 0 && curTime.diff(startTime, 'days') >= 7) {
            var deleteComplaints = store.complaints
              .delete(complaints)
              .then(function () {
                console.log(arguments)
              })
              .catch(function (err) {
                console.log(err)
              })
            promises.push(deleteComplaints)
          }
          return Promise.all(promises).then(function () {
            that.startTime = moment(that.startTime)
              .add(1, 'minutes')
              .format('YYYY-MM-DD HH:mm:ss')
            that.endTime = moment(that.endTime)
              .add(1, 'minutes')
              .format('YYYY-MM-DD HH:mm:ss')
            that.lock = false
          })
        })
        .catch(function (ex) {
          console.log(ex)
        })
    }
  }
  return task
}

module.exports = baseTask
