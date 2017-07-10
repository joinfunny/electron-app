var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.tasks.statistics
/**
 * 定时任务
* 定时统计采集到的数据，统计间隔：1分钟统计一次
 */
var StatisticsTask = require('./StatisticsTask')
module.exports = new StatisticsTask('1', config.unit, config.timeSpan)
