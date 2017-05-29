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
      var searchKey = req.query.searchKey
      var dateTime = req.query.dateTime
      var type = req.query.type
      var condition = {}
      if (searchKey) {
        condition['or'] = [
          {agentOrderNo: searchKey},
          {coustomerRequest: searchKey},
          {docmentsNo: searchKey},
          {feedback: searchKey},
          {phoneNo: searchKey}
        ]
      }
      if (dateTime) {
        if (type === '1') {
          condition['createdAt'] = {
            '>': new Date(dateTime + ' 00:00:00'),
            '<': new Date(dateTime + ' 23:59:59')
          }
        } else if (type === '2') {
          condition['updatedAt'] = {
            '>': new Date(dateTime + ' 00:00:00'),
            '<': new Date(dateTime + ' 23:59:59')
          }
        }
      }
      if (type) {
        condition.type = type
      }
      orm.models.complaints.count(condition).then(function (count) {
        console.log(count)
        return orm.models.complaints.find(condition).paginate({
          page: pageIndex,
          limit: pageSize
        }).then(function (results) {
          responseData.dataObject = {
            'orderField': '',
            'orderFieldType': '',
            'startIndex': pageIndex,
            'pageSize': pageSize,
            'totalNum': count,
            'complaints': results
          }
          callback(responseData)
        })
      })
    }
  }
}
