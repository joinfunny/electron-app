/**
 * 处理订单
 */
var Nightmare = require('nightmare')
var Runtime = require('../../runtime')
var async = require('async')
var store = require('../store')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaints

/* eslint-disable no-unused-vars */
var ComplaintDetail = require('./complaint-detail')

class Complaints {
  constructor (nm, eventEmitter) {
    var that = this
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    var curConfig = Object.assign({}, config.nightmare)
    // curConfig.parent = that.rootNightmare
    that.nightmare = new Nightmare(curConfig)
    this.eventEmitter = eventEmitter
    return this
  }
  run () {
    var that = this
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.nightmare
          .on('did-finish-load', function () {
            that.nightmare
              .url()
              .then(function (url) {
                if (url.indexOf('php/index.php?d=seller&c=seller&m=getCaseList') > -1) {
                  that.exec()
                } else if (url.indexOf('php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
                  log.warn('//--------------------【投诉订单监控】用户过期，需要重新登录----------------//')
                  that.dispose(function () {
                    that.eventEmitter.emit('login-expired', that)
                  })
                }
              })
          })
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseList')
          .run(function () {
            console.log('进入投诉订单查询页面')
          })
      })
  }
  exec () {
    var that = this
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
        // log.info(JSON.stringify(links, null, 2))
        log.info('//========本次共获取到' + links.length + '条投诉处理========//')
        if (links && links.length > 0) {
          store.complaints.exists(links).then(function (notExistsLinks) {
            that.loopComplaintDetail(notExistsLinks)
          })
        } else {
          that.next()
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
    var timer = setInterval(function () {
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
          })
      } else {
        clearInterval(timer)
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
    that.nightmare
      .evaluate(function () {
        var currentLink = document.querySelector('#frm>div:nth-child(7)>ul>li>a.on')
        var current = currentLink.parentNode
        var next = null

        while (!next) {
          next = current.nextElementSibling
          if (!next) {
            next = document.querySelector('#frm>div:nth-child(7)>ul>li:nth-child(2)')
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
        return that.nightmare.goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseList&filter=&reply=&path=' + filterResult.type + '&status=20&searchCnt=&searchBy=mobile')
        .run(function () {})
      })
  }
  dispose (cb) {
    var that = this
    that.nightmare
      .end()
      .then(function () {
        log.info('//======投诉订单窗口已销毁======//')
        that.nightmare = null
        cb && cb()
      })
  }
}
module.exports = Complaints
