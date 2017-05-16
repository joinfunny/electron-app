"use strict"

module.exports = function(app, config) {
	const qrCode = config.qrCode //QR code--场景ID--不可修改
	const qrScene = config.qrScene //微信返回的场景ID--不可修改
	const appid = config.app.id //微信公众号APPID--不可修改
	const minxlen = 16 //校验appid长度。

	const rxStreamAppId = config.rxStreamAppId

	const share = "stream_share" //分享的Key值
	const exclude = "stream_exclude" //排除的所有用户信息
	const attendee = "stream_actual_scene_user" //当场扫描二维码的用户集合
	const subscribe = "stream_wx_subscribe_user" //订阅公众号的所有用户ID集合
	const user = "stream_wx_userinfo" //存储所有微信关注用户的详细信息
	const suggest = "stream_suggest" //存储所有留言
	const shareopenid = "stream_share_openid" //浏览分享页面的OPENID存储


	//分享表
	const HN_SHARE = share + rxStreamAppId

	//排除抽奖的用户表
	const HN_EXCLUDE = exclude + rxStreamAppId

	//扫描二维码的用户集合
	const HN_ACTUAL_SCENE_USER = attendee + rxStreamAppId

	//订阅公众号的所有用户集合
	const HN_SUBSCRIBEUSER = subscribe + rxStreamAppId

	const HN_WX_USER = user + rxStreamAppId

	//留言表
	const HN_SUGGEST = suggest + rxStreamAppId

	//分享查看者
	const HN_SHAREOPENID = shareopenid + rxStreamAppId


let access_token = null
let jsapi_ticket = null
let runningonce = false
}






function showLog(msg, data) {
	console.log(msg)
	log.info(msg)

	if (data) {
		var str = JSON.stringify(data, null, 4)
		log.info(str)
	}
}

function showError(msg, data) {
	console.error(msg)
	log.error(msg)

	if (data) {
		var str = JSON.stringify(data, null, 4)
		log.error(str)
	}
}

app.use(xmlparser())

function getTicket(access_token) {
	var queryurl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi"
	https.get(queryurl, function(openid_res) {
		var chunks = []
		var size = 0
		openid_res.on("data", function(chunk) {
			chunks.push(chunk)
			size += chunk.length
		})
		openid_res.on("end", function() {
			var buffer = Buffer2.concat(chunks, size)
			var data = buffer.toString()
			data = JSON.parse(data)
			showLog("根据微信TOKEN获取ticket", data)
			jsapi_ticket = data.ticket
		})
	}).on("error", function(err) {
		showError("根据微信TOKEN获取ticket", err)
		res.send(err.message)
	})
}


function demention() {
	let data = {
		action_name: "QR_LIMIT_STR_SCENE",
		action_info: {
			scene: {
				scene_str: qrCode
			}
		}
	}
	data = JSON.stringify(data)
	let path = "/cgi-bin/qrcode/create?access_token=" + access_token
	var headers = {
		"Content-Type": "application/json",
		"Content-Length": data.length
	}
	httpReq.https_request("api.weixin.qq.com", null, path, "POST", data, headers,
		function(err, data) {
			if (err) {
				showError("获取微信场景二维码", err)
			} else {}
		})
}

function j2f(data) {
	var arr = []
	for (let param in data) {
		if (data.hasOwnProperty(param)) {
			arr.push(param + "=" + data[param].toString())
		}
	}
	return arr.join("&")
}

function createMenu() {
	if (runningonce) return
	runningonce = true
	let data = ""
	//data = j2f(data);
	data = "body=%7B%0D%0A++++%22button%22%3A+%5B%0D%0A++++++++%7B%0D%0A++++++++++++%22type%22%3A+%22view%22%2C+%0D%0A++++++++++++%22name%22%3A+%22%E4%BA%86%E8%A7%A3%E8%AF%A6%E6%83%85%22%2C+%0D%0A++++++++++++%22url%22%3A+%22http%3A%2F%2Fpublic.stream.ruixuesoft.com%22%0D%0A++++++++%7D%0D%0A++++%5D%0D%0A%7D"
	let path = "/cgi-bin/menu/create?access_token=" + access_token
	var headers = {
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Content-Length": data.length
	}
	httpReq.https_request("api.weixin.qq.com", null, path, "POST", data, headers,
		function(err, data) {})
}

