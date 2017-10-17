<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-on:click.stop="descreaseCart" v-show="food.count > 0">
        <span class="inner">
          <i class="iconfont icon-jian"></i>
        </span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" v-on:click.stop="addCart"><i class="iconfont icon-tianjia"></i></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      descreaseCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      },
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count += 1;
        }
        this.$emit('cartaddshop', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/fonticon/iconfont.styl"

  .move-enter-active
    transition: all .4s linear
    transform: translate3d(0, 0, 0)
    .inner
      display: inline-block
      animation: bounce .4s

  .move-leave-active
    transition: all .4s linear
    transform: translate3d(0, 0, 0)
    .inner
      display: inline-block
      animation: bounce .4s reverse

  .move-enter, .move-leave-to
    transform: translate3d(24px, 0 , 0)
    opacity: 0;

  @keyframes bounce {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(180deg)
    }
  }

  .cartcontrol
    display: inline-block
    font-size: 0px
    .cart-decrease, .cart-add
      display: inline-block
      color: white
      font-size: 16px
      padding: 3px
      .iconfont
        padding: 2px
        background: rgb(0, 160, 220)
        border-radius: 50%
        font-weight: 700
        box-sizing: border-box
    .cart-count
      padding 0px 3px
      line-height: 12px
      margin-top: 6px
      font-size: 12px
      display: inline-block
</style>
