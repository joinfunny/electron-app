var path = require('path')
var Moment = require('moment')
var Nightmare = require('nightmare')
var request = require('request-promise')
var fs = require('fs')
var crypto = require('crypto')
var events = require('events')
require('nightmare-iframe-manager')(Nightmare)
require('nightmare-webrequest-addon')
var capturePlugin = require('nightmare-screenshot')

var nightmare = Nightmare({
  width: 1024,
  height: 768,
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  webPreferences: {
    webSecurity: false
  }
})
function mock (detail, callback) {
  callback({ cancel: true })
}
nightmare.goto('http://www.baidu.com')
  .onBeforeRequest(mock)
  .onBeforeSendHeaders(mock)
  .then(function () {
    console.log('complete')
  })
