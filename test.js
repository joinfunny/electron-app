var path = require('path')
var Moment = require('moment')
var Nightmare = require('nightmare')
var request = require('request-promise')
var fs = require('fs')
var crypto = require('crypto')
var events = require('events')

var Runtime = require('./runtime')
var log = Runtime.App.Log.helper
var vcodeConfig = Runtime.App.AppConfig.robot.login
var serviceConfig = Runtime.App.AppConfig.robot.service
Runtime.OrmMapping.use(Runtime.App.AppConfig)
let orm = Runtime.OrmMapping
require('nightmare-iframe-manager')(Nightmare)

var capturePlugin = require('nightmare-screenshot')

var nightmare = Nightmare({
  width: 1024,
  height: 768,
  show: false,
  openDevTools: {
    mode: 'detach'
  },
  webPreferences: {
    webSecurity: false
  }
})
nightmare
  .goto('http://chong.qq.com')
  .wait(3000)
  // .refresh()
  .then(function (result) {
    console.log(result)
    return nightmare.goto('http://www.baidu.com')
      .then(function () {
        return Promise.resolve()
          .then(function () {
            return Promise.resolve('1')
          })
          .then(function (result) {
            console.log(result)
            return new Promise(resolve => {
                // if (true) {
                //   throw new Error('error 1')
                // }
              setTimeout(function () {
                resolve(new Promise(resolve => {
                  setTimeout(function () {
                    console.log(1231)
                    resolve(1111111)
                  }, 2000)
                }))
              }, 1000)
            })
              .catch(ex => {
                console.error(ex)
              })
          })
          .then(function (result) {
            console.log(result)
            return 2
          })
          .catch(ex => {
            console.error(ex)
          })
      })
  })
  .then(function (result) {
    console.log(result)
    process.exit(1)
  })

function complaintmd5 (complaint) {
  var docmentsNo = encodeURIComponent(complaint.docmentsNo)
  var agentOrderNo = encodeURIComponent(complaint.agentOrderNo)
  var feedback = encodeURIComponent(complaint.feedback)
  var phoneNo = encodeURIComponent(complaint.phoneNo)
  var coustomerRequest = encodeURIComponent(complaint.coustomerRequest)
  var complaintSources = encodeURIComponent(complaint.complaintSources)
  var timeLength = encodeURIComponent(complaint.timeLength)
  var times = encodeURIComponent(complaint.times)
  var type = encodeURIComponent(complaint.type)
  console.log()
  console.log({
    docmentsNo: encodeURIComponent(complaint.docmentsNo),
    agentOrderNo: encodeURIComponent(complaint.agentOrderNo),
    feedback: encodeURIComponent(complaint.feedback),
    phoneNo: encodeURIComponent(complaint.phoneNo),
    coustomerRequest: encodeURIComponent(complaint.coustomerRequest),
    complaintSources: encodeURIComponent(complaint.complaintSources),
    timeLength: encodeURIComponent(complaint.timeLength),
    times: encodeURIComponent(complaint.times),
    type: encodeURIComponent(complaint.type)
  })
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
  hash.update(source, 'utf8')
  complaint.sign = hash.digest('hex')
  return complaint
}
console.log({
  'sign': 'cfab0571a232ed6bfb9ed0b70709c368'
})
console.log(complaintmd5({
  'docmentsNo': '1744038',
  'agentOrderNo': '3934002761201709130627842543',
  'feedback': '充错号码',
  'phoneNo': '18772903979',
  'coustomerRequest': '充值到18674198650上、x20谢谢 0 5',
  'complaintSources': '客服',
  'timeLength': '1小时',
  'times': '1',
  'satisfaction': '0星',
  'record': '用户投诉; 客服工号3161624341认领了工单;',
  'type': 1
}))

/* Promise.resolve().then(() => {
  console.log(1)
}).then(function () {
  return new Promise(resolve => {
    setTimeout(function () { resolve(2) }, 1000)
  })
})
.then(function (result) {
  console.log(result)
  process.exit(1)
}) */

/* var eventEmitter = new events.EventEmitter()

eventEmitter.on('firstEvent', function (target) {
  console.log(arguments)
})

eventEmitter.emit('firstEvent', {a: 1}) */

