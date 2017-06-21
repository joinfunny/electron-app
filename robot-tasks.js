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
