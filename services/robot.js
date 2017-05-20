let Runtime = require('../runtime/index')
let log = Runtime.App.Log.helper
let nightmare = global.robot
let service = require('../robot/service')

module.exports = {
  /**
   * 处理投诉
   */
  '/api/complaint/handling': {
    method: 'post',
    callback: function (req, res, callback) {
      let handles = req.body
      log.info('//======接受到实立传输的已处理投诉订单=======//')
      if (typeof handles === 'object') {
        handles = [handles]
      }
      service.handleComplaints(handles)
        .then(function () {
          callback({
            success: true
          })
        })
    }
  }
}
