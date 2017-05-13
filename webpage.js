var webpage = require('webpage'),
	page = webpage.create();
page.viewportSize = {
	width: 1024,
	height: 800
};
page.clipRect = {
	top: 0,
	left: 0,
	width: 1024,
	height: 800
};
// page.settings = {
// 	javascriptEnabled: false,
// 	loadImages: true,
// 	userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
// };
var url = 'http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login'
page.onConsoleMessage = function(msg) {
	console.log(msg);
};
page.onUrlChanged = onUrlChanged
page.open(url, function(status) {
	var data;

	if (status === 'fail') {
		console.log('open page fail!');
	} else {
		page.switchToChildFrame('login_frame')
		page.evaluate(function() {
			var btn_login = document.getElementById('switcher_plogin')
			if (btn_login) {
				console.log(btn_login)
				btn_login.click()
			}
		})

		setTimeout(function() {
			page.switchToChildFrame('login_frame')
			page.evaluate(function() {
				var input_u = document.getElementById('u');
				input_u.value = "2919415063"
				var input_p = document.getElementById('p');
				input_p.value = 'shili8269'
				var btn_login = document.getElementById('login_button')
			})
			setTimeout(function() {
				page.evaluate(function() {
					var btn_login = document.getElementById('login_button')
					btn_login.click()
				})
				setTimeout(function() {
					page.render('./snapshot/test.png')
					setTimeout(function() {
						page.close();
						phantom.exit();
					}, 500)
				}, 500)
			}, 500)

		}, 500)
	}

});

function onUrlChanged(newUrl) {
	console.log('url changed :' + newUrl)
}