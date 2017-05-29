export default [
  {
    path: '/',
    component: resolve => require(['../components/login/index'], resolve)
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['../components/home/home'], resolve),
    children: [
      {
        path: '/',
        component: resolve => require(['../components/complaints/index'], resolve)
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: resolve => require(['../components/userlist/index'], resolve)
      },
      {
        path: '/complaints',
        name: 'complaintList',
        component: resolve => require(['../components/complaints/index'], resolve)
      },
      {
        path: '/handles',
        name: 'handlesList',
        component: resolve => require(['../components/handles/index'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../components/login/index'], resolve)
  }
]
