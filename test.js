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
// .on('did-stop-loading', function() {
// 	nightmare
// 		.evaluate(function() {
// 			var item = document.querySelector('#userLogin>a')
// 			if (item) {
// 				item.click();
// 			} else {
// 				console.log('can not find selector ' + selector + ',will find next time ')
// 			}
// 		})
// })

nightmare
	.goto('http://stream-sass.cssrv.dataengine.com/introduce/')
	.evaluate(function() {
		var timer = setInterval(function() {
			var item = document.querySelector('#userLogin>a')
			if (item) {
				console.log('get the selector ' + item.innerText)
				item.click();
				clearInterval(timer);
			} else {
				console.log('can not find selector ' + selector + ',will find next time')
			}
		}, 100)
	})
	.screenshot(path.resolve('./snapshot/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png'))
	.then(function() {
		console.log('ok')
	})