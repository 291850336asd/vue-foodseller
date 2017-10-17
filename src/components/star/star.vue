<template>
  <div class="star" v-bind:class="starType">
    <span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const STARLENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default {
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType: function () {
        return 'star-' + this.size;
      },
      itemClasses: function () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let intscore = Math.floor(this.score);
        for (let i = 0; i < intscore; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < STARLENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .star
    font-size: 0px
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 22px
        height: 22px
        margin-right: 12px
        background-size: 22px 22px
        &:last-child
          margin-right: 0px
        &.on
          bg-image('star_on')
        &.half
          bg-image('star_half')
        &.off
          bg-image('star_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0px
        &.on
          bg-image('star_on')
        &.half
          bg-image('star_half')
        &.off
          bg-image('star_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0px
        &.on
          bg-image('star_on')
        &.half
          bg-image('star_half')
        &.off
          bg-image('star_off')
</style>
