var Waterline = require('waterline')
var reportCount = Waterline.Collection.extend({
  tableName: 'reportcount',
  schema: true,
  connection: 'robot',
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    startTime: {
      type: 'date',
      required: true,
      index: true
    },
    endTime: {
      type: 'date',
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
