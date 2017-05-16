/**
 * @author jiangfeng
 * @summary 服务处理器
 */
var express = require('express')
var log = require('./App/log').helper

module.exports = {
  defaultMethod: 'get',
  router: null,
  initRouter: function () {
    let that = this
    if (that.router === null) {
      that.router = express.Router()
    }
  },
  onMocking: function (reqPath, method, req, res) {
    log.warn('正在执行mock service：' + reqPath, res)
  },
  /**
   * 以回调的方式请求服务
   * 常用在请求处理逻辑中不能同步返回数据的业务场景下调用
   * @param  {string}     reqPath   请求地址
   * @param  {string}     method    get/post
   * @param  {Function}   exec      必须带有四个参数的函数体:req,res,next,callback
   * @param  {Boolean}    mock      是否MOCK数据
   * @return {Router}               当前注册完毕的Router对象
   */
  callback: function (reqPath, method, exec, mock) {
    let that = this
    that.initRouter()
    method = method || 'get'
    that.router[method](reqPath, function (req, res, next) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      var params = Array.prototype.slice.call(arguments, 0)
      params.push(function (actionResult) {
        res.json(actionResult)
        res.end()
      })
      mock && that.onMocking(reqPath, method, req, res)
      exec.apply(that, params)
    })
    return that
  },
  /**
   * 直接返回的方式请求服务
   * 常用在请求处理逻辑中能同步返回数据的业务场景下调用
   * @param  {string}     reqPath 请求地址
   * @param  {string}     method  get/post
   * @param  {Function}   exec    必须带有三个参数的函数体:req,res,next
   * @param  {mock}       mock    是否MOCK数据
   * @return {Router}             当前注册完毕的Router对象
   */
  send: function (reqPath, method, exec, mock) {
    var that = this
    that.initRouter()
    method = method || that.defaultMethod
    that.router[method](reqPath, function (req, res, next) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      mock && that.onMocking(reqPath, method, req, res)
      var actionResult = exec.apply(this, arguments)
      res.json(actionResult)
      res.end()
    })
    return that
  }
}
