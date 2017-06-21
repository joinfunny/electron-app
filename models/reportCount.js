var Waterline = require('waterline')
var reportCount = Waterline.Collection.extend({
  tableName: 'reportcount',
  schema: true,
  connection: 'robotConn',
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    startTime: {
      type: 'string',
      required: true,
      index: true
    },
    endTime: {
      type: 'string',
      required: true,
      index: true
    },
    type: {
      type: 'string'
    },
    count: {
      type: 'integer'
    }
  }
})

module.exports = reportCount
