/**
 * @author jiangfeng
 * @summary Session会话持久化存储--redis
 */
let session = require('express-session')
let cookieParser = require('cookie-parser')
let RedisStore = require('./redisStore')

const SKEY = {
  '__USER_NAME__': '__USER_NAME__',
  '__CAAS_USER__': '__CAAS_USER__',
  '__RESOURCE__': '__RESOURCE__',
  '__X_AUTH_TOKEN__': '__X_AUTH_TOKEN__',
  '__USER_ID__': '__USER_ID__',
  '__USER_CODE__': '__USER_CODE__',
  '__CAAS_ACCESS_INFO__': '__CAAS_ACCESS_INFO__'
}

function use (app, appConfig) {
  app.use(cookieParser())
  var sessionStore = {
    secret: appConfig.runtime.session.secret,
    name: appConfig.runtime.session.name,
    cookie: {
      maxAge: appConfig.runtime.session.maxAge
    },
    resave: false,
    saveUninitialized: true
  }

  if (appConfig.runtime.session.store === 'redis') {
    sessionStore.store = RedisStore.getInstance()
  }
  app.use(session(sessionStore))
}

function setUserName (req, value) {
  req.session[SKEY.__USER_NAME__] = value
}

function getUserName (req) {
  return req.session[SKEY.__USER_NAME__]
}

function setUserInfo (req, info) {
  req.session[SKEY.__CAAS_USER__] = info
}

function getUserInfo (req) {
  return req.session[SKEY.__CAAS_USER__]
}

function setUserResource (req, resources) {
  req.session[SKEY.__RESOURCE__] = resources
}
/**
 * 资源检查
 * @param req
 * @param resource
 * @returns {boolean} true 有资源 false 无资源
 */
function checkUserResource (req, resource) {
  var res = req.session[SKEY.__RESOURCE__]
  if (res && res.length && res.indexOf(resource) > -1) {
    return true
  } else {
    return false
  }
}

function setXAuthToken (req, xAuthToken) {
  req.session[SKEY.__X_AUTH_TOKEN__] = xAuthToken
}

function getXAuthToken (req) {
  return req.session[SKEY.__X_AUTH_TOKEN__]
}

function setUserId (req, id) {
  req.session[SKEY.__USER_ID__] = id
}

function getUserId (req) {
  return req.session ? req.session[SKEY.__USER_ID__] : null
}

function setUserCode (req, code) {
  req.session[SKEY.__USER_CODE__] = code
}

function getUserCode (req) {
  return req.session ? req.session[SKEY.__USER_CODE__] : null
}

function setAccessInfo (req, info) {
  req.session[SKEY.__CAAS_ACCESS_INFO__] = {
    accessToken: info.accessToken,
    expiresIn: info.expiresIn,
    refreshToken: info.refreshToken
  }
}

function getAccessInfo (req) {
  return req.session[SKEY.__CAAS_ACCESS_INFO__]
}

function clearSession (req) {
  req.session.__CAAS_USER__ = null
  req.session.__USER_ID__ = null
  req.session.__USER_CODE__ = null
  req.session.__USER_NAME__ = null
  req.session.__X_AUTH_TOKEN__ = null
  req.session.__RESOURCE__ = null
  req.session.__CAAS_ACCESS_INFO__ = null
}

module.exports = {
  use: use,
  setUserId: setUserId,
  getUserId: getUserId,
  setAccessInfo: setAccessInfo,
  getAccessInfo: getAccessInfo,
  setUserName: setUserName,
  getUserName: getUserName,
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  setUserResource: setUserResource,
  checkUserResource: checkUserResource,
  setXAuthToken: setXAuthToken,
  getXAuthToken: getXAuthToken,
  clearSession: clearSession,
  setUserCode: setUserCode,
  getUserCode: getUserCode
}
