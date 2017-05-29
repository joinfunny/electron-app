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
      return [
        {
          'text': '投诉订单',
          'active': true,
          'url': '',
          'collapse': false,
          'children': [
            {
              'text': '订单列表',
              'url': '/complaints',
              'active': true
            },
            {
              'text': '订单处理',
              'url': '/handles'
            }
          ]
        }
      ]
    }
  }
}
