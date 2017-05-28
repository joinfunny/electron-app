process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.NODE_SERVICE = 'robotComplaintsHandler'
var Runtime = require('./runtime')
var logger = Runtime.App.Log
logger.use(null, Runtime.App.AppConfig)
var log = logger.helper
let robot = require('./robot')

log.info('exceptionorder', '----正在启动机器人-投诉处理服务------')
// 启动机器人
robot.run()
