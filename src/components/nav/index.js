export default {
  name: 'nav-menu',
  template: '<div><admin-menu :menu-items="menus" @admin-menu-select="go" /></div>',
  mounted: function () {
    this.menus = this.getMenuList()
  },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    go: function (item) {
      console.log(item.url)
      this.$router.push(item.url)
    },
    getMenuList: function () {
      return [{
        'text': '数据概览',
        'active': true,
        'url': '/home'
      },
      {
        'text': '投诉订单',
        'active': false,
        'url': '',
        'collapse': false,
        'children': [{
          'text': '订单列表',
          'url': '/complaints',
          'active': false
        },
        {
          'text': '订单处理',
          'url': '/handles',
          'active': false
        }]
      }
      ]
    }
  }
}
