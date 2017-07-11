var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.tasks.dataClean
var Task = require('./Task')
var store = require('../store')

class DataCleanTask extends Task {
  constructor (type, unit, timeSpan) {
    super(type, unit, timeSpan)
    console.log('数据清理定时任务已启动...')
  }
  promiseFunc () {
    var that = this
    return store.complaints
        .delete(that.type, that.startTime, that.endTime)
        .then(function (items) {
          return store.logs.add({
            type: 'task-data-clean',
            intInfo: items ? items.length : 0
          })
        })
        .catch(function (err) {
          console.log(err)
        })
  }
}

// 两天清理一次数据
// 测试使用1分钟清理一次数据
module.exports = new DataCleanTask('2', config.unit, config.timeSpan)
