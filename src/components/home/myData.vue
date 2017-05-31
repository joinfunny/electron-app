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
  width: 100%;
  height: 100px;
}
</style>
<script>
/* eslint-disable no-unused-vars */
import { AdminToast } from '../../assets/admin-ui'
import utils from '../../assets/utils'
import echarts from 'echarts'
import moment from 'moment'
export default {
  name: 'login-panel',
  beforeCreate () {
    var that = this
    that.api.mydata({ r: new Date() * 1 }).then(function (res) {
      that.mydata = res.dataObject
    })
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
        exceptionOrders: {
          today: 0,
          total: 0,
          latestTime: 0,
          chart: {}
        }
      }
    }
  },
  computed: {

  },
  methods: {
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
