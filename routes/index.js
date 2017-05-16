var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index')
})
router.get('/index', function (req, res, next) {
  res.render('index')
})
router.get('/error', function (req, res, next) {
  res.render('error')
})

router.get('/oauth_success', function (req, res, next) {
  res.render('oauth_success')
})

module.exports = router
