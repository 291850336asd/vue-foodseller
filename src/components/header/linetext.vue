<template>
  <div class="titleline">
    <div class="line"></div>
    <div v-if="name" class="text">{{name}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      name: {
        type: String
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .titleline
    display: flex
    width: 80%
    margin: 30px auto 20px auto
    .line
      flex: 1
      position: relative
      transform: translateY(50%)
      border-top: 1px solid rgba(255, 255, 255, 0.2)
    .text
      padding: 0px 12px
      font-size: 14px
      font-weight: 700
</style>
