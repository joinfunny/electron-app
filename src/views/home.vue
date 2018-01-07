<style lang="scss">
  @import "../assets/css/index";
  @import "../assets/css/ionicons/ionicons.css";
  @import "~vars";

  .app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .main {
    position: absolute;
    top: $headerHeight+1;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .main:after {
    content: "";
    display: block;
    clear: both;
  }

  .left-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: $leftWidth;
    .left-system {
      height: 50px;

    }
    .left-hr {
      width: 100%;
      padding: 0;
      box-sizing: border-box;
      .border-top {
        width: 100%;
        height: 5px;
        border-top: 1px solid;
      }
    }
    .left-menu {
      position: absolute;
      top: 61px;
      bottom: 40px;
      overflow-y: auto;
    }
    .left-show {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 39px;
      box-sizing: border-box;
      padding: 0;
      cursor: pointer;
      .icon-box {
        width: 100%;
        height: 100%;
        text-align: right;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 1px solid;
        padding-right: 10px;
        box-sizing: border-box;
      }
    }
  }

  .left-content.mini {
    width: 66px;
    .left-show {
      .icon-box {
        padding-right: 0;
        justify-content: center;
      }
    }
  }

  .main-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: $leftWidth+1;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .main-content.mini {
    left: 67px;
  }

  .banner {
    z-index: 999;
    width: 100%;
  }

  .main-content-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    background-color: #f7f7f7;
  }
</style>
<template>
  <div id="app" class="app theme-font-color-base">
    <div class="banner">
      <apm-header></apm-header>
    </div>
    <div class="main">
      <div class="left-content theme-background-color-normal-1" :class="left.className">
        <div class="left-system">
        </div>
        <div class="left-hr">
          <div class="border-top theme-border-color-base"></div>
        </div>
        <left-menu class="left-menu" :type="left.className"></left-menu>
        <div class="left-show" @click="miniAction">
          <div class="icon-box theme-border-color-base">
            <i class="theme-font-icon-color-weak icon" :class="left.iconName"></i>
          </div>
        </div>
      </div>
      <div class="main-content theme-background-color-normal-1" :class="left.className">
        <div class="main-content-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import apmHeader from '../components/layout/header.vue'
  import leftMenu from '../components/layout/left-menu.vue'

  export default {
    name: 'home',
    components: {apmHeader, leftMenu},

    data() {
      return {
        left: {
          className: '',
          iconName: 'ion-chevron-left'
        },
        ssPackUp: false, // 是否收起
        leftMenu: []
      }
    },
    created() {
      this.fetchMenuType()
    },
    mounted() {

    },
    methods: {
      fetchMenuType() {
        let leftMenuType = localStorage.getItem('leftMenuType')
        if (leftMenuType) {
          this.left = {
            className: leftMenuType,
            iconName: 'ion-chevron-right'
          }
          this.ssPackUp = true
        } else {
          this.left = {
            className: '',
            iconName: 'ion-chevron-left'
          }
          this.ssPackUp = false
        }
      },
      miniAction() {
        if (this.left.className === 'mini') {
          localStorage.setItem('leftMenuType', '')
          this.left = {
            className: '',
            iconName: 'ion-chevron-left'
          }
          this.ssPackUp = true
        } else {
          localStorage.setItem('leftMenuType', 'mini')
          this.left = {
            className: 'mini',
            iconName: 'ion-chevron-right'
          }
          this.ssPackUp = false
        }
        this.ssPackUp = !this.ssPackUp
      }
    }
  }
</script>

