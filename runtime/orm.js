var Waterline = require('waterline')
var Complaints = require('../models/complaints')
var ExceptionOrders = require('../models/exceptionOrder')
var ReportCount = require('../models/reportCount')
var Logs = require('../models/logs')
var orm = new Waterline()
var mongoAdapter = require('sails-mongo')

orm.loadCollection(Complaints)
orm.loadCollection(ExceptionOrders)
orm.loadCollection(ReportCount)
orm.loadCollection(Logs)
var ormMappings = {
  use: (config) => {
    orm.initialize(Object.assign({}, config.orm, {
      adapters: {
        'default': mongoAdapter,
        'mongo': mongoAdapter
      }
    }), function (err, models) {
      if (err) throw err
      ormMappings.models = models.collections
    })
  },
  models: {}
}

module.exports = ormMappings
