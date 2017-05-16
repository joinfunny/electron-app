<style lang="scss">
  @import '../style/ionicons/ionicons.css';
  @import '../style/vars';
  .admin-paginator {
    display: inline-block;
    user-select: none;
    & > ul:after {
      content: "";
      display: block;
      clera: both;
    }
    & > ul > li {
      float: left;
      width: 40px;
      height: 32px;
      border-top: 1px solid $grayBrighten15;
      border-bottom: 1px solid $grayBrighten15;
      border-right: 1px solid $grayBrighten15;
      line-height: 32px;
      text-align: center;
      font-size: $small;
      color: $grayDarken35;
    }
    & > ul > .ellipsis{
      border: none;
      border-right: 1px solid $grayBrighten15;
    }
    & > ul > .active{
      background-color: $primary;
      color: #fff;
      border: none;
    }
    & > ul > .disabled{
      background-color: $grayBrighten20;
      color: $grayBrighten10;
      cursor: not-allowed;
    }
    & > ul > li:not(.active):not(.disabled):not(.ellipsis):hover{
      background-color: $grayBrighten20;
      color: $primary;
      cursor: pointer;
    }
    & > ul > li:first-child {
      border-left: 1px solid $grayBrighten15;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    & > ul > li:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
</style>
<template lang="html">
  <div class="admin-paginator">
    <ul>
      <li :class="{disabled: curPage == 1||pageCount<curPage}" @click="prevPage" v-if="pageCount >= 0"><i class="ion-chevron-left"></i></li>
      <li :class="{active: curPage == 1}" @click="page(1)">1</li>
      <li class="ellipsis " v-show="curPage > 5 && pageCount > 10"><i class="ion-more"></i></li>
      <li :class="{active: curPage == index+offset}" v-for="(item,index) in middlePages" @click="page(index+offset)">{{index+offset}}</li>
      <li class="ellipsis" v-show="curPage <= bigLimit && pageCount > 10"><i class="ion-more"></i></li>
      <li :class="{active: curPage == pageCount}" @click="page(pageCount)" v-if="pageCount > 1">{{pageCount}}</li>
      <li :class="{disabled: curPage == pageCount||pageCount<curPage}" @click="nextPage" v-if="pageCount >=0"><i class="ion-chevron-right"></i></li>
    </ul>
  </div>
</template>
<script>
  // Author: Bearhotel
  // email: lilijing@rongcapital.cn
  // github:
  // blog:

  // Modifier: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  export default {
    name: 'admin-paginator',
    props: {
      totalCount: {
        type: Number,
        default: 0
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        curPage: 1,
        totalC: 0,
        pageS: 10,
        pageCount: 0
      }
    },
    created () {
      var pc = 1
      if (this.totalCount > 0 && this.pageSize > 0) {
        pc = Math.ceil(this.totalCount / this.pageSize)
      }
      if (pc < this.currentPage) {
        this.curPage = pc
      } else {
        this.curPage = this.currentPage
      }
      this.totalC = this.totalCount
      this.pageS = this.pageSize
      this.pageCount = pc
    },
    computed: {
      middlePages () {
        if (this.pageCount <= 2) {
          return 0
        } else if (this.pageCount > 2 && this.pageCount <= 10) {
          return this.pageCount - 2
        } else {
          return this.curPage > 999 ? 5 : 8
        }
      },
      bigLimit () {
        return this.middlePages > 5 ? this.pageCount - 6 : this.pageCount - 3
      },
      offset () {
        if (this.curPage <= 5) {
          return 2
        } else if (this.curPage >= this.bigLimit) {
          return this.bigLimit - 2
        } else {
          return this.middlePages > 5 ? this.curPage - 3 : this.curPage - 2
        }
      }
    },
    watch: {
      totalCount (val) {
        this.totalC = val
        this.setPageCount()
      },
      currentPage (val) {
        this.setPageCount()
        if (this.pageCount < val) {
          this.curPage = this.pageCount
        } else {
          this.curPage = val
        }
      },
      pageSize (val) {
        this.pageS = val
        this.setPageCount()
      }
    },
    methods: {
      page (indexPage) {
        this.$emit('toggle-page', indexPage)
        this.curPage = indexPage
      },
      prevPage () {
        if (this.curPage !== 1) {
          this.page(this.curPage - 1)
        }
      },
      setPageCount () {
        if (this.totalC > 0 && this.pageS > 0 && this.totalC >= this.pageS) {
          this.pageCount = Math.ceil(this.totalC / this.pageS)
        } else if (this.totalC >= 0 && this.pageS >= 0 && this.totalC <= this.pageS) {
          this.pageCount = 1
        }
      },
      nextPage () {
        if (this.curPage !== this.pageCount) {
          this.page(this.curPage + 1)
        }
      }
    }
  }
</script>
