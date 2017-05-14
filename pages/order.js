/**
 * 处理订单
 */
var path = require('path')
var detail = require('./order-detail')
module.exports = {
  nightmare: null,
  run: function(nightmare) {
    this.nightmare = nightmare;
    return this.goto()
  },
  goto: function() {
    var that = this;
    return that.nightmare
      .enterIFrame('#main')
      .evaluate(function() {
        var error = document.querySelector('body>div.table-cont.p-t-20.b-t-white>div.error-tips')
        var links = []
        if (!error) {
          var tbody = document.querySelector('body>div.table-cont.p-t-20.b-t-white>table>tbody')
          var trs = tbody.querySelectorAll('tr')
          trs.forEach(function(tr) {
            var a = tr.querySelector('td:nth-child(1)>a')
            if (a)
              links.push('http://chong.qq.com/php/' + a.getAttribute('href'))
          })
        }
        return links
      })
      .then(function(links) {
        console.log(JSON.stringify(links, null, 2))
        // for (let i = 0; i < links.length; i++) {
        //   console.log(links[i])
        //   detail(links[i])
        // }


        return that.nightmare
          .cookies
          .get()
          .then(function(cookies) {
            return links && links.length > 0 && detail(cookies, links[0])
          })
      })
  }
}
