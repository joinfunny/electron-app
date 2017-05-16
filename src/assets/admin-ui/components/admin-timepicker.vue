<style lang="scss">
  @import '../style/vars';
  .admin-timepicker {
    display: inline-block;
    position: relative;
    width: 198px;
  }
  .admin-timepicker-label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: $normal;
    color: $grayDarken35;
  }
  .admin-timepicker-container {
    position: relative;
  }
  .admin-timepicker-core {
    width: 100%;
  }
  .admin-timepicker-popup {
    position: absolute;
    z-index: 9990;
    top: 34px;
    left: 0;
    width: 198px;
    height: 166px;
    border: 1px solid $grayBrighten10;
    box-shadow: $shadowLevel3;
    background-color: #fff;
    overflow: hidden;
    outline: none;
  }
  .admin-timepicker-timelist {
    position: relative;
    float: left;
    width: 65px;
    padding: 64px 0;
    color: $grayDarken45;
    transition: top .2s ease-out;
    & > li {
      height: 32px;
      line-height: 32px;
      text-align: center;
      user-select: none;
    }
    & > .selected {
      // background-color: $primary;
      color: $primary;
    }
    & > li:hover {
      background-color: rgba($primary, .1);
      cursor: pointer;
    }
  }
  .admin-timepicker-timelist:last-child {
    width: 66px;
  }
  .admin-timepicker-no-seconds {
    width: 98px
  }
  .admin-timepicker-no-seconds:last-child {
    width: 98px;
  }
  .admin-timepicker-timelist:not(:last-child) {
    border-right: 1px solid $grayBrighten10;
  }
  .admin-timepicker.admin-form-small {
    .admin-timepicker-popup {
      top: 30px;
    }
  }
  .admin-timepicker.admin-form-small {
    .admin-timepicker-label {
      cursor: not-allowed;
    }
  }
  /*hack input-icon*/
  .active .admin-input-icon {
    color: $primary;
  }
