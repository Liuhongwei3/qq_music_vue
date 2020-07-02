import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

Vue.config.devtools = true;
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  attempt: 6,
  error: './assets/404.jpg'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
