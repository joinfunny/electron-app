var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.exceptionOrder
var service = require('../service')
var Monitor = require('../monitor')

function _queryString (query, url, undecode, isHash) {
  var search, index
  index = url.indexOf(isHash ? '#' : '?')
  if (index < 0) {
    return null
  }
  search = '&' + url.slice(index + 1)

  return search && new RegExp('&' + query + '=([^&#]*)').test(search)
    ? undecode ? RegExp.$1 : unescape(RegExp.$1)
    : null
}

class ExceptionOrder {
  constructor (nm, eventEmitter) {
    var that = this
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    that.monitor = new Monitor({
      tickTime: config.monitor.tickTime,
      title: '已发货订单统计服务异常',
      msg: '已发货订单统计已经很长时间没有抓取数据，当前服务将会重启...',
      callback: () => {
        that.loginExpired()
      }
    })
  }
  run () {
    var that = this
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.init(cookies)
      })
      .catch(function (err) {
        log.error(err)
      })
    that.monitor.monit()
  }
  init (cookies) {
    var that = this
    if (!that.nightmare) {
      that.nightmare = new Nightmare(config.nightmare)
        .on('console', function (type, msg) {
          console[type]('evaluate log :' + msg)
        })
        .on('did-finish-load', function () {
          that.nightmare
            .url()
            .then(function (url) {
              log.info('//--------------------【异常订单统计数监控】URL---------------//')
              log.info(url)
              if (url === 'http://chong.qq.com/') {
                that.nightmare
                  .cookies.set(cookies)
                  .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=2&time_begin=&time_end=&dealType=0&r=' + new Date() * 1)
                  .then(function () {
                    log.info('已进入异常订单统计数监听页面')
                    that.timeTick()
                  })
              } else if (url.indexOf('php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=2&time_begin=&time_end=&dealType=0') > -1) {
                that.capture()
              } else if (url.indexOf('php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
                that.loginExpired()
              } else {
                that.errorReset()
              }
            })
            .catch(function (err) {
              log.error(err)
            })
        })
        .goto('http://chong.qq.com/')
        .run(function () {
          log.info('进入充值首页')
        })
    }
  }
  timeTick () {
    var that = this
    that.timer = setInterval(function () {
      that.nightmare
        .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=2&time_begin=&time_end=&dealType=0&r=' + new Date() * 1)
        .then(function () {
          log.info('已刷新异常订单统计数监听页面')
        })
        .catch(function (err) {
          log.err(err)
        })
    }, config.worker.tickTime)
  }
  capture () {
    var that = this
    that.nightmare
      .wait('.ui-page-cont')
      .evaluate(function () {
        var pager = document.querySelector('.ui-page-cont')
        if (pager.children.length > 0) {
          var lastPage = pager.lastElementChild
          console.log(lastPage.innerText)
          return 'http://chong.qq.com' + lastPage.getAttribute('href')
        } else {
          return 1
        }
      })
      .then(function (url) {
        log.info(url)
        if (!url) return
        // 服务触发时间更新
        that.monitor.update()
        var countTotal = url !== 1 ? +_queryString('page', '' + url) : 1
        service.pushExceptionOrders(countTotal)
      })
      .catch(function (err) {
        log.error(err)
      })
  }
  loginExpired () {
    var that = this
    that.nightmare.end().run(function () {
      if (that.timer) {
        clearInterval(that.timer)
        that.timer = null
      }
      that.monitor.dispose()
      log.warn('//--------------------【异常订单统计数监控】用户过期，需要重新登录----------------//')
      that.eventEmitter.emit('login-expired', process.env.NODE_SERVICE)
    })
  }
  errorReset () {
    var that = this
    log.warn('//--------------------【异常订单统计数监控】请求返回发生错误，重新发起----------------//')
    if (that.timer) {
      clearInterval(that.timer)
      that.timer = null
    }
    that.monitor.update()
    that.nightmare
      .goto('http://chong.qq.com/')
      .run(function () {
        log.info('再次进入充值首页')
      })
  }
}

module.exports = ExceptionOrder
