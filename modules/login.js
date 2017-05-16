/**
 * @author jiangfeng
 * @summary 用户登录模块
 */
let Runtime = require('../runtime/index')
let Agent = require('caas-agent-nodejs')
let crypto = require('crypto')
let SessionStore = Runtime.SessionStore
let AppConfig = Runtime.App.AppConfig

let agent = new Agent(
  AppConfig.runtime.caas.host,
  AppConfig.runtime.caas.port,
  AppConfig.runtime.caas.prefix,
  AppConfig.runtime.caas.appKey,
  AppConfig.runtime.caas.appSecret
)
function _doAuth (authCode, req, res, callback) {
  agent.auth(authCode, function (err, result) {
    let actionResult = {}
    if (!err && result.success) {
      SessionStore.setAccessInfo(req, {
        accessToken: result.access_token,
        expiresIn: result.expires_in,
        refreshToken: result.refresh_token
      })
      actionResult.success = true
    } else {
      actionResult.msg = err || result && result.errorMessage
    }
    callback(actionResult)
  })
}

function login (req, res, callback) {
  var formData = req.body
  let xAuthToken = SessionStore.getXAuthToken(req)
  let password = crypto.createHash('md5').update(formData.password).digest('hex')
  agent.login(
      formData.username,
      password,
      req.body.code,
      xAuthToken,
      function (err, result) {
        if (!err && result.success) {
          _doAuth(result.auth_code, req, res, callback)
        } else {
          callback({
            success: false,
            msg: err || result && result.errorMessage
          })
        }
      }
    )
}
function vcode (req, res, callback) {
  var xAuthToken = SessionStore.getXAuthToken(req)
  agent.base64Vcode(xAuthToken, function (err, result) {
    if (!err) {
      SessionStore.setXAuthToken(req, result.xAuthToken)
    }
    res.send(result)
  })
}

module.exports = {
  login,
  vcode
}
