var request = require("request")
var async = require("async")
var xmlparser = require("express-xml-bodyparser")
var xml2js = require("xml2js")
var HttpClient = require("../httpClient")

module.exports = function(app, config) {

  const TWODEMI = "EA560_90Jkj" //QR code--场景ID--不可修改
  const TWODEMIR = "qrscene_EA560_90Jkj" //微信返回的场景ID--不可修改
  const APPID = "wx38c16e637c4ba5fa" //微信公众号APPID--不可修改
  const APPSOURCEID = "gh_c1b1cadba59a" //公众号原始ID
  const APPTOKEN = "HzX2dt9nh" //微信公众号服务器配置的TOKEN
  const SECRET = "bc8d2abd3e6d6bf29bb3afff60eac64d" //微信公众号SECRET--不可修改
  const MINXLEN = 16 //校验appid长度。


  const UNIQUE = "163"


  const SHARE = "STREAM_SHARE" //分享的Key值
  const EXCLUDE = "STREAM_EXCLUDE" //排除的所有用户信息
  const ATTENDEE = "STREAM_ACTUAL_SCENE_USER" //当场扫描二维码的用户集合
  const SUBSCRIBE = "STREAM_WX_SUBSCRIBE_USER" //订阅公众号的所有用户ID集合
  const USER = "STREAM_WX_USERINFO" //存储所有微信关注用户的详细信息
  const SUGGEST = "STREAM_SUGGEST" //存储所有留言
  const SHAREOPENID = "STREAM_SHARE_OPENID" //浏览分享页面的OPENID存储


  //分享表
  const HN_SHARE = SHARE + UNIQUE

  //排除抽奖的用户表
  const HN_EXCLUDE = EXCLUDE + UNIQUE

  //扫描二维码的用户集合
  const HN_ACTUAL_SCENE_USER = ATTENDEE + UNIQUE

  //订阅公众号的所有用户集合
  const HN_SUBSCRIBEUSER = SUBSCRIBE + UNIQUE

  const HN_WX_USER = USER + UNIQUE

  //留言表
  const HN_SUGGEST = SUGGEST + UNIQUE

  //分享查看者
  const HN_SHAREOPENID = SHAREOPENID + UNIQUE



  let access_token = null
  let jsapi_ticket = null
  let runningonce = false


  app.use(xmlparser())


  function getTicket(access_token) {
    var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi"

    request.get(url, function(error, response, body) {
      var dataObject = {}
      dataObject = Object.prototype.toString.call(response.body) === "[object Object]" ? response.body : (JSON.parse(response.body) || {})
      console.log("根据微信TOKEN获取ticket", data)
      jsapi_ticket = dataObject.ticket
    })
  }


  function demention() {

    let data = {
      action_name: "QR_LIMIT_STR_SCENE",
      action_info: {
        scene: {
          scene_str: TWODEMI
        }
      }
    }

    //data = JSON.stringify(data);

    let url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + access_token

    request.post(url, {
      json: true,
      body: data
    }, function(err, response, body) {
      if (err) {
        console.log("获取微信场景二维码", err)
      }
    })
  }
  /**
   *
   */
  function j2f(data) {
    var arr = []
    for (let param in data) {
      if (data.hasOwnProperty(param)) {
        arr.push(param + "=" + data[param].toString())
      }
    }
    return arr.join("&")
  }

  /**
   * 创建菜单
   */
  function createMenu() {
    if (runningonce) return
    runningonce = true
    let data = ""
    //data = j2f(data);
    data = "body=%7B%0D%0A++++%22button%22%3A+%5B%0D%0A++++++++%7B%0D%0A++++++++++++%22type%22%3A+%22view%22%2C+%0D%0A++++++++++++%22name%22%3A+%22%E4%BA%86%E8%A7%A3%E8%AF%A6%E6%83%85%22%2C+%0D%0A++++++++++++%22url%22%3A+%22http%3A%2F%2Fstream.jianfeng100.com%22%0D%0A++++++++%7D%0D%0A++++%5D%0D%0A%7D"

    let url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token
    request.post(url, {
      //json: true,
      body: data
    }, function(err, response, body) {
      if (err) {
        console.log("创建菜单失败", err)
      }
    })

  }

  function getToken() {
    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + SECRET
    request.get(url, function(err, response, body) {
      var dataObject = {}
      dataObject = Object.prototype.toString.call(response.body) === "[object Object]" ? response.body : (JSON.parse(response.body) || {})

      console.log("刷新微信TOKEN：", dataObject)
      access_token = dataObject.access_token
      getTicket(access_token)
      createMenu()
    })

  }

  app.get("/update", function(req, res) {
    showLog("更新share taskId")
    childprocess.exec("cd /root/local/git-project/stream&&git pull&&pm2 restart server",
      function(error, stdout, stderr) {
        if (error !== null) {
          showLog("exec error: " + error)
        }
      })
    res.send("OK")
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
    let code = req.query.code
    let openId = req.query.state
    let url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID + "&secret=" + SECRET + "&code=" + code + "&grant_type=authorization_code"

    async.waterfall([function(callback) {
      request.get(url, function(err, response, body) {
        let userInfo = {}
        userInfo = Object.prototype.toString.call(response.body) === "[object Object]" ? response.body : (JSON.parse(response.body) || {})
        let shareOpenId = userInfo.openid

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
        callback(null, userInfo)
      })
    }, function(userInfo, callback) {
      let url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + userInfo.access_token + "&openid=" + userInfo.openid + "&lang=zh_CN"
      request.get(url, function(err, response, body) {
        var userInfo = {}
        userInfo = Object.prototype.toString.call(response.body) === "[object Object]" ? response.body : (JSON.parse(response.body) || {})
        showLog("根据授权获取用户信息", userInfo)
        callback(userInfo)
      })
    }], function(err, callback) {
      res.cookie("__userinfo__", JSON.stringify(userInfo)).sendFile(path.resolve(__dirname, "..", "client/public_d/html", "share.html"))
    })
  })

  app.get("/userprofile", function(req, res) {
    let id = null
    if (req.query.id) id = req.query.id
    else {
      id = req.cookies ? req.cookies.__id__ : null
    }
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

    arr.push(APPTOKEN)
    arr.sort()
    var str = arr.join("")
    if (Signature(str) == req.query.signature) {
      showLog("微信公众号验证成功：" + req.query.signature)
      showLog.log("回发消息：" + echostr)
      res.send(echostr)
    } else {
      showLog("微信公众号验证失败", {
        timestamp: req.query.timestamp,
        nonce: req.query,
        nonce,
        echostr: req.query.echostr
      })
      res.send(500, "error")
    }
  })


  function getUserProfile(openid) {
    var token = access_token
    var openid = openid
    var queryurl = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=" + token + "&openid=" + openid + "&lang=zh_CN"
    request.get(queryurl, function(err, response, body) {
      if (err) {
        showError("获取微信用户详细信息，openid=" + openid, err)
        return
      }
      var dataObject = {}
      dataObject = Object.prototype.toString.call(response.body) === "[object Object]" ? response.body : (JSON.parse(response.body) || {})
      showLog("获取微信用户详细信息，openid=" + openid, str)
      dataObject = {
        nickname: dataObject.nickname,
        headimgurl: dataObject.headimgurl,
        openid: dataObject.openid,
        type: "weixin"
      }

      var currentUser = JSON.stringify(dataObject)
      redis.hset(HN_WX_USER, openid, currentUser)

    })
  }

  app.post("/wxauth", function(req, res) {
    let arr = []
    arr.push(req.query.timestamp)
    arr.push(req.query.nonce)
    arr.push(APPTOKEN)
    arr.sort()
    var str = arr.join("")
    showLog("微信用户扫描关注公众号", req.body)
    let event = req.body.xml.event
    let eventkey = req.body.xml.eventkey
    let openid = req.query.openid
    if (!Signature(str) == req.query.signature) {
      return res.send(500, "err")
    }
    if (((eventkey.indexOf(TWODEMIR) >= 0 && event.indexOf("subscribe") >= 0) ||
        (eventkey.indexOf(TWODEMI) >= 0 && event.indexOf("SCAN") >= 0)) && openid) {
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
      res_obj.xml.FromUserName = [APPSOURCEID]
      res_obj.xml.CreateTime = [(req.body.xml.createtime - 0) + 100]
      res_obj.xml.MsgType = ["text"]
      res_obj.xml.Content = ["尊敬的嘉宾：\n<a href=\"http://stream.jianfeng100.com\">有一台IPhone7等您领取，请点击下方“了解详情”参与抽奖</a>"]
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

}