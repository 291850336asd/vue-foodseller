<template>
  <div class="detail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="detail-name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <v-star v-bind:score="seller.score" v-bind:size="48"></v-star>
        </div>
        <v-linetext name="优惠信息"></v-linetext>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="item in seller.supports">
            <span class="icon" v-bind:class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <v-linetext name="商家公告"></v-linetext>
        <div class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <div class="detail-close" v-on:click="hiddenDetail">
      <i class="iconfont icon-clock"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import linetext from './linetext.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created: function () {
      this.classMap = ['selected', 'up', 'arraw', 'arraw'];
    },
    methods: {
      hiddenDetail: function () {
        this.$emit('hiddenDetail');
      }
    },
    components: {
      'v-star': star,
      'v-linetext': linetext
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/fonticon/iconfont.styl"
  .detail
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        font-size: 12px
        margin-top: 64px
        padding-bottom: 64px
        .detail-name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0px
          text-align: center
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0px 12px
            margin-bottom: 12px
            font-size: 0px
            .icon
              display: inline-block
              vertical-align bottom
              width: 16px
              height: 16px
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.selected
                bg-image("selected")
              &.up
                bg-image("up")
              &.arraw
                bg-image("icon_arraw")
            .text
              font-size: 12px
              line-height: 16px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      clear: both
      font-size: 32px
      margin: -50px auto 0px auto

</style>
