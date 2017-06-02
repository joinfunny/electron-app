let Runtime = require('../runtime/index')
let SessionStore = Runtime.SessionStore
// let loginServer = require('../modules/login')

module.exports = {
  '/api/user/login': {
    method: 'post',
    mock: {
      on: true,
      /**
       * Mock数据规则，可为Function，也可为直接Mock规则
       */
      dataRegular: (request) => {
        if (request.body.username === 'admin' && request.body.password === 'Aaa12345') {
          return {
            success: true
          }
        }
        return {
          success: false,
          msg: '用户名或密码错误'
        }
      }
    },
    validate: [{
      field: 'username',
      options: {
        required: true,
        missingMessage: '用户名不可为空'
      }
    }, {
      field: 'password',
      options: {
        required: true,
        missingMessage: '密码不可为空',
        validType: 'length[5,20]',
        invalidMessage: '密码长度必须大于5位、小于20位'
      }
    }],
    // loginServer.login
    callback: function (request, response, next, callback) {
      if (request.body.username === 'admin' && request.body.password === 'Aaa12345') {
        callback({
          success: true
        })
        return
      }
      callback({
        success: false,
        msg: '用户名或密码错误'
      })
    }
  },
  '/api/user/logout': {
    method: 'post',
    mock: {
      on: false
    },
    callback: function (req, res, callback) {
      var actionResult = {}
      req.session.cookie.maxAge = 0
      actionResult.code = 0
      actionResult.success = true
      actionResult.msg = ''
      callback(actionResult)
    }
  },
  '/api/user/isLogin': {
    method: 'get',
    mock: {
      on: true,
      dataRegular: (requst) => {
        return {
          success: true,
          code: 0
        }
      }
    },
    callback: function (req, res, callback) {
      var actionResult = {}
      if (SessionStore.getAccessInfo(req)) {
        actionResult.code = 0
        actionResult.success = true
      }
      callback(actionResult)
    }
  },
  '/api/vcode': {
    method: 'get',
    mock: {
      on: true,
      dataRegular: (request) => {
        return {
          success: true,
          code: 0
        }
      }
    },
    // loginServer.vcode
    callback: function () {}
  }
}
