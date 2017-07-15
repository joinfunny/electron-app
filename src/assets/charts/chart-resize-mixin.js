
export default {
  created: function () {
    window.addEventListener('resize', this.change, false)
  },
  destroyed () {
    window.removeEventListener('resize', this.change)
  },
  methods: {
    change () {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
