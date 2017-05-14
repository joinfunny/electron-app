var path = require('path');
var Moment = require('moment');
var request = require('request');
var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);

module.exports = (cookies, url) => {
  let nightmare = new Nightmare({
    width: 1024,
    height: 768,
    openDevTools: {
      mode: 'detach'
    },
    show: true,
    webPreferences: {
      webSecurity: false 
    }
  })
  console.log(cookies)
  console.log(url)
  nightmare
    .goto(url)
    .cookies.set(cookies)
    .goto(url)
    .wait('#intro_id>div')
    .evaluate(function() {
      var docmentsNo = document.querySelector('#task_id').innerText
      var content = document.querySelector('#intro_id>div').innerHTML.split('<br>')
      var items = {
        docmentsNo: docmentsNo
      };
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
    })
    .then(function(items) {
      console.log(items)
      request.post('http://localhost:9092', items, function(err) {})
      request.post('http://localhost:9092/api/orders', {
        json: true,
        body: items
      }, function(err, response, body) {
        if (!err) {
          console.log(response.body)
          return nightmare.end().then(function() {
            console.log('request finished')
          })
        }
      })
    })
}
