var assert = require('assert')
var async = require('async')
var redis = require('./redisStore').client

var AppConfig = require('./App/AppConfig')

var weixinRouter = require('./wechat/router/index')
var weixinSession = require('./wechat/session/index')
var weixinSettings = require('./wechat/setting/index')

function handler (name, config) {
  return function (req, res) {
    switch (name) {
      case 'jssdk':
      case 'oauth':
      default:
        // var html = htmlTemplate(config.template, name + ".html", config)
        res.render(name, config)
    }
  }
}

function pages (app, config, settings, session) {
  app.all('/jssdk', handler('jssdk', config, settings, session))
  app.all('/oauth', handler('oauth', config, settings, session))
  app.all('/pay', handler('pay', config, settings, session))
  app.all('/', handler('index', config, settings, session))
}

function getId (config) {
  return function (req, next) {
    next(config.app.id)
  }
}

module.exports = function (cb, app, config) {
  weixinSession.registerSet(function (req, key, value, next) {
    var weixin = req.session['weixin']
    if (!weixin) weixin = req.session['weixin'] = {}
    weixin[key] = value
    next()
  })
  weixinSession.registerGet(function (req, key, next) {
    let weixin = req.session['weixin']
    let value = weixin[key]
    if (value) {
      return next(value)
    }
    next(null)
  })
  weixinSession.registerAll(function (req, next) {
    let weixin = req.session['weixin']
    if (weixin) {
      return next(weixin)
    }
    next(null)
  })

  weixinSettings.registerSet(function (id, key, value, cb) {
    value = JSON.stringify(value)
    redis.hset(config.weixin.setting.prefix + id, key, value, function (err, data) {
      if (data) {
        cb(data)
      } else {
        cb(err || null)
      }
    })
  })

  weixinSettings.registerGet(function (id, key, cb) {
    redis.hget(config.weixin.setting.prefix + id, key, function (err, data) {
      if (data) {
        data = JSON.parse(data)
        cb(data)
      } else {
        cb(err || null)
      }
    })
  })

  weixinSettings.registerAll(function (id, cb) {
    redis.hgetall(config.weixin.setting.prefix + id, function (err, data) {
      if (data) {
        Object.keys(data).forEach(function (k) {
          data[k] = JSON.parse(data[k])
        })
        cb(data)
      } else {
        cb(err || null)
      }
    })
  })

  weixinRouter.express(weixinSettings, weixinSession, app, '')
  weixinRouter.getId = getId(config.weixin)
  var id = config.weixin.app.id
  // 缓存微信应用的配置文件
  async.each(Object.keys(config.weixin), function (k, callback) {
    weixinSettings.set(id, k, config.weixin[k], function () {
      callback()
    })
  }, function () {
    cb(app, weixinRouter)
  })

  // pages(app, config, weixinSettings, weixinSession)
}

module.exports.getId = getId
