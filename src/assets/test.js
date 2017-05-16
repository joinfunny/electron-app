var $ = {};
var rows = [];
var index = 0;

var __getTable = function () {
  return $('#react-content > div > div.row.container.container-bg > div:nth-child(3) > div.clearfix > div > div > div > table > tbody');
}

var __getTr = function (index) {
  return $('#react-content > div > div.row.container.container-bg > div:nth-child(3) > div.clearfix > div > div > div > table > tbody > tr:eq(' + index + ')');
}

var __getTd = function (index) {
  var tr = __getTr(index);
  return tr.find('td:eq(6)');
}

var __getSearchBtn = function (index) {
  var td = __getTd(index);
  return td.children('button');
}

var __getNextPage = function (callback) {
  var nextPage = $('.ant-pagination-next');
  if (!nextPage.hasClass('ant-pagination-disabled'))
    {return nextPage.trigger('click'), true;}
  return false;
}

function __tr (index) {
  var tr = __getTr(index);
  if (tr && tr.length > 0) {
    var btn = tr.find('td>button');
    btn.trigger('click');
    var timer = setInterval(function () {
      var tr = __getTr(index);
      var td = __getTd(index);
      var clickResult = td.find('p');
      if (clickResult && clickResult.length > 0) {
        var itemId = tr.find('td:eq(2)').text();
        var itemTitle = tr.find('td:eq(1)').text();
        var itemPrice = tr.find('td:eq(4)').text();
        var itemThf = tr.find('td:eq(5)').text();

        var maxThf = new RegExp('最高：([0-9.]*)元').test(clickResult.eq(0).text()) ? RegExp.$1 : 0.00;
        var avgThf = new RegExp('平均：([0-9.]*)元').test(clickResult.eq(1).text()) ? RegExp.$1 : 0.00;
        console.log(maxThf + '--' + avgThf);
        clearInterval(timer);
        timer = null;
        rows.push({
          itemId: itemId,
          itemTitle: itemTitle,
          itemPrice: itemPrice,
          itemThf: itemThf,
          maxThf: maxThf,
          avgThf: avgThf
        })
        __tr(index + 1);
      }
    }, 100);
  } else if (__getNextPage()) {
    var nextPageTimer = setInterval(function () {
      var table = __getTable();
      if (table && table.length > 0) {
        clearInterval(nextPageTimer);
        nextPageTimer = null;
        index = 0;
        __tr(index);
      }
    }, 500)
  } else {
    console.log('数据收集完毕：');
    console.log(JSON.stringify(rows, null, 2));
  }
}

var myScript = document.createElement('script');
myScript.type = 'text/javascript';
myScript.src = 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js';
document.body.appendChild(myScript);

var $timer = setInterval(function () {
  if ($ && $.extend) {
    __tr(index);
    clearInterval($timer);
    $timer = null;
  }
}, 500);
