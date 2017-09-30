var Runtime = require('./runtime')
var logger = Runtime.App.Log
var log = logger.helper
let orm = Runtime.OrmMapping
let Redis = require('ioredis')
let redisClient = new Redis()

function mongo () {
  var complaint = {
    'docmentsNo': '2135535',
    'agentOrderNo': '5200012741201709290991109507',
    'feedback': '充错号码',
    'phoneNo': '15975807466',
    'coustomerRequest': '退款',
    'complaintSources': '客服',
    'timeLength': '0小时',
    'times': '1',
    'satisfaction': '0星',
    'record': '用户投诉; 客服工号3161624341认领了工单;',
    'orderTime': '2017-09-30 00:01:03',
    'type': 1
  }

  orm.models.complaints.create(complaint)
    .then(function () {
      return orm.models.complaints.destroy({
        'docmentsNo': '2135535'
      }).then(function (items) {
        if (items.length === 1) {
          log.info('测试Mongodb操作成功')
        } else {
          log.info('测试Mongodb操作失败')
        }
      })
    })
}

function redis () {
  redisClient.set('foo', 'bar')
  redisClient.get('foo', function (err, result) {
    if (err) {
      throw err
    }
    if (result === 'bar') {
      log.info('测试Redis操作成功')
    }
  })
}

module.exports = {
  mongo,
  redis
}
