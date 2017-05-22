var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.exceptionOrder
var service = require('../service')
var path = require('path')

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
    this.rootNightmare = nm
    this.eventEmitter = eventEmitter
  }
  run () {
    var that = this
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.init(cookies)
      })
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
              if (url.indexOf('php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=3&time_begin=&time_end=&dealType=0') > -1) {
                that.monitor()
              } else if (url.indexOf('php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
                that.nightmare.end().run(function () {
                  log.warn('//--------------------【异常订单统计数监控】用户过期，需要重新登录----------------//')
                  that.eventEmitter.emit('login-expired', that)
                })
              }
            })
        })
        .goto('http://chong.qq.com/')
        .cookies
        .set(cookies)
        .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=3&time_begin=&time_end=&dealType=0&r=' + new Date() * 1)
        .run(function () {
          log.info('已进入异常订单统计数监听页面')
          that.timeTick()
        })
    }
  }
  timeTick () {
    var that = this
    setInterval(function () {
      that.nightmare
        .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=3&time_begin=&time_end=&dealType=0&r=' + new Date() * 1)
        .run(function () {
          log.info('已刷新异常订单统计数监听页面')
        })
    }, config.worker.tickTime)
  }
  monitor () {
    var that = this
    that.nightmare
      .wait('.ui-page-cont')
      .evaluate(function () {
        var pager = document.querySelector('.ui-page-cont')
        var lastPage = pager.lastElementChild
        console.log(lastPage.innerText)
        if (lastPage.innerText === '尾页') {
          return 'http://chong.qq.com' + lastPage.getAttribute('href')
        } else {
          return ''
        }
      })
      .then(function (url) {
        log.info(url)
        if (!url) return
        var countTotal = +_queryString('page', url)
        service.pushExceptionOrders(countTotal * 20)
      })
  }
}

module.exports = ExceptionOrder
