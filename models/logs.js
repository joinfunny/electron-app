var Waterline = require('waterline')
var logs = Waterline.Collection.extend({
  tableName: 'logs',
  schema: true,
  connection: 'robot',
  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: false,
  attributes: {
    type: {
      type: 'string' // 1:数据清理（记录数据清理的个数）
    },
    intInfo: {
      type: 'integer'
    },
    stringInfo: {
      type: 'string'
    },
    dateInfo: {
      type: 'date'
    }
  }
})

module.exports = logs