function getToken() {
	var queryurl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx38c16e637c4ba5fa&secret=bc8d2abd3e6d6bf29bb3afff60eac64d"
	https.get(queryurl, function(openid_res) {
		var chunks = []
		var size = 0
		openid_res.on("data", function(chunk) {
			chunks.push(chunk)
			size += chunk.length
		})
		openid_res.on("end", function() {
			var buffer = Buffer2.concat(chunks, size)
			var data = buffer.toString()
			data = JSON.parse(data)
			showLog("刷新微信TOKEN：", data)
			access_token = data.access_token
			getTicket(access_token)
			createMenu()
		})
	}).on("error", function(err) {
		console.error(err)
		log.error(err.message || "")
		res.send(err.message)
	})
}

setInterval(getToken, 1000 * 60 * 60)

getToken()
// view engine setup
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../client/views"))

app.use(cookieParser())

app.start = function() {
	// start the web server
	let port = process.env.PORT || app.get("port")
	app.set("port", port)
	Server = app.listen(function() {
		app.emit("started")
		var baseUrl = app.get("url").replace(/\/$/, "")
		console.log("Web server listening at: %s", baseUrl)
		if (app.get("loopback-component-explorer")) {
			var explorerPath = app.get("loopback-component-explorer").mountPath
			console.log("Browse your REST API at %s%s", baseUrl, explorerPath)
		}
	})
	return Server
}

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*")
	next()
})

app.get("/", function(req, res) {
	showLog("获取一次请求")
	res.sendFile(path.resolve(__dirname, "..", "client/public_d/html", "demo.html"))
})

app.get("/index", function(req, res) {
	showLog("获取一次请求")
	res.sendFile(path.resolve(__dirname, "..", "client/public_d/html", "demo.html"))
})

app.post("/third_oauth_wx_userprofile", function(req, res) {
	var wxcode = req.body.wxcode
	var queryurl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx38c16e637c4ba5fa&secret=bc8d2abd3e6d6bf29bb3afff60eac64d&code=" +
		wxcode + "&grant_type=authorization_code"
	https.get(queryurl, function(openid_res) {
		var chunks = []
		var size = 0
		openid_res.on("data", function(chunk) {
			chunks.push(chunk)
			size += chunk.length
		})
		openid_res.on("end", function() {
			var buffer = Buffer2.concat(chunks, size)
			var data = buffer.toString()
			showLog("请求网页授权成功：" + JSON.stringify(data))
			res.send(data)
		})
	}).on("error", function(err) {
		showLog("请求网页授权失败", err)
		res.send(err.message)
	})
})

app.post("/third_oauth_wx_userprofile2", function(req, res) {
	var token = req.body.token
	var openid = req.body.openid
	var queryurl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + token + "&openid=" + openid + "&lang=zh_CN"
	https.get(queryurl, function(openid_res) {
		var chunks = []
		var size = 0
		openid_res.on("data", function(chunk) {
			chunks.push(chunk)
			size += chunk.length
		})
		openid_res.on("end", function() {
			var buffer = Buffer2.concat(chunks, size)
			var data = buffer.toString()
			showLog("请求网页授权2成功", data)
			res.send(data)
		})
	}).on("error", function(err) {
		showLog("请求网页授权2失败", err)
		res.send(err.message)
	})
})

app.post("/api_ousers_OAuth2Login", function(req, res) {
	var openid = req.body.openid
	if (openid && openid.length >= MINXLEN) {
		var data = JSON.stringify(req.body)
		showLog("缓存微信用户:" + data)
		redis.hset(HN_WX_USER, openid, data, function(err, data) {
			showLog("缓存微信用户" + data)
		})

		redis.hget(HN_SUBSCRIBEUSER, openid, function(err, data) {
			if (!data) {
				showLog("缓存关注的微信OPENID：" + openid)
				redis.hset(HN_SUBSCRIBEUSER, openid, true)
			}
		})
		res.cookie("__id__", openid, {
			maxAge: 1000 * 3600 * 24 * 7,
			httpOnly: true
		})
		res.json({
			yes: "1"
		})
		return
	}
	res.send(500, "openid is null")
})

app.get("/third_oauth_wx", function(req, res) {
	var headReport = "'WX'"
	var headScript = "<script type=\"text/javascript\"></script>"
	res.render("thirdlogin", {
		headReport: headReport,
		headScript: headScript
	})
})

app.get("/_index_checks", function(req, res) {
	var ret = {
		yes: "0"
	}
	var id = req.cookies ? req.cookies.__id__ : null
	if (!id) {
		res.json(ret)
	} else {
		id = "" + id
		redis.hget(HN_WX_USER, id, function(err, data) {
			if (err) {
				console.error(err)
				log.error(err.message || "")
				res.json(ret)
			} else if (data) {
				showLog("获取是否存在用户信息：" + id + ",data:" + data)
				data = JSON.parse(data)
				res.json({
					yes: "1",
					data: {
						openid: data.openid,
						nickname: data.nickname,
						headimg: data.headimgurl
					}
				})
			} else {
				res.json(ret)
			}
		})
	}
})

