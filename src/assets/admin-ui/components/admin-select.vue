<style lang="scss">
  @import '../style/vars.scss';
  .admin-select {
    position: relative;
    display: inline-block;
    width: 198px;
  }
  .admin-select-label-text {
    font-size: $normal;
    margin-bottom: 8px;
    color: $grayDarken35;
  }
  .admin-select-core-container {
    position: relative;
    height: 32px;
    outline: none;
  }
  .admin-select-core {
    position: relative;
    display: inline-block;
    border-radius: 2px;
    border: 1px solid $grayBrighten5;
    padding: 0 8px;
    padding-right: 26px;
    width: 100%;
    line-height: 30px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $fontFamily;
    color: $grayDarken45;
    font-size: $normal;
    outline: none;
    user-select: none;
    cursor: default;
  }
  .admin-select-arrow {
    display: inline-block;
    position: absolute;
    height: 24px;
    top: 0;
    right: 8px;
    font-size: 20px;
  }
  .admin-select:not(.admin-form-disabled) .admin-select-active {
    .admin-select-core {
      border-color: $info;
      box-shadow: 0 0 4px $info;
    }
  }
  .admin-select-arrow-active {
    color: $info;
  }
  .admin-select-option-container {
    position: absolute;
    z-index: 9990;
    top: 36px;
    border: 1px solid $grayBrighten5;
    border-radius: 2px;
    padding: 4px 0;
    min-width: 84px;
    width: 100%;
    box-shadow: $shadowLevel3;
    background-color: #fff;
    & > li {
      height: 28px;
      padding: 0 8px;
      line-height: 28px;
      font-size: $normal;
      color: $grayDarken45;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
      cursor: default;
    }
    & > li:not(.selected):hover {
      background-color: $grayBrighten15;
      // background-color: $primary;
      // color: #fff;
    }
    & > .disabled {
      color: $grayBrighten5;
    }
    & > .selected {
      background-color: $primary;
      color: #fff;
    }
  }
  .admin-select.admin-form-warning {
    .admin-select-core {
      border-color:  $danger;
    }
    
    .admin-select-warning {
      margin-top: 6px;
      font-size: $small;
      color: $danger;
    }
    .admin-select-arrow-active {
      color: $danger;
    }
  }
  .admin-select.admin-form-warning:not(.disabled) .admin-select-active {
    .admin-select-core {
      border-color:  $danger;
      box-shadow: 0 0 4px  $danger;
    }
  }
  .admin-select.admin-form-small {
    .admin-select-core-container {
      height: 26px;
    }
    .admin-select-core {
      height: 26px;
      line-height: 24px;
    }
    .admin-select-option-container {
      top: 28px;
      li {
        height: 22px;
        padding: 0 8px;
        line-height: 22px;
        font-size: $small;
      }
    }
  }
  .admin-form-disabled .admin-select-core, .admin-form-disabled .admin-select-label-text {
    cursor: not-allowed;
  }
  .admin-form-disabled .admin-select-core {
    background-color: $grayBrighten20;
  }
</style>
<template>
  <div class="admin-select" :class="classes">
    <div class="admin-select-label-text" @click="labelClick" v-if="label" @click.stop="()=>{}">{{ label }}</div>
    <div class="admin-select-core-container" :class="{ 'admin-select-active': optionDisplay}">
      <div class="admin-select-core" ref="core" tabindex="0" @focus="coreFocus" @blur="coreBlur" @click="coreClick">
        {{ placeholderText }}
        <span class="admin-select-arrow" :class="optionDisplay ? 'admin-select-arrow-active' : ''">
          <admin-icon type="ion-android-arrow-dropdown"></admin-icon>
        </span>
      </div>
      <ul class="admin-select-option-container" v-show="optionDisplay" ref="options" tabindex="0" @blur="optionsBlur">
        <li v-for="option in options" @click.stop="select(option)" :class="option.value==localValue?'selected':''">{{ option.text }}</li>
      </ul>
    </div>
    <div class="admin-select-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-select-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import localValidatorMixin from '../helpers/local-validator-mixin'
  import standardFormApiMixin from '../helpers/standard-form-api-mixin'
  import adminIcon from './admin-icon'
  export default {
    name: 'admin-select',
    mixins: [localValidatorMixin, standardFormApiMixin],
    components: {
      adminIcon
    },
    created () {
      let { options, localValue } = this
      if (options && options.length) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === localValue) {
            this.placeholderText = options[i].text
            break
          }
        }
      }
    },
    data () {
      return {
        optionDisplay: false,
        placeholderText: this.placeholder
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      options: {
        type: Array,
        required: true
      }
    },
    watch: {
      localValue (v) {
        let options = this.options
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === v) {
            this.placeholderText = options[i].text
            this.input() // input first to ensure changes of father comp
            this.change()
            return false
          }
        }
      },
      optionDisplay (v) {

      }
    },
    methods: {
      labelClick () {
        if (this.disabled) return false
        this.$refs.core.focus()
        this.optionDisplay = true
      },
      coreClick () {
        if (this.disabled) return false
        this.optionDisplay = !this.optionDisplay
      },
      coreFocus (e) {
        if (!this.disabled) {
          this.focus(e)
        }
      },
      coreBlur (e) {
        if (e.relatedTarget !== this.$refs.options) {
          this.optionDisplay = false
          this.blur(e)
        }
      },
      optionsBlur (e) {
        if (e.relatedTarget !== this.$refs.core) {
          this.optionDisplay = false
          this.blur(e)
        }
      },
      select (option) {
        this.localValue = option.value
        this.placeholderText = option.text
        this.optionDisplay = false
        this.$emit('select', option)
      }
    }
  }
</script>
