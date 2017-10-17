<template>
  <div class="ratingselect">
    <div class="ratingtype border-1px">
      <span v-on:click="select(2, this.event)" class="text textall" v-bind:class="{ active: selectType === 2}">{{desc.all}}<span class="size">{{ratings.length}}</span></span>
      <span v-on:click="select(0, this.event)" class="text textpositive" v-bind:class="{ active: selectType === 0}">{{desc.positive}}<span class="size">{{positives.length}}</span></span>
      <span v-on:click="select(1, this.event)" class="text textnegative" v-bind:class="{ active: selectType === 1}">{{desc.negative}}<span class="size">{{negatives.length}}</span></span>
    </div>
    <div class="switch border-1px">
      <i v-on:click="switchRadio" class="iconfont icon-radiobutton" v-bind:class="{ active: onlyContent }"></i>
      <span class="iconfonttext">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  const ALL = 2;
  const NEGATIVE = 1;
  const POSITIVE = 0;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      switchRadio (event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
         this.$emit('switchOnlyContent', this.onlyContent);
      },
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
         this.$emit('switchSelectType', type);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/fonticon/iconfont.styl"
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    font-size: 0px
    padding: 18px 0px 0px 0px
    .ratingtype
      margin: 0px 18px
      padding-bottom: 18px
      font-size: 0px
      line-height: 24px
      border-1px(rgba(7, 17, 27, 0.1))
      .text
        .size
          margin-left: 2px
          font-size: 10px
      .textall
        font-size: 12px
        padding: 6px 12px
        color: #fff
        margin-right: 8px
        background: rgb(0, 160, 220)
        border-radius: 16px
        &.active
          padding: 3px 12px
          font-size: 16px
      .textpositive
        font-size: 12px
        padding: 6px 12px
        color: rgb(77, 85, 93)
        margin-right: 8px
        background: rgba(0, 160, 220, 0.5)
        border-radius: 16px
        &.active
          padding: 3px 12px
          font-size: 16px
      .textnegative
        font-size: 12px
        padding: 6px 12px
        margin-right: 8px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        border-radius: 16px
        &.active
          padding: 3px 12px
          font-size: 16px
    .switch
      color: rgb(147, 153, 159)
      font-size: 0px
      box-sizing: border-box
      padding: 12px 18px
      border-1px(rgba(0, 17, 27,0.1))
      .icon-radiobutton
        font-size: 24px
        line-height: 24px
        &.active
          color: #00c850
      .iconfonttext
        vertical-align: top
        margin-left: 4px
        line-height: 24px
        font-size: 12px
</style>