app.post("/setKey", function(req, res) {
	var key = "" + req.body.key
	var value = "" + req.body.value
	var id = req.cookies ? req.cookies.__id__ : null
	if (id && key && value) {
		redis.hset(HN_SUGGEST, id + key, value)
		res.send("1")
	} else {
		res.send(400, "0")
	}
})

app.get("/getKey", function(req, res) {
	var id = req.cookies ? req.cookies.__id__ : null
	var key = req.query.key
	if (id && key) {
		redis.hget(HN_SUGGEST, id + key, function(err, data) {
			if (err) {
				showError("获取留言信息错误", err)
				res.send(400, "0")
			} else {
				res.send(data ? data : "")
			}
		})
	} else {
		res.send(400, "0")
	}
})

app.get("/getData", function(req, res) {
	var key = req.query.key
	redis.hgetall(key, function(err, data) {
		if (err) {
			showError("获取Redis数据错误", err)
			res.send(400, "0")
		} else {
			res.send(data ? data : {})
		}
	})
})

app.get("/share", function(req, res) {
	var code = req.query.code
	var openId = req.query.state
	var queryurl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID + "&secret=bc8d2abd3e6d6bf29bb3afff60eac64d&code=" + code + "&grant_type=authorization_code"
	https.get(queryurl, function(openid_res) {
		var chunks = []
		var size = 0
		openid_res.on("data", function(chunk) {
			chunks.push(chunk)
			size += chunk.length
		})
		openid_res.on("end", function() {
			var buffer = Buffer2.concat(chunks, size)
			var shareOpenId = JSON.parse(buffer.toString()).openid

			showLog("静默授权获取OPENID", shareOpenId)
			redis.hget(HN_SHAREOPENID, openId + shareOpenId, function(err, data) {
				if (!data) {
					redis.hset(HN_SHAREOPENID, openId + shareOpenId, true)
					redis.hget(HN_SHARE, openId, function(err, count) {
						var num = 1
						if (count) {
							count = count - 0
							num = num + count
						}
						showLog("分享人openid:" + openId + ",浏览人数总计：" + num)
						redis.hset(HN_SHARE, openId, num)
					})
				}
			})
			res.sendFile(path.resolve(__dirname, "..", "client/public_d/html", "share.html"))
		})
	}).on("error", function(err) {
		showLog("静默授权获取OPENID", err)
		res.send(err.message)
	})
})

app.get("/userprofile", function(req, res) {
	var id = null
	if (req.query.id) id = req.query.id
	else id = req.cookies ? req.cookies.__id__ : null
	if (!id) {
		showLog("openid=" + id + "的微信用户不存在")
		res.send(500, "id不存在")
	} else {
		redis.hget(HN_WX_USER, id, function(err, data) {
			if (data) {
				data = JSON.parse(data)
				showLog("获取openid=" + id + "用户信息", data)
				res.json({
					nickname: data.nickname,
					headimg: data.headimgurl,
					openid: id
				})
			} else {
				showLog("openid=" + id + "的微信用户不存在")
				res.send(500, "id不存在")
			}
		})
	}
})

app.get("/exclude", function(req, res) {
	var c_id = req.cookies ? req.cookies.__id__ : null
	if (!c_id)
		return res.send(500, "需要先微信授权，再扫码")
	redis.hget(HN_EXCLUDE, c_id, function(err, data) {
		var ret = []
		if (!data) {
			showLog("排除微信用户,openid=" + c_id)
			redis.hset(HN_EXCLUDE, c_id, true)
		}
	})
	res.json({
		ret: 1
	})
})

//获取可以抽奖的用户，排除掉相应的用户
function getLegalUsers(cb) {
	var exclude = []
	var include = []
	var rets = []
	redis.hkeys(HN_EXCLUDE, function(err, keys) {
		if (keys) {
			exclude = keys
		}
		redis.hkeys(HN_ACTUAL_SCENE_USER, function(err, keys) {
			if (keys) {
				include = keys
			}
			for (let i = 0; i < include.length; i++) {
				let item = include[i]
				if (exclude.indexOf(item) < 0) {
					rets.push(item)
				}
			}
			cb(null, rets)
		})
	})
}

function filter(rets, cb) {
	let include = []
	redis.hkeys(HN_ACTUAL_SCENE_USER, function(err, data) {
		if (data) {
			include = data
			if (include.length < 2) {
				cb(null, rets)
			} else {
				let real = []
				for (let i = 0; i < rets.length; i++) {
					var item = rets[i]
					if (include.indexOf(item) >= 0) {
						real.push(item)
					}
				}
				cb(null, real)
			}
		}
	})
}

