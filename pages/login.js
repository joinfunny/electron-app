var path = require('path')
var Moment = require('moment')

module.exports = {
  nightmare: null,
  run: function(nightmare) {
    this.nightmare = nightmare;
    return this.goto()
  },
  goto: function() {
    var that = this;
    return that.nightmare
      .goto('http://chong.qq.com/php/index.php?d=seller&c=sellerLogin&m=login')
      .then(function() {
        return that.nightmare
          .enterIFrame('#login_frame')
          .wait('#switcher_plogin')
          .click('#switcher_plogin')
          .wait('#u')
          .type('#u', '2919415063')
          .type('#p', 'shili8269')
          .wait(1000)
          .type('#p', '\u000d') //回车
          .wait(1000)
          .exists('#newVcodeIframe>iframe')
        // .wait('#capImg')
        // .wait('#capAns')
        // .wait('#submit')
      })
      .then(function(existsVcodeIFrame) {
        console.log(existsVcodeIFrame)

        if (existsVcodeIFrame) {
          console.log('需要输入验证码')
          return that.nightmare
            .enterIFrame('#newVcodeIframe>iframe')
            .wait('#capImg')
            .screenshot(path.resolve('./snapshot/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png'))
            .wait(2000)
        } else {
          console.log('不需要输入验证码')
          return that.nightmare.resetFrame()
        }
      })
      .then(function() {
        console.log('ok')
      })

  }

}
