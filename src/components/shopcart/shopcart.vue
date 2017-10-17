<template>
  <div class="shopcart">
    <div class="shop-content" v-on:click="togglelist">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" v-bind:class="{ shophighlight: totalCount > 0 }">
            <i class="iconfont icon-caigou"></i>
          </div>
          <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" v-bind:class="{ numhighlight: totalCount > 0 }">￥{{totalPrice}}<p class="priceline border-1px-right"></p></div>
        <div v-show="deliveryPrice > 0" class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" v-on:click.stop="pay" v-bind:class="{ paygo: totalPrice >= minPrice }">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div class="ball"  v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="foldtrans">
      <div class="shopcartlist" v-show="listshow" v-bind:class="{ shopshow: listshow }">
        <div class="list-header border-1px">
          <h1 class="title">购物车</h1>
          <span class="empty" v-on:click="empty">清空</span>
        </div>
        <div class="list-content" ref="shopscroll">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <v-cartcontrol  v-bind:food="food"></v-cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="listbgfade">
      <div v-on:click="togglelist" class="list-mask" v-show="listshow"></div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  // import Velocity from 'velocity-animate';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        default: 0
      },
      minPrice: {
        default: 20
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBall: [],
        fold: true
      };
    },
    computed: {
      listshow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.shopscroll, {
                click: true,
                startX: 0,
                startY: 0
              });
            } else {
             this.scroll.refresh();
            }
          });
        }
        return show;
      },
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count;
        });
        return total;
      },
      payDesc () {
        let desc = '';
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count * food.price;
        });
        if (total === 0) {
          desc = '￥' + this.minPrice + '元起送';
        } else if (total > 0 && total < this.minPrice) {
          desc = '还差￥' + (this.minPrice - total) + '元起送';
        } else {
          desc = '去结算';
        }
        return desc;
      }
    },
    methods: {
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert('支付' + this.totalPrice);
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      togglelist () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      drop (target) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.target = target;
            this.dropBall.push(ball);
            return;
          }
        }
      },
      beforeEnter: function (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let reat = ball.target.getBoundingClientRect();
            let x = reat.left - 32;
            let y = -(window.innerHeight - reat.top - 44);
            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
            el.style.transform = 'translate3d(0,' + y + 'px,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            inner.style.transform = 'translate3d(' + x + 'px,0,0)';
            // Velocity(el, { translateX: x + 'px', translateY: y + 'px' }, { duration: 0 });
          }
        }
      },
      enter: function (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,,0,0)';
          el.addEventListener('transitionend', done);
          // Velocity(el, { translateX: 0 + 'px', translateY: 0 + 'px' }, { duration: 300 });
          // Velocity(el, { complete: done });
        });
      },
      afterEnter: function (el) {
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
          el.display = 'none';
        }
      }
    },
    components: {
      'v-cartcontrol': cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/fonticon/iconfont.styl"
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    width: 100%
    height: 48px
    left: 0px
    bottom: 0px
    z-index: 30
    .shop-content
      display: flex
      font-size: 0px
      background: #141d27
      .content-left
        flex: 1
        font-size: 0px
        .logo-wrapper
          display: inline-block
          position: relative
          border-radius: 50%
          background: #141d27
          top: -10px
          margin: 0px 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          .logo
            width: 100%
            height: 100%
            line-height: 44px
            text-align: center
            border-radius: 50%
            background: #2b343c
            color: #7e8c8d
            .iconfont
              font-size: 16px
              font-size: 24px
          .shophighlight
            background: rgb(0, 160, 220)
            color: #fff
          .num
            position: absolute
            top: 10%
            right: 15%
            border: 1px solid red
            border-radius: 50%
            padding: 0px 3px 0px 3px
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
            color: white
            background: red
            font-weight: 700
            font-size: 8px
        .price
          display: inline-block
          vertical-align: top
          font-size: 16px
          color: rgba(255, 255, 255, 0.2)
          line-height: 24px
          margin-top: 12px
          font-weight: 700
          .priceline
            vertical-align: top
            height: 24px
            margin-left: 12px
            border-1px-right(rgba(255, 255, 255, 0.1))
        .numhighlight
          color: white
        .desc
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          margin-left: 12px
          font-size: 14px
          color: rgba(255, 255, 255, 0.4)
      .content-right
        position: relative
        background: #2b343c
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
        flex: 0 0 90px
        width: 90px
        .pay
          position: absolute
          text-align: center
          top: 45%
          transform: translateY(-50%)
          line-height: 14px
          font-weight: 700
          font-size: 12px
          width: 100%
      .paygo
        color: white
        background: #00b43c

    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 26px
        &.drop-enter-active
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            display: inline-block
            transition: all 0.4s linear

    .shopcartlist
      position: absolute
      bottom: 48px
      left: 0
      width: 100%
      z-index: -99
      &.foldtrans-enter-to, &.foldtrans-leave-active
        transition: all 0.3s
        transform: translate3d(0, 0, 0)
      &.foldtrans-enter, &.foldtrans-leave-to
        transform: translate3d(0, 100%, 0)
      .list-header
        background: #f3f5f7
        height: 40px
        font-size: 0px
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          display: inline-block
          font-size: 14px
          color: rbg(7, 17, 27)
          font-weight: 200
          line-height: 40px
          padding: 0px 18px
        .empty
          float: right
          display: inline-block
          color: rgb(0, 160, 220)
          line-height: 40px
          padding: 0px 18px
          font-size: 12px
      .list-content
        font-size: 0px
        padding: 0px 18px
        max-height: 260px
        overflow: hidden
        background: rgb(255, 255, 255)
        .food
          height: 48px
          box-sizing: border-box
          font-size: 0px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 48px
            display: inline-block
            color: rgb(7, 17, 27)
            font-size: 14px
          .price
            position: absolute
            right: 90px
            line-height: 48px
            display: inline-block
            font-weight: 700
            color: rgb(240, 20 ,20)
            font-size: 14px
          .cartcontrol-wrapper
            display: inline-block
            position: absolute
            right: 0px
            top: 50%
            transform: translateY(-50%)
    .list-mask
      position: fixed
      width: 100%
      height: 100%
      z-index: -100
      background: rgba(0, 0, 27, 0.3)
      left: 0px
      top: 0px

  .listbgfade-enter-active, .listbgfade-leave-active
    transition: all .3s ease
  .listbgfade-enter, .listbgfade-leave-to
    opacity: 0
</style>
