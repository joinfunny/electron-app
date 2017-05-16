import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routerMap from './router'
import AdminUI from './assets/admin-ui'
import api from './assets/ajax-api'
import Models from './models'
/* Vue.config.productionTip = false */
/* eslint-disable no-new */

Vue.use(Router)
var router = new Router({routes: routerMap})
/**
 * 全局注册admin-ui
 */
Vue.use(AdminUI)
var apis = api(Models)
Object.defineProperty(Vue.prototype, 'api', {value: apis})
router.beforeEach(routerBefore)
new Vue({
  el: '#app',
  router: router,
  template: '<App />',
  components: {
    App
  }
})

function routerBefore (to, from, next) {
  if (to.path !== '/' && to.path !== '/login') {
    apis.isLogin().then(function (res) {
      if (res.success) {
        next()
      } else {
        next({path: '/'})
      }
    })
  } else {
    next()
  }
}
