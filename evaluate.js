var page = require('webpage').create();
var url = "http://www.baidu.com"
page.onConsoleMessage = function(msg) {
  console.log(msg);
};
page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log('Page title is ' + title);
  phantom.exit();
});