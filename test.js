var path = require('path')
var Moment = require('moment')
var Nightmare = require('nightmare')
var request = require('request')
var fs = require('fs')

require('nightmare-iframe-manager')(Nightmare)

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

nightmare.goto('http://www.baidu.com')
  .type('#kw', '电视剧')
  .evaluate(function () {
    var input = document.querySelector('#su')
    input.click()
  }).then(function () {
    console.log('ok')
  })
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
