var page = require('webpage').create()

var url = 'http://chong.qq.com/pc/seller/index.html'
page.open(url, function (status) {
  console.log('Status: ' + status)
  if (status === 'success') {
    page.render('example.png')
  }
})
