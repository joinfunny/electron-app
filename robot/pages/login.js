var fs = require('fs')
var path = require('path')
var Moment = require('moment')
var request = require('request')
var capturePlugin = require('nightmare-screenshot')
var config = require('../../runtime').App.AppConfig.robot.login

module.exports = {
  nightmare: null,
  vcodeRequestCount: 0,
  getVcodePath: function () {
    if (!this._vcodePath) {
      this._vcodePath = path.join(process.cwd(), './snapshot/vcodes/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png')
    }
    return this._vcodePath
  },
  generateNewVcodePath: function () {
    this._vcodePath = path.join(process.cwd(), './snapshot/vcodes/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png')
    return this._vcodePath
  },
  run: function (nightmare) {
    var that = this
    this.nightmare = nightmare
    return that.nightmare
      .goto('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login')
      .then(function () {
        return that.nightmare
          .enterIFrame('#login_frame')
          .wait('#switcher_plogin')
          .click('#switcher_plogin')
          .wait('#u')
          .type('#u', config.userName)
          .type('#p', config.password)
          .wait(1000)
          .type('#p', '\u000d') // 回车
          .wait(1000)
          .exists('#newVcodeIframe>iframe')
      })
      .then(function (existsVcodeIFrame) {
        console.log(existsVcodeIFrame)
        if (existsVcodeIFrame) {
          console.log('需要输入验证码')
          return that.nightmare
            .enterIFrame('#newVcodeIframe>iframe')
            .wait('#capImg')
            .then(function () {
              that.validateVcode()
            })
        } else {
          console.log('不需要输入验证码')
          return that.nightmare.resetFrame()
        }
      })
      .then(function () {
        console.log('ok')
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
    if (that.vcodeRequestCount >= 5) return
    that.nightmare
      .use(capturePlugin.screenshotSelector(that.generateNewVcodePath(), '#capImg', function () {
        request.post({
          key: config.vcode.serviceKey,
          codeType: config.vcode.serviceCodeType,
          image: fs.createReadStream(that.getVcodePath())
        }, function (err, response, body) {
          that.vcodeRequestCount += 1
          if (!err) {
            if (body.error_code === 0) {
              console.log('获取到的验证码：' + body.result)
              // 获取到验证码模拟输入提交
              that.inputVcode(body.result)
            } else {
              // 获取验证码失败，重新发起请求获取验证码
              console.log('获取验证码失败：' + body.error_code + ',' + body.reason)
              that.validateVcode()
            }
          } else {
            console.log(err)
          }
        })
      }))
  },
  inputVcode: function (vcode) {
    var that = this
    that.nightmare
      .type('#capAns', vcode)
      .wait(1000)
      .click('#submit')
      .wait(2000)
      .exists('#capAns')
      .then(function (notValid) {
        if (notValid) {
          that.validateVcode()
        }
      })
  }
}
