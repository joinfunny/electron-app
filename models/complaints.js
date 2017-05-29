var Waterline = require('waterline')
var Complaints = Waterline.Collection.extend({
  tableName: 'complaints',
  schema: true,
  connection: 'robotConn',
  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  attributes: {
    docmentsNo: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true,
      index: true
    },
    agentOrderNo: {
      type: 'string'
    },
    feedback: {
      type: 'string'
    },
    coustomerRequest: {
      type: 'string',
      required: true
    },
    phoneNo: {
      type: 'string'
    },
    type: {
      type: 'integer'
    },
    sign: {
      type: 'string'
    }
  }
})

module.exports = Complaints
