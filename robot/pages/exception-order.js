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
          .then(function () {
            that.monitor()
          })
      })
  }
  init (cookies) {
    var that = this
    if (!that.nightmare) {
      that.nightmare = new Nightmare(config.nightmare)
        .on('did-finish-load', function () {
          log.info('did-finish-load')
          return that.nightmare
            .url()
            .then(function (currentUrl) {
              if (currentUrl.indexOf('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
                log.warn('//--------------------【异常订单统计数量监控】用户过期，需要重新登录----------------//')
                return that.nightmare.end().then(function () {
                  that.nightmare = null
                  that.eventEmitter.emit('login-expired', that)
                })
              }
              return true
            })
        })
        .on('console', function (type, msg) {
          console[type]('evaluate :' + msg)
        })
      that.nightmare
        .goto('http://chong.qq.com/')
        .cookies
        .set(cookies)
        .then(function () {
          log.info('初始化异常订单监听窗口')
        })
    }
    return that.nightmare
  }
  monitor () {
    var that = this
    setInterval(function () {
      that.nightmare
        .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=3&time_begin=&time_end=&dealType=0&r=' + new Date() * 1)
        .wait('.ui-page-cont')
        .run(function () {
        })
        .then(function () {
          that.nightmare.evaluate(function () {
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
        })
    }, config.worker.tickTime)
  }
}

module.exports = ExceptionOrder
