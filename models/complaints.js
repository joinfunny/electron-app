var Waterline = require('waterline')
var Complaints = Waterline.Collection.extend({
  tableName: 'complaints',
  schema: true,
  // adapter: 'mongo',
  connection: 'robotConn',
  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  attributes: {
    docmentsNo: {
      type: 'string'
      // required: true,
      // unique: true,
      // iprimaryKey: true
    },
    agentOrderNo: {
      type: 'string'
      // required: true
    },
    feedback: {
      type: 'string'
      // required: true
    },
    coustomerRequest: {
      type: 'string'
      // required: true
    },
    phoneNo: {
      type: 'string'
      // required: true
    },
    state: {
      type: 'string'
      // require: true,
      // validations: {
      //   isIn: ['init', 'complete']
      // }
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
