var path = require('path');
var Moment = require('moment');
var Nightmare = require('nightmare');
var request = require('request')
var fs = require('fs')

require('nightmare-iframe-manager')(Nightmare);

// var nightmare = Nightmare({
// 	width: 1024,
// 	height: 768,
// 	show: true,
// 	openDevTools: {
// 		mode: 'detach'
// 	},
// 	webPreferences: {
// 		webSecurity: false 
// 	}
// })

// nightmare
// 	.goto('http://stream-sass.cssrv.dataengine.com/introduce/')
//   .click('#userLogin>a')
//   .evaluate(function(){
//     var input  =  document.querySelector('body > div.login-warp.rotate.login-w > div.login-inner > form > ul.input-area > li:nth-child(1) > input[type="tel"]')
//     input.focus()
//   })
// 	.then(function() {
// 		console.log('ok')
// 	})
var localFile = path.join(__dirname, './snapshot/captcha.gif')
var multipartFormData = {}
multipartFormData.key = 'ae6ed8d0322a8800a28f9de897d5934c'
multipartFormData.codeType = 8001
multipartFormData.image = fs.createReadStream(localFile)

var reqOptions = {
  url: 'http://op.juhe.cn/vercode/index',
  formData: multipartFormData,
  json: true
}

request.post(reqOptions, function(err, res, body) {
  console.log(body)
})
