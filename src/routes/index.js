import application from './config/application'

let mainRoutes = [].concat(application)

var routes = [
  {
    path: '/',
    component: resolve => require(['../views/home.vue'], resolve),
    children: mainRoutes
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login/index.vue'], resolve)
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['../views/404.vue'], resolve)
  },
  {
    path: '*',
    redirect: {
      name: '404'
    }
  }
]

export default routes
