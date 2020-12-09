import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./css/main.css"
import "./css/theme.scss"
import './assets/icon-font/iconfont.css'
import api from './http/index'

Vue.config.productionTip = false
Vue.use(api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
