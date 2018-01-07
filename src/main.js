import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

import App from './App'
import store from './store.js'
import models from './models/index'
import { Loading } from 'element-ui'
import './assets/css/element-variables.scss'
// Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.use(Router)

function ajaxManager(models, commonOpts) {
  let defaultOptions = {
    __apiRoot: '/api',
    method: 'get',
    contentType: 'application/json',
    dataType: 'json'
  }
  let apis = {}
  Object.keys(models).forEach(key => {
    let model = models[key]
    apis[key] = opts => {
      let options = $.extend({}, model, defaultOptions, commonOpts, opts)
      if (options.__apiRoot) {
        options.url = options.__apiRoot + options.url
      }
      return $.ajax(options)
    }
  })
  return apis
}

// 全局组件
const globalComponents = [
  require('./components/layout/top-bar.vue'),
  require('./components/filter-bar/filter-bar-complex.vue')
]

globalComponents.map(m => {
  Vue.component(m.name, m)
})

Vue.config.productionTip = false

let router = new Router({ routes })
Object.defineProperty(
  Vue.prototype,
  'api',
  {
    value: ajaxManager(models, {
      error(xhr, textStatus, err) {
      },
      success(res) {

      }
    })
  }
)

const eventBus = new Vue(store)
new Vue({
  router,
  template: '<App/>',
  components: { App },
  data: { eventBus }
}).$mount('#app')
