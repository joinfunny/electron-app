var Waterline = require('waterline')
var Complaints = require('../models/complaints')
var ExceptionOrders = require('../models/exceptionOrder')
var orm = new Waterline()
var mongoAdapter = require('sails-mongo')

orm.loadCollection(Complaints)
orm.loadCollection(ExceptionOrders)

var ormMappings = {
  use: (config) => {
    orm.initialize(Object.assign({}, config.orm, {
      adapters: {
        'default': mongoAdapter,
        'mongo': mongoAdapter
      },
      connections: {
        robotConn: {
          adapter: 'mongo'
        }
      }
    }), function (err, models) {
      if (err) throw err
      ormMappings.models = models.collections
    })
  },
  models: {}
}

module.exports = ormMappings