function doRanking(data) {
	for (let i = 0; i < data.length; ++i) {
		let flag = 0
		let index = i
		let tmp
		for (let j = i; j < data.length; j++) {
			if (data[j].share > flag) {
				index = j
				flag = data[j].share
			}
		}
		tmp = data[index]
		data[index] = data[i]
		data[i] = tmp
	}
	let ret = []
	for (let i = 0; i < data.length; ++i) {
		if (i < 10) {
			ret.push(data[i])
		} else {
			break
		}
	}
	return ret
}

function getAllUser(arr, cb) {
	const LEN = arr.length > 150 ? 150 : arr.length
	let ret = []
	let haslooped = 0
	for (let i = 0; i < LEN; ++i) {
		(function(i) {
			if (arr[i]) {
				redis.hget(HN_WX_USER, arr[i], function(err, data) {
					if (data) {
						data = JSON.parse(data)
						let user = {
							nickname: data.nickname,
							headimg: data.headimgurl,
							openid: arr[i]
						}
						ret.push(user)
					}
					haslooped += 1
					if (haslooped == LEN) cb(ret)
				})
			} else {
				haslooped += 1
				if (haslooped == LEN)
					cb(ret)
			}
		})(i)
	}
}

function Ranking(users, cb) {
	let ret = []
	const LOOP = users.length
	let haslooped = 0
	for (let i = 0; i < LOOP; i++) {
		(function(i) {
			let curUserId = users[i]
			redis.hget(HN_WX_USER, curUserId, function(err, data) {
				if (data) {
					data = JSON.parse(data)
					let user = {
						nickname: data.nickname,
						headimg: data.headimgurl,
						share: 0,
						openid: curUserId
					}
					redis.hget(HN_SHARE, curUserId, function(err, data) {
						if (data) {
							user.share = data - 0
						}
						ret.push(user)
						haslooped += 1
						if (haslooped == LOOP) {
							cb(null, ret)
						}
					})
				} else {
					haslooped += 1
					if (haslooped == LOOP) {
						cb(null, ret)
					}
				}
			})
		})(i)
	}
}

app.get("/lottery", function(req, res) {
	getLegalUsers(function(err, data) {
		if (data && data.length) {
			Ranking(data, function(err, data) {
				res.json({
					"data": doRanking(data)
				})
			})
		} else {
			res.send(500, "参考文档说明，先扫描二维码关注")
		}
	})
})

app.get("/subscribed", function(req, res) {
	redis.hlen(HN_SUBSCRIBEUSER, function(err, len) {
		res.json({
			count: len
		})
	})
})

app.get("/subscribed-detail", function(req, res) {
	redis.hkeys(HN_SUBSCRIBEUSER, function(err, users) {
		getAllUser(users, function(data) {
			res.json(data)
		})
	})
})

app.get("/count", function(req, res) {
	var id = req.query.id
	id = id || (req.cookies ? req.cookies.__id__ : null)
	if (!id) {
		res.json(500, {
			error: "id is null"
		})
	} else {
		redis.hget(HN_SHARE, id, function(err, data) {
			if (data) {
				data = data - 0
			}
			if (data) {
				res.json({
					count: data
				})
			} else {
				res.json({
					count: 0
				})
			}
		})
	}
})

function calcSignature(noncestr, ts, url) {
	var str = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + noncestr + "&timestamp=" + ts + "&url=" + url
	let constmima = crypto.createHash("sha1").update(str).digest("hex")
	return constmima
}

app.post("/signature", function(req, res) {
	let url = req.body.url
	let noncestr = Math.random().toString(36).substr(2, 15)
	let timestamp = "" + parseInt(new Date().getTime() / 1000)
	let signature = calcSignature(noncestr, timestamp, url)
	res.json({
		appId: APPID,
		timestamp: timestamp,
		nonceStr: noncestr,
		signature: signature,
		jsapi_ticket: jsapi_ticket
	})
})

app.post("/stream/analysis/userRoute", function(req, res) {
	const backenIp = "127.0.0.1"
	const backenP = 8089
	let body = req.body.data
	httpReq.http_request(backenIp, backenP, "/stream/analysis/userRoute", "POST", body, null,
		function(err, data) {
			if (err) {
				console.error(err)
				log.error(err.message || "")
				res.send(500, "server error")
			} else {
				data = JSON.parse(data.buffer + "")
				res.json(data)
			}
		})
})

