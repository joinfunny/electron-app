<style lang="scss">
  @import "../style/vars";
  .admin-pannel {
    border: 1px solid $grayBrighten15;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: $shadowLevel3;
    .admin-pannel-title {
      margin-top: 0;
      margin-bottom: 24px;
    }
  }
  .admin-pannel.padding, .admin-pannel-title.padding {
    padding: 24px;
  }
  .admin-pannel-title.padding {
    padding-bottom: 0;
  }
</style>
<template>
  <div class="admin-pannel" :class="{'padding': padding}">
    <h3 class="admin-pannel-title" v-if="title" :class="{'padding': !padding}">
      <admin-icon v-if="titleIcon" :type="titleIcon" size="24px"></admin-icon>
      {{ title }}
    </h3>
    <div class="admin-pannel-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  export default {
    name: 'admin-pannel',
    props: {
      title: String,
      padding: {
        type: Boolean,
        default: true
      },
      titleIcon: {
        type: String,
        default: ''
      }
    }
  }
</script>
