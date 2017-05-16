let deepAssign = require('deep-assign')
let baseConfig = require('../../app.config.json')
let AppConfig = require('../../app.config' + (process.env.ENV ? ('.' + process.env.ENV) : '.development'))
let config = deepAssign({}, baseConfig, AppConfig)
module.exports = config
