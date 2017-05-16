/**
 * @author jiangfeng
 * @summary EJS模板引擎封装
 */
let ejs = require('ejs')
let AppConfig = require('./App/AppConfig')
/**
 * 让所有的view数据都带上配置信息
 * @param {String} path
 * @param {Object|Function} options or callback
 * @param {Function|undefined} fn
 * @returns {String}
 * @api public
 */
module.exports = function (path, options, fn) {
  var viewConfig = JSON.parse(JSON.stringify(AppConfig))
  options.config = options.config || {}
  for (var i in options.config) {
    viewConfig[i] = options.config[i]
  }
  options.AppConfig = viewConfig
  ejs.renderFile(path, options, fn)
}
