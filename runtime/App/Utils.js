let AppConfig = require('./AppConfig')
let _ = require('lodash')

class RuntimeCode {
  constructor (code, success, tag, msg) {
    this.code = code
    this.success = success
    this.tag = tag
    this.msg = msg
  }
  toString () {
    return `{code}:{tag} {msg}`
  }
}
class ServiceCode {
  constructor (code, success, tag, msg) {
    this.code = code
    this.success = success
    this.tag = tag
    this.msg = msg
  }
  toString () {
    return `{code}:{tag} {msg}`
  }
}

let initRuntimeCodes = () => {
  let codes = {}
  AppConfig.message.runtime.forEach((item, index) => {
    codes[item[2] + ''] = new RuntimeCode(item[0], item[1], item[2], item[3])
  })
  return codes
}

let initServiceCodes = () => {
  let codes = {}
  AppConfig.message.service.forEach((item, index) => {
    codes[item[0] + ''] = new ServiceCode(item[0], item[1], item[2], item[3])
  })
  return codes
}

let Utils = {
  _: _,
  RuntimeCodes: initRuntimeCodes(),
  ServiceCodes: initServiceCodes(),
  /**
   * @param success 是否成功
   * @param msg 回调返回的消息
   * @param dataObject 回调最终返回的默认数据
   */
  GetCallBackObject: (success, msg, dataObject) => {
    return {
      success: success || false,
      msg: msg || '',
      dataObject: dataObject || null
    }
  },
  /**
   * @param {IncomingResponse} reponse 请求体输出对象
   * @return {Object} 格式化为JSON对象
   */
  HttpClientResponseDataFormatter: (response) => {
    var dataObject = {}
    dataObject = Object.prototype.toString.call(response.body) === '[object Object]' ? response.body : (JSON.parse(response.body) || {})
    var code = Utils.ServiceCodes[dataObject.code + '']
    dataObject.success = code ? code.success : false
    dataObject.msg = code ? code.msg : (dataObject.msg || '')
    dataObject.dataObject = dataObject.dataObject || dataObject.data
    delete dataObject.data
    return dataObject
  }
}

module.exports = Utils
