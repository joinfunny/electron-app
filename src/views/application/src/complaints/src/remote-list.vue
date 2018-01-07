<style lang="scss">
  $green: #5bd4c7;
  $orange: #ffcc99;
  $lightred: #ff8f1f;
  $red: #ff1f1f;
  .remote {
    .au-panel.table-panel {
      margin: 16px;
      .au-panel-content {
        padding: 15px 15px 40px 15px;
      }
    }
  }
</style>

<template>
  <div class="remote">
    <top-bar title="远程调用" @barChange="barChange"></top-bar>
    <FilterBarSimple @fbarChange="fbarChange"></FilterBarSimple>
    <div class="common-container">
      <div class="header-title">
        <i class="title-icon icon ion-podium"></i>
        <span class="title-name">远程调用列表</span>
      </div>
      <div class="content">
        <el-table :data="dataList" stripe style="width: 100%">
          <el-table-column type="index" width="60" label="序号"></el-table-column>
          <el-table-column prop="name" label="远程调用">
            <template slot-scope="scope">
              <a class="theme-font-color-primary" href="javascript:void 0;"
                 @click="goToDetail(scope.row)">{{ scope.row.address }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="avgResponseTime" label="平均响应时间"></el-table-column>
          <el-table-column prop="throughput" label="吞吐率(rpm)"></el-table-column>
          <el-table-column prop="requestCount" label="请求数"></el-table-column>
          <el-table-column prop="errorCount" label="错误数"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import util from "_util";
  import Vue from "vue";
  import {Popover, Pagination, Table, TableColumn} from "element-ui";
  import FilterBarSimple from "_components/filter-bar/filter-bar-simple.vue";
  import PercentBar from "_components/ui-mod/percent-bar.vue";
  import DataGrid from "_components/datagrid/index.vue";
  import topBarQuery from "../../../../../components/mixin/topBarQuery";

  export default {
    components: {
      "el-pagination": Pagination,
      "el-table": Table,
      "el-table-column": TableColumn,
      FilterBarSimple,
      Popover,
      PercentBar,
      DataGrid
    },
    mixins: [topBarQuery],
    data() {
      return {
        dataList: [],
        allDataList: [],
        dataGridConfig: {
          totalCount: 0,
          pagination: false,
          sort: {
            orderBy: "",
            rule: "DESC"
          }
        }
      };
    },
    methods: {
      barChange(queryData) {
        this.topBarQueryData = queryData // 项目中一旦使用Mixin会导致代码难以跟踪，所以一定要加上注释说明其关系，例如这里的topBarQueryData对象通过topBarQueryMixin进行格式化
        this.getRemoteList();
      },
      fbarChange(condition) {
        this.dataList = this.handleFilterData(condition, this.allDataList);
      },
      handleFilterData(condition, dataList) {
        let res = [];
        for (let conditionKey in condition) {
          if (conditionKey != 'keyword') {
            condition[conditionKey] = condition[conditionKey] || -1
          }
        }
        if (
          condition.keyword.length === 0 &&
          condition.avgResponseTime == 0 &&
          condition.rpm == 0 &&
          condition.errorNum == 0
        ) {
          res = dataList
        } else {
          dataList.map(m => {
            if (
              m.address.search(condition.keyword) >= 0 &&
              Number(condition.avgResponseTime) < Number(m.avgResponseTime) &&
              Number(condition.rpm) < Number(m.throughput) &&
              Number(condition.errorNum) < Number(m.errorCount)
            ) {
              res.push(m);
            }
          });
        }
        return res;
      },
      getRemoteList(obj) {
        this.api
          .getRemoteList({
            data: {
              condition: {
                appId: this.appId,
                startTime: this.startTime,
                endTime: this.endTime,
                size: 1000
              }
            }
          })
          .then(res => {
            if (res.code === 0) {
              this.dataList = res.data || [];
              this.allDataList = _.cloneDeep(res.data);
            }
          });
      },
      goToDetail(row) {
        //跳转的时候要把tier信息带过去
        Object.assign(row, {
          tierId: this.$route.query.tierId || '',
          instanceToken: this.$route.query.instanceToken || ''
        })
        this.$router.push({
          name: 'remote-detail',
          query: row
        });
      }
    }
  };
</script>
