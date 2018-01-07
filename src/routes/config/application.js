export default [
  {
    'path': 'application',
    name: 'application',
    redirect: 'complaints',
    component: resolve => require(['../../views/application/index.vue'], resolve),
    children: [
      {
        path: 'complaints',
        name: 'complaints',
        redirect: '/complaints',
        component: resolve => require(['../../views/application/src/complaints/index.vue'], resolve)
      },
      {
        path: 'hanldes',
        name: 'hanldes',
        redirect: '/hanlders',
        component: resolve => require(['../../views/application/src/handles/index.vue'], resolve)
      }
    ]
  }
]
