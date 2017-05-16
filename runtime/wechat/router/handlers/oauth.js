/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */


var weixin = require("../../api/index")
var oauth = require("../callbacks/oauth")
var log = require("../../../App/log").helper
var callbacks = require("../callbacks")


module.exports = {
	access: function(settings) {
		return function(req, res) {
			if (callbacks.oauth.access instanceof Function) {
				callbacks.oauth.access(req, res)
			}
			var router = require("../index")
			router.getId(req, function(id) {
				settings.all(id, function(all) {
					var url = weixin.oauth.createURL(all.app.id, all.urls.oauth.success,
						all.oauth.state,
						all.oauth.scope)
					//log.info(url)
					res.redirect(url)
				})
			})
		}
	},
	/**
	 * Access访问成功后返回的Code。通过Code和S
	 */
	success: function(settings, session) {
		return function(req, res) {
			var code = null
			if (req.query && req.query.code) {
				code = req.query.code
			}
			var router = require("../index")
			router.getId(req, function(id) {
				settings.all(id, function(all) {
					var urls = all.urls
					var app = all.app
					if (!code) {
						res.redirect(urls.oauth.access)
						return
					}
					weixin.oauth.success(app, code, oauth.success(settings, session, req, res))
				})
			})
		}
	}
}