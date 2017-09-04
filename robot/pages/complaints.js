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
var service = require('../service')

// var loginIFrameSelector = '#ui_ptlogin'

/* eslint-disable no-unused-vars */
var ComplaintDetail = require('./complaint-detail')
var utils = {
  orderStateMap: {
    1: '待认领',
    2: '处理中',
    3: '需后续跟进',
    4: '退单',
    5: '已处理',
    6: '已处理（已解决）',
    7: '已处理（未解决）'
  },
  dealStateMap: {
    1: '等待买家付款',
    2: '等待发货',
    3: '发货中',
    4: '退款中',
    5: '交易成功',
    6: '交易完成，已退款',
    7: '交易取消'
  },
  orderTypeMap: {
    1: '常规投诉',
    2: '活动投诉',
    3: '发票开具'
  },
  dealComment: {
    1: {
      comment: '充值已到账（月初）',
      remark: '亲爱的用户您好！经核实，您的充值已经成功。由于月初/末高峰时期，到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！'
    },
    2: {
      comment: '充值已到账（月中）',
      remark: '亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！'
    },
    3: {
      comment: '充值部分到账',
      remark: '亲爱的用户您好！经核实，您的充值已经成功。受充值面值影响存在分次到账，充值总金额与您提交的充值金额一致。若有疑问，可以与对应号码归属运营商客服核实缴费记录，感谢您对手机充值的支持！'
    },
    4: {
      comment: '充值失败（重新充值）',
      remark: '亲爱的用户您好，经核实，您的充值因运营商系统问题入账失败，现已经为您重新入账，短信有延迟或者漏发的情况，请您稍后拨打人工客服核实您的缴费记录，感谢您对手机充值的支持！'
    },
    5: {
      comment: '充值失败（可退款）',
      remark: '亲爱的用户您好，经核实，您的充值未成功，系统已为您转入退款，借记卡或钱包支付6小时内退款到微信-钱包，信用卡支付2-5个工作日退款到信用卡。微信版本5.3以下用户，建议您升级最新微信版本，以便退款尽快到帐，感谢您对手机充值的支持。 '
    },
    6: {
      comment: '充错号码（不可退款）',
      remark: '亲爱的用户您好，非常抱歉，经核实，您的充值已经成功，由于是系统自动充值，已经充值成功的订单无法做回退处理，因此，请您在充值前仔细核对您要充值的号码，以防出错，不便之处请您见谅，感谢您对手机充值的支持。'
    },
    7: {
      comment: '通用（新增）',
      remark: '亲爱的用户您好，收到您的问题反馈，问题已记录我们会通过电话回复的方式尽快与您联系，感谢您对手机充值的支持！'
    }
  },
  transformTimestamp: function (dateTime) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
    var newDate = new Date(1e3 * dateTime)
    return e ? newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
      : newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
  }
}

