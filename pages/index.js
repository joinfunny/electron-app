var path = require('path')
var Moment = require('moment');
var Utils = require('../utils')
var order = require('./order')
module.exports = {
  nightmare: null,
  run: function(nightmare) {
    this.nightmare = nightmare;
    return this.goto()
  },
  goto: function() {
    var that = this;
    return that.nightmare
      .url()
      .then(function(url) {
        console.log('--------------------进入主页面----------------')
        console.log(url)
        return that.nightmare
          .click('#nav>li:nth-child(6)>a')
          .wait(600)
          .click('#nav>li.actived>ul>li>a')
      })
      .then(function() {
        return that.nightmare
          .wait(5000)
          .screenshot(path.resolve('./snapshot/' + Moment().format('YYYY-MM-dd-HH:mm:ss') + '.png'))
          .wait(2000)
      })
      .then(function(){
        return order.run(that.nightmare)
      })
  }

}
