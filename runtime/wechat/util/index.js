"use strict"
module.exports = {
	/**
	 * 获取随机nonce
	 * @param length
	 * @returns {string}
	 */
	getNonce: function (length) {
		length = length || 32
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		var pos = chars.length
		var nonces = []
		var i
		for (i = 0; i < length; i++) {
			nonces.push(chars.charAt(Math.floor(Math.random() * pos)))
		}
		return nonces.join("")
	},

	/**
	 * 将对象拼接为网络连接
	 *
	 * @param params
	 * @returns {string}
	 */
	toParam: function (params) {
		params = params || {}
		var keys = []
		for (var k in params) {
			if (["string", "number"].indexOf(typeof params[k]) !== -1) {
				keys.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
			}
		}
		return keys.join("&")
	},

	/**
	 * 排序对象属性，之后拼接为连接
	 *
	 * @param params
	 * @returns {string}
	 */
	marshall: function (params) {
		params = params || {}
		var keys = Object.keys(params).sort()
		var obj = {}
		var kvs = []
		for (var i = 0; i < keys.length; i++) {
			var k = keys[i]
			if (params[k]) {
				obj[k] = params[k]
				kvs.push(keys[i] + "=" + params[k])
			}
		}
		return kvs.join("&")
	},
	/**
	 * 对象转换为XML
	 * @param params
	 * @returns {string}
	 */
	toXml: function (params) {
		var lines = []
		lines.push("<xml>")
		for (var k in params) {
			if (!params[k]) {
				continue
			}
			if (typeof params[k] === "number") {
				lines.push("<" + k + ">" + params[k] + "</" + k + ">")
			} else {
				lines.push("<" + k + "><![CDATA[" + params[k] + "]]></" + k + ">")
			}
		}
		lines.push("</xml>")
		return lines.join("")
	}
}