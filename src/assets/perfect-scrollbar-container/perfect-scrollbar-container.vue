<style lang="scss">
  @import "~perfect-scrollbar/src/css/main";
  @import "~vars";
  .perfect-scrollbar-container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  div.ps-theme-onduty,
  p.ps-theme-onduty {
    @include ps-container(map-merge($ps-theme-default, (
      // Colors
      // border-radius: 6px,

      // rail-default-opacity: 0,
      // rail-container-hover-opacity: 0.6,
      // rail-hover-opacity: 0.9,

      // bar-bg: transparent,
      bar-container-hover-bg: $grayBrighten5,
      bar-hover-bg: $grayBrighten5,
      rail-hover-bg: $grayBrighten20,

      // Sizes
      scrollbar-x-rail-bottom: 0px,
      scrollbar-x-rail-height: 2px,
      scrollbar-x-bottom: 2px,
      scrollbar-x-height: 2px,
      scrollbar-x-hover-height: 2px,

      // scrollbar-y-rail-right: 0,
      // scrollbar-y-rail-width: 15px,
      // scrollbar-y-right: 2px,
      // scrollbar-y-width: 6px,
      // scrollbar-y-hover-width: 11px,
    )));
  }
</style>
<template>
  <div class="perfect-scrollbar-container" ref="container">
    <slot></slot>
  </div>
</template>
<script>
  import 'perfect-scrollbar/dist/css/perfect-scrollbar.css'
  import Ps from 'perfect-scrollbar'
  export default {
    name: 'perfect-scrollbar-container',
    mounted () {
      Ps.initialize(this.$refs.container, {
        theme: 'onduty'
      })
    },
    props: {
      config: {
        type: Object,
        default () {
          return {}
        }
      },
      scrollTop: Number
    },
    watch: {
      scrollTop (v) {
        let container = this.$refs.container
        container.scrollTop = 0
        Ps.update(container)
      },
      config: {
        deep: true,
        handler (conf) {
          let container = this.$refs.container
          Ps.destroy(container)
          Ps.initialize(container)
        }
      }
    }
  }
</script>
