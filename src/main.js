// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import headrouter from './components/route/headrouter';
import './common/stylus/index.styl';
Vue.use(VueRouter);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router: headrouter,
  el: '#app',
  template: '<App/>',
  components: { App }
});
headrouter.push('/goodsinfo');
