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
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  webPreferences: {
    webSecurity: false
  }
})
// nightmare
//   .goto('http://chong.qq.com/pc/seller/index.html#/csList')
//   .wait(3000)
//   .refresh()
//   .then(function (result) {
//     console.log(result)
//   })

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
