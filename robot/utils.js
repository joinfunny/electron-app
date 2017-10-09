var crypto = require('crypto')
var Runtime = require('../runtime')
var serviceConfig = Runtime.App.AppConfig.robot.service
var log = Runtime.App.Log.helper
module.exports = {
  complaintmd5 (complaint) {
    var docmentsNo = encodeURIComponent(complaint.docmentsNo)
    var agentOrderNo = encodeURIComponent(complaint.agentOrderNo)
    var feedback = encodeURIComponent(complaint.feedback)
    var phoneNo = encodeURIComponent(complaint.phoneNo)
    // var coustomerRequest = encodeURI(complaint.coustomerRequest)
    var complaintSources = encodeURIComponent(complaint.complaintSources)
    var timeLength = encodeURIComponent(complaint.timeLength)
    var times = encodeURIComponent(complaint.times)
    var type = encodeURIComponent(complaint.type)

    var source = docmentsNo +
      agentOrderNo +
      feedback +
      phoneNo +
      // coustomerRequest +
      complaintSources +
      timeLength +
      times +
      type +
      serviceConfig.md5
    const hash = crypto.createHash('md5')
    // 可任意多次调用update():
    hash.update(source)
    complaint.sign = hash.digest('hex')
    log.info(complaint)
    return complaint
  }
}
