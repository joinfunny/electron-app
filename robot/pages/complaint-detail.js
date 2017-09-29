var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaints
var service = require('../service')

class ComplaintDetail {
  constructor (nm, link, eventEmitter, handle, instanceId) {
    var that = this
    that.instanceId = instanceId
    that.rootNightmare = nm
    that.link = link
    that.handle = handle
    that.eventEmitter = eventEmitter
    that.nightmare = new Nightmare(config.nightmare)
      .on('console', function (type, msg) {
        log.info('evaluate log :')
        log.info(msg)
      })
  }

  run () {
    let that = this
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.nightmare
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto('http://chong.qq.com/pc/seller/index.html#/csList')
          .then(function () {
            that.exec()
          })
          .catch(function (err) {
            log.error('投诉订单处理时捕获到异常：')
            log.error(err)
            that.handleFailure()
          })
      })
      .catch(function (err) {
        log.error('获取Cookie时捕获到异常：')
        log.error(err)
      })
  }
  exec () {
    var that = this
    that.nightmare
      .evaluate(function (link, handle, env) {
        return new Promise((resolve, reject) => {
          var dealComment = {
            '充值已到账（月初）': '亲爱的用户您好！经核实，您的充值已经成功。由于月初/末高峰时期，到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！',
            '充值已到账（月中）': '亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！',
            '充值部分到账': '亲爱的用户您好！经核实，您的充值已经成功。受充值面值影响存在分次到账，充值总金额与您提交的充值金额一致。若有疑问，可以与对应号码归属运营商客服核实缴费记录，感谢您对手机充值的支持！',
            '充值失败（重新充值）': '亲爱的用户您好，经核实，您的充值因运营商系统问题入账失败，现已经为您重新入账，短信有延迟或者漏发的情况，请您稍后拨打人工客服核实您的缴费记录，感谢您对手机充值的支持！',
            '充值失败（可退款）': '亲爱的用户您好，经核实，您的充值未成功，系统已为您转入退款，借记卡或钱包支付6小时内退款到微信-钱包，信用卡支付2-5个工作日退款到信用卡。微信版本5.3以下用户，建议您升级最新微信版本，以便退款尽快到帐，感谢您对手机充值的支持。 ',
            '充错号码（不可退款）': '亲爱的用户您好，非常抱歉，经核实，您的充值已经成功，由于是系统自动充值，已经充值成功的订单无法做回退处理，因此，请您在充值前仔细核对您要充值的号码，以防出错，不便之处请您见谅，感谢您对手机充值的支持。',
            '通用（新增）': '亲爱的用户您好，收到您的问题反馈，问题已记录我们会通过电话回复的方式尽快与您联系，感谢您对手机充值的支持！'
          }
          // 开发环境直接返回待操作的数量，不真正执行
          var data = []
          data.push('d=provider')
          data.push('c=main')
          data.push('dc=kf_data')
          data.push('a=commitKfOrder')
          data.push('comment=' + encodeURIComponent(handle.coustomerRequest || ''))
          data.push('remark=' + encodeURIComponent(dealComment[handle.coustomerRequest] || ''))
          data.push('orderId=' + handle.docmentsNo)

          console.log('待发送请求投诉订单：' + handle.docmentsNo + '，处理意见：' + handle.coustomerRequest)

          $.ajax({
            method: 'get',
            url: link.url,
            dataType: 'json',
            success: function (result) {
              if (result && result.retCode !== 0) {
                return resolve([result])
              }
              var orderDetail = result.retMsg[0]
              // 如果是非生产环境，则直接返回操作成功的标记
              if (env.indexOf('production') === -1) {
                console.log('非生产环境，模拟操作成功')
                return resolve([null, orderDetail])
              }
              var state = +orderDetail.orderState
              if (state > 2) {
                console.log('当前投诉订单‘' + handle.docmentsNo + '’状态不是处理中，为：' + orderDetail.orderState + '，自动判定不需要处理此订单')
                return resolve([null, orderDetail])
              }
              $.ajax({
                method: 'get',
                url: 'http://chong.qq.com/php/index.php?' + data.join('&'),
                dataType: 'json',
                success: function (data) {
                  console.log('数据操作成功：')
                  console.log(data)
                  if (data.retCode === 0) {
                    resolve([null, orderDetail])
                  } else {
                    resolve([data])
                  }
                },
                error: function (data) {
                  console.log('数据操作失败：')
                  console.log(data)
                  resolve([data])
                }
              })
            },
            error: function (data) {
              console.log('数据操作失败：')
              console.log(data)
              resolve([data])
            }
          })
        })
      }, that.link, that.handle, process.env.NODE_ENV)
      .then((result) => {
        // log.info('----result-----')
        // log.info(result)
        let error = result[0]
        let order = result[1]
        if (!error) {
          that.handle.complaintSources = order.orderFrom === 1 ? '用户' : '客服' // 投诉来源
          that.handle.timeLength = parseInt((Date.now() / 1e3 - order.createTime) / 3600) + '小时' // 投诉时长
          that.handle.times = order.orderCount // 投诉次数
          that.handle.satisfaction = order.star + '星' // 满意度
          that.handle.record = order.transInfo // 流转信息
          that.handleSuccess()
        } else {
          that.handleFailure(function () {
            that.loginExpired()
          })
        }
      })
      .catch(ex => {
        log.error('投诉订单处理过程中发生异常：')
        log.error(ex)
        that.handleFailure()
      })
  }
  handleSuccess () {
    var that = this
    service.handledComplaint(that.handle, true).then(function () {
      log.info(that.handle)
      that.nightmare.end().then(function () {
        that.dispose()
        log.info('//======异步提交投诉处理信息成功，资源已释放，窗口已关闭======//')
      })
    }).catch(function (err) {
      log.error('投诉处理成功后关闭窗口时捕获到异常：')
      log.error(err)
    })
  }
  handleFailure (cb) {
    var that = this
    service.handledComplaint(that.handle, false).then(function () {
      log.info(that.handle)
      log.info('//======异步提交投诉处理信息失败，窗口已关闭======//')
      that.nightmare.end().then(function () {
        that.dispose()
        cb && cb()
      }).catch(function (err) {
        log.error('投诉处理失败后关闭窗口时捕获到异常：')
        log.error(err)
      })
    })
  }
  loginExpired () {
    this.eventEmitter.emit('detail-login-expired', this)
  }
  dispose () {
    var that = this
    that.cookies = null
    that.nightmare = null
  }
}

module.exports = ComplaintDetail
