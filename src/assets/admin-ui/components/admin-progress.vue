<style lang="scss">
  @import '../style/vars';
  @font-face {
    font-family: 'Ionicons';
    src: url('../style/ionicons/fonts/ionicons.ttf');
  }
  .admin-progress-bar-container {
      position: relative;
      max-width: 98%;
      .admin-progress-icon {
        position: absolute;
        right:-25px;
        top: -5px;
      }
      .admin-progress-text {
        position: absolute;
        right:-35px;
        top: -2px;
        font-size: 12px;
        color: $grayDarken25;
      }
  }
  .admin-progress-bar {
      height: 8px;
      border-radius: 16px;
      width: 80%;
      &:after {
          content: "";
          display: block;
          width: 100%;
          height: 8px;
          opacity: 0.2;
          position: absolute;
          border-radius: 16px;
      }
  }
  .admin-progress-bar-primary {
    background-color: $primary;
    &:after {
       background-color: $primary; 
    }
  }
  .admin-progress-bar-danger {
    background-color: $danger;
    &:after {
       background-color: $danger; 
    }
  }
  .admin-progress-bar-success {
    background-color: $success;
    &:after {
       background-color: $success; 
    }
  }
  .admin-progress-circle {
    position: relative;
    .admin-progress-circle-icon {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
</style>
<template>
    <div>
        <div class="admin-progress-bar-container" v-if="showProgressBar">
            <div class="admin-progress-bar" :class="getProgressBarClass" :style="{'width': progress + '%'}"></div>
            <div class="admin-progress-text" v-if="!status || status == ''">{{progress}}%</div>
            <admin-icon type="ion-close-circled" size="16px" color="#f35555" class="admin-progress-icon" v-if="status == 'danger'"></admin-icon>
            <admin-icon type="ion-checkmark-circled" size="16px" color="#4fca72" class="admin-progress-icon" v-if="status == 'success'"></admin-icon>
        </div>
        <br>
        <div class="admin-progress-circle-container" v-if="showProgressCircle">
            <div class="admin-progress-circle" :style="getCircleSize">
                <canvas ref="canvas" id="canvas" :width='size < 60 ? 60 : size' :height='size < 60 ? 60 : size'></canvas>
                <admin-icon :style="{'margin-left': iconLeft, 'margin-top': iconTop}" ref="circleIcon" v-if="status == 'success'" type="ion-checkmark-round" :size='size < 60 ? 15 : Math.ceil(size / 4)' color="#4fca72" class="admin-progress-circle-icon"></admin-icon> 
                <admin-icon :style="{'margin-left': iconLeft, 'margin-top': iconTop}" ref="circleIcon" v-if="status == 'danger'" type="ion-close-round" :size='size < 60 ? 15 : Math.ceil(size / 4)'  color="#f35555" class="admin-progress-circle-icon"></admin-icon>
            </div>
        </div>
    </div>
</template>
<script>
import '../style/ionicons/ionicons.css'
// import localValidatorMixin from '../helpers/local-validator-mixin'
// import standardFormApiMixin from '../helpers/standard-form-api-mixin'
import adminIcon from './admin-icon'
export default {
  name: 'admin-progress',
  props: {
    size: String,
    progress: Number,
    status: String,
    type: String,
    percent: String
  },
  data () {
    return {
      index: 0,
      iconLeft: '',
      iconTop: '',
      value: this.progress,
      showProgressBar: false,
      showProgressCircle: false
    }
  },
  components: {
    adminIcon
  },
  computed: {
    getCircleSize () {
      if (this.size < 60) {
        return 'width: 60px;height: 60px'
      } else {
        return 'width:' + this.size + 'px;height:' + this.size + 'px'
      }
    },
    getProgressBarClass () {
      if (this.status === 'success') return 'admin-progress-bar-success'
      if (this.status === '' || !this.status) return 'admin-progress-bar-primary'
      if (this.status === 'danger') return 'admin-progress-bar-danger'
    }
  },
  watch: {
    progress () {
      this.$nextTick(function () {
        this.progressCircleCanvas({
          progress: this.progress,
          status: this.status
        })
      })
    },
    size () {
      this.$nextTick(function () {
        this.progressCircleCanvas({
          progress: this.progress,
          status: this.status
        })
        this.setIconDirection()
      })
    },
    status () {
      this.$nextTick(function () {
        this.progressCircleCanvas({
          progress: this.progress,
          status: this.status
        })
        this.setIconDirection()
      })
    }
  },
  created () {
    this.selectProgressType()
  },
  methods: {
    selectProgressType () {
      if (this.type === 'bar') {
        this.showProgressBar = true
      } else if (this.type === 'circle') {
        this.showProgressCircle = true
      } else {
        this.showProgressBar = true
      }
    },
    setIconDirection () {
      try {
        this.iconLeft = -this.$refs.circleIcon.$el.offsetWidth / 2 + 'px'
        this.iconTop = -this.$refs.circleIcon.$el.offsetHeight / 2 + 'px'
      } catch (e) {
      }
    },
    progressCircleCanvas (opts) {
      if (this.showProgressCircle) {
        var canvas = this.$refs.canvas
        var context = canvas.getContext('2d')
        var x = canvas.width / 2
        var y = canvas.height / 2
        var radius = x - 4
        var num = opts.percent || opts.progress
        var percent = num + '%'
        var bgColor = 'rgba(14, 158, 226, .2)'
        var bodyColor = '#0e9ee2'
        var lineWidth = ''
        var progressArc = 1 / 2 * Math.PI
        var arc = 2 * Math.PI
        // 判断是否成功或者是否失败 改变进度条颜色
        if (opts.status === 'danger') {
          bgColor = 'rgba(243, 85, 85, .2)'
          bodyColor = '#f35555'
          percent = ''
        } else if (opts.status === 'success') {
          bgColor = 'rgba(79, 202, 114, .2)'
          bodyColor = '#4fca72'
          percent = ''
        }
        // 判断画布宽度是否大于100以上，改变进度条的高度
        if (canvas.width > 110) {
          lineWidth = 8
        } else if (canvas.width > 60 && canvas.width < 110) {
          lineWidth = 4
        } else {
          lineWidth = 2
        }
        // 文字实时变化的时候会出现叠加，清除之前的文字
        context.clearRect(0, 0, canvas.width, canvas.height)
        // 开始绘制圆环
        context.beginPath()
        context.strokeStyle = bgColor
        context.lineWidth = lineWidth
        context.arc(x, y, radius, 0, arc)
        context.stroke()
        context.closePath()
        // 开始绘制内切圆
        context.beginPath()
        context.strokeStyle = bodyColor
        context.lineWidth = lineWidth
        var deg = num * 3.6 / 180 * Math.PI
        context.arc(x, y, radius, 0 - progressArc, deg - progressArc)
        context.stroke()
        // 开始绘制文字
        context.font = radius / 2.5 + 'px 微软雅黑'
        context.fillStyle = '#6f7073'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(percent, x, y)
      }
    }
  }
}
</script>
