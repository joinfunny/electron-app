var crypto = require('crypto')
var Runtime = require('../runtime')
var serviceConfig = Runtime.App.AppConfig.robot.service
module.exports = {
  complaintmd5 (complaint) {
    var docmentsNo = encodeURI(complaint.docmentsNo)
    var agentOrderNo = encodeURI(complaint.agentOrderNo)
    var feedback = encodeURI(complaint.feedback)
    var phoneNo = encodeURI(complaint.phoneNo)
    // var coustomerRequest = encodeURI(complaint.coustomerRequest)
    var complaintSources = encodeURI(complaint.complaintSources)
    var timeLength = encodeURI(complaint.timeLength)
    var times = encodeURI(complaint.times)
    var type = '' // encodeURI(complaint.type)

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
    console.log(complaint)
    return complaint
  }
}
