<template>
  <div class="chart-comp">
    <div class="chart-warp" ref="chart"></div>
    <div :class="!(data && data.length) ?'nodata':'fn-hide'"><i class="icon ion-alert-circled"></i> 暂无数据</div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'chart-line',
    mounted () {
      this.chart = echarts.init(this.$refs.chart)
      this.renderChart()
      this.clientHeight = document.documentElement.clientHeight + 'px'
    },

    data () {
      return {
        chart: null,
        options: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: [
            {
              type: 'time',
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
      }
    },
    props: {
      title: {
        reqiured: true
      },
      data: {
        type: Array,
        required: true
      },
      ecOptions: {
        type: Object
      },
      loading: false
    },
    watch: {
      title (v) {
        this.renderChart()
      },
      data: {
        deep: true,
        handler (v) {
          this.renderChart()
        }
      },
      loading (v) {
        if (v) this.chart.showLoading()
        else this.chart.hideLoading()
      }
    },
    methods: {
      renderChart () {
        console.dir(this.data)
        let option = Object.assign({}, this.options, {
          title: {
            text: this.title
          },
          legend: {
            data: this.data.map(e => {
              return e.name
            })
          },
          series: this.data.map(e => {
            return {
              name: e.name,
              type: 'line',
              showAllSymbol: true,
              symbolSize: function (value) {
                return Math.round(value[2] / 10) + 2
              },
              data: e.list
            }
          })
        }, this.ecOptions)
        if (!this.data || !this.data.length === 0) return
        this.chart.setOption(option)
        console.log(option)
      }

    }
  }
</script>