</style>
<template>
  <div class="admin-timepicker" :class="classes">
    <div class="admin-timepicker-label" @click="labelClick">{{ label }}</div>
    <div class="admin-timepicker-container">
      <admin-input
        class="admin-timepicker-core"
        icon-class="ion-ios-clock-outline"
        v-model="inputTime"
        @input="input"
        :warnings="calcedWarnings"
        :small="small"
        :disabled="disabled"
        :placeholder="placeholder"
        @focus="coreFocus"
        @blur="coreBlur"
        ref="core"/>
      <div class="admin-timepicker-popup" ref="popup" v-show="popup" tabindex="0" @blur="popupBlur">
        <ul
          class="admin-timepicker-timelist admin-timepicker-hours "
          :class="{'admin-timepicker-no-seconds': !seconds}"
          ref="hours"
          @click.stop
          :style="{ top: hoursOffset + 'px' }">
          <li v-for="num in 24" @click.stop="selectTime(num - 1, 'hour')" :class="num - 1 == hour ? 'selected' : ''">{{ formatNum(num - 1) }}</li>
        </ul>
        <ul
          class="admin-timepicker-timelist admin-timepicker-minutes"
          :class="{'admin-timepicker-no-seconds': !seconds}"
          ref="minutes"
          @click.stop
          :style="{ top: minutesOffset + 'px' }">
          <li v-for="num in 60" @click.stop="selectTime(num - 1, 'minute')" :class="num - 1 == minute ? 'selected' : ''">{{ formatNum(num - 1) }}</li>
        </ul>
        <ul
          v-if="seconds"
          class="admin-timepicker-timelist admin-timepicker-seconds"
          ref="seconds"
          @click.stop
          :style="{ top: secondsOffset + 'px' }">
          <li v-for="num in 60" @click.stop="selectTime(num - 1, 'second')" :class="num - 1 == second ? 'selected' : ''">{{ formatNum(num - 1) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import StandardFormApi from '../helpers/standard-form-api-mixin'
  import LocalValidator from '../helpers/local-validator-mixin'
  import { mousewheel, isEmptyString } from '../helpers/common'
  import AdminInput from './admin-input'

  const SPEED = 32
  const HOURSRANGE = 736
  const MSRANGE = 1888

  export default {
    name: 'admin-timepicker',
    mixins: [StandardFormApi, LocalValidator],
    components: { AdminInput },
    mounted () {
      mousewheel(this.$refs.hours, (e) => { this.listScroll(e, 'hour') })
      mousewheel(this.$refs.minutes, (e) => { this.listScroll(e, 'minute') })
      mousewheel(this.$refs.seconds, (e) => { this.listScroll(e, 'second') })

      this.initSeparateTime()
    },
    data () {
      return {
        inputTime: this.initTime(),
        time: this.initTime(),
        hour: '',
        minute: '',
        second: '',
        hoursOffset: 0,
        minutesOffset: 0,
        secondsOffset: 0,
        popup: false
      }
    },
    props: {
      seconds: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: '请选择时间'
      }
    },
    watch: {
      popup (v) {
        if (v) {
          let now = new Date()
          this.scrollTo([
            this.hour || this.formatNum(now.getHours()),
            this.minute || this.formatNum(now.getMinutes()),
            this.second || this.formatNum(now.getSeconds())])
          this.$emit('focus', this.time)
        } else {
          if (isEmptyString(this.inputTime)) {
            this.clear()
          } else {
            this.setTime()
          }
          this.$emit('blur', this.time)
        }
      },
      value () {
        let res = this.initTime()
        this.inputTime = res
        this.time = res
        if (res) this.setSeparateTime(res.split(':'))
      },
      time (v) {
        this.$emit('input', v)
        this.$emit('change', v)
      },
      inputTime (v) {
        if (isEmptyString(v)) { // clear
          this.clear()
        }
        let res = this.formatTime(v)
        if (res) {
          this.setSeparateTime(res)
          this.scrollTo(res)
        }
      }
    },
    computed: {
      calcedWarnings () {
        if (this.warnings) return this.warnings
        let res = []
        for (let key in this.localWarnings) {
          res.push(this.localWarnings[key])
        }
        return res.length ? res : null
      }
    },
    methods: {
      formatNum (num) {
        return Number(num) < 10 ? ('0' + Number(num)) : Number(num)
      },
      selectTime (num, type) {
        // hour, minute, second
        this[type] = this.formatNum(num)
        this.setTime()
      },
      setTime () {
        this.time =
          this.formatNum(this.hour) +
          ':' + this.formatNum(this.minute) +
          (this.seconds ? (':' + this.formatNum(this.second ? this.second : 0)) : '')
        this.inputTime = this.time
      },
      setSeparateTime (timeArr) {
        this.hour = this.formatNum(timeArr[0])
        this.minute = this.formatNum(timeArr[1])
        this.second = this.formatNum(timeArr[2])
      },
      listScroll (e, type) {
        let direction = e.deltaY || e.detail // chrome,edge / firefox
        let speedy = SPEED * ((direction < 0 ? -direction : direction) / direction)
        let range = type === 'hour' ? HOURSRANGE : MSRANGE
        if (this[type + 'sOffset'] >= 0) {
          this[type + 'sOffset'] -= speedy > 0 ? speedy : 0
        } else if (this[type + 'sOffset'] <= -range) {
          this[type + 'sOffset'] -= speedy < 0 ? speedy : 0
        } else {
          this[type + 'sOffset'] -= speedy
        }
      },
      scrollTo (timeArr) {
        this.hour = timeArr[0]
        this.minute = timeArr[1]
        this.second = timeArr[2]

        this.hoursOffset =
          Number(this.hour) * SPEED > HOURSRANGE
          ? -HOURSRANGE
          : -Number(this.hour) * SPEED
        this.minutesOffset =
          Number(this.minute) * SPEED > MSRANGE
          ? -MSRANGE
          : -Number(this.minute) * SPEED
        this.secondsOffset =
          Number(this.second) * SPEED > MSRANGE
          ? -MSRANGE
          : -Number(this.second) * SPEED
      },
      clear () {
        this.inputTime = ''
        this.time = ''
        this.hour = ''
        this.minute = ''
        this.second = ''
      },
      formatTime (value) {
        if (value.indexOf(':') === -1) return false

        let timeArr = value.split(':')
        timeArr = timeArr.map((num) => {
          return Number(num)
        })
        for (let i = 0; i < 2; i++) {
          if (!timeArr[i] && timeArr[i] !== 0) return false
        }

        if (timeArr[0] > 23 || timeArr[0] < 0) return false
        if (timeArr[1] > 59 || timeArr[1] < 0) return false
        if (timeArr[2]) if (timeArr[2] > 59 || timeArr[2] < 0) return false

        timeArr.forEach(num => {
          return this.formatNum(num)
        })

        return timeArr.slice(0, 3)
      },
      initTime () {
        return this.formatTime(this.value) ? this.formatTime(this.value).map(num => {
          return this.formatNum(num)
        }).join(':') : ''
      },
      initSeparateTime () {
        let res = ['', '', '']
        if (this.value) {
          res = this.formatTime(this.value) ? this.formatTime(this.value).map(num => {
            return this.formatNum(num)
          }) : false
        }
        this.setSeparateTime(res)
      },
      labelClick () {
        if (!this.disabled) this.$refs.core.$refs.core.focus()
      },
      popupBlur (e) {
        if (e.relatedTarget !== this.$refs.core.$refs.core) this.popup = false
      },
      coreFocus () {
        this.popup = true
      },
      coreBlur (v, e) {
        if (e.relatedTarget !== this.$refs.popup) this.popup = false
      }
    }
  }
</script>
