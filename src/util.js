import DeepAssign from 'deep-assign'
import validator from '../backend/runtime/App/validator'

const root = window.root
const util = {
  extend: DeepAssign,
  Validator: validator,
  /**
   * 时间字符串转毫秒
   * @param timeString (1M,12h)
   * @returns timestamp
   */
  stringToMs (timeString) {
    let numExp = /\d+/g
    let unitExp = /[a-zA-Z]+/g
    let num = timeString.match(numExp)[0]
    let timeType = timeString.match(unitExp)[0]
    let enumeration = {
      m: 60000,
      h: 3600000,
      d: 86400000,
      w: 604800000,
      M: 2592000000
    }
    let res = num * enumeration[timeType]
    return res
  },
  /**
   * 数据分页
   * @param page
   * @param size
   * @param oData
   */
  pagingData (page, size, oData) {
    let res = []
    let start = page * size
    let end = start + size
    oData.map((m, i) => {
      if (start <= i && i < end) res.push(m)
    })
    return res
  },
  interval (fn, time = 60000) {
    return setInterval(() => {
      fn()
    }, time)
  },
  uuid () {
    let i, random
    let uuid = ''
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-'
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16)
    }
    return uuid
  },
  getChartColors () {
    return ['#5bd4c7', '#62a9ed', '#8bc34a', '#fabb3d', '#c090ec', '#67c2ef', '#fcdd5f', '#fd7979', '#7381ce']
  },
  // 绿桔红三色
  getGORColors () {
    return ['#5bd4c7', '#FFCC99', '#FF1F1F']
  },
  /**
   * 保留n位小数
   * @param srcNumber
   * @param n
   * @param isPad
   * @returns {*}
   */
  toDecimal (srcNumber, n = 2, isPad) {
    let dstNumber = parseFloat(srcNumber)
    if (isNaN(dstNumber)) {
      return srcNumber
    }
    if (dstNumber >= 0) {
      dstNumber = parseInt(dstNumber * Math.pow(10, n) + 0.5) / Math.pow(10, n)
    } else {
      let tmpDstNumber = -dstNumber
      dstNumber = parseInt(tmpDstNumber * Math.pow(10, n) + 0.5) / Math.pow(10, n)
    }
    let dstStrNumber = dstNumber.toString()
    let dotIndex = dstStrNumber.indexOf('.')
    // 是否补0
    if (isPad) {
      if (dotIndex < 0) {
        dotIndex = dstStrNumber.length
        dstStrNumber += '.'
      }
      while (dstStrNumber.length <= dotIndex + n) {
        dstStrNumber += '0'
      }
    }
    return Number(dstStrNumber)
  },
  /**
   * 补零
   * @param num
   * @returns {string}
   */
  pad (num) {
    return new Array(2 - ('' + num).length + 1).join(0) + num
  },
  /**
   * 格式化日期
   * @param val 时间戳 接受单位为毫秒
   * @param type 1：完整显示，2：不显示年,3:不显示分秒
   */
  formatDate (val, type = 1) {
    let result = ''
    let timestamp = val
    let d = new Date()
    d.setTime(timestamp)
    let year = d.getFullYear()
    let month = this.pad(d.getMonth() + 1)
    let day = this.pad(d.getDate())
    let housrs = this.pad(d.getHours())
    let minutes = this.pad(d.getMinutes())
    let seconds = this.pad(d.getSeconds())
    switch (type) {
      case 1:
        result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
        break
      case 2:
        result = month + '-' + day + ' ' + housrs + ':' + minutes
        break
      case 3:
        result = year + '-' + month + '-' + day
        break
      case 4:
        result = minutes + ':' + seconds
        break
      case 5:
        result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes
        break
      default:
        result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
        break
    }
    return result
  },
  /**
   * 获得地址栏传递参数
   * @returns {}
   * demo.html?cid=1&aa=2
   */
  getLocationParams: function (href) {
    href = href || location.href
    let params = {},
      query
    if (href.indexOf('?') !== -1) {
      query = href.slice(href.indexOf('?') + 1)
      if (query.length > 0) {
        params = {}
        query = query.split('&')
        query.map(function (param) {
          let tempParam = param.split('=')
          params[tempParam[0]] = decodeURI(param.substring(param.indexOf('=') + 1, param.length))
        })
      }
    }
    return params
  }
}
export default util
