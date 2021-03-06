module.exports = {
  App: require('./App/index'),
  Authorization: require('./Authorization'),
  RedisStore: require('./redisStore'),
  ServiceHandler: require('./serviceHandler'),
  Router: require('./routeRegister'),
  SessionStore: require('./sessionStore'),
  ViewParser: require('./viewParser'),
  WeChat: require('./wechat'),
  Internationalization: require('./i18n'),
  Mock: require('mockjs'),
  OrmMapping: require('./orm')
}
