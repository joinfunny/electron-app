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
        log.info('evaluate log :' + msg)
        // 修改这几个消息时，一定要注意下面代码中的对应的消息。否则会接受不到正确的指令
        if (msg === '//======异步提交投诉处理信息成功======//') {
          service.handledComplaint(that.handle, true).then(function () {
            that.nightmare.end().then(function () {
              log.info('//======解析到的投诉处理已经操作完毕，窗口已关闭======//')
              that.dispose()
            })
          })
        } else if (msg === '//======异步提交投诉处理信息失败======//') {
          service.handledComplaint(that.handle, false).then(function () {
            that.nightmare.end().then(function () {
              log.info('//======解析到的投诉处理已经操作完毕，窗口已关闭======//')
              that.dispose()
            })
          })
        } else if (msg === '//======当前投诉处理已经经过处理======//') {
          that.nightmare.end().then(function () {
            log.info('//======解析到的投诉处理已经操作完毕，窗口已关闭======//')
            that.dispose()
          })
        }
      })
      .on('did-finish-load', function () {
        log.info('did-finish-load')
        that.nightmare
          .url()
          .then(function (url) {
            if (url.indexOf('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
              log.warn('//--------------------【投诉订单详情监控】用户过期，需要重新登录----------------//')
              that.nightmare.end().then(function () {
                that.nightmare = null
                that.eventEmitter.emit('detail-login-expired', that)
              })
            } else if (url.indexOf('php/index.php?d=seller&c=seller&m=getCaseDetail') > -1) {
              that.exec()
            }
          })
      })
  }

  run () {
    let that = this
    let url = that.link.url
    that.rootNightmare
      .cookies
      .get()
      .then(function (cookies) {
        that.nightmare
          .goto('http://chong.qq.com/')
          .cookies.set(cookies)
          .goto(url)
          .then(function () {
            log.info('//======正在打开投诉订单 ' + that.link.docmentsNo + '的处理窗口...======//')
          })
      })
  }
  exec () {
    var that = this
    that.nightmare
      .wait('#intro_id>div')
      .then(function () {
        if (that.handle) {
          that.doHandle()
        } else {
          that.doDetail()
        }
      })
  }

  doHandle () {
    let that = this
    log.info('//======处理投诉订单【开始】======//')
    that.nightmare
      .evaluate(function (coustomerRequest, env) {
        console.log('//======当前运行的环境变量：' + env + '======//')
        var btnSubmit = document.querySelector('#btnSubmit')
        // 如果存在归档按钮，则继续执行
        if (!btnSubmit) {
          console.log('//======当前投诉处理已经经过处理======//')
          return
        }
        console.log(coustomerRequest)
        var requestMapping = {
          '充值已到账（月初）': 1,
          '充值已到账（月中）': 2,
          '充值部分到账': 3,
          '充值失败（重新充值）': 4,
          '充值失败（可退款）': 5,
          '充错号码（不可退款）': 6,
          '通用': 7
        }
        var label = document.querySelector('#replyArea>label:nth-child(' + requestMapping[coustomerRequest] + ')')
        if (label) {
          label.click()
          console.log($('#submitFrm').serialize())
          if (env === 'production') {
            $.ajax({
              type: 'POST',
              url: 'index.php?d=seller&c=seller&m=submitCase',
              data: $('#submitFrm').serialize(),
              success: function (data) {
                var data = eval('(' + data + ')')

                if (data.ret == '0') {
                  console.log('//======异步提交投诉处理信息成功======//')
                } else {
                  console.log('//======异步提交投诉处理信息失败======//')
                  console.log(data.msg)
                }
              },
              error: function () {
                console('系统繁忙，请稍后再试')
              }
            })
          }
        } else {
          console.log('//======订单处理没有匹配到======//')
        }
      }, that.handle.coustomerRequest, process.env.NODE_ENV)
      .then(function () {
        log.info('//======处理投诉订单中...======//')
      })
  }

  doDetail () {
    let that = this
    that.nightmare
      .evaluate(function () {
        var docmentsNo = document.querySelector('#task_id').innerText
        var content = document.querySelector('#intro_id>div').innerHTML.split('<br>')
        var entry = {
          'docmentsNo': docmentsNo
        }
        var mapping = {
          '交易单号': 'agentOrderNo',
          '反馈原因': 'feedback',
          '处理方式': 'coustomerRequest',
          '联系方式': 'phoneNo'
        }
        for (var i in content) {
          var pairs = content[i].split(':')
          var prop = mapping[pairs[0]]
          if (prop) {
            entry[prop] = pairs[1]
          }
        }
        return entry
      })
      .then(function (entry) {
        log.info('//======解析到新的投诉订单======//')
        log.info(entry)
        entry.type = 1
        service.pushComplaint(entry).then(function (result) {
          that.nightmare.end().then(function () {
            log.info('//======解析到的投诉订单已经发送，窗口已关闭======//')
            that.dispose()
          })
        })
      })
  }

  dispose () {
    var that = this
    that.cookies = null
    that.nightmare = null
    that.link = null
  }
}

module.exports = ComplaintDetail
