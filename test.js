var path = require('path');
var Moment = require('moment');
var Nightmare = require('nightmare');

require('nightmare-iframe-manager')(Nightmare);

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

nightmare
	.goto('http://stream-sass.cssrv.dataengine.com/introduce/')
  .click('#userLogin>a')
  .evaluate(function(){
    var input  =  document.querySelector('body > div.login-warp.rotate.login-w > div.login-inner > form > ul.input-area > li:nth-child(1) > input[type="tel"]')
    input.focus()
  })
	.then(function() {
		console.log('ok')
	})
