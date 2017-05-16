/**
 * @author jiangfeng
 * @summary Redis存储服务配置,支持两种模式：local,cluster
 */
let session = require(('express-session'))
let RedisStore = require('connect-redis')(session)
let ioRedis = require('ioredis')
let AppConfig = require('./App/AppConfig')

let storeConfig = AppConfig.runtime[AppConfig.runtime.session.store]
let sessionMode = AppConfig.runtime.session.mode
let store
if (sessionMode === 'cluster') {
  store = new RedisStore({
    logErrors: true,
    prefix: AppConfig.runtime.session.prefix,
    unset: 'destroy',
    client: new ioRedis.Cluster(storeConfig.cluster)
  })
} else {
  store = new RedisStore({
    host: storeConfig.local.host,
    port: storeConfig.local.port,
    pass: storeConfig.local.pass,
    logErrors: true,
    prefix: AppConfig.runtime.session.prefix,
    unset: 'destroy'
  })
}

module.exports = store
