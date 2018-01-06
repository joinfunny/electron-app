// process.env.NODE_ENV = 'production_switchfour'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var Runtime = require('./runtime')
process.env.NODE_SERVICE = 'robotCompliantsConfirmer'
Runtime.OrmMapping.use(Runtime.App.AppConfig)
var logger = Runtime.App.Log
logger.use(null, Runtime.App.AppConfig)
var log = logger.helper
let robot = require('./robot')

log.info('----正在启动机器人-投诉订单认领服务------')
// 启动机器人
robot.run()
