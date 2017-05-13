var path = require('path')
var Moment = require('moment');
var Utils = require('../utils')
module.exports = {
	nightmare: null,
	run: function(nightmare) {
		this.nightmare = nightmare;
		return this.goto()
	},
	goto: function() {
		var that = this;
		return that.nightmare
			.url()
			.then(function(url) {
				console.log('--------------------当前URL----------------')
				console.log(url)
				console.log('--------------------当前URL----------------')
				return that.nightmare
					.evaluate(function(url) {
						var item = document.querySelector('#nav>li:nth-child(6)>a');
						item.click();
					})
			})
			.then(function() {
				return that.nightmare
					.evaluate(function() {
						var item = document.querySelector('#nav>li.actived>ul>li>a')
						item.click()
					})
			})
			.then(function() {
				console.log('ok')
				return that.nightmare
					.wait(500)
					.screenshot(path.resolve('./snapshot/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png'))
			})
	}

}