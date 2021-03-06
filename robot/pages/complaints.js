/**
 * 处理订单
 */
var Nightmare = require('nightmare')
var moment = require('moment')
var Runtime = require('../../runtime')
var store = require('../store')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaints
var Monitor = require('../monitor')

var loginIFrameSelector = '#ui_ptlogin'

/* eslint-disable no-unused-vars */
var ComplaintDetail = require('./complaint-detail')

class Complaints {
  constructor (nm, eventEmitter) {
    var that = this
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    var curConfig = Object.assign({}, config.nightmare)
    that.nightmare = new Nightmare(curConfig)
    that.monitor = new Monitor({
      tickTime: config.monitor.tickTime,
      title: '投诉订单抓取服务异常',
      msg: '投诉订单抓取服务已经很长时间没有抓取数据，当前服务将会重启...',
      callback: () => {
        that.loginExpired()
      }
    })
    return this
  }
  run () {
    var that = this
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.nightmare
          .goto('http://chong.qq.com/pc/seller/index.html#/csList')
          .wait(2000)
          .exists(loginIFrameSelector)
          .then((hasLogin) => {
            if (hasLogin) {
              that.exec()
            } else {
              that.loginExpired()
            }
          })
          .run(function () {
            log.info('进入充值首页')
          })
      })
      .catch(function (err) {
        log.error('投诉订单监控中捕获到错误')
        log.error(err)
      })

    that.monitor.monit()
  }
  loginExpired () {
    var that = this
    that.dispose(function () {
      that.eventEmitter.emit('login-expired', process.env.NODE_SERVICE)
    })
  }
  exec () {
    var that = this
    console.log('execed .....')
    if (!!0 === true) return
    if (!that.nightmare) return
    return that.nightmare
      .evaluate(function () {
        var error = document.querySelector('body>div.table-cont.p-t-20.b-t-white>div.error-tips')
        var links = []
        if (!error) {
          var tbody = document.querySelector('body>div.table-cont.p-t-20.b-t-white>table>tbody')
          var trs = tbody.querySelectorAll('tr')
          trs.forEach(function (tr) {
            var a = tr.querySelector('td:nth-child(1)>a')
            if (a) {
              links.push({
                docmentsNo: a.innerText,
                url: 'http://chong.qq.com/php/' + a.getAttribute('href')
              })
            }
          })
        }
        return links
      })
      .then(function (links) {
        log.info('//========本次共获取到' + links.length + '条投诉订单========//')

        log.info('//========捕获时间：' + moment(that.monitor.update() || new Date()).format('YYYY-MM-DD HH:mm:ss') + '========//')
        if (links && links.length > 0) {
          store.complaints.exists(links).then(function (notExistsLinks) {
            that.loopComplaintDetail(notExistsLinks)
          })
            .catch(function (err) {
              log.error('在检索投诉订单是否存在的过程中捕获到异常：')
              log.error(err)
            })
        } else {
          setTimeout(function () {
            that.next()
          }, config.worker.tickTime)
        }
      })
  }
  /**
   * 轮询新的投诉订单，查询其明细信息
   * @param {Array} links 经过数据过滤后的新的投诉订单
   */
  loopComplaintDetail (links) {
    var that = this
    // 定时器模拟打开新的投诉详情页面
    that.timer = setInterval(function () {
      if (links && links.length > 0) {
        let link = links.splice(0, 1)[0]
        that.nightmare
          .cookies
          .get()
          .then(function (cookies) {
            log.info('//======获取到的投诉处理地址：======//')
            log.info(link)
            let complaintDetail = new ComplaintDetail(that.rootNightmare, link, that.eventEmitter)
            complaintDetail.run()
            that.monitor.update()
          })
          .catch(function (err) {
            log.error('在打开投诉订单详情页面时捕获到异常：')
            log.error(err)
          })
      } else {
        clearInterval(that.timer)
        that.next()
      }
    }, config.worker.tickTime)
  }
  /**
   * 轮询整个类别区域下的所有LI，获取是否有数据
   * 如果有数据。则点击跳转到对应的类别下
   * 没有的话，会定位到第一个类别，然后点击
   */
  next () {
    var that = this
    if (!that.nightmare) {
      log.warn('当前窗口已销毁')
      return
    }
    that.nightmare
      .evaluate(function () {
        var currentLink = document.querySelector('#frm>div:nth-child(7)>ul>li>a.on')
        var current = currentLink.parentNode
        var next = null
        var first = document.querySelector('#frm>div:nth-child(7)>ul>li:nth-child(2)')
        while (!next) {
          next = current.nextElementSibling

          if (!next) {
            next = first
            break
          }

          var text = next.innerText

          if (/^.*\(([0-9]+)\)/.test(text) && +RegExp.$1 === 0) {
            current = next
            next = null
          } else {
            console.log('//======捕获到新的投诉订单=====//')
            console.log(text)
          }
        }
        return {
          type: next.firstChild.getAttribute('data-filter'),
          text: next.innerText
        }
      })
      .then(function (filterResult) {
        log.info(JSON.stringify(filterResult))
        return that.nightmare
          .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseList&filter=&reply=&path=' + filterResult.type + '&status=20&searchCnt=&searchBy=mobile&r=' + new Date() * 1)
          .run(function () {
            that.monitor.update()
          })
      })
      .catch(function (err) {
        log.error('在打开投诉订单类别页面时捕获到异常：')
        log.error(err)
      })
  }
  dispose (cb) {
    var that = this
    if (that.timer) {
      clearInterval(that.timer)
      that.timer = null
    }

    that.monitor.dispose()

    that.nightmare
      .end()
      .then(function () {
        log.info('//======投诉订单窗口已销毁======//')
        that.nightmare = null
        cb && cb()
      })
      .catch(function (err) {
        log.error('在投诉订单服务销毁时捕获到异常：')
        log.error(err)
      })
  }
}
module.exports = Complaints
