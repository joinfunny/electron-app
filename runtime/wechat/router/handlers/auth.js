var weixin = require("../../api/index")
var auth = require("../callbacks/auth")

module.exports = {
	ack: function(settings) {
		return function(req, res) {
			console.log(req.path)
			if (req.query) {
				var ackData = weixin.auth.extract(req.query)
				var router = require("../index")
				router.getId(req, function(id) {
					settings.get(id, "app", function(app) {
						weixin.auth.ack(app.token, ackData, auth.ack(req, res))
					})
				})
			}
		}
	}
}