var path = require('path')
var Moment = require('moment')
var Nightmare = require('nightmare')
var request = require('request')
var fs = require('fs')

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

var nodemailer = require('nodemailer')
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
})

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
