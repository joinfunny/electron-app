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
              log.info('//======异步提交投诉处理信息成功，窗口已关闭======//')
              that.dispose()
            })
              .catch(function (err) {
                log.error(err)
              })
          })
        } else if (msg === '//======异步提交投诉处理信息失败======//') {
          service.handledComplaint(that.handle, false).then(function () {
            that.nightmare.end().then(function () {
              log.info('//======异步提交投诉处理信息失败，窗口已关闭======//')
              that.dispose()
            })
              .catch(function (err) {
                log.error(err)
              })
          })
        } else if (msg === '//======当前投诉处理已经经过处理======//') {
          service.handledComplaint(that.handle, true).then(function () {
            that.nightmare.end().then(function () {
              log.info('//======当前投诉处理已经经过处理，窗口已关闭======//')
              that.dispose()
            })
              .catch(function (err) {
                log.error(err)
              })
          })
        }
      })
      .on('did-finish-load', function () {
        that.nightmare
          .url()
          .then(function (url) {
            if (url.indexOf('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login') > -1) {
              log.warn('//--------------------【投诉订单详情监控】用户过期，需要重新登录----------------//')
              if (that.handle) {
                service.handledComplaint(that.handle, false).then(function () {
                  log.info(that.handle)
                  log.info('//======【投诉订单处理监控】用户过期，投诉处理信息已回补，窗口已关闭======//')
                })
              }
              that.nightmare.end().then(function () {
                that.dispose()
                that.eventEmitter.emit('detail-login-expired', that)
              })
              .catch(function (err) {
                log.error(err)
              })
            } else if (url.indexOf('php/index.php?d=seller&c=seller&m=getCaseDetail') > -1) {
              that.exec()
            } else if (url !== 'http://chong.qq.com/') {
              if (that.handle) {
                service.handledComplaint(that.handle, false).then(function () {
                  log.info(that.handle)
                  log.info('//======【投诉订单处理监控】请求发生异常，窗口已关闭======//')
                })
              }
              that.nightmare.end().then(function () {
                that.dispose()
              })
              .catch(function (err) {
                log.error(err)
              })
            }
          })
          .catch(function (err) {
            log.error(err)
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
          .catch(function (err) {
            log.error(err)
          })
      })
      .catch(function (err) {
        log.error(err)
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
      .catch(function (err) {
        log.error(err)
      })
  }

  doHandle () {
    let that = this
    log.info('//======处理投诉订单【开始】======//')
    that.nightmare
      .evaluate(function (coustomerRequest, env) {
        // console.log('//======当前运行的环境变量：' + env + '======//')
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
          if (env !== 'production') {
            console.log('//======当前环境为非生产环境，执行模拟提交======//')
            console.log('//======异步提交投诉处理信息成功======//')
            return
          }
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
              console.log('//======异步提交投诉处理信息失败======//')
            }
          })
        } else {
          console.log('//======订单处理没有匹配到======//')
        }
      }, that.handle.coustomerRequest, process.env.NODE_ENV)
      .then(function () {
        log.info('//======处理投诉订单中...======//')
      })
      .catch(function (err) {
        log.error('订单处理过程中捕获到异常：')
        log.error(err)
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
          .catch(function (err) {
            log.info('//======解析到的投诉订单在保存数据库时发生错误，窗口正在关闭======//')
            log.error(err)
            that.nightmare.end().then(function () {
              that.dispose()
            })
          })
      })
      .catch(function (err) {
        log.info('//======解析投诉订单过程中发生错误，窗口正在关闭======//')
        log.error(err)
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
