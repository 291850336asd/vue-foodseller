/**
 * Created by sunmeng on 17/7/11.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 创建路由实例并配置路由映射
const headroute = new VueRouter({
  linkActiveClass: 'active',
  routes: [{
    path: '/goodsinfo',
    component: require('../goods/goods.vue')
  }, {
    path: '/commentsinfo', component: require('../ratings/ratings.vue')
  }, {
    path: '/sellerinfo', component: require('../seller/seller.vue')
  }]
});

// 输出router
export default headroute;
