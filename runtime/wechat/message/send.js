/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var util = require("../util/index")
var request = require("../request/index")
var auth = require("../auth/index")

module.exports = function(settings, app, url, data, cb) {
	auth.determine(settings, app, function() {
		settings.get(app.id, "auth", function(authData) {
			var newUrl = url + util.toParam({
				access_token: authData.accessToken
			})
			request.json(newUrl, data, cb)
		})
	})
}