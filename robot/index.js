var path = require('path');
var Moment = require('moment');
var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);

//登录模拟
var loginPage = require('./pages/login')
//投诉订单
var complaints = require('./pages/complaints')
//异常订单
var exceptionOrder = require('./pages/exception-order')

var nightmare = Nightmare({
    width: 1024,
    height: 768,
    // openDevTools: {
    //   mode: 'detach'
    // },
    show: true,
    webPreferences: {
      webSecurity: false 
    }
  })
  .on('did-finish-load', function() {
    console.log('did-finish-load')
    nightmare.url()
      .then(function(url) {
        if (url.indexOf('&g_ty=lk') > -1) {
          console.log('--------------------正在进入主页面----------------')
          console.log(url)
          complaints.run(nightmare);
          exceptionOrder.run(nightmare);
        }
      })
  })
  .on('console', function(type, msg) {
    console[type](msg)
  })

nightmare
  .then(function() {
    return loginPage.run(nightmare);
  })
