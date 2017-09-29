var Waterline = require('waterline')
var ExceptionOrders = Waterline.Collection.extend({
  tableName: 'exceptionorders',
  schema: true,
  connection: 'robot',
  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  attributes: {
    total: {
      type: 'integer'
    },
    sign: {
      type: 'string'
    }
  }
})

module.exports = ExceptionOrders
