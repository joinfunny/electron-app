<style lang="scss">
@import "~vars";

$barHeight: 36px;
.filter-bar {
  //background: #fff;
  margin: $marginWidth $marginWidth 0px $marginWidth;
  .filter-bar-query {
    height: $barHeight;
    padding: 0px;
    box-shadow: 0 0px 1px rgba(60, 65, 71, 0.5);
    background: #fff;
    .submit {
      width: 100px;
      float: right;
    }
    .query {
      position: relative;
      float: right;
    }
    .query > .el-input > .el-input__inner {
      border-width: 0px 0px 0px 1px;
      height: $barHeight !important;
      color: #666;
      border-radius: 0;
      &:focus,
      &:hover {
        border-color: #dcdcdc;
      }
    }
    .time-selector {
      margin-left: 0px;
    }
    .el-dropdown-menu {
      max-height: 400px;
      overflow-y: auto;
    }
  }
  .filter-bar-query:after {
    content: "";
    display: block;
    clear: both;
  }
  .tabs {
    background-color: #fff;
    margin-top: $marginWidth / 2;
    //border-bottom: 1px solid #d1d7e5 !important;
    box-shadow: 0 0px 1px rgba(60, 65, 71, 0.5);
  }
  .tab-list:after {
    content: "";
    display: block;
    clear: both;
  }
  .tab-list {
    height: 40px;
    padding: 0 10px;
    li {
      float: left;
      height: 100%;
      a {
        position: relative;
        bottom: -1px;
        display: block;
        height: 100%;
        box-sizing: border-box;
        line-height: 40px;
        padding: 0 20px;
        font-size: $font-size-large;
      }
      a:hover,
      a.active {
        border-bottom: 2px solid;
      }
    }
  }
  .instance-type-tag {
    position: relative;
    top: -2px;
    width: 52px;
    margin-right: 5px;
    text-align: center;
  }
  .expand-btn {
    float: right;
    padding: 0;
    width: 28px;
    height: 28px;
    font-size: $font-icon-size-large;
  }
  .title {
    color: #666;
    border-left: 3px solid #2879ff;
    height: $barHeight;
    line-height: $barHeight;
    padding-left: 10px;
    display: inline-block;
  }
  .getback-btn {
    border-top: none;
    border-right: none;
    border-bottom: none;
    border-left: solid 1px #dcdcdc;
    height: $barHeight;
    line-height: $barHeight;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: #2879ff;
      color: #fff;
    }
  }
}
</style>
<template>
  <div class="filter-bar">
    <div class="filter-bar-query theme-font-color-base theme-border-color-base">
      <div v-if="!!title" class="title">{{title}}</div>
      <time-selector class="query time-selector"></time-selector>
      <div
        v-show="showGetBackBtn"
        class="getback-btn fn-fr" size="small" @click="getback">
        <span>返回</span>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSelector from './time-selector'
import { Select, Option, Tag, Button } from 'element-ui'

export default {
  name: 'top-bar',
  components: {
    'el-select': Select,
    'el-option': Option,
    'el-tag': Tag,
    'el-button': Button,
    'time-selector': TimeSelector
  },
  mounted() {
    this.$root.eventBus.$on('system-or-time-change', res => {
    })
  },
  destroyed() {
    this.$root.eventBus.$off('system-or-time-change')
    this.$root.eventBus.$off('system-change')
  },
  props: {
    timeDisabled: false,
    title: String,
    showBack: false
  },

  data() {
    return {}
  },

  computed: {
    showGetBackBtn() {
      return this.showBack
    }
  },
  watch: {},
  methods: {
    getback() {
      window.history.back()
    },
    trigger() {

    },
    selectInstance() {

    }
  }
}
</script>
