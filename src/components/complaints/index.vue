
<template src="./template.html"></template>
<script>
import DataGrid from '../data-grid/index.vue'
import moment from 'moment'
export default {
  name: 'complaints-list',
  components: {
    DataGrid
  },
  data() {
    let that = this
    let columns = [
      {
        code: 'id',
        text: '序号',
        styler: {
          textAlign: 'left'
        },
        formatter: function(value, rowData, index) {
          console.log(that.currentPage)
          return that.pageSize * (that.currentPage - 1) + index + 1
        }
      },
      { code: 'docmentsNo', text: '订单号' },
      { code: 'agentOrderNo', text: '交易单号' },
      { code: 'feedback', text: '反馈原因' },
      { code: 'coustomerRequest', text: '处理方式' },
      {
        code: 'createdAt',
        text: '添加时间',
        formatter: function(value, rowData, index) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        code: 'updatedAt',
        text: '更新时间',
        formatter: function(value, rowData, index) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ]

    return {
      dataList: [],
      totalCount: 10,
      pageSize: 17,
      currentPage: 1,
      columns,
      searchKey: '',
      loading: false,
      date: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  created() {
    this.fetchData()
  },
  computed: {},
  methods: {
    queryData() {
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     * */
    fetchData(pageNum) {
      let that = this
      that.currentPage = pageNum || 1
      let data = {
        searchKey: that.searchKey,
        pageSize: that.pageSize,
        startIndex: that.currentPage,
        dateTime: that.date,
        type: 1
      }
      this.api.complaints({ data, ajaxStart() {} }, false).then(function(res) {
        if (res.success) {
          that.dataList = res.dataObject.complaints
          that.totalCount = res.dataObject.totalNum
        }
      })
    }
  }
}
</script>

