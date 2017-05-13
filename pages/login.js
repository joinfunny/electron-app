module.exports = {
	nightmare: null,
	run: function(nightmare) {
		this.nightmare = nightmare;
		return this.goto()
	},
	goto: function() {
		var that = this;
		return that.nightmare
			.goto('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login')
			.then(function() {
				return that.nightmare
					.enterIFrame('#login_frame')
					.wait('#switcher_plogin')
					.click('#switcher_plogin')
					.wait(500)
					.type('#u', '2919415063')
					.type('#p', 'shili8269')
					.wait(500)
					.evaluate(function() {
						var timer = setInterval(function() {
							var btn = document.querySelector('#login_button')
							if (btn) {
								btn.click()
								clearInterval(timer);
							}
						})
					})
					.wait('#newVcodeIframe > iframe')

				// .wait('#newVcodeIframe > iframe')
				// .enterIFrame('#newVcodeIframe > iframe')
				// .wait('#capImg')
				// .wait('#capAns')
				// .wait('#submit')
				// .evaluate(function() {
				// 	console.log(document.title)
				// })
				// .evaluate(function() {
				// 	var dom = document.querySelector('#switcher_plogin')
				// 	dom.click()
				// 	setTimeout(function(){
				// 	document.querySelector('#u').value = "2919415063"
				// 	document.querySelector('#p').value = "shili8269"
				// 	},500)
				// })
			})
			.then(function(flag) {
				console.log(flag)
				if (flag) {
					console.log('需要输入验证码')
					return that.nightmare.enterIFrame('#newVcodeIframe > iframe')
				} else {
					console.log('不需要输入验证码')
					return that.nightmare.resetFrame()
				}
			})
			// .then(function(){
			// 	return that.nightmare.wait('#login_button').click('#login_button')
			// })
			// .then(function() {
			// 	return that.nightmare
			// 		.evaluate(function() {
			// 			var btn = document.querySelector('#login_button')
			// 			return btn ? true : false
			// 		})
			// })
			.then(function() {
				console.log('ok')
				// if (hasLoginBtn) {
				// 	console.log('找到登陆按钮')
				// 	return that.nightmare
				// 		.evaluate(function() {
				// 			var btn = document.querySelector('#login_button')
				// 			return btn ? true : false
				// 		})
				// }
				// return that.nightmare
				// 	.wait(800)
				// 	.evaluate(function() {
				// 		var vcodeIframe = document.querySelector('#newVcodeIframe > iframe')
				// 		return vcodeIframe ? true : false;
				// 	})
			})
		// .then(function(hasCodeIframe) {
		// 	if (hasCodeIframe) {
		// 		console.log('进入验证码页面')
		// 		return that.nightmare.enterIFrame('#newVcodeIframe>iframe')
		// 	} else {
		// 		console.log('切换到根页面')
		// 		return that.nightmare.resetFrame()
		// 	}
		// })
	}

}