function Signature(str) {
	let constmima = crypto.createHash("sha1").update(str).digest("hex")
	return constmima
}

app.get("/wxauth", function(req, res) {
	let arr = []
	arr.push(req.query.timestamp)
	arr.push(req.query.nonce)
	var echostr = req.query.echostr
	var token = "HzX2dt9nh"
	arr.push(token)
	arr.sort()
	var str = arr.join("")
	if (Signature(str) == req.query.signature) {
		res.send(echostr)
	} else {
		res.send(500, "error")
	}
})


function getUserProfile(openid) {
	var token = access_token
	var openid = openid
	var queryurl = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=" + token + "&openid=" + openid + "&lang=zh_CN"
	https.get(queryurl, function(openid_res) {
		var chunks = []
		var size = 0
		openid_res.on("data", function(chunk) {
			chunks.push(chunk)
			size += chunk.length
		})
		openid_res.on("end", function() {
			var buffer = Buffer2.concat(chunks, size)
			var str = buffer.toString()
			var data = JSON.parse(str)
			showLog("token:" + token)
			showLog("获取微信用户详细信息，openid=" + openid, str)
			data = {
				nickname: data.nickname,
				headimgurl: data.headimgurl,
				openid: data.openid,
				type: "weixin"
			}

			var currentUser = JSON.stringify(data)
			redis.hset(HN_WX_USER, openid, currentUser)
		})
	}).on("error", function(err) {
		showError("获取微信用户详细信息，openid=" + openid, err)
	})
}

app.post("/wxauth", function(req, res) {
	let arr = []
	arr.push(req.query.timestamp)
	arr.push(req.query.nonce)
	var token = "HzX2dt9nh"
	arr.push(token)
	arr.sort()
	var str = arr.join("")
	showLog("微信用户扫描关注公众号", req.body)
	let event = req.body.xml.event
	let eventkey = req.body.xml.eventkey
	let openid = req.query.openid
	if (Signature(str) == req.query.signature)
	;
	else return res.send(500, "err")
	if (((eventkey.indexOf(qrScene) >= 0 && event.indexOf("subscribe") >= 0) ||
			(eventkey.indexOf(qrCode) >= 0 && event.indexOf("SCAN") >= 0)) && openid) {
		redis.hget(HN_ACTUAL_SCENE_USER, openid, function(err, data) {
			if (!data) {
				showLog("微信用户扫码关注，openid=" + openid)
				redis.hset(HN_ACTUAL_SCENE_USER, openid, true)
			}
		})
	}
	if ((event.indexOf("subscribe")) >= 0 && openid) {
		redis.hget(HN_SUBSCRIBEUSER, openid, function(err, data) {
			if (!data) {
				showLog("微信用户关注公众号，openid=" + openid)
				redis.hset(HN_SUBSCRIBEUSER, openid, true)
			}
		})
		getUserProfile(openid)

		var res_obj = {
			xml: {}
		}
		res_obj.xml.ToUserName = [openid]
		res_obj.xml.FromUserName = ["gh_c1b1cadba59a"]
		res_obj.xml.CreateTime = [(req.body.xml.createtime - 0) + 100]
		res_obj.xml.MsgType = ["text"]
		res_obj.xml.Content = ["尊敬的嘉宾：\n<a href=\"http://public.stream.ruixuesoft.com\">有一台IPhone7等您领取，请点击下方“了解详情”参与抽奖</a>"]
		var builder = new xml2js.Builder()
		var xml = builder.buildObject(res_obj)
		showLog("微信关注后自动回复", xml)
		res.send(xml)
		return
	}
	if ((event.indexOf("unsubscribe")) >= 0 && openid) {
		//取消关注-从对应的关注用户集合中移除
		redis.hget(HN_SUBSCRIBEUSER, openid, function(err, data) {
			if (data) {
				showLog("微信用户取消关注公众号，openid=" + openid)
				redis.hdel(HN_SUBSCRIBEUSER, openid)
			}
		})
		//取消关注-从对应的扫描二维码集合中移除
		redis.hget(HN_ACTUAL_SCENE_USER, openid, function(err, data) {
			if (data) {
				showLog("微信用户取消关注公众号，openid=" + openid)
				redis.hdel(HN_ACTUAL_SCENE_USER, openid)
			}
		})
	}
	res.send("")
})

// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
	if (err) throw err

	// start the server if `$ node server.js`
	if (require.main === module)
		app.start()
})

process.on("message", function(msg) {
	//进程消息处理器
})

process.on("uncaughtException", function(err) {
	console.error("uncaughtException: %s", err.message)
	showError("未捕获的错误", err)
})