<<template>
<div>
  <div class="stream-page-nav">
    我的数据概览
  </div>
  <div class="stream-chart complaints"></div>
  <div class="stream-chart exceptionOrders"></div>
</div>
</template>
.stream-chart{
  width: 100%;
  height: 300px;
}
<style lang="scss">
@import '~vars';

</style>
<script>
/* eslint-disable no-unused-vars */
import { AdminToast } from '../../assets/admin-ui'
import utils from '../../assets/utils'
import echarts from 'echarts'
export default {
  name: 'login-panel',
  beforeCreate () {

  },
  data () {
    return {
      complaints: {},
      exceptionOrders: {}
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
