let Runtime = require('../runtime/index')
let orm = Runtime.OrmMapping
let moment = require('moment')
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
        condition['or'] = [{
          agentOrderNo: searchKey
        },
        {
          coustomerRequest: searchKey
        },
        {
          docmentsNo: searchKey
        },
        {
          feedback: searchKey
        },
        {
          phoneNo: searchKey
        }
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
          condition.type = type
        }
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
  },
  '/api/mydata': {
    method: 'get',
    callback: function (req, res, callback) {
      let date = new Date() * 1
      let runTime = date - global.AppStartTimestamp

      // complaints
      let complaintsTotal = orm.models.complaints.count()
      let complaintsToday = orm.models.complaints.count({
        createdAt: {
          '>': new Date(moment(date).format('YYYY-MM-DD') + ' 00:00:00'),
          '<': new Date(moment(date).format('YYYY-MM-DD') + ' 23:59:59')
        }
      })
      let complaintsLatestTime = orm.models.complaints.find().max('createdAt')

      // handles
      let handlesTotal = orm.models.complaints.count({
        type: 2
      })
      let handlesToday = orm.models.complaints.count({
        type: 2,
        updatedAt: {
          '>': new Date(moment(date).format('YYYY-MM-DD') + ' 00:00:00'),
          '<': new Date(moment(date).format('YYYY-MM-DD') + ' 23:59:59')
        }
      })
      let handlesLatestTime = orm.models.complaints.find({type: 2}).max('updatedAt')

      // exceptionOrders
      let exceptionordersTotal = orm.models.exceptionorders.count()
      let exceptionordersToday = orm.models.exceptionorders.count({
        createdAt: {
          '>': new Date(moment(date).format('YYYY-MM-DD') + ' 00:00:00'),
          '<': new Date(moment(date).format('YYYY-MM-DD') + ' 23:59:59')
        }
      })
      let exceptionordersLatestTime = orm.models.exceptionorders.find().max('createdAt')
      let cleanedHandlesCount = orm.models.logs.find({type: 'task-data-clean'}).sum('intInfo')
      let responseData = {
        success: true,
        dataObject: {
          service: {
            runTime: runTime,
            count: 3
          },
          complaints: {
            today: 10,
            total: 10,
            latestTime: 1000,
            chart: {}
          },
          handles: {
            today: 10,
            total: 10,
            latestTime: 1000,
            chart: {}
          },
          exceptionorders: {
            today: 10,
            total: 10,
            latestTime: 1000,
            chart: {}
          }
        }
      }

      Promise.all([
        complaintsTotal, // 0
        complaintsToday, // 1
        complaintsLatestTime, // 2
        handlesTotal, // 3
        handlesToday, // 4
        handlesLatestTime, // 5
        exceptionordersTotal, // 6
        exceptionordersToday, // 7
        exceptionordersLatestTime, // 8
        cleanedHandlesCount// 9
      ]).then(function (results) {
        var cleanedHandlesSum = results[9] && results[9].length > 0 ? results[9][0].intInfo : 0
        // 当前的投诉订单数量要加上数据清理定时服务的数据
        responseData.dataObject.complaints.total = results[0] + cleanedHandlesSum
        responseData.dataObject.complaints.today = results[1]
        responseData.dataObject.complaints.latestTime = results[2].length > 0 ? new Date(results[2][0].createdAt) * 1 : 0
        responseData.dataObject.handles.total = results[3] + cleanedHandlesSum
        responseData.dataObject.handles.today = results[4]
        responseData.dataObject.handles.latestTime = results[5].length > 0 ? new Date(results[5][0].updatedAt) * 1 : 0
        responseData.dataObject.exceptionorders.total = results[6]
        responseData.dataObject.exceptionorders.today = results[7]
        responseData.dataObject.exceptionorders.latestTime = results[8].length > 0 ? new Date(results[8][0].createdAt) * 1 : 0
        callback(responseData)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  '/api/earliestData': {
    method: 'get',
    callback: function (req, res, callback) {
      let endDate = new Date(+req.query.endDate)
      let startDate = new Date(+req.query.startDate)

      let complaints = orm.models.reportcount.find({
        type: '1',
        endTime: {
          '>': startDate,
          '<': endDate
        }
      })
      let handles = orm.models.reportcount.find({
        type: '2',
        endTime: {
          '>': startDate,
          '<': endDate
        }
      })

      let responseData = {
        success: true,
        dataObject: {
          startTime: startDate,
          endTime: endDate,
          complaints: [],
          handles: []
        }
      }

      Promise.all([
        complaints,
        handles
      ]).then(function (results) {
        responseData.dataObject.complaints = results[0].map(function (item) {
          return [item.endTime, item.count, item.count]
        })
        responseData.dataObject.handles = results[1].map(function (item) {
          return [item.endTime, item.count, item.count]
        })
        callback(responseData)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
