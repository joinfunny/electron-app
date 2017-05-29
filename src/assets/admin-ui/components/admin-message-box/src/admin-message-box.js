// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

// Modifier:

import Vue from 'vue'
import AdModalTemplate from '../../admin-modal'
import AdAlertTemplate from './admin-alert'
import AdConfirmTemplate from './admin-confirm'
import AdPromptTemplate from './admin-prompt'
import { namespace } from '../../../helpers/common'

// make sure only single vue instance to save memos
function getInstance (type) {
  switch (type) {
    case 'modal':
      let res = null
      if (namespace.get('adModalIntance')) {
        res = namespace.get('adModalIntance')
      } else {
        res = new (Vue.extend(AdModalTemplate))({ el: document.createElement('div') })
        res.width = 320
        res.height = 164
        if (res.$refs.decline) res.$refs.decline.parentNode.removeChild(res.$refs.decline)
        namespace.set('adModalIntance', res)
      }
      return res
    case 'alert':
      return namespace.get('adAlertIntance') ||
        namespace.set('adAlertIntance', new (Vue.extend(AdAlertTemplate))({ el: document.createElement('div') }))
    case 'confirm':
      return namespace.get('adConfirmIntance') ||
        namespace.set('adConfirmIntance', new (Vue.extend(AdConfirmTemplate))({ el: document.createElement('div') }))
    case 'prompt':
      return namespace.get('adPromptIntance') ||
        namespace.set('adPromptIntance', new (Vue.extend(AdPromptTemplate))({ el: document.createElement('div') }))
  }
}

// get all instances
let instances = {
  modal: getInstance('modal'),
  alert: getInstance('alert'),
  confirm: getInstance('confirm'),
  prompt: getInstance('prompt')
}
// when modal close itself we shoud sync the display prop
instances.modal.$on('admin-modal-off', () => {
  if (instances.modal.$el.parentNode) {
    instances.modal.$el.parentNode.removeChild(instances.modal.$el)
    instances.modal.display = false
  }
})
// when click buttons call the handler
instances.modal.$on('admin-modal-cancel', () => {
  let config = instances.modal.config
  if (config.cancel && typeof config.cancel === 'function') {
    Vue.nextTick(() => {
      config.cancel(config.type === 'prompt' ? instances[config.type].value : undefined)
    })
  }
})
// refresh el innnerHTML
function refreshContent (el, content) {
  el.innerHTML = ''
  el.appendChild(content)
}

function MessageBox (config) {
  let { type = 'alert', message, validators, reset, buttonClass, placeholder } = config
  if (!type || ['alert', 'confirm', 'prompt'].indexOf(type) === -1) {
    console.warn('massage box: type is required and must be "alert","confirm" or "prompt"')
  }

  // deal with the modal config
  instances.modal.config = config
  if (type === 'alert') {
    instances.modal.buttons = [{
      name: 'confirm',
      text: '确定',
      buttonClass: buttonClass ? buttonClass.confirm : ''
    }]
  }
  if (type === 'confirm') {
    instances.modal.buttons = [{
      name: 'cancel',
      text: '取消',
      buttonClass: buttonClass ? buttonClass.cancel : 'admin-auxiliary'
    }, {
      name: 'confirm',
      text: '确定',
      buttonClass: buttonClass ? buttonClass.confirm : ''
    }]
  }
  if (type === 'prompt') {
    instances.modal.buttons = [{
      name: 'cancel',
      text: '取消',
      buttonClass: buttonClass ? buttonClass.cancel : 'admin-auxiliary'
    }, {
      name: 'confirm',
      text: '确定',
      buttonClass: buttonClass ? buttonClass.confirm : '',
      handler () {
        let config = instances.modal.config
        if (config.type === 'prompt') {
          if (config.confirm && typeof config.confirm === 'function') {
            if (instances[config.type].validate()) {
              Vue.nextTick(() => {
                config.confirm(instances[config.type].value)
              })
            } else {
              return true
            }
          }
        } else {
          if (config.confirm && typeof config.confirm === 'function') {
            Vue.nextTick(() => {
              config.confirm()
            })
          }
        }
      }
    }]
  }
  if (type === 'prompt') instances.modal.height = 198
  else instances.modal.height = 144

  // get a content instance
  let contentInstance = instances[type]
  if (reset) {
    contentInstance.value = ''
    contentInstance.warnings = null
  }
  // set content instance props
  Object.assign(contentInstance, {message, validators, placeholder})
  // put the content into modal and show them on document
  refreshContent(instances.modal.$refs.content, contentInstance.$el)
  instances.modal.display = true
  // auto focus
  if (contentInstance.$refs.core && contentInstance.$refs.core.$refs.core) {
    contentInstance.$refs.core.$refs.core.focus()
  }
  document.body.appendChild(instances.modal.$el)
}
MessageBox.alert = function (config) {
  MessageBox(Object.assign(config, {
    type: 'alert'
  }))
}
MessageBox.confirm = function (config) {
  MessageBox(Object.assign(config, {
    type: 'confirm'
  }))
}
MessageBox.prompt = function (config) {
  MessageBox(Object.assign(config, {
    type: 'prompt'
  }))
}
export default MessageBox
