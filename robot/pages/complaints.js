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
module.exports = {
  nightmare: null,
  run: function (nm) {
    var that = this
    this.nightmare = new Nightmare(config.nightmare)
    nm
      .cookies
      .get()
      .then(function (cookies) {
        that.nightmare
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getCaseList')
          .then(function () {
            log.info('//=========进入投诉处理主页面=========//')
            that.exec()
          })
      })
  },
  exec: function () {
    var that = this
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
        log.info(JSON.stringify(links, null, 2))
        log.info('//========本次共获取到' + links.length + '条投诉处理========//')
        store.complaints.exists(links).then(function (notExistsLinks) {
          that.loopComplaintDetail(notExistsLinks)
        })
      })
  },
  /**
   * 轮询新的投诉订单，查询其明细信息
   * @param {Array} links 经过数据过滤后的新的投诉订单
   */
  loopComplaintDetail: function (links) {
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
            let complaintDetail = new ComplaintDetail(cookies, link)
            complaintDetail.run()
          })
      } else {
        clearInterval(timer)
        that.next()
      }
    }, 2000)
  },
  /**
   * 轮询整个类别区域下的所有LI，获取是否有数据
   * 如果有数据。则点击跳转到对应的类别下
   * 没有的话，会定位到第一个类别，然后点击
   */
  next: function () {
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
        next.firstChild.click()
      })
      .wait(2000)
      .wait('#frm>div:nth-child(7)>ul>li>a.on')
      .then(function () {
        that.exec()
      })
  }
}
