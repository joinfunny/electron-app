<template>
  <div class="percent-bar">
    <div class="item" v-if="percents.length===3" v-for="(item,i) in percents" :key="i" :style="{
      width:item+'%',
      background:colorsT[i]
    }">
    </div>
    <div class="item" v-if="percents.length===4" v-for="(item,i) in percents" :key="i" :style="{
      width:item+'%',
      background:colorsF[i]
    }">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      barData: {
        type: Array,
        validator: function (value) {
          return value.length < 5
        },
        default: [3, 3, 3]
      }
    },
    data (){
      return {
        colorsF: [
          '#a8d96f',
          '#85cae6',
          '#fab421',
          '#f38211',
        ],
        colorsT: [
          '#a8d96f',
          '#85cae6',
          '#f38211',
        ],
      }
    },
    computed: {
      titleCount: function () {
        return (new Function('return ' + this.barData.join('+')))()
      },
      percents: function () {
        return this.barData.map(m => parseInt(m / this.titleCount * 100))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .percent-bar {
    display: flex;
    .item {
      height: 12px;
    }
  }
</style>
