let Runtime = require('../runtime/index')
let orm = Runtime.OrmMapping
let Mock = require('mockjs')
module.exports = {
  '/api/complaints': {
    method: 'get',
    callback: function (req, res, callback) {
      let responseData = {
        success: true
      }
      var pageSize = req.query.pageSize
      var pageIndex = req.query.startIndex
      orm.models.complaints.count().then(function (count) {
        console.log(count)
        orm.models.complaints.find().paginate({page: pageIndex, limit: pageSize}).then(function (results) {
          responseData.dataObject = {
            'orderField': '',
            'orderFieldType': '',
            'startIndex': pageIndex,
            'pageSize': pageSize,
            'totalNum': count,
            complaints: results
          }

          callback(responseData)
        })
      })
    }
  }
}