/* nightmare
  .on('did-fail-load', function () {
    console.log('did-fail-load')
    console.log(arguments)
  })
  .on('did-frame-finish-load', function () {
    console.log('did-frame-finish-load')
    console.log(arguments)
  })
  .on('did-get-redirect-request', function () {
    console.log('did-get-redirect-request')
    console.log(arguments)
  })
  .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseList&filter=&reply=&path=2&status=20&searchCnt=&searchBy=mobile')
  .then(function () {}) */

/* request.post({
  url: vcodeConfig.vcode.serviceUrl,
  json: true,
  formData: {
    key: vcodeConfig.vcode.serviceKey,
    codeType: vcodeConfig.vcode.serviceCodeType,
    image: fs.createReadStream(path.join(path.resolve(), './snapshot/vcodes/yyyy-05-Tu 16:01:04.png'))}
}, function (err, response, body) {
  console.log(arguments)
})
*/
/* nightmare
.on('page', function (type = 'prompt', message, response) {
  console.log(arguments)
})
.goto('http://localhost:9091/')
.click('#btn_test')
.then(function () {

}) */

/* function complaintmd5 (complaint) {
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
}, 1000) */

/* const crypto = require('crypto')

const hash = crypto.createHash('md5')

// 可任意多次调用update():
hash.update('admin')
// hash.update('admin')

console.log(hash.digest('hex')) // 7e1977739c748beac0c0fd14fd26a544 */

/* var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true,
  auth: {
    user: '348380264@qq.com',
    pass: 'dhrrpvicchuobhij'
  }
})
// setup e-mail data with unicode symbols
var mailOptions = {
  from: '348380264@qq.com', // 发件地址
  to: '348380264@qq.com', // 收件列表
  subject: 'Hello sir', // 标题
    // text和html两者只支持一种
  text: 'Hello world ?', // 标题
  html: '<b>Hello world ?</b>' // html 内容
}

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error)
  }
  console.log('Message sent: ' + info.response)
}) */

/* nightmare.goto('http://stream.ruixuesoft.com/index')
.then(function (result) {
  console.log(result)
}) */

/* var dom = 'body > div > ul > li'
nightmare.goto('http://stream.ruixuesoft.com/login')
  .wait(2000)
  .type('input[type="tel"]', '15810929612')
  .type('input[type="password"]', 'admin')
  .click('#j_btn_login')
  .wait(3000)
  .enterIFrame('#mainFrame')
  .evaluate(function () {
    var rect = document.querySelector('body > div > ul > li').getBoundingClientRect()
    return {
      x: Math.round(rect.left),
      y: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    }
  })
  .then(function (rect) {
    nightmare
      .exitIFrame()
      .evaluate(function () {
        var rect = document.querySelector('#mainFrame').getBoundingClientRect()
        return {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      })
      .then(function (iframeRect) {
        nightmare
          .screenshot(path.resolve(__dirname, './snapshot/testa1.png'), {
            x: iframeRect.x + rect.x,
            y: iframeRect.y + rect.y,
            width: rect.width,
            height: rect.height
          })
          .run()
      })
  }) */
// .use(capturePlugin.screenshotSelector(path.resolve(__dirname, './snapshot/test.png'), dom, function () {
//   console.log(arguments)
// }))

/* nightmare.goto('http://www.baidu.com')
  .type('#kw', '电视剧')
  .evaluate(function () {
    var input = document.querySelector('#su')
    input.click()
  }).then(function () {
    console.log('ok')
  }) */
// var localFile = path.join(__dirname, './snapshot/captcha.gif')
// var multipartFormData = {}
// multipartFormData.key = 'ae6ed8d0322a8800a28f9de897d5934c'
// multipartFormData.codeType = 8001
// multipartFormData.image = fs.createReadStream(localFile)

// var reqOptions = {
//   url: 'http://op.juhe.cn/vercode/index',
//   formData: multipartFormData,
//   json: true
// }

// request.post(reqOptions, function (err, res, body) {
//   console.log(body)
// })

/* var Redis = require('ioredis')
var redis = new Redis()

redis.hset('person', 'name', 'jiangfeng')
redis.hset('person', 'sex', 'male')

var promise1 = redis.hexists('person', 'name')
var promise2 = redis.hexists('person', 'sex') */

/* Promise
.all([promise1, promise2])
.then(function (result) {
  console.log(result)
}) */

// redis.pipeline()
// .lpush('list', JSON.stringify({a: 1, b: 2}))
// .lpop('list')
// .exec(function (err, result) {
//   console.log(err)
//   console.log(result)
//   process.exit()
// })
