
<<style>

</style>
<template>
<div class="common-container">

<div class="content" ref="loadingContainer">
  <el-table :data="dataList">
    <el-table-column prop="docmentsNo" width="100" label="订单号"></el-table-column>
    <el-table-column prop="agentOrderNo" width="220" label="交易单号"></el-table-column>
    <el-table-column prop="feedback" label="反馈原因"></el-table-column>
    <el-table-column prop="coustomerRequest" label="处理方式"></el-table-column>
    <el-table-column prop="createdAt" label="添加时间">
      <template slot-scope="scope">
        {{moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
    </el-table-column>
    <el-table-column prop="updatedAt" label="更新时间">
      <template slot-scope="scope">
        {{moment(scope.row.updateAt).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="sizes, prev, pager, next"
      :total="totalCount">
    </el-pagination>
</div>
</div>
</template>
<script>
import { Table, TableColumn, Pagination } from 'element-ui'
import loadingMixin from '_mixins/loading'
import moment from 'moment'
export default {
  name: 'complaints-list',
  mixins: [loadingMixin],
  components: {
    'el-table': Table,
    'el-table-column': TableColumn,
    'el-pagination': Pagination
  },
  data() {
    return {
      moment: moment,
      dataList: [],
      totalCount: 10,
      pageSize: 10,
      currentPage: 1,
      searchKey: '',
      loading: false,
      date: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  created() {
    this.fetchData()
  },
  computed: {},
  mounted() {
    this.fetchData()
  },
  methods: {
    queryData() {
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询列表数据
     * */
    fetchData() {
      let that = this
      let data = {
        searchKey: that.searchKey,
        pageSize: that.pageSize,
        startIndex: that.currentPage,
        dateTime: that.date,
        type: 1
      }
      this.api
        .complaints({
          data
        })
        .then(function(res) {
          if (res.success) {
            that.dataList = res.dataObject.complaints
            that.totalCount = res.dataObject.totalNum
          }
        })
    },
    handleSizeChange() {
      this.fetchData()
    },
    handleCurrentChange() {
      this.fetchData()
    }
  },
  destroyed() {}
}
</script>

