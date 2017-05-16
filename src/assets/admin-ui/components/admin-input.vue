<style lang="scss">
  @import '../style/vars';
  .admin-input {
    display: inline-block;
    width: 198px;
    .admin-input-label {
      display: inline-block;
    }
    .admin-input-label-text {
      margin-bottom: 8px;
      font-size: $normal;
      color: $grayDarken35;
    }
    .admin-input-warning {
      margin-top: 4px;
      font-size: $small;
      color: $danger;
    }
    .admin-input-container {
      position: relative;
      width: 100%;
      line-height: 32px;
      display: inline-block;
      color: $grayDarken25;
    }
    .admin-input-icon {
      position: absolute;
      display: inline-block;
      top: 50%;
      left: 8px;
      height: 30px;
      line-height: 30px;
      margin-top: -15px;
      font-size: 16px;
    }
    .admin-input-focus {
      .admin-input-icon {
        color: $primary;
      }
    }
    .admin-input-core {
      height: 32px;
      line-height: 32px;
      width: 100%;
    }
    textarea.admin-input-core {
      line-height: $normal * 1.5;
      height: auto;
    }
  }
  .admin-input-associations-container {
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
    outline: none;
    & > li {
      height: 32px;
      padding: 0 8px;
      line-height: 32px;
      font-size: $normal;
      color: $grayDarken35;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
      cursor: default;
    }
    & > li:not(.selected):hover {
      background-color: $grayBrighten15;
    }
  }
  .admin-input.admin-form-warning {
    .admin-input-warning {
      margin-top: 6px;
      font-size: $small;
      color: $danger;
    }
    .admin-input-core {
      border-color: $danger !important;
    }
    .admin-input-core:focus {
      box-shadow: 0 0 4px $danger;
    }
  }
  .admin-input.admin-form-icon {
    .admin-input-core {
      padding-left: 34px;
    }
  }
  .admin-input.admin-form-small {
    .admin-input-label-text {
      margin-bottom: 6px;
    }
    .admin-input-icon {
      height: 24px;
      line-height: 24px;
      margin-top: -12px;
    }
    .admin-input-core {
      height: 26px;
      line-height: 26px;
    }
    .admin-input-container {
      line-height: 26px;
    }
    .admin-input-associations-container {
      top: 28px;
      & > li {
        height: 26px;
        padding: 0 8px;
        line-height: 26px;
        font-size: $small;
      }
    }
  }
  .admin-input.admin-form-small.admin-form-icon {
    .admin-input-core {
      padding-left: 30px;
    }
  }
  .admin-form-disabled {
    .admin-input-label-text, .admin-input-container {
      cursor: not-allowed;
    }
  }
</style>
<template>
  <div class="admin-input" :class="classes">
    <div class="admin-input-label-text" v-if="label"  @click.stop="labelClick()">{{ label }}</div>
    <textarea
      v-if="type==='textarea'"
      class="admin-input-core"
      :class="small?'small':''"
      :style="{ minWidth, maxWidth, minHeight, maxHeight }"
      v-model="localValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="input($event)"
      @change="change($event)"
      @focus="coreFocus($event)"
      @blur="coreBlur($event)"
      @keyup="keyup($event)"
      @keypress="keypress($event)"
      @keydown="keydown($event)"
      ref="core"></textarea>
    <span class="admin-input-container" :class="{ 'admin-input-focus': active }" v-else>
      <i v-if="iconClass" class="admin-input-icon" :class="iconClass"></i>
      <input
        class="admin-input-core"
        type="text"
        v-if="type === 'text'"
        :class="small?'small':''"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <input
        class="admin-input-core"
        type="number"
        v-if="type === 'number'"
        :class="small?'small':''"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <input
        class="admin-input-core"
        type="password"
        v-if="type === 'password'"
        :class="small?'small':''"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <ul class="admin-input-associations-container"
        v-show="type !== 'textarea' && associationsShow"
        ref="associations" 
        tabindex="0"
        @blur="associationsBlur">
        <li v-for="association in associations" @click="selectAssociation(association)">{{ association }}</li>
      </ul>
    </span>
    <div class="admin-input-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-input-warning" v-for="warning of localWarnings">{{ warning }}</div>
  </div>
  
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  import '../style/ionicons/ionicons.css'
  import localValidatorMixin from '../helpers/local-validator-mixin'
  import standardFormApiMixin from '../helpers/standard-form-api-mixin'
  export default {
    name: 'admin-input',
    data () {
      return {
        // is the throttlling on
        throttlling: true,
        associationsShow: false,
        active: false
      }
    },
    mixins: [localValidatorMixin, standardFormApiMixin],
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      associations: Array,
      iconClass: String,
      minWidth: String,
      maxWidth: String,
      minHeight: String,
      maxHeight: String
    },
    watch: {
      associations (v) {
        // this.associationsShow = true
      }
    },
    methods: {
      keyup (e) { this.$emit('keyup', e.target.value, e) },
      keypress (e) { this.$emit('keypress', e.target.value, e) },
      keydown (e) { this.$emit('keydown', e.target.value, e) },
      click (e) {
        this.$emit('click', e.target.value, e)
      },
      labelClick () {
        this.$refs.core.focus()
      },
      selectAssociation (v) {
        this.localValue = v
        this.input()
        // this.$refs.core.focus()
        this.associationsShow = false
      },
      coreFocus (e) {
        this.focus(e)
        this.active = true
        if (this.associations && this.associations instanceof Array) {
          this.associationsShow = true
        }
      },
      coreBlur (e) {
        this.blur(e)
        this.active = false
        if (e.relatedTarget !== this.$refs.associations) this.associationsShow = false
      },
      associationsBlur (e) {
        if (e.relatedTarget !== this.$refs.core) this.associationsShow = false
      }
    }
  }
</script>
