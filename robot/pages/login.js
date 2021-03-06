var fs = require('fs')
var path = require('path')
var Moment = require('moment')
var request = require('request')
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.login
var email = require('../../runtime/email')
var loginIFrameSelector = '#ui_ptlogin'
module.exports = {
  eventEmitter: null,
  nightmare: null,
  vcodeRequestCount: 0,
  getVcodePath: function () {
    if (!this._vcodePath) {
      this._vcodePath = path.join(process.cwd(), './snapshot/vcodes/' + Moment().format('YYYYMMDDHHmmss') + '.png')
      log.info('//======初始化验证码图片路径=======//')
      log.info(this._vcodePath)
    }
    return this._vcodePath
  },
  generateNewVcodePath: function () {
    log.info('//======生成新的验证码图片路径=======//')
    this._vcodePath = path.join(process.cwd(), './snapshot/vcodes/' + Moment().format('YYYYMMDDHHmmss') + '.png')
    log.info(this._vcodePath)
    return this._vcodePath
  },
  run: function (nightmare, eventEmitter) {
    var that = this
    this.nightmare = nightmare
    this.eventEmitter = eventEmitter
    return that.nightmare
      .enterIFrame(loginIFrameSelector)
      .wait('#switcher_plogin')
      .click('#switcher_plogin')
      .wait('#u')
      .type('#u', config.userName)
      .type('#p', config.password)
      .wait(1000)
      .type('#p', '\u000d') // 回车
      .wait(1000)
      .exists('#newVcodeIframe>iframe')
      .then(function (existsVcodeIFrame) {
        log.info(existsVcodeIFrame)
        if (existsVcodeIFrame) {
          log.warn('//=======需要输入验证码========//')
          return that.nightmare
            .enterIFrame('#newVcodeIframe>iframe')
            .wait(1000)
            .wait('#capImg')
            .then(function () {
              that.validateVcode()
            })
            .catch(function (err) {
              log.error(err)
            })
        } else {
          log.info('不需要输入验证码')
          return that.nightmare.resetFrame()
        }
      })
      .then(function () {
        log.info('//===========login ok==============//')
      })
      .catch(function (err) {
        log.error('登陆过程中捕获到异常：')
        log.error(err)
      })
  },
  /**
   * 获取到了图片。
   * 请求验证码服务获取验证码
   * 模拟input输入验证码
   * 模拟点击
   */
  validateVcode: function () {
    var that = this
    if (that.vcodeRequestCount >= config.maxLoginCount) {
      log.warn('登录次数超过' + config.maxLoginCount + '次，页面将会重新刷新尝试登录')
      that.vcodeRequestCount = 0
      that.nightmare.resetFrame()
        .then(function () {
          that.run(that.nightmare, that.eventEmitter)
        })
      return
    }
    that.nightmare
      .evaluate(function () {
        var rect = document.querySelector('#capImg').getBoundingClientRect()
        return {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      })
      .then(function (rect) {
        return that.nightmare
          .exitIFrame()
          .evaluate(function () {
            var rect = document.querySelector('#newVcodeIframe>iframe').getBoundingClientRect()
            return {
              x: Math.round(rect.left),
              y: Math.round(rect.top)
            }
          })
          .then(function (newVcodeIframeRect) {
            return that.nightmare
              .exitIFrame()
              .evaluate(function () {
                var rect = document.querySelector(loginIFrameSelector).getBoundingClientRect()
                return {
                  x: Math.round(rect.left),
                  y: Math.round(rect.top)
                }
              })
              .then(function (loginFrameRect) {
                var rectResult = {
                  x: loginFrameRect.x + newVcodeIframeRect.x + rect.x,
                  y: loginFrameRect.y + newVcodeIframeRect.y + rect.y,
                  width: rect.width,
                  height: rect.height
                }
                console.log('//======获取到的验证码的最终坐标======//')
                return that.nightmare
                  .screenshot(that.generateNewVcodePath(), rectResult)
                  .wait(5000)
              })
          })
      })
      .then(function () {
        console.log('//=====已经生成了验证码图片=======//')
        var result = false
        if (result === false) {
          that.nightmare
            .enterIFrame(loginIFrameSelector)
            .enterIFrame('#newVcodeIframe>iframe')
            .then(function () {
              console.log(JSON.stringify(config.vcode))
              request.post({
                url: config.vcode.serviceUrl,
                json: true,
                formData: {
                  url: config.vcode.serviceUrl,
                  key: config.vcode.serviceKey,
                  codeType: config.vcode.serviceCodeType,
                  image: fs.createReadStream(that.getVcodePath())
                }
              }, function (err, response, body) {
                log.info('//=======请求验证码服务返回=======//')
                log.info(JSON.stringify(err, null, 2))
                log.info(JSON.stringify(response, null, 2))
                log.info(JSON.stringify(body, null, 2))
                that.vcodeRequestCount += 1
                if (!err) {
                  if (body.error_code === 0) {
                    log.info('获取到的验证码：' + body.result)
                    // 获取到验证码模拟输入提交
                    that.inputVcode(body.result)
                  } else {
                    // 获取验证码失败，重新发起请求获取验证码
                    log.warn('获取验证码失败：' + body.error_code + ',' + body.reason)
                    that.validateVcode()
                  }
                } else {
                  log.error(err)
                }
              })
            })
            .catch(function (err) {
              log.error(err)
            })
        }
      })
  },
  inputVcode: function (vcode) {
    var that = this
    that.nightmare
      .type('#capAns', vcode)
      .wait(2000)
      .click('#submit')
      .wait(8000)
      .run(function () {
        that.nightmare
          .exists('#capAns')
          .then(function (notValid) {
            var msg = notValid ? '尝试输入验证码，但没有验证通过，将会再次重新请求验证服务' : '尝试输入验证码，并通过了验证，即将登录...'
            log.info(msg)
            if (notValid) {
              email.send('登录验证码自动输入验证失败', msg, '<b>' + msg + '</b>')
              that.validateVcode()
            }
          })
          .catch(function (err) {
            log.error(err)
          })
      })
  }
}
