var Waterline = require('waterline')
var Complaints = require('../models/complaints')
var orm = new Waterline()
var mongoAdapter = require('sails-mongo')

orm.loadCollection(Complaints)

var ormMappings = {
  use: (app, config) => {
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
