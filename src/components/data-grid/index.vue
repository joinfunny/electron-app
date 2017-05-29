<style lang="scss">
@import '~vars';
.data-grid{
  position: relative;
}
.stream-form-field {
  padding: 12px;
}

.stream-search-input {
  width: 210px !important;
  margin-right: 12px;
}

.stream-grid-wrapper {
  padding: 0 12px;
}

.stream-grid-table {
  width: 100%;
}

.stream-paginator {
  padding: 12px;
  text-align: right;
}
.stream-grid-loading{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(158,158,158,0.1);
  z-index: 1;
}
</style>
<template src="./template.html">
</template>

<script>

export default {
  name: 'data-grid',
  data () {
    return {

    }
  },
  props: {
    /*
     * 加载数据标识
     */
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    totalCount: Number,
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    dataList: {
      type: Array,
      default: []
    }
  },
  methods: {
    togglePage (currentPage) {
      console.log(currentPage)
      this.$emit('on-toggle-page', currentPage)
    }
  }
}
</script>
