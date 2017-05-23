var path = require('path')
var Moment = require('moment')
var Nightmare = require('nightmare')
var request = require('request-promise')
var fs = require('fs')

var Runtime = require('./runtime')
var serviceConfig = Runtime.App.AppConfig.robot.service

require('nightmare-iframe-manager')(Nightmare)

var capturePlugin = require('nightmare-screenshot')

var nightmare = Nightmare({
  width: 1024,
  height: 768,
  show: true,
  // openDevTools: {
  //   mode: 'detach'
  // },
  webPreferences: {
    webSecurity: false
  }
})

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
var complaint = {
  agentOrderNo: '3084000971201705177511517199',
  coustomerRequest: '通用',
  docmentsNo: '17052223164581331551',
  feedback: '话费未到帐',
  phoneNo: '13414804686'
}

request.post({
  url: 'http://60.205.169.23:9091/api/complaint/handling',
  json: true,
  body: complaintmd5(complaint)
})
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })

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

var Redis = require('ioredis')
var redis = new Redis()

redis.hset('person', 'name', 'jiangfeng')
redis.hset('person', 'sex', 'male')

var promise1 = redis.hexists('person', 'name')
var promise2 = redis.hexists('person', 'sex')

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
