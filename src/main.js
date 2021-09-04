// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import vueResource from 'vue-resource'
import vueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Base64 from 'js-base64'
Vue.use(vueResource)
Vue.use(vueLazyLoad,{
	loading:"./static/loading-svg/loading-bars.svg"  // 设置图片懒加载
})
// 设置反向代理，前端请求默认发送到 http://localhost:8888/api
var axios = require('axios')
axios.defaults.baseURL = '/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(infiniteScroll)
Vue.use(Base64)
Vue.config.productionTip = false
/* eslint-disable no-new */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
