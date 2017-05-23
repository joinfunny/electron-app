<style lang="scss" scoped>
  @import '~vars';
  @import '../../assets/admin-ui/style/style.scss';
  .stream-admin {
    height: 100%;
  }
  .logo, .admin {
    height: 30px;
    line-height: 30px;
  }
  .logo {
    display: inline-block;
  }

  .admin {
    float: right;
  }
  .login{
    height:30px;
    line-height:30px;
    vertical-align:middle;
    a{
      color:#fff;
    }
  }
  .admin-icon{
    vertical-align:middle;
    margin:0px 4px;
  }
</style>
<template>
  <div class="stream-admin">
    <admin-page-container>
      <div slot="header">
        <div class="logo">Admin管理平台</div>
        <div class="login" :style="{float:'right'}"  v-if="username">
          <a><admin-icon type="ion-person" size="20px"></admin-icon>{{username}}</a>
          <a @click="logout"><admin-icon type="ion-log-out" size="20px"></admin-icon></a>
        </div>
      </div>
      <div slot="sidebar">
        <nav-bar class="stream-box stream-nav" />
      </div>
      <div slot="content">
        <admin-pannel>
          <router-view></router-view>
        </admin-pannel>
      </div>
    </admin-page-container>
  </div>
</template>

<script>
  import NavBar from '../nav'
  import utils from '../../assets/utils'
  export default {
    name: 'home',
    data () {
      return {
        username: utils.getStorage('username') || '',
        lastLoginTime: ''
      }
    },
    methods: {
      logout () {
        let that = this
        let data = {}
        that.api.logout({data, ajaxStart () {}}, false)
        .then(function (res) {
          if (res.code === 0) {
            that.username = ''
            utils.delStorage('username')
            that.$router.push('/')
          }
        })
      }
    },
    components: {
      NavBar
    }
  }
</script>

