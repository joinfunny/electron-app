"use strict"
var request = require("../request/index")
var util = require("../util/index")
var auth = require("../auth/index")

var baseUrl = "https://api.weixin.qq.com/cgi-bin/menu/"
var customUrl = "https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info"

module.exports = {
	_send: function (settings, app, url, data, cb) {
		auth.determine(settings, app, function () {
			settings.get(app.id, "auth", function (authData) {
				var newUrl = url + util.toParam({
					/* eslint camelcase: [2, {properties: "never"}] */
					access_token: authData.accessToken
				})
				request.json(newUrl, data, cb)
			})
		})
	},
	create: function (settings, app, data, cb) {
		this._send(settings, app, baseUrl + "create?", data, cb)
	},
	remove: function (settings, app, cb) {
		this._send(settings, app, baseUrl + "delete?", null, cb)
	},
	get: function (settings, app, cb) {
		this._send(settings, app, baseUrl + "get?", null, cb)
	},

	customize: function (settings, app, cb) {
		this._send(settings, app, customUrl + "?", null, cb)
	}
}