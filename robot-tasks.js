process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.NODE_SERVICE = 'robotTasks'
var Runtime = require('./runtime')
Runtime.OrmMapping.use(Runtime.App.AppConfig)
var logger = Runtime.App.Log
logger.use(null, Runtime.App.AppConfig)
var log = logger.helper
let task = require('./robot/task')

log.info('----正在启动定时任务------')
// 启动机器人
task.run()

process.on('uncaughtException', function (err) {
  console.error('uncaughtException: %s', err.message)
  var worker = require('cluster').worker
  if (worker) {
    process.send({
      cmd: 'suicide',
      crash: err.stack,
      message: err.message
    })
  }
})
