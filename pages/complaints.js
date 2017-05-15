/**
 * 处理订单
 */
var path = require('path')
var complaintDetail = require('./complaint-detail')
module.exports = {
  nightmare: null,
  run: function(nightmare) {
    var that = this;
    this.nightmare = nightmare;
    return that
      .goto()
      .then(function() {
        that.exec()
      })
  },
  goto: function() {
    var that = this;
    return that.nightmare
      .enterIFrame('#main')
      .then(function() {
        console.log('------进入投诉处理主页面------')
      });
  },
  exec: function() {
    var that = this;
    return that.nightmare
      .evaluate(function() {
        var error = document.querySelector('body>div.table-cont.p-t-20.b-t-white>div.error-tips')
        var links = []
        if (!error) {
          var tbody = document.querySelector('body>div.table-cont.p-t-20.b-t-white>table>tbody')
          var trs = tbody.querySelectorAll('tr')
          trs.forEach(function(tr) {
            var a = tr.querySelector('td:nth-child(1)>a')
            if (a) {
              links.push('http://chong.qq.com/php/' + a.getAttribute('href'))
            }
          })
        }
        return links
      })
      .then(function(links) {
        //console.log(JSON.stringify(links, null, 2))
        console.log('-------本次共获取到' + links.length + '条投诉处理--------')
        //定时器模拟打开新的投诉详情页面
        var timer = setInterval(function() {
          if (links && links.length > 0) {
            let link = links.splice(0, 1)[0];
            // that.nightmare
            //   .cookies
            //   .get()
            //   .then(function(cookies) {
            //     console.log('-------获取到的投诉处理地址：--------')
            //     console.log(link)
            //     complaintDetail(cookies, link)
            //   })
          } else {
            clearInterval(timer)
            that.next()
          }
        }, 2000)
      })
  },
  /**
   * 轮询整个类别区域下的所有LI，获取是否有数据
   * 如果有数据。则点击跳转到对应的类别下
   * 没有的话，会定位到第一个类别，然后点击
   */
  next: function() {
    var that = this;
    that.nightmare
      .evaluate(function() {
        var currentLink = document.querySelector('#frm>div:nth-child(7)>ul>li>a.on');
        var current = currentLink.parentNode;
        var next = null;

        while (!next) {
          next = current.nextElementSibling
          if (!next) {
            next = document.querySelector('#frm>div:nth-child(7)>ul>li:nth-child(2)');
            break;
          }

          var text = next.innerText;

          if (/^.*\(([0-9]+)\)/.test(text) && +RegExp.$1 === 0) {
            current = next;
            next = null;
          } else {
            console.log(text);
          }
        }
        next.firstChild.click()
      })
      .wait(2000)
      .wait('#frm>div:nth-child(7)>ul>li>a.on')
      .then(function() {
        that.exec()
      })
  }
}
