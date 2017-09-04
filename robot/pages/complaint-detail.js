var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaints
var service = require('../service')

class ComplaintDetail {
  constructor (nm, link, eventEmitter, handle) {
    var that = this
    that.rootNightmare = nm
    that.link = link
    that.handle = handle
    that.eventEmitter = eventEmitter
    that.nightmare = new Nightmare(config.nightmare)
      .on('console', function (type, msg) {
        log[type]('evaluate log :' + msg)
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

          $.ajax({
            method: 'get',
            url: 'http://chong.qq.com/php/index.php',
            data: {
              d: 'provider',
              c: 'main',
              dc: 'kf_data',
              a: 'commitKfOrder',
              comment: handle.coustomerRequest,
              remark: dealComment[handle.coustomerRequest],
              orderId: handle.orderId
            },
            dataType: 'json',
            success: function (data) {
              console.log(data)
              if (data.retCode === 0) {
                resolve([null, data.retMsg])
              } else {
                resolve([data])
              }
            },
            error: function (data) {
              resolve([data])
            }
          })
        })
      }, that.link, that.handle, process.env.NODE_ENV)
      .then((error, data) => {
        if (!error) {
          service.handledComplaint(that.handle, true).then(function () {
            log.info(that.handle)
            log.info('//======【投诉订单处理监控】请求发生异常，窗口已关闭======//')
          })
          that.nightmare.end().then(function () {
            that.dispose()
          })
        }
      })
      .catch(ex => {
        service.handledComplaint(that.handle, false).then(function () {
          log.info(that.handle)
          log.info('//======【投诉订单处理监控】请求发生异常，窗口已关闭======//')
        })
        that.nightmare.end().then(function () {
          that.dispose()
        })
      })
  }
  dispose () {
    var that = this
    that.cookies = null
    that.nightmare = null
  }
}

module.exports = ComplaintDetail
