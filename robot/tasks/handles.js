var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.tasks.statistics
/**
 * 定时任务
 * 定时统计处理过的数据，统计间隔：1分钟统计一次
 */
var StatisticsTask = require('./StatisticsTask')
module.exports = new StatisticsTask('2', config.unit, config.timeSpan)
