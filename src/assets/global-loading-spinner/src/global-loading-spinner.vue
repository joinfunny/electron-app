<style lang="scss">
  .global-loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0 ,0, .7);
  }
  .global-loading-spinner-core {
    position: relative;
    top: 50%;
    width: 100px;
    height: 100px;
    margin: -50px auto 0 auto;
  }
</style>
<template>
  <div class="global-loading-spinner">
    <div class="global-loading-spinner-core" >
      <admin-spinner size="100px" color="#fff"/>
    </div>
  </div>
</template>
<script>
  import { AdminSpinner } from '../../admin-ui'
  export default {
    components: { AdminSpinner }
  }
</script>
