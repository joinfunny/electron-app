import $ from 'jquery'
import { AdminToast } from '../admin-ui'
import gls from '../global-loading-spinner'

let defaultGlobleConfig = {
  ajaxStart () {},
  ajaxSend () {},
  ajaxSuccess () {},
  ajaxError () {},
  ajaxComplete () {},
  ajaxStop () {}
}

function getMessage (xhr) {
  let message = ''
  try {
    message = JSON.parse(xhr.responseText).message
  } catch (e) {
    message = xhr.responseText
  }
  return message
}
function handleError (errTextMap = {}, xhr, toast) {
  let message = getMessage(xhr)
  if (message) console.error('Ajax: ' + message)
  if (toast) toast({message: errTextMap[xhr.status], duration: 3500})
}
function handleSuccess (xhr, toast) {
  let message = getMessage(xhr)
  if (xhr.status === 200) {
    if (toast) toast({ message: '请求成功' })
  } else {
    if (toast) {
      toast({
        message: '请求异常',
        iconClass: 'ion-android-cancel'
      })
    }
    if (message) console.warn('Ajax: ' + message)
  }
}
function getApi (modelConfig = {}, registerConfig = {}, config = {}) {
  let api = config.url || modelConfig.url || registerConfig.url || ''
  return config.__abandonGlobalApiRoot || modelConfig.__abandonGlobalApiRoot || registerConfig.__abandonGlobalApiRoot
    ? api
    : (config.__apiRoot || modelConfig.__apiRoot || registerConfig.__apiRoot || '') + api
}

let defaultErrTextMap = {
  '400': '请求参数错误',
  '401': '您未登陆，请登录',
  '403': '没有权限',
  '404': '未找到相关接口',
  '408': '请求超时',
  '1001': '用户名不存在'
}

let apiRegister = function (models, registerConfig) {
  // globle config
  $.ajaxSetup(Object.assign(
    {},
    defaultGlobleConfig,
    models.__globlal || {},
    registerConfig || {}
  ))

  let api = {}
  for (let key in models) {
    if (!/^__/g.test(key)) {
      api[key] = function (config = {}, globalLoadingSpinner = false, successToast = false, errorToast = true) {
        return $.ajax(Object.assign({},
          models[key],
          config,
          {
            url: getApi(models[key], registerConfig, config)
          },
          globalLoadingSpinner ? {
            beforeSend () {
              gls.on()
            },
            complete () {
              gls.off()
            }
          } : {}))
        .done((data, textStatus, xhr) => {
          handleSuccess(xhr, successToast ? AdminToast : null)
        })
        .fail((xhr) => {
          handleError(models.__errTextMap ||
            defaultErrTextMap, xhr, errorToast ? AdminToast : null)
        })
      }
    }
  }
  return api
}

export default apiRegister
