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
          'text': '用户管理',
          'active': true,
          'url': '',
          'collapse': false,
          'children': [
            {
              'text': '用户列表',
              'url': '/userlist',
              'active': true
            }
          ]
        },
        {
          'text': '权限管理',
          'url': '',
          'collapse': true
        }
      ]
    }
  }
}
