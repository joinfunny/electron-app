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
  var complaintSources = encodeURI(complaint.complaintSources)
  var timeLength = encodeURI(complaint.timeLength)
  var times = encodeURI(complaint.times)
  var type = '' // encodeURI(complaint.type)

  var source = docmentsNo +
    agentOrderNo +
    feedback +
    phoneNo +
    coustomerRequest +
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
  var rdm = Runtime.App.Utils._.random(5, 30)
  orm.models.complaints.find({
    type: 1
  }).limit(rdm).then(function (complaints) {
    if (complaints && complaints.length > 0) {
      complaints.forEach(function (complaint) {
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
      })
    }
  })
}
var base = 1// Runtime.App.Utils._.random(1, 5)
var index = 0
setInterval(function () {
  if (index > base) {
    postHandles()
    index = 0
    base = 1// Runtime.App.Utils._.random(1, 5)
  } else {
    index++
  }
}, 1000)

// var complaint = {
//   'sign': '985003e74c746864529aea6455ee59c5',
//   'phoneNo': '15319055711',
//   'feedback': '充值未到账',
//   'agentOrderNo': '3557000951201709070516465069',
//   'docmentsNo': '1649035',
//   'coustomerRequest': '充值已到账（月中）'
// }

// request.post({
//   url: 'http://localhost:9091/api/complaint/handling',
//   json: true,
//   body: complaintmd5(complaint)
// })
