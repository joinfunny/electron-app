var moment = require('moment')
var store = require('../store')
/**
 * 计算结束时间
 *
 * @param {any} momentTime moment对象生成的时间
 * @param {any} unit 计算结束时间依赖的单位
 * @returns 返回计算结束时间
 */
function formatUnitTime (momentTime, unit) {
  var formattedTime
  switch (unit) {
    case 'days':
      formattedTime = momentTime.format('YYYY-MM-DD 00:00:00')
      break
    case 'hours':
      formattedTime = momentTime.format('YYYY-MM-DD HH:00:00')
      break
    case 'minites':
      formattedTime = momentTime.format('YYYY-MM-DD HH:mm:00')
      break
    case 'seconds':
      formattedTime = momentTime.format('YYYY-MM-DD HH:mm:ss')
      break
  }
  return formattedTime
}

/**
 * 计算定时器的定时间隔
 *
 * @param {any} unit 依赖的单位
 * @param {any} timeSpan 依赖的时间间隔
 * @returns
 */
function calcTimeTick (unit, timeSpan) {
  var timeTick
  switch (unit) {
    case 'hours':
      timeTick = timeSpan * 1000 * 60 * 60
      break
    case 'minites':
      timeTick = timeSpan * 1000 * 60
      break
    case 'seconds':
      timeTick = timeSpan * 1000
      break
  }
  return timeTick
}

class Task {
  /**
   * 任务构造器
   * @param {String} type 要执行的数据类型：1为投诉订单，2为订单处理
   * @param {String} unit 时间单位，可为：days,hours,minutes,seconds
   * @param {Int} timeSpan 具体的时间间隔，为数字
   * @param {PromiseFunction} promiseFunc
   * @memberof Task
   */
  constructor (type, unit, timeSpan, promiseFunc) {
    this.startTime = null
    this.lock = false
    this.type = type
    this.unit = unit
    this.timeSpan = timeSpan
    this.promiseFunc = promiseFunc
    this.timeTick = calcTimeTick(unit, timeSpan)
  }

  run () {
    var that = this
    var promiseFunc = that.promiseFunc || function () {}
      /**
       * 获取要统计的时间区间
       */
    if (!that.startTime && !that.lock) {
      store.complaints
        .first(that.type)
        .then(function (result) {
          if (!result) {
            that.startTime = moment('2017-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')
          } else {
            that.startTime = moment(result.createdAt).format('YYYY-MM-DD HH:mm:ss')
          }
          that.endTime = formatUnitTime(moment().subtract(that.timeSpan, that.unit), that.unit)
        })
      return
    }

    that.endTime = formatUnitTime(moment().subtract(that.timeSpan, that.unit), that.unit)

    that.lock = true
    var promise = promiseFunc.call(that)
    promise.always(function () {
      that.startTime = that.endTime
      that.lock = true
    })
  }

}

/* function base ({type, unit, timeSpan, promiseFunc}) {
  var timeTick = calcTimeTick(unit, timeSpan)
  var task = {
    startTime: null,
    lock: false,
    timeTick: timeTick,
    run: function () {
      var that = this

      //获取要统计的时间区间
      if (!that.startTime && !that.lock) {
        store.complaints
        .first(type)
        .then(function (result) {
          if (!result) {
            that.startTime = moment('2017-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')
          } else {
            that.startTime = moment(result.createdAt).format('YYYY-MM-DD HH:mm:ss')
          }
          that.endTime = formatUnitTime(moment().subtract(timeSpan, unit), unit)
        })
        return
      }

      that.endTime = formatUnitTime(moment().subtract(timeSpan, unit), unit)

      that.lock = true
      var promise = promiseFunc.call(that)
      promise.always(function () {
        that.startTime = that.endTime
        that.lock = true
      })
    }
  }
  return task
} */

module.exports = Task
