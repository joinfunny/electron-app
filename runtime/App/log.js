var log4js = require('log4js')
var fs = require('fs')
var path = require('path')
var helper = {}

function parse (logConfig) {
  // 检查配置文件所需的目录是否存在，不存在时创建
  if (logConfig.appenders) {
    var baseDir = logConfig['customBaseDir']
    var defaultAtt = logConfig['customDefaultAtt']
    var rootDir = path.resolve()
    baseDir = path.join(rootDir, baseDir)
    for (var i = 0, j = logConfig.appenders.length; i < j; i++) {
      var item = logConfig.appenders[i]
      if (item['type'] == 'console') { continue }

      if (defaultAtt != null) {
        for (var att in defaultAtt) {
          if (item[att] == null) { item[att] = defaultAtt[att] }
        }
      }
      if (baseDir != null) {
        if (item['filename'] == null) {
          item['filename'] = baseDir
        } else {
          item['filename'] = baseDir + item['filename']
        }
      }
      var fileName = item['filename']
      if (fileName == null) { continue }
      var pattern = item['pattern']
      if (pattern != null) {
        fileName += pattern
      }
      var category = item['category']
      if (!path.isAbsolute(fileName)) { throw new Error('配置节' + category + '的路径不是绝对路径:' + fileName) }
      var dir = path.dirname(fileName)
      checkAndCreateDir(dir)
    }
  }

  // 目录创建完毕，才加载配置，不然会出异常
  log4js.configure(logConfig)
  // 与配置文件中的Category一一对应
  var logDebug = log4js.getLogger('logDebug')
  var logInfo = log4js.getLogger('logInfo')
  var logWarn = log4js.getLogger('logWarn')
  var logErr = log4js.getLogger('logErr')
  var logData = log4js.getLogger('logData')

  helper.debug = function (msg) {
    if (msg == null) { msg = '' }
    logDebug.debug(msg)
  }

  helper.info = function (msg) {
    if (msg == null) { msg = '' }
    logInfo.info(msg)
  }

  helper.warn = function (msg) {
    if (msg == null) { msg = '' }
    logWarn.warn(msg)
  }

  helper.error = function (msg, exp) {
    if (msg == null) { msg = '' }
    if (exp != null) { msg += '\r\n' + exp }
    logErr.error(msg)
  }
  helper.data = function (category, data) {
    logData.info(category + ' : ' + data)
  }

  return logInfo
}

// 配合express用的方法
exports.use = function (app, appConfig) {
  var logger = parse(appConfig.runtime.log4js)
  /* 如果输出级别是INFO，则不会打印出低于info级别的日志trace,debug，只打印info,warn,error,fatal。
  这样做 的好处在于，在生产环境中我们可能只关心异常和错误，并不关心调试信息。
  从而大大减少日志的输出，能减少磁盘写入。
  而在开发环境中，我们可以需要打印非常 多的信息，帮助开发人员定位错误，调试代码。 */
  app.use(log4js.connectLogger(logger, {
    // 输出级别
    level: log4js.levels.INFO
  }))
}
exports.helper = helper

// 判断日志目录是否存在，不存在时创建日志目录
function checkAndCreateDir (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
