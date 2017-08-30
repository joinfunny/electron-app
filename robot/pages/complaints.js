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

// var loginIFrameSelector = '#ui_ptlogin'

/* eslint-disable no-unused-vars */
var ComplaintDetail = require('./complaint-detail')

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
      .wait(1000)
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
                resolve(personalOrders)
              }
            }
          })
        })
      })
      /*
      {
        "sign": "c0e4fdcaac9c2aa004298df9b7de5322",
        "phoneNo": "15117828505",dealMobile
        "feedback": "流量未到账",orderDesc
        "agentOrderNo": "3984000951201707159050973562",
        "docmentsNo": "17071605473682142039",orderId
        "coustomerRequest": "充值已到账（月中）"
      }
      {
        beforeKfNumber:"",
        createTime:"1504060517",
        dealArea:"江苏",
        dealId:"3171000971201708089716250866",
        dealMobile:"15061389326",
        dealName:"江苏中国移动50元-微信",
        dealPayfee:"4995",
        dealPaytime:"1502159575",
        dealSelleruin:"2919415063",
        dealState:"5",
        dealSupplier:"1",
        dealType:"1",
        endTime:"1503806703",
        kfNumber:"1992646281",
        kfType:"3",
        orderCount:"7",
        orderDesc:"充值未到账",
        orderFrom:"1",
        orderId:"988323",
        orderRequire:"尽快到账",
        orderState:"1",
        orderType:"1",
        picUrl:"",
        remarks:"亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！",
        star:"0",
        transInfo:"用户投诉; 客服工号3161624341认领了工单; 客服工号3161624341归档了工单,给用户触达＂亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！＂; 客服工号3161624341认领了工单; 客服工号3161624341归档了工单,给用户触达＂亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！＂; 客服工号3161624341认领了工单; 客服工号3161624341归档了工单,给用户触达＂亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！＂; 客服工号3161624341认领了工单; 客服工号3161624341归档了工单,给用户触达＂亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！＂; 客服工号3161624341认领了工单; 客服工号3161624341归档了工单,给用户触达＂亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！＂; 客服工号1992646281认领了工单; 客服工号1992646281归档了工单,给用户触达＂亲爱的用户您好，经核实，您的充值已经成功。到账短信有延迟或者漏发的情况，建议您可拨打运营商人工客服或者登陆网上营业厅核实您的缴费记录，感谢您对手机充值的支持！＂;",
        urgency:"0",
        userFeedback:"",
        userMobile:"15061389326",
        userType:"101",
        userUid:"wx47031447c8352579#oSJNeuFULaxbZuZh13Ctwt8fKQH8",
        version:"20170524"
      }
      */
      .then(function (personalOrders) {
        log.info('//========本次共获取到' + personalOrders.length + '条我的未处理投诉========//')
        log.info('//========捕获时间：' + moment(that.monitor.update() || new Date()).format('YYYY-MM-DD HH:mm:ss') + '========//')
        if (personalOrders && personalOrders.length > 0) {
          let links = []
          personalOrders.map(order => {
            return {
              feedback: order.orderDesc,
              phoneNo: order.dealMobile,
              agentOrderNo: order.dealId,
              docmentsNo: order.orderId
            }
          })
          store.complaints.exists(links).then(function (notExistsLinks) {
            that.loopComplaintDetail(notExistsLinks)
          })
            .catch(function (err) {
              log.error('在检索投诉订单是否存在的过程中捕获到异常：')
              log.error(err)
            })
        } else {
          setTimeout(function () {
            that.exec()
          }, config.worker.tickTime)
        }
      })
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
