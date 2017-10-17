<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li v-for="(item, index) in goods" v-on:click="selectMenu(index, this.event)" class="menu-item" v-bind:class="{ current: currentIndex === index }">
          <span class="text border-1px">
            <span v-show="item.type > -1" class="icon" v-bind:class="classMap[item.type%4]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodwrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-on:click="selectFood(food, this.event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img class="foodimg" v-bind:src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <p class="sellercount">月售{{food.sellCount}}份</p>
                  <p class="sellerrating">好评率{{food.rating}}%</p>
                </div>
                <div class="priceitem">
                  <p class="price">￥{{food.price}}</p>
                  <p class="oldprice" v-show="food.oldPrice">￥{{food.oldPrice}}</p>
                </div>
                <div class="cartcontrol-warpper">
                  <v-cartcontrol v-on:cartaddshop="_drop" v-bind:food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref="shopcart" v-bind:selectFoods="selecteFoods" v-bind:min-price="seller.minPrice" v-bind:delivery-price="seller.deliveryPrice"></v-shopcart>
    <v-food v-on:foodaddshop="_drop" v-bind:food="selectedFood" ref="food"></v-food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';
  export default {
    props: {
      seller: {
        type: Object
      },
      goods: {
        type: Array
      }
    },
    data () {
      return {
        scrollY: 0,
        listHeight: [],
        selectedFood: {}
      };
    },
    created: function () {
      this.classMap = ['selected', 'up', 'arraw', 'arraw'];
      this.$nextTick(function () {
        this._initScroll();
        this._calculateHeight();
      });
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selecteFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuwrapper, {
          click: true,
          startX: 0,
          startY: 0
        });
        this.foodScroll = new BScroll(this.$refs.foodwrapper, {
          click: true,
          probeType: 3,
          startX: 0,
          startY: 0
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return;
        }
        this.isFoodScroll = false;
        let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
        this.foodScroll.scrollToElement(foodList[index], 300);
      },
      _drop (target) {
        // 优化，异步
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol,
      'v-food': food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: justify-content
      width: 80px
      background: #f3f5f7
      font-size: 0px
      .menu-item
        display: table
        height: 54px
        width: 70px
        margin: 0 auto
        font-weight: 200
        color: rbg(240, 20, 20)
        font-size: 0px
        .text
          text-align: center
          font-size: 12px
          display: table-cell
          width: 70px
          margin: 0 auto
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: bottom
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.selected
              bg-image("../header/selected")
            &.up
              bg-image("../header/up")
            &.arraw
              bg-image("../header/icon_arraw")
      .current
        width: 80px
        font-weight: 700
        margin-top: -1px
        z-index: 55
        background: #fff
        .text
          border-none()
    .food-wrapper
      flex: 1
      .food-list
        .title
          margin: 0px 0px
          width: 100%
          line-height: 26px
          height: 26px
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
          border-left: 2px solid #d9dde1
          padding-left: 14px
        .food-item
          display: flex
          margin: 14px 14px 0px 14px
          padding-bottom: 14px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0px
          &:last-child
            border-none()
          .icon
            height: 57px
            width: 57px
            margin-right: 10px
            .foodimg
              flex: 0 0 57px
              height: 57px
              width: 57px
          .content
            flex: 1
            .name
              color: rgb(7, 17, 27)
              font-weight: 400
              margin: 2px 0px 8px 0px
              height: 14px
              line-height: 14px
              font-size: 14px
            .desc, .extra
              color: rbg(147, 153, 159)
              line-height: 10px
              font-size: 10px
              margin-bottom: 8px
            .desc
              line-height: 14px
            .extra
              margin-bottom
              .sellercount, .sellerrating
                color: rbg(147, 153, 159)
                line-height: 10px
                font-size: 10px
              .sellerrating
                margin-left: 12px
            .priceitem
              font-size: 0px
              font-weight: 700
              line-height: 14px
              .price
                vertical-align: top
                font-size: 14px
                color: rgb(240, 20, 20)
                margin-right: 8px
              .oldprice
                vertical-align: top
                text-decoration: line-through
                color: rbg(147, 153, 159)
                font-size: 10px
            .cartcontrol-warpper
              position: absolute
              right: 0px
              bottom: 12px
</style>
