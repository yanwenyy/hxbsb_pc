// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Swiper from '../static/js/swiper-3.4.2.min'
import axios from "axios"
import Public from "../static/js/public"
import paging from "../static/js/paging"
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Public)
Vue.use(paging)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
