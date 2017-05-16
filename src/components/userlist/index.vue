
<template src="./template.html"></template>
<script>
import DataGrid from '../data-grid/index.vue'
import moment from 'moment'

export default {
  name: 'user-list',
  components: {
    DataGrid
  },
  data () {
    let that = this
    let columns = [
      { code: 'id',
        text: '序号',
        styler: {
          textAlign: 'left'
        },
        formatter: function (value, rowData, index) {
          console.log(that.currentPage)
          return that.pageSize * (that.currentPage - 1) + index + 1
        }
      },
      { code: 'company', text: '公司名称' },
      { code: 'name', text: '个人姓名' },
      { code: 'email', text: '电子邮箱' },
      { code: 'tel', text: '手机号码' },
      {
        code: 'createTime',
        text: '注册时间',
        formatter: function (value, rowData, index) {
          return moment(value).format('YYYY-MM-DD')
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
      loading: false
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
  },
  methods: {
    queryData (searchValue) {
      this.searchKey = searchValue
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     * */
    fetchData (pageNum) {
      let that = this
      that.currentPage = pageNum || 1
      let data = {
        condition: that.searchKey,
        pageSize: that.pageSize,
        startIndex: that.currentPage
      }
      this.api.getUserList({data, ajaxStart () {}}, false)
      .then(function (res) {
        if (res.success) {
          that.dataList = res.dataObject.users
          that.totalCount = res.dataObject.totalNum
        }
      })
    }
  }
}
</script>

