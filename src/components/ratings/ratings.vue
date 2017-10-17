<template>
  <div class="ratings-div">
    <div class="ratings-content" ref="ratingsdetail">
      <div>
        <div class="overview">
          <div class="overview-left border-1px-right">
            <p class="score">{{seller.score}}</p>
            <div class="pingfen">综合评分</div>
            <div class="higher">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="server－wrapper">
              <span class="server-atti">服务态度</span>
              <div class="server-star">
                <v-star v-bind:score="seller.serviceScore" v-bind:size="36"></v-star>
              </div>
              <span class="serviceScore">{{seller.serviceScore}}</span>
            </div>
            <div class="server－wrapper">
              <span class="server-atti">商品评分</span>
              <div class="server-star">
                <v-star v-bind:score="seller.foodScore" v-bind:size="36"></v-star>
              </div>
              <span class="serviceScore">{{seller.foodScore}}</span>
            </div>
            <div class="server－wrapper">
              <span class="server-atti">送达时间</span>
              <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <v-split></v-split>
        <v-ratingselect v-on:switchSelectType="switchSelectType" v-on:switchOnlyContent="switchOnlyContent" v-bind:only-content="onlyContent" v-bind:select-type="selectType" v-bind:ratings="ratings"></v-ratingselect>
        <div class="rating-wrapper-detail">
          <ul v-show="ratings && ratings.length">
            <li v-show="needshow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item border-1px">
              <div class="user">
                <img class="avatar" v-bind:src="rating.avatar" />
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <v-star class="star" v-bind:size="24" v-bind:score="rating.score"></v-star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}送达</span>
                </div>
                <span class="text">{{rating.text}}</span>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <i class="iconfont icon-collection_fill" v-bind:class="{ down: rating.rateType === 1, up: rating.rateType === 0}"></i>
                  <span class="recommendtext" v-for="item in rating.recommend">{{item | recommengfilter}}</span>
                </div>
                <span class="ratingTime" >{{rating.rateTime | capitalizetime }}</span>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!ratings || !ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split.vue';
  import star from '../star/star.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import * as dateapi from '../../common/js/date';
  import BScroll from 'better-scroll';
  /* eslint-disable no-unused-vars */
  const ALL = 2;
  const NEGATIVE = 1;
  const POSITIVE = 0;
  export default {
    props: {
      seller: {
        type: Object
      },
      ratings: {
        type: Array,
        default: []
      }
    },
    mounted () {
      this.showScroll();
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false
      };
    },
    filters: {
      capitalizetime: function (value) {
        return dateapi.formateDate(value, 'yyyy-MM-dd hh:mm');
      },
      recommengfilter: function (value) {
        return value.length > 5 ? value.substring(0, 5) + '...' : value;
      }
    },
    methods: {
      showScroll () {
        this.$nextTick(() => {
          if (!this.ratingscroll) {
            this.ratingscroll = new BScroll(this.$refs.ratingsdetail, {
              click: true,
              startX: 0,
              startY: 0
            });
          } else {
            this.ratingscroll.refresh();
          }
        });
      },
      switchOnlyContent (onlycontent) {
        this.onlyContent = onlycontent;
        this.refreshScroll();
      },
      switchSelectType (type) {
        this.selectType = type;
        this.refreshScroll();
      },
      refreshScroll () {
        this.$nextTick(() => {
          if (this.ratingscroll) {
            this.ratingscroll.refresh();
          }
        });
      },
      needshow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      'v-split': split,
      'v-star': star,
      'v-ratingselect': ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings-div
    display: flex
    position: absolute
    top: 174px
    width: 100%
    bottom: 0px
    overflow: hidden
    .ratings-content
      width: 100%
      .overview
        display: flex
        padding: 18px 0px
        .overview-left
          flex: 0 0 137px
          width: 137px
          text-align: center
          border-1px-right(rgba(7, 17, 27, 0.1))
          font-size: 0px
          .score
            display: block
            font-size: 24px
            line-height: 28px
            color: rgb(255, 153, 0)
            margin-bottom: 6px
          .pingfen
            font-size: 12px
            line-height: 12px
            color: rgb(7, 17, 27)
            font-weight: 700
            margin-bottom: 8px
          .higher
            font-size: 10px
            margin-bottom: 6px
            line-height: 10px
            color: rgb(147, 153, 149)
            font-weight: 400
        .overview-right
          flex: 1
          padding: 0px 24px
          .server－wrapper
            font-size: 0px
            .server-atti
              font-weight: 700
              vertical-align: top
              font-size: 12px
              line-height: 18px
              margin-bottom: 8px
            .server-star
              display: inline-block
              margin: 0px 12px
              vertical-align: top
              line-height: 18px
            .serviceScore
              font-size: 10px
              color: rgb(255, 153, 0)
              line-height: 18px
              font-weight: 400
            .deliveryTime
              font-size: 12px
              margin-left: 12px
              line-height: 18px
              color: rgb(147, 153, 149)
              font-weight: 400
      .rating-wrapper-detail
        padding: 0px 18px
        .rating-item
          display: flex
          padding: 16px 0px
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            flex: 0 0 28px
            width: 28px
            .avatar
              border-radius: 50%
              width: 28px
              height: 28px
          .content
            position: relative
            flex: 1
            font-size: 0px
            margin-left: 12px
            .name
              font-size: 10px
              line-height: 12px
              color: rgb(7, 17, 27)
              margin-bottom: 4px
            .star-wrapper
              margin-bottom: 6px
              .star
                display: inline-block
              .delivery
                font-size: 10px
                margin-left: 6px
                color: rgb(147, 153, 159)
                line-height: 12px
            .text
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 16px
            .recommend
              margin-top: 8px
              line-height: 16px
              font-size: 0px
              .icon-collection_fill
                font-size: 12px
                line-height: 12px
                &.up
                  color: rgb(0, 160, 220)
                &.down
                  color: rgb(147, 153, 159)
              .recommendtext
                display: inline-block
                margin-left: 8px
                font-size: 9px
                padding: 0px 6px
                border: 1px solid rgba(7, 17, 27, 0.1)
                color: rgb(147, 153, 159)
                line-height: 16px
            .ratingTime
              position: absolute
              top: 0px
              right: 0px
              color: rgb(147, 153, 159)
              font-size: 12px

        .no-rating
          padding-top: 18px
          padding-bottom: 30px
          color: rgb(147, 153, 159)
          font-size: 12px
</style>
