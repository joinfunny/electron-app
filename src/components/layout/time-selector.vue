<style lang="scss" scoped>
@import "~vars";

$btnHeight: 36px;
.refresh-btn {
  border-radius: 0;
  float: right;
  padding: 0;
  width: 35px;
  height: $btnHeight;
  line-height: $btnHeight;
  font-size: $font-icon-size-large;
  background-color: #fff;
  color: #666;
  border: 1px solid #dcdcdc;
  border-width: 0px 1px 0px 1px;
  text-align: center;
}
</style>
<template>
  <div class="time-selector">

    <el-date-picker
      class="date-timer"
      popper-class="date-timer-popper"
      v-model="selectedTime"
      :editable="false"
      :clearable="false"
      :time-arrow-control="true"
      type="datetimerange"
      :picker-options="pickerOptions"
      placeholder="选择时间范围"
      @change="pickerOnChange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @focus="onFocus"
    >
    </el-date-picker>
    <el-button type="primary" class="refresh-btn" size="mini" @click="refresh">
      <i class="ion-android-refresh"></i>
    </el-button>


  </div>
</template>
<script>
/* global $:true */
import {
  Button,
  Popover,
  DatePicker,
  Switch,
  Progress
} from 'element-ui'

// 高亮显示快捷选择列表
const focusTheSidebarItem = function(index) {
  let $shortCutBtn = $(
    '.date-timer-popper .el-picker-panel__sidebar .el-picker-panel__shortcut'
  )
  $shortCutBtn.removeClass('cur')
  $shortCutBtn.eq(index).addClass('cur')
  window.sessionStorage.setItem('curTimeIndex', index)
}
const blurTheSidebarItem = function() {
  let $shortCutBtn = $(
    '.date-timer-popper .el-picker-panel__sidebar .el-picker-panel__shortcut'
  )
  $shortCutBtn.removeClass('cur')
  window.sessionStorage.setItem('curTimeIndex', 999)
}
export default {
  name: 'timer-selector',
  components: {
    'el-button': Button,
    'el-date-picker': DatePicker,
    'el-popover': Popover,
    'el-switch': Switch,
    'el-progress': Progress
  },
  props: {
    timeDisabled: false,
    autoRefreshDisabled: false
  },
  data() {
    return {
      shortCutText: '',
      showDataPicker: false,
      selectedTime: [],
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now() // 禁止选择今天之后
        },
        shortcuts: [
          {
            text: '最近30分钟',
            onClick(picker, e) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 60000 * 30)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(0)
            }
          },
          {
            text: '最近1小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600000)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(1)
            }
          },
          {
            text: '最近6小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600000 * 6)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(2)
            }
          },
          {
            text: '最近12小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600000 * 12)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(3)
            }
          },
          {
            text: '最近1天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 86400000)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(4)
            }
          },
          {
            text: '最近3天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 86400000 * 3)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(5)
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 604800000)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(6)
            }
          },
          {
            text: '最近14天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 604800000 * 2)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(7)
            }
          },
          {
            text: '最近1个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 2592000000)
              picker.$emit('pick', [start, end])
              focusTheSidebarItem(8)
            }
          }
        ],
        onPick() {
          blurTheSidebarItem()
        }
      },
      curTime: [new Date().getTime(), new Date(2000, 10, 11, 10, 10)]
    }
  },

  watch: {
    selectedTime: {
      deep: true,
      handler(v) {
        this.setCurTimeToStore(v)
      }
    }
  },
  mounted() {
    this.getDefaultTime()
  },
  methods: {
    onFocus() {
      let curTimeIndex = window.sessionStorage.getItem('curTimeIndex')
      setTimeout(() => {
        focusTheSidebarItem(curTimeIndex)
      }, 200)
    },
    getDefaultTime() {
      let curTime = this.$root.eventBus.getCurTime()
      let start = Number(curTime.startTime)
      let end = Number(curTime.endTime)
      let curTimeIndex = window.sessionStorage.getItem('curTimeIndex')
      this.selectedTime = [start, end]
      focusTheSidebarItem(curTimeIndex)
    },
    pickerOnChange(v, m) {},
    setCurTimeToStore(v) {
      let time = v
      if (typeof v[0] !== 'number') {
        time = [v[0].getTime(), v[1].getTime()]
      }
      this.$root.eventBus.setCurTime(time)
    },
    refresh() {
      this.setCurTimeToStore(this.selectedTime)
    }
  }
}
</script>

