var path = require('path');
var preloadUrl = path.resolve("custom-script.js")
var Moment = require('moment');

var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);

var indexPage = require('./pages/index')
var loginPage = require('./pages/login')

var nightmare = Nightmare({
		width: 1024,
		height: 768,
		openDevTools: {
			mode: 'detach'
		},
		show: true,
		webPreferences: {
			webSecurity: false 
		}
	})
	.on('did-finish-load', function() {
		console.log('did-finish-load')
		nightmare.url()
			.then(function(url) {
				if (url.indexOf('&g_ty=lk') > -1) {
					console.log('--------------------正在进入主页面----------------')
					console.log(url)
					return indexPage.run(nightmare)
				}
			})
	})
	.on('did-frame-finish-load', function() {
		console.log('-----------did-frame-finish-load------------')
		// nightmare.url()
		// 	.then(function(url) {
		// 		console.log(url)
		// 	})
	})
	.on('‘did-get-redirect-request’', function() {
		console.log('‘did-get-redirect-request’')
	})
	.on('dom-ready', function() {
		console.log('dom-ready')
	}).on('did-navigate-in-page', function() {
		console.log('did-navigate-in-page')
	})
	.on('console',function(type,msg){
		console[type](msg)
	})

nightmare
	.then(function() {
		return loginPage.run(nightmare);
	})