class Complaints {
  constructor (nm, eventEmitter) {
    var that = this
    that.rootNightmare = nm
    that.eventEmitter = eventEmitter
    var curConfig = Object.assign({}, config.nightmare)
    that.nightmare = new Nightmare(curConfig).on('console', function (type, msg) {
      console[type](msg)
    })
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
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto('http://chong.qq.com/pc/seller/index.html#/csList')
          .wait(1000)
          .then(function () {
            that.exec()
          })
      })
      .catch(function (err) {
        log.error('投诉订单监控中捕获到错误')
        log.error(err)
      })

    that.monitor.monit()
  }
  exec () {
    var that = this
    that.nightmare
      .evaluate(function () {
        return new Promise((resolve, reject) => {
          var personalOrders = []
          var timePicker = document.querySelector('#timepicker')
          var date = ''
          if (timePicker) {
            date = timePicker.value
          }
          console.log('本次查询时间：' + date)
          $.ajax({
            method: 'get',
            url: 'http://chong.qq.com/php/index.php',
            dataType: 'json',
            data: {
              d: 'provider',
              c: 'main',
              dc: 'kf_data',
              a: 'getKfList',
              kfType: '',
              orderType: '',
              emergency: '',
              orderDesc: '',
              orderState: '',
              personal: 0,
              searchStartTime: date,
              searchEndTime: '',
              searchIsp: '',
              searchProvince: '',
              searchSellerUin: '',
              searchOrderId: '',
              searchDealId: '',
              searchMobile: ''
            },
            success: function (data) {
              if (data.retCode === 0) {
                personalOrders = data.retMsg
                resolve([null, personalOrders])
              }
            },
            error: function (err) {
              resolve([err])
            }
          })
        })
      })
      .then(function (result) {
        let err = result[0]
        let personalOrders = result[1]
        if (err) {
          log.error('查询投诉订单过程中发生异常：')
          log.error(err)
          that.delayExec()
        } else {
          log.info('//========本次共获取到' + personalOrders.length + '条我的未处理投诉========//')
          log.info('//========查询时间：' + moment(that.monitor.update() || new Date()).format('YYYY-MM-DD HH:mm:ss') + '========//')
          if (personalOrders && personalOrders.length > 0) {
            let convertedOrders = []
            convertedOrders = personalOrders.map(order => {
              return {
                docmentsNo: order.orderId, // 单据号
                agentOrderNo: order.dealId, // 订单号
                feedback: order.orderDesc, // 问题类型
                phoneNo: order.dealMobile, // 联系方式
                coustomerRequest: order.orderRequire, // 处理方式（客户要求）
                complaintSources: order.orderFrom === 1 ? '用户' : '客服', // 投诉来源
                timeLength: parseInt((Date.now() / 1e3 - order.createTime) / 3600) + '小时', // 投诉时长
                times: order.orderCount, // 投诉次数
                satisfaction: order.star + '星', // 满意度
                record: order.transInfo // 流转信息
                // ------------------------//
                /* orderId: order.orderId,
                orderState: utils.orderStateMap(order.orderState), // 工单号
                createTime: utils.transformTimestamp(order.createTime), // 工单时间
                dealId: order.dealId, // 订单号
                dealMobile: order.dealMobile, // 手机号
                dealState: utils.dealStateMap[order.dealState], // 订单状态
                dealName: order.dealName, // 商品名称
                dealPaytime: order.dealPaytime, // 订单时间
                dealSelleruin: order.dealSelleruin, // 供应商
                orderType: utils.orderTypeMap[order.orderType], // 业务类型
                orderDesc: order.orderDesc, // 问题类型
                userMobile: order.userMobile, // 联系方式
                orderRequire: order.orderRequire // 需求说明 */
              }
            })
            store.complaints.exists(convertedOrders).then(function (notExistsOrders) {
              that.loopComplaintOrders(notExistsOrders)
            })
              .catch(function (err) {
                log.error('在检索投诉订单是否存在的过程中捕获到异常：')
                log.error(err)
              })
          } else {
            that.delayExec()
          }
        }
      })
  }
  delayExec () {
    let that = this
    setTimeout(function () {
      that.exec()
    }, config.worker.tickTime)
  }
  /**
   * 轮询新的投诉订单，查询其明细信息
   * @param {Array} orders 经过数据过滤后的新的投诉订单
   */
  loopComplaintOrders (orders) {
    var that = this
    // 定时器模拟打开新的投诉详情页面
    that.timer = setInterval(function () {
      that.monitor.update()
      if (orders && orders.length > 0) {
        let entry = orders.splice(0, 1)[0]
        log.info('//======解析到新的投诉订单======//')
        log.info(entry)
        entry.type = 1
        service.pushComplaint(entry).then(function (result) {
          log.info('//======解析到的投诉订单已经发送======//')
        })
          .catch(function (err) {
            log.error('//======解析到的投诉订单在保存数据库时发生错误======//')
            log.error(err)
          })
      } else {
        clearInterval(that.timer)
        that.delayExec()
      }
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
