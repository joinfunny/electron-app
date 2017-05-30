var request = require('request-promise')

var crypto = require('crypto')

var Runtime = require('./runtime')
var serviceConfig = Runtime.App.AppConfig.robot.service
Runtime.OrmMapping.use(Runtime.App.AppConfig)
let orm = Runtime.OrmMapping

function complaintmd5 (complaint) {
  var docmentsNo = encodeURI(complaint.docmentsNo)
  var agentOrderNo = encodeURI(complaint.agentOrderNo)
  var feedback = encodeURI(complaint.feedback)
  var phoneNo = encodeURI(complaint.phoneNo)
  var coustomerRequest = encodeURI(complaint.coustomerRequest)
  var type = '' // encodeURI(complaint.type)

  var source = docmentsNo + agentOrderNo + feedback + phoneNo + coustomerRequest + type + serviceConfig.md5
  const hash = crypto.createHash('md5')
  // 可任意多次调用update():
  hash.update(source)
  complaint.sign = hash.digest('hex')
  console.log(complaint)
  return complaint
}

function postHandles () {
  var requestMapping = [
    '充值已到账（月初）',
    '充值已到账（月中）',
    '充值部分到账',
    '充值失败（重新充值）',
    '充值失败（可退款）',
    '充错号码（不可退款）',
    '通用'
  ]
  orm.models.complaints.findOne({
    type: 1
  }).then(function (complaint) {
    if (complaint) {
      complaint.coustomerRequest = requestMapping[Runtime.App.Utils._.random(0, 6)]
      request.post({
        url: 'http://localhost:9091/api/complaint/handling',
        json: true,
        body: complaintmd5(complaint)
      })
        .then(function (result) {
          console.log(result)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  })
}
var index = 0
setInterval(function () {
  // if (index < 20) {
  postHandles()
  index++
  // }
}, 1000)
