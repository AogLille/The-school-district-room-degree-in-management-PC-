import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/js/flexible.js'
import './plugins/element.js'
import './plugins/vant.js'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

axios.defaults.withCredentials = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
