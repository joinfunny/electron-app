module.exports = {
	waitCallback: function(selector, callback) {
		var timer = setInterval(function() {
			var item = document.querySelector(selector);
			if (item) {
				callback.call(this, item)
				clearInterval(timer);
			} else {
				console.log('can not find selector ' + selector+',will find next time ')
			}
		}, 300)
	}
}


// function waitCallback(selector, callback) {
// 	var timer = setInterval(function() {
// 		var item = document.querySelector(selector);
// 		if (item) {
// 			callback.call(this, item)
// 			clearInterval(timer);
// 		} else {
// 			console.log('can not find selector ' + selector + ',will find next time ')
// 		}
// 	}.bind(this), 300)
// }

// waitCallback('#userLogin', function(target) {
// 	target.click();
// });