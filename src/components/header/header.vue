<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avater">
        <a href="http://10.6.18.10:80/index.html" style="font-size: 16px" target="_blank">sdsds</a>
        <img class="head-avater" v-bind:src="seller.avater"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <div class="support-count" v-if="seller.supports" v-on:click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-enterinto_fill"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" v-on:click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-enterinto_fill"></i>
    </div>
    <div class="background-div">
      <img class="background-img" v-bind:src="seller.avater"/>
    </div>
    <transition name="fade">
      <div  v-show="detailshow" class="detailinfos">
        <v-headdetail v-bind:seller="seller" v-on:hiddenDetail="hiddenDetail"></v-headdetail>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import linetext from './linetext.vue';
  import headdetail from './headdetail.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailshow: false
      };
    },
    methods: {
      showDetail: function (event) {
        this.detailshow = true;
      },
      hiddenDetail: function () {
        this.detailshow = false;
      }
    },
    created: function () {
      this.classMap = ['selected', 'up', 'arraw', 'arraw'];
    },
    components: {
      'v-headdetail': headdetail,
      'v-linetext': linetext
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"
  @import "../../common/fonticon/iconfont.styl"


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .header
    position: relative
    color: #fff
    overflow: hidden
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0px
      .avater
        vertical-align: top
        display: inline-block
        .head-avater
          border-radius: 2px
          width: 64px
          height: 64px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin 2px 0px 8px 0px
          font-size: 0px
          .brand
            vertical-align: top
            display: inline-block
            width: 18px
            height: 18px
            bg-image("right")
            background-size: 18px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align bottom
            width: 12px
            height: 12px
            margin-right: 10px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.selected
              bg-image("selected")
            &.up
              bg-image("up")
            &.arraw
              bg-image("icon_arraw")
          .text
            vertical-align baseline
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        bottom: 18px
        height: 24px
        line-height: 24px
        border-radius: 14px
        padding: 2px 8px 2px 8px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        right: 12px
        .count
          font-size: 10px
        .iconfont
          margin-left: 5px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      background: rgba(7, 17, 27, 0.2)
      padding: 0px 25px 0px 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        vertical-align: top
        width: 16px
        height: 16px
        margin-top: 5px
        bg-image('quan')
        background-size: 16px 16px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0px 4px
        font-size: 10px
      .iconfont
        position: absolute
        right: 12px
        font-size: 16px
    .background-div
      position: absolute
      width: 100%
      height: 100%
      z-index: -1
      left: 0px
      top: 0px
      .background-img
        width: 100%
        height: 100%
        filter: blur(4px)
    .detailinfos
      position: fixed
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(4px)
      top: 0px
      left: 0px
      right: 0px
      width: 100%
      height: 100%
      z-index: 100
</style>
