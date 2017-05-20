var Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare)
var Runtime = require('../../runtime')
var log = Runtime.App.Log.helper
var config = Runtime.App.AppConfig.robot.exceptionOrder

function _queryString (query, url, undecode, isHash) {
  var search, index
  index = url.indexOf(isHash ? '#' : '?')
  if (index < 0) {
    return null
  }
  search = '&' + url.slice(index + 1)

  return search && new RegExp('&' + query + '=([^&#]*)').test(search)
    ? undecode ? RegExp.$1 : unescape(RegExp.$1)
    : null
}

module.exports = {
  run: (nm) => {
    nm
      .cookies
      .get()
      .then(function (cookies) {
        log.info('正在打开异常订单窗口...')
        setInterval(function () {
          let nightmare = new Nightmare(config.nightmare)
          nightmare
            .goto('http://chong.qq.com/')
            .cookies
            .set(cookies)
            .goto('http://chong.qq.com/php/index.php?d=seller&c=seller&m=getAbnormalDealList&dealid=&state=3&time_begin=&time_end=&dealType=0')
            .wait('.ui-page-cont')
            .evaluate(function () {
              var pager = document.querySelector('.ui-page-cont')
              var lastPage = pager.lastElementChild
              if (lastPage.innerText === '尾页') {
                return 'http://chong.qq.com' + lastPage.getAttribute('href')
              }
            })
            .then(function (url) {
              var countTotal = +_queryString('page', url)

              nightmare.end().then(function () {
                log.info('获取到异常订单数据量：' + countTotal * 20)
                log.data('异常订单数据量', countTotal * 20)
              })
              // request.post('http://localhost:9092/api/orders', {
              //   json: true,
              //   body: items
              // }, function(err, response, body) {
              //   if (!err) {
              //     console.log(response.body)
              //     return nightmare.end().then(function() {
              //       console.log('nightmare ended')
              //     })
              //   }
              // })
            })
        }, config.worker.tickTime)
      })
  }
}
