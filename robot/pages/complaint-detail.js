var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.complaints
var service = require('../service')

class ComplaintDetail {
  constructor (cookies, link, handle) {
    this.cookies = cookies
    this.link = link
    this.handle = handle
    this.nightmare = new Nightmare(config.nightmare)
  }
  run () {
    let that = this
    let url = that.link.url
    log.info('//======正在打开投诉订单 ' + that.link.docmentsNo + '窗口...======//')
    that.nightmare
      .goto('http://chong.qq.com/')
      .cookies.set(that.cookies)
      .goto(url)
      .wait('#intro_id>div')
      .then(function () {
        if (that.handle) {
          that.handle()
        } else {
          that.detail()
        }
      })
  }
  handle () {
    let that = this
    log.info('//======处理投诉订单【开始】======//')
    that.nightmare.evaluate(function () {
      // 首先判断当前的状态是否已经修改过来
      // 没有修改过就修改
      return true
    })
      // 再次刷新浏览器，再次确认是否处理完成
      .refresh()
      .wait('#intro_id>div')
      .evaluate(function () {
        // 刷新了页面要重新判断一下页面的处理结果是否正确
        // TODO....
        return true
      })
      .then(function (result) {
        log.info('//======处理投诉订单【结束】======//')
        log.info(result)
        if (result) {
          service.handledComplaints(that.handle)
        }
      })
  }

  detail () {
    let that = this
    that.nightmare.evaluate(function () {
      var docmentsNo = document.querySelector('#task_id').innerText
      var content = document.querySelector('#intro_id>div').innerHTML.split('<br>')
      var items = {
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
          items[prop] = pairs[1]
        }
      }
      return items
    }).then(function (items) {
      log.info('//======解析到新的投诉订单======//')
      log.info(items)

      service.pushComplaints(items).then(function (err, result) {
        if (err) {
          log.info('//======解析到的投诉订单发送过程发生错误：======//')
          log.info(err)
          return
        }
        that.nightmare.end().then(function () {
          log.info('//======解析到的投诉订单已经发送======//')
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
    that = null
  }
}

module.exports = ComplaintDetail
