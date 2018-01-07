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
        component: resolve => require(['../../views/application/src/complaints/index.vue'], resolve)
      },
      {
        path: 'handles',
        name: 'handles',
        component: resolve => require(['../../views/application/src/handles/index.vue'], resolve)
      },
      {
        path: 'settings',
        name: 'settings',
        component: resolve => require(['../../views/application/src/settings/index.vue'], resolve)
      }
    ]
  }
]
