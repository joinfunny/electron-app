var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var config = Runtime.App.AppConfig.robot.complaints
var log = Runtime.App.Log.helper
var service = require('../service')

/**
 * 投诉订单处理后的监听
 * 1.将投诉订单
 */
module.exports = {
  run: (nm) => {
    setInterval(function () {
      log.info('//======投诉订单监听执行======//')
    }, config.listener.tickTime)
  }

}
