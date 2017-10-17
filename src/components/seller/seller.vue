<template>
  <div class="seller-div" >
    <div class="seller-content" ref="sellerdetail">
      <div>
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <v-star class="star" v-bind:score="seller.score" v-bind:size="36"></v-star>
            <span class="textrating">({{seller.ratingCount}})</span>
            <span class="textsell">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2 class="title">起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}<span class="unit">元</span></span>
              </div>
            </li>
            <li class="block border-1px-right">
              <h2 class="title">商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}<span class="unit">元</span></span>
              </div>
            </li>
            <li class="block">
              <h2 class="title">平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}<span class="unit">分钟</span></span>
              </div>
            </li>
          </ul>
          <div v-on:click="tooglefavourite" class="shoucang">
            <i class="iconfont icon-collection_fill" v-bind:class="{ active: favourite }"></i>
            <div class="text">{{ favouriteText }}</div>
          </div>
        </div>
        <v-split></v-split>
        <div class="bulletin-wrapper border-1px">
          <h1 class="title">公告与活动</h1>
          <div class="text">{{seller.bulletin}}</div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="icon" v-bind:class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <v-split></v-split>
        <div class="seller-info">
          <h1 class="title">商家实景</h1>
          <div ref="piclistscroll" v-show="seller.pics && seller.pics.length" class="pic-wrapper">
            <ul class="pic-list" ref="piclist">
              <li class="pic-item" v-for="item in seller.pics">
                <img class="pic" v-bind:src="item"/>
              </li>
            </ul>
          </div>
        </div>
        <v-split></v-split>
        <div class="seller-info-bottom">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
            <li class="item-info border-1px" v-for="item in seller.infos">
              <p class="text">{{item}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import * as urlapi from '../../common/js/urlutil';
  import * as storeapi from '../../common/js/store';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favourite: false
      };
    },
    computed: {
      favouriteText () {
        return this.favourite ? '已收藏' : '收藏';
      }
    },
    mounted () {
      this.showScroll();
    },
    created: function () {
      this.classMap = ['selected', 'up', 'arraw', 'arraw'];
      this.addSearchId();
    },
    methods: {
      addSearchId () {
        let query = urlapi.urlParse();
        let idObj = { id: query.id };
        if (query && query.id) {
          this.seller = Object.assign({}, this.seller, idObj);
          this.favourite = storeapi.loadfromLocal(this.seller.id, 'favourite', false);
        }
      },
      tooglefavourite (event) {
        if (!event._constructed) {
          return;
        }
        this.favourite = !this.favourite;
        if (!this.seller.id) {
          let query = urlapi.urlParse();
          let idObj = { id: query.id };
          this.seller = Object.assign({}, this.seller, idObj);
        }
        if (this.favourite) {
          storeapi.saveTolocal(this.seller.id, 'favourite', this.favourite);
        } else {
          storeapi.removefromLocal(this.seller.id, 'favourite');
        }
      },
      showScroll () {
        // Vue.nextTick/vm.$nextTick 代码保证 this.$el 在 document 中
        this.$nextTick(() => {
          if (!this.ratingscroll) {
            this.ratingscroll = new BScroll(this.$refs.sellerdetail, {
              click: true,
              startX: 0,
              startY: 0
            });
          } else {
            this.ratingscroll.refresh();
          }
          if (this.seller.pics && this.seller.pics.length) {
            let picWidth = 120;
            let marginPic = 6;
            let width = (picWidth + marginPic) * this.seller.pics.length - marginPic;
            this.$refs.piclist.style.width = width + 'px';
            if (!this.piclistscroll) {
              this.piclistscroll = new BScroll(this.$refs.piclistscroll, {
                scrollX: true,
                click: true,
                startX: 0,
                startY: 0
              });
            } else {
              this.piclistscroll.refresh();
            }
          }
        });
      }
    },
    components: {
      'v-split': split,
      'v-star': star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/fonticon/iconfont.styl"
  .seller-div
    display: flex
    position: absolute
    top: 174px
    width: 100%
    bottom: 0px
    overflow: hidden
    .seller-content
      width: 100%
      font-size: 0px
      .overview
        position: relative
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          font-weight: 700
          margin-bottom: 8px
        .desc
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .star
            vertical-align: top
            display: inline-block
            line-height: 18px
          .textrating
            margin-left: 8px
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
          .textsell
            margin-left: 12px
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
        .remark
          width: 100%
          display: flex
          .block
            flex: 1
            margin: 18px 0px 0px 0px
            border-1px-right(rgba(7, 17, 27, 0.1))
            text-align: center
            font-size: 0px
            &:last-child
              border-none()
            .title
              font-weight: 200
              color: rgb(147, 153, 159)
              line-height: 10px
              font-size: 10px
            .content
              .stress
                color: rgb(7, 17, 27)
                line-height: 24px
                font-size: 24px
                .unit
                  font-size: 10px
        .shoucang
          position: absolute
          right: 13px
          top: 18px
          font-size: 0px
          width: 50px
          text-align: center
          .icon-collection_fill
            font-size: 24px
            line-height: 24px
          .active
            color: rgb(240, 20, 20)
          .text
            margin-top: 4px
            line-height: 10px
            color: rgb(77, 85, 93)
            font-size: 10px

      .bulletin-wrapper
        margin: 18px 18px 0px 18px
        padding-bottom: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          color: rgb(7, 17, 27)
          font-weight: 700
          line-height: 14px
          font-size: 14px
        .text
          font-weight: 300
          padding: 0px 12px
          margin-top: 8px
          color: rgb(240, 20, 20)
          line-height: 20px
          font-size: 12px
      .supports
        .support-item
          padding: 0px 12px
          margin-bottom: 12px
          font-size: 0px
          margin: 0px 18px
          padding: 16px 0px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
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
      .seller-info
        padding: 18px
        font-size: 0px
        .title
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: 14px
          font-size: 14px
          margin-bottom: 12px
        .pic-wrapper
          height: 90px
          width: 100%
          white-space: nowrap;
          .pic-list
            min-width: 100%
            .pic-item
              display: inline-block
              margin-right: 6px
              &:last-child
                margin-right: 0px
              .pic
                height: 90px
                width: 120px
      .seller-info-bottom
        padding: 18px
        font-size: 0px
        .title
          padding-bottom: 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: 14px
          font-size: 14px
        .item-info
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .text
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)

</style>
