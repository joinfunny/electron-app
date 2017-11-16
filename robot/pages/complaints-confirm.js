/**
 * 认领投诉订单
 */
var Nightmare = require('nightmare')
var moment = require('moment')
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaintsConfirm
var Monitor = require('../monitor')
var path = require('path')

class ComplaintsConfirm {
  constructor (nm, eventEmitter) {
    var that = this
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    var curConfig = Object.assign({}, config.nightmare)
    that.nightmare = new Nightmare(curConfig).on('console', function (type, msg) {
      console[type]('evalute log:')
      console[type](msg)
    })
    that.monitor = new Monitor({
      tickTime: config.monitor.tickTime,
      title: '投诉订单认领服务异常',
      msg: '投诉订单认领服务已经很长时间没有抓取数据，当前服务将会重启...',
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
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto('http://chong.qq.com/pc/seller/v2/index.html#/csList')
          .wait(1000)
          .then(function () {
            that.waitPageLoaded().then(function () {
              that.exec()
            })
          })
      })
      .catch(function (err) {
        log.error('投诉订单监控中捕获到错误')
        log.error(err)
      })

    that.monitor.monit()
  }
  waitPageLoaded () {
    var that = this
    return that.nightmare.wait(2000).wait('#header div.uc-name').then(function () {
      log.info('进入页面...')
    }).catch(ex => {
      log.warn('正在等待进入页面...')
      return that.waitPageLoaded()
    })
  }
  exec () {
    var that = this
    if (!that.nightmare) return
    that.nightmare
      .inject('js', 'robot/inject/jquery.js')
      .evaluate(function (maxConfirm, env) {
        return new Promise((resolve, reject) => {
          function two (time) {
            time = '' + time
            if (time.length === 1) {
              time = '0' + time
            }
            return time
          }
          var curDate = new Date()
          var endDate = new Date(curDate * 1 + 1000 * 60 * 60 * 24 * 1)
          endDate = endDate.getFullYear() + '-' + two((endDate.getMonth() + 1)) + '-' + two(endDate.getDate())
          var startDate = new Date(curDate * 1 - 1000 * 60 * 60 * 24 * 7)
          startDate = startDate.getFullYear() + '-' + two((startDate.getMonth() + 1)) + '-' + two(startDate.getDate())
          console.log('本次查询时间：' + startDate + ' 至 ' + endDate)

          $.ajax({
            method: 'get',
            url: 'http://chong.qq.com/php/index.php',
            dataType: 'json',
            data: {
              d: 'providerV3',
              c: 'main',
              dc: 'kf_data',
              a: 'getKfList',
              kfType: '',
              orderType: '',
              emergency: '',
              orderDesc: '',
              orderState: 1,
              personal: '',
              searchStartTime: startDate,
              searchEndTime: endDate,
              searchIsp: '',
              searchProvince: '',
              searchSellerUin: '',
              searchOrderId: '',
              searchDealId: '',
              searchMobile: ''
            },
            success: function (data) {
              // console.log(data)
              // 不管获取成功与否，都resolve出去信息
              if (data.retCode === 0) {
                var orders = data.retMsg

                if (orders && orders.length > 0) {
                  orders = orders.splice(0, maxConfirm)

                  for (var i = 0; i < orders.length; i++) {
                    orders[i] = orders[i].orderId
                  }

                  var orderList = JSON.stringify({
                    orderList: orders.join('|')
                  })
                  console.log(orderList)
                  if (env.indexOf('production') == -1) {
                    console.log('当前出于非生产环境，不可认领，模拟返回为已认领')
                    resolve([null, 1])
                    return
                  }
                  // 认领投诉订单
                  // 最终如果没有查询到任何待认领的投诉订单，则返回null
                  $.ajax({
                    url: 'http://chong.qq.com/php/index.php?d=providerV3&c=main&dc=kf_data&a=batchReceiveOrder',
                    method: 'post',
                    data: orderList,
                    dataType: 'json',
                    contentType: 'application/json;charset=UTF-8',
                    success: function (data) {
                      // console.log(data)
                      if (data && data.retCode === 0) {
                        resolve([null, data.retMsg.success])
                      } else {
                        resolve([data])
                      }
                    },
                    error: function (err) {
                      resolve([err])
                    }
                  })
                } else {
                  resolve([null, 0])
                }
              } else {
                resolve([data])
              }
            },
            error: function (err) {
              resolve([err])
            }
          })
        })
      }, config.maxConfirm, process.env.NODE_ENV)
      .then((data) => {
        var err = data[0]
        var result = data[1]
        log.info('认领时间：' + moment(that.monitor.update() || new Date()).format('YYYY-MM-DD HH:mm:ss'))
        if (!err && result > 0) {
          log.info('本次共认领' + result + '条投诉订单')
        } else {
          if (err) {
            log.warn('认领过程中发生错误' + err)
            log.warn(err)
            // 一旦发生错误就重新登陆
            that.loginExpired()
            return
          }
          if (result && result === 0) {
            log.warn('没有需要认领的投诉订单')
          }
        }
        that.delayExec()
      })
      .catch(ex => {
        log.error('认领过程中发生异常：' + ex)
        that.delayExec()
      })
  }
  delayExec () {
    let that = this
    setTimeout(function () {
      that.exec()
    }, config.worker.tickTime)
  }
  loginExpired () {
    var that = this
    that.dispose(function () {
      that.eventEmitter.emit('login-expired', process.env.NODE_SERVICE)
    })
  }
  dispose (cb) {
    var that = this
    that.monitor.dispose()
    that.nightmare
      .end()
      .then(function () {
        log.info('//======投诉订单认领窗口已销毁======//')
        that.nightmare = null
        cb && cb()
      })
  }
}
module.exports = ComplaintsConfirm
