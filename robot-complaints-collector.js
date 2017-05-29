process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.NODE_SERVICE = 'robotComplaintsCollector'
var Runtime = require('./runtime')
Runtime.OrmMapping.use(Runtime.App.AppConfig)
var logger = Runtime.App.Log
logger.use(null, Runtime.App.AppConfig)
var log = logger.helper
let robot = require('./robot')

log.info('----正在启动机器人-投诉订单采集服务------')
// 启动机器人
robot.run()
