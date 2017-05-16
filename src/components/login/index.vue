<style lang="scss">
@import '~vars';
.stream-login-container{
    width: 350px;
    height: 322px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e0e0f4;
    position: absolute;
    bottom: 0;
    top: -200px;
    left: 0;
    right: 0;
    margin: auto;
    padding-top: 20px;
  .login-section{
    margin-left: 40px;
    .field-group{
      margin-bottom: 10px;
    }
    .code-container{
      position: relative;
    }
    .code-img{
      width: 60px;
      height: 32px;
      position: absolute;
      left: 138px;
      top: 22px;
    }
  }
}
</style>
<template src="./template.html"></template>
<script>
import { AdminToast } from '../../assets/admin-ui'
import utils from '../../assets/utils'
export default {
  name: 'login-panel',
  beforeCreate () {
    var that = this
    that.api.vcode({r: new Date() * 1}).then(function (res) {
      that.imgVcode = 'data:image/png;base64,' + res.result
    })
  },
  data () {
    return {
      username: '',
      password: '',
      warnings: '',
      code: '',
      imgVcode: '',
      times: 0
    }
  },
  computed: {
    usernameValidators () {
      return [
        {
          validator (value) {
            return !/^\s+$/.test(value) && value !== ''
          },
          warning: '用户名不可为空'
        }
      ]
    },
    passwordValidators () {
      return [
        {
          validator (value) {
            return !/^\s+$/.test(value) && value !== ''
          },
          warning: '密码不可为空'
        },
        {
          validator (value) {
            return /^[0-9a-zA-Z_]{1,20}$/.test(value)
          },
          warning: '密码输入格式错误'
        }
      ]
    },
    codeValidators () {
      return [
        {
          validator (value) {
            return !/^\s+$/.test(value) && value !== ''
          },
          warning: '验证码不可为空'
        }
      ]
    }
  },
  methods: {
    // 查询列表数据
    login () {
      let that = this
      if (!that.username) {
        AdminToast({ message: '用户名不能为空' })
        return
      } else if (that.username.length > 50) {
        AdminToast({ message: '用户名不能大于50个字符' })
        return
      }
      if (!that.password) {
        AdminToast({ message: '密码不能为空' })
        return
      } else if (that.password.length > 50) {
        AdminToast({ message: '密码不能大于50个字符' })
        return
      }
      /*
      if (that.times >= 3 && !that.code) {
        AdminToast({ message: '密码码不能为空' })
        return
      }
      if (that.code.length > 4) {
        AdminToast({ message: '验证码不能大于4位' })
        return
      } */
      var data = {
        username: that.username,
        password: that.password,
        code: that.code
      }
      this.api.login({data: data}).then(function (res) {
        if (res.success === true) {
          that.$emit('login', that.username)
          utils.setStorage('username', that.username)
          that.$router.push('/home')
        } else {
          AdminToast({ message: res.msg })
          that.times++
        }
      })
    },

    getCode () {
      var that = this
      that.api.vcode({r: new Date() * 1}).then(function (res) {
        that.imgVcode = 'data:image/png;base64,' + res.result
      })
    },

    keydown (e) {
      if (e.key === 'Enter') {
        this.login()
      }
    }
  }
}
</script>

