<<template src="./myData-template.html">

</template>

<style lang="scss">
@import '~vars';
.stream-page-nav {
  margin-bottom: 20px;
}

.stream-panel {
  margin-bottom: 5px;
  .stream-ion-color-red {
    color: #ff5722
  }
}

.stream-chart {
  height: 300px;
}
.chart-comp,.chart-warp{
  width: 100%;
  height: 100%;
}
.fn-hide{
  display: none
}
</style>
<script>
/* eslint-disable no-unused-vars */
import chartLine from '../../assets/charts/chart-line'
import { AdminToast } from '../../assets/admin-ui'
import utils from '../../assets/utils'
import echarts from 'echarts'
import moment from 'moment'
export default {
  name: 'login-panel',
  components: { chartLine },
  created () {
    this.getMydata()
  },
  data () {
    return {
      mydata: {
        service: {
          runTime: 0,
          count: 0,
          latestTime: 0
        },
        complaints: {
          today: 0,
          total: 0,
          latestTime: 0,
          chart: {}
        },
        handles: {
          today: 0,
          total: 0,
          latestTime: 0,
          chart: {}
        },
        exceptionorders: {
          today: 0,
          total: 0,
          latestTime: 0,
          chart: {}
        }
      },
      myChartData: {
        title: '实时数据统计',
        options: {
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function (params, ticket, cb) {
              console.log(arguments)
              var output = []
              params.forEach((item, index) => {
                if (index === 0) {
                  output.push('当前时间：' + moment(item.data[0]).format('YYYY-MM-DD HH:mm:ss'))
                }
                output.push(item.seriesName + '：' + item.data[1])
              })
              return output.join('<br />')
            }
          },
          grid: {
            x: 20,
            y: 40,
            x2: 20,
            y2: 20
          },
          xAxis: [
            {
              type: 'time',
              boundaryGap: false,
              max: moment().add(1, 'days').format('YYYY-MM-DD 00:00:00'),
              min: moment().format('YYYY-MM-DD 00:00:00'),
              splitNumber: 24
            }
          ]
        },
        loading: false,
        data: []
      }
    }
  },
  computed: {

  },
  mounted () {
    var that = this
    that.getMydata()
    that.getChartData()

    setInterval(() => {
      that.getMydata()
    }, 5000)

    // 1分钟更新一次数据
    setInterval(() => {
      that.getChartData()
    }, 60000)
  },
  methods: {
    getMydata () {
      var that = this
      that.api.mydata({data: { r: new Date() * 1 }}).then(function (res) {
        that.mydata = res.dataObject
      })
    },
    getChartData () {
      var that = this
      var endDate = new Date() * 1
      var startDate = endDate - 1000 * 60 * 60 * 24
      that.myChartData.options.xAxis[0].min = startDate
      that.myChartData.options.xAxis[0].max = endDate
      that.api.earliestData({
        data: {
          r: new Date() * 1,
          startDate: endDate - 1000 * 60 * 60 * 24,
          endDate: endDate
        }
      }).then(function (res) {
        that.myChartData.data = [
          {
            name: '投诉订单',
            list: res.dataObject.complaints
          },
          {
            name: '投诉处理',
            list: res.dataObject.handles
          }
        ]
      })
    },
    timestampFormmater (timestamp) {
      if (timestamp <= 0) {
        return '----'
      }
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    runtimeFormmater (runtime) {
      // 计算出相差天数
      var days = Math.floor(runtime / (24 * 3600 * 1000))

      // 计算出小时数

      var leave1 = runtime % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      return days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
    }
  }
}
</script>
