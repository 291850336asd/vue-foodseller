<template>
  <transition name="move">
    <div v-show="showFlag" class="food-detail" ref="fooddetail">
      <div class="food-content">
        <div class="image-header">
          <img v-bind:src="food.image"/>
          <i v-on:click="hidedetail" class="iconfont icon-fanhui"></i>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="sell-detail">
            <span class="sell-count">月售{{food.sellerCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="priceitem border-1px">
            <p class="price">￥{{food.price}}</p>
            <p class="oldprice" v-show="food.oldPrice">￥{{food.oldPrice}}</p>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol v-on:cartaddshop="_drop"  v-show="food.count && food.count > 0"  v-bind:food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
            <div v-on:click.stop.prevent="addfirst(food, this.event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split v-show="food.ratings"></v-split>
        <div class="inforating" v-show="food.ratings">
          <h1 class="title">商品评价</h1>
          <v-ratingselect v-on:switchSelectType="switchSelectType" v-on:switchOnlyContent="switchOnlyContent" v-bind:only-content="onlyContent" v-bind:select-type="selectType" v-bind:ratings="food.ratings" v-bind:desc="desc"></v-ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needshow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" v-bind:src="rating.avatar" />
                </div>
                <div class="ratingtime">{{rating.rateTime | capitalizetime }}</div>
                <div class="text-desc">
                  <i class="iconfont icon-collection_fill" v-bind:class="{ down: rating.rateType === 1, up: rating.rateType === 0}"></i>
                  <span class="text">{{rating.text}}</span>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import * as dateapi from '../../common/js/date';
  /* eslint-disable no-unused-vars */
  const ALL = 2;
  const NEGATIVE = 1;
  const POSITIVE = 0;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
      capitalizetime: function (value) {
        return dateapi.formateDate(value, 'yyyy-MM-dd hh:mm');
      }
    },
    computed: {
      showCurrentSelect () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      }
    },
    methods: {
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
          if (this.scroll) {
            this.scroll.refresh();
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
      },
      addfirst (food, event) {
        if (!event._constructed) {
          return;
        }
        this._drop(event.target);
      },
      _drop (target) {
        if (!this.food.count || this.food.count === 0) {
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          }
        }
        this.$emit('foodaddshop', event.target);
      },
      hidedetail () {
        this.showFlag = false;
      },
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.fooddetail, {
              click: true,
              startX: 0,
              startY: 0
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-split': split,
      'v-ratingselect': ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/fonticon/iconfont.styl"
  .food-detail
    background: #fff
    position: fixed
    left: 0px
    top: 0px
    z-index: 25
    bottom: 48px
    width: 100%
    .image-header
      position: relative
      width: 100%
      height: 0px
      padding-top: 75%
      overflow: hidden
      img
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 100%
      .icon-fanhui
        position:absolute
        color: rgb(160, 220, 30)
        top: 10px
        left: 10px
        padding: 5px
        font-size: 30px


    .content
      position: relative
      padding: 18px
      font-size: 0px
      .title
        margin-bottom: 8px
        font-weight: 700
        color: rgb(7, 17, 27)
        line-height: 14px
        font-size: 14px
      .sell-detail
        line-height: 10px
        color: rgb(147, 153, 159)
        font-size: 0px
        .sell-count, .rating
          font-size: 10px
        .rating
          margin-left: 12px
      .priceitem
        font-size: 0px
        position: relative
        vertical-align: middle
        padding: 18px 0px 0px 0px
        .price
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .oldprice
          font-size: 10px
          font-weight: 700
          margin-left: 12px
          color: rgb(147, 153, 159)
          text-decoration: line-through
      .cartcontrol-wrapper
        position: absolute
        line-height: 24px
        bottom: 6px
        right: 18px
      .buy
        position: absolute
        color: rgb(255, 255, 255)
        background: rgb(0, 160, 220)
        line-height: 24px
        border-radius: 12px
        bottom: 12px
        height: 24px
        padding 0px 12px
        right: 18px
        font-size: 10px
    .info
      padding: 18px
      .title
        margin-bottom: 6px
        font-weight: 700
        color: rgb(7, 17, 27)
        line-height: 14px
        font-size: 14px
      .text
        padding: 0px 8px
        line-height: 20px
        color: rgb(77, 85, 93)
        font-size: 12px
    .inforating
      padding: 18px 0px
      .title
        padding-left: 18px
        font-weight: 700
        color: rgb(7, 17, 27)
        line-height: 14px
        font-size: 14px
    .rating-wrapper
      padding: 0px 18px
      font-size: 0px
      .rating-item
        position: relative
        padding: 16px 0px
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          right: 0px
          top: 16px
          .name
            color: rgb(147, 153, 159)
            font-size: 12px
            line-height: 12px
          .avatar
            margin-left: 6px
            border-radius: 50%
            width: 12px
            height: 12px
        .ratingtime
          line-height: 12px
          font-size: 12px
          color: rgb(147, 153, 159)
          margin-bottom: 6px
        .text-desc
          .icon-collection_fill
            font-size: 12px
            line-height: 12px
            &.up
              color: rgb(0, 160, 220)
            &.down
             color: rgb(147, 153, 159)
          .text
            margin-left: 4px
            font-size: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
      .no-rating
        padding-top: 18px
        padding-bottom: 30px
        color: rgb(147, 153, 159)
        font-size: 12px
  .move-enter, .move-leave-to
    opacity: 0.5
    transition: all 0.5s linear
    transform: translate3D(100%, 0, 0)
  .move-enter-to, .move-leave
    opacity: 1
    transition: all 0.5s linear
    transform: translate3D(0, 0, 0)
</style>